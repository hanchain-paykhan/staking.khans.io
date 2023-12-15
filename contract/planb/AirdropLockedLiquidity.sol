// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;
pragma abicoder v2;

import "@uniswap/v3-core/contracts/interfaces/IUniswapV3Pool.sol";
import "@uniswap/v3-periphery/contracts/libraries/OracleLibrary.sol";
import '@uniswap/v3-core/contracts/interfaces/IUniswapV3Factory.sol';
import '@uniswap/v3-periphery/contracts/interfaces/INonfungiblePositionManager.sol';
import '@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol';
import "@chainlink/contracts/src/v0.7/interfaces/AggregatorV2V3Interface.sol";
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

contract AirdropLockedLiquidity is Ownable, ReentrancyGuard, Pausable {

    AggregatorV2V3Interface public constant ETH_PRICE_FEED = AggregatorV2V3Interface(0x13e3Ee699D1909E989722E753853AE30b17e08c5); // Address of the Chainlink oracle for Ethereum price feed.

    // Addresses related to Uniswap V3.
    INonfungiblePositionManager public constant POSITION_MANAGER = INonfungiblePositionManager(0xC36442b4a4522E871399CD717aBDD847Ab11FE88);
    IUniswapV3Factory public constant FACTORY = IUniswapV3Factory(0x1F98431c8aD98523631AE4a59f267346ea31F984);
    ISwapRouter public constant SWAP_ROUTER = ISwapRouter(0xE592427A0AEce92De3Edee1F18E0157C05861564);
    IUniswapV3Pool public constant WETH_POOL = IUniswapV3Pool(0x5b42A63d6741416CE9a7B9f4f16d8c9231CcdDd4);

    // Addresses of WETH and HAN tokens.
    IERC20 public constant WETH = IERC20(0x4200000000000000000000000000000000000006);
    IERC20 public constant HAN = IERC20(0x50Bce64397C75488465253c0A034b8097FeA6578);

    uint256 public constant REWARD_PER_SECOND = 38463802994; // Defines the reward per second.
    uint256 public constant YEAR = 31536000; // Time in seconds for one year.
    uint256 private constant WEI_MULTIPLIER = 1e18; // Constant for Ethereum unit conversion.

    // Constants for Uniswap pool configuration.
    uint24 public constant FEE = 10000;
    int24 public immutable TICK_LOWER = -887200;
    int24 public immutable TICK_UPPER = 887200;
    
    // Variables related to liquidity.
    uint256 public suppliedWETH;
    uint256 public suppliedHAN;
    uint256 public totalUnderlyingLiquidity;
    uint256 public totalHanAmountSwapped;

    // Array to store whitelisted users.
    address[] private whitelistArray;
    mapping(address => uint256) public whitelistAmount;
    mapping(address => bool) public isWhitelisted;

    // Structure to store information about liquidity providers.
    struct LiquidityProvider {
        uint256 liquidity; // Amount of provided liquidity.
        uint256 tokenId; // Token ID of the provided liquidity.
        uint256 hanAmount; // Amount of HAN tokens provided.
        uint256 wethAmount; // Amount of WETH tokens provided.
        uint256 lastClaimedTime; // Last time rewards were claimed.
        uint256 lockupPeriod; // Time when liquidity can be removed.
    }
    mapping (address => LiquidityProvider[]) private providerArray; // Mapping to store information about liquidity providers.

    // Structure to store total information about a liquidity provider.
    struct TotalLiquidityInfo {
        uint256 totalLiquidity; // Total liquidity supplied
        uint256 totalHanAmount; // Total HAN token amount supplied
        uint256 totalWethAmount; // Total WETH token amount supplied
        uint256 totalRewardReleased; // Total reward released to the provider
        uint256 unclaimedRewards; // Unclaimed rewards of the provider
    }
    mapping (address => TotalLiquidityInfo) public totalLiquidityInfo; // Mapping to store the total information of a liquidity provider.

    // Adds users to a whitelist, allowing them to participate in liquidity provision.
    function addWhitelist(address[] memory _accounts, uint256[] memory _amounts) public onlyOwner {
        require(_accounts.length == _amounts.length, "Accounts and amounts arrays must have the same length");

        for (uint i = 0; i < _accounts.length; i++) {
            address user = _accounts[i];

            for (uint j = 0; j < i; j++) {
                require(_accounts[j] != user, "Duplicate accounts are not allowed");
            }

            if (!isWhitelisted[user]) {
                isWhitelisted[user] = true;
                whitelistArray.push(user);
            }
            whitelistAmount[user] += _amounts[i];
        }
    }

    // Allows whitelisted users to provide liquidity.
    function addLiquidity() external nonReentrant {
        require(whitelistAmount[msg.sender] > 0, "You are not whitelisted");
        TotalLiquidityInfo storage totalInfo = totalLiquidityInfo[msg.sender];
        
        uint256 wethTokenAmount = getEthAmount(whitelistAmount[msg.sender]) / 2;
        uint256 hanTokenAmount = getEquivalentHanForWETH(wethTokenAmount);

        _safeApprove(WETH, address(POSITION_MANAGER), wethTokenAmount);
        _safeApprove(HAN, address(POSITION_MANAGER), hanTokenAmount);

        (uint256 tokenId, uint128 liquidity, uint256 amount0, uint256 amount1) = _addLiquidityToUniswap(wethTokenAmount, hanTokenAmount);

        totalHanAmountSwapped += _swapWETHForHAN(wethTokenAmount);

        suppliedWETH += amount0;
        suppliedHAN += amount1;
        totalUnderlyingLiquidity += liquidity;
        whitelistAmount[msg.sender] = 0;

        totalInfo.totalLiquidity += liquidity;
        totalInfo.totalWethAmount += amount0;
        totalInfo.totalHanAmount += amount1;

        _addToProviderArray(msg.sender, tokenId, liquidity, amount0, amount1);

        emit LiquidityAdded(msg.sender, tokenId, amount0, amount1, liquidity);
    }

    // Enables users to remove their provided liquidity after a lockup period.
    function removeLiquidity(uint256 _index) external nonReentrant {
        LiquidityProvider memory provider = providerArray[msg.sender][_index];
        TotalLiquidityInfo storage totalInfo = totalLiquidityInfo[msg.sender];
        require(provider.lockupPeriod < block.timestamp, "Lockup period is not over yet");

        INonfungiblePositionManager.DecreaseLiquidityParams memory params = INonfungiblePositionManager.DecreaseLiquidityParams({
            tokenId: provider.tokenId,
            liquidity: uint128(provider.liquidity),
            amount0Min: 0,
            amount1Min: 0,
            deadline: block.timestamp
        });
        POSITION_MANAGER.decreaseLiquidity(params);

        INonfungiblePositionManager.CollectParams memory collectParams = INonfungiblePositionManager.CollectParams({
            tokenId: provider.tokenId,
            recipient: msg.sender,
            amount0Max: type(uint128).max, 
            amount1Max: type(uint128).max 
        });
        POSITION_MANAGER.collect(collectParams);

        suppliedHAN -= provider.hanAmount;
        suppliedWETH -= provider.wethAmount;
        totalUnderlyingLiquidity -= provider.liquidity;

        totalInfo.totalLiquidity -= provider.liquidity;
        totalInfo.totalHanAmount -= provider.hanAmount;
        totalInfo.totalWethAmount -= provider.wethAmount;
        totalInfo.unclaimedRewards += _calculateRewards(msg.sender, _index);

        emit LiquidityRemoved(msg.sender, provider.tokenId, provider.liquidity);

        _removeElement(_index);
    }

    // Allows users to claim their accumulated rewards.
    function claimRewards() external nonReentrant {
        TotalLiquidityInfo storage totalInfo = totalLiquidityInfo[msg.sender];
        uint256 reward;

        for(uint i = 0; i < providerArray[msg.sender].length; i++) {
            LiquidityProvider storage provider = providerArray[msg.sender][i];
            uint256 rewardValue = _calculateRewards(msg.sender, i);
            if (rewardValue > 0) {
                reward += rewardValue;
                provider.lastClaimedTime = block.timestamp;
            }
        }
        require(reward + totalInfo.unclaimedRewards > 0, "No rewards to claim");

        HAN.transfer(msg.sender, reward + totalInfo.unclaimedRewards);

        totalInfo.totalRewardReleased += reward + totalInfo.unclaimedRewards;
        totalInfo.unclaimedRewards = 0;

        emit RewardsClaimed(msg.sender, reward);
    }

    // View the reward amount for a specific user.
    function rewardView(address _user) public view returns (uint256) {
        uint256 reward = 0;
        for(uint i = 0; i < providerArray[_user].length; i++) {
            uint256 rewardValue = _calculateRewards(_user, i);
            if (rewardValue > 0) {
                reward += rewardValue;
            }
        }
        return reward;
    }

    // Shows the remaining lockup time for liquidity removal.
    function remainingDuration(address _user, uint256 _index) public view returns (uint256) {
        LiquidityProvider memory provider = providerArray[_user][_index];
        if(provider.lockupPeriod > block.timestamp) { 
            return provider.lockupPeriod - block.timestamp;
        } else {
            return 0;
        }
    }

    // Calculates equivalent HAN tokens for given WETH.
    function getEquivalentHanForWETH(uint _wethAmount) public view returns (uint) {
        (, int24 tick, , , , , ) = WETH_POOL.slot0();

        uint hanAmount = OracleLibrary.getQuoteAtTick(
            tick,
            uint128(_wethAmount),
            WETH_POOL.token0(),
            WETH_POOL.token1()
        );
        return hanAmount;
    }

    // Converts USD price to Ethereum equivalent.
    function getEthAmount(uint256 _usdPrice) public view returns (uint256) {
        (, int ethPrice, , ,) = ETH_PRICE_FEED.latestRoundData();

        uint256 ethPriceInUSD = uint256(ethPrice);
        uint256 ethAmount = _usdPrice * WEI_MULTIPLIER / ethPriceInUSD;

        return ethAmount;
    }

    // Function to view the information of a liquidity provider Array.
    function getProviders(address _user) public view returns(LiquidityProvider[] memory) {
        return providerArray[_user];
    }

    // Function to view the whitelist array.
    function getWhitelist() public view returns(address[] memory) {
        return whitelistArray;
    }

    // Calculates rewards for a user.
    function _calculateRewards(address _user, uint256 _index) internal view returns (uint256) {
        LiquidityProvider memory provider = providerArray[_user][_index];
        uint256 reward;
        uint256 stakedTime = block.timestamp - provider.lastClaimedTime;
        reward = provider.liquidity * stakedTime * REWARD_PER_SECOND / WEI_MULTIPLIER;
        return reward;
    }

    // Internal function to swap WETH for HAN tokens.
    function _swapWETHForHAN(uint256 _wethAmount) private returns (uint256) {
        
        uint256 hanBalanceBefore = HAN.balanceOf(address(this));

        ISwapRouter.ExactInputSingleParams memory params = ISwapRouter.ExactInputSingleParams({
            tokenIn: address(WETH),
            tokenOut: address(HAN),
            fee: FEE,
            recipient: address(this),
            deadline: block.timestamp,
            amountIn: _wethAmount,
            amountOutMinimum: 0,
            sqrtPriceLimitX96: 0
        });
        
        IERC20(address(WETH)).approve(address(SWAP_ROUTER), _wethAmount);
        SWAP_ROUTER.exactInputSingle(params);

        uint256 hanBalanceAfter = HAN.balanceOf(address(this));
        uint256 hanReceived = hanBalanceAfter - hanBalanceBefore;

        SwapWETHForHAN(msg.sender, _wethAmount, hanReceived);

        return hanReceived;
    }

    // Adds liquidity to Uniswap pool.
    function _addLiquidityToUniswap(uint256 _wethTokenAmount, uint256 _hanTokenAmount) private returns (uint256 tokenId, uint128 liquidity, uint256 amount0, uint256 amount1) {
        INonfungiblePositionManager.MintParams memory params = INonfungiblePositionManager.MintParams({
            token0: address(WETH),
            token1: address(HAN),
            fee: FEE,
            tickLower: TICK_LOWER,
            tickUpper: TICK_UPPER,
            amount0Desired: _wethTokenAmount,
            amount1Desired: _hanTokenAmount,
            amount0Min: 0,
            amount1Min: 0,
            recipient: address(this),
            deadline: block.timestamp
        });

        (tokenId, liquidity, amount0, amount1) = POSITION_MANAGER.mint(params);
        return (tokenId, liquidity, amount0, amount1);
    }

    // private function to add a liquidity provider to the array.
    function _addToProviderArray(address _user, uint256 _tokenId, uint256 _liquidity, uint256 _wethAmount, uint256 _hanAmount) private {
        LiquidityProvider memory newProvider = LiquidityProvider({
            tokenId: _tokenId,
            liquidity: _liquidity,
            wethAmount: _wethAmount,
            hanAmount: _hanAmount,
            lastClaimedTime: block.timestamp,
            lockupPeriod: block.timestamp + YEAR
        });
        providerArray[_user].push(newProvider);
    }

    // private function to safely approve tokens.
    function _safeApprove(IERC20 _token, address _spender, uint256 _amount) private {
        uint256 currentAllowance = _token.allowance(address(this), _spender);

        if (currentAllowance != _amount) {
            if (currentAllowance > 0) {
                _token.approve(_spender, 0);
            }
            _token.approve(_spender, _amount);
            emit SafeApprove(address(_token), _spender, _amount);
        }
    }

     // private function to remove an element from the array.
    function _removeElement(uint256 _index) private {
        require(_index < providerArray[msg.sender].length, "Invalid index");
        providerArray[msg.sender][_index] = providerArray[msg.sender][providerArray[msg.sender].length - 1];
        providerArray[msg.sender].pop();
    }

    // Functions to recover wrong tokens or Ether sent to the contract.
    function recoverERC20(address _tokenAddress, uint256 _tokenAmount) external onlyOwner nonReentrant {
        IERC20(_tokenAddress).transfer(msg.sender, _tokenAmount);
        emit ERC20Recovered(_tokenAddress, msg.sender, _tokenAmount);
    }
    function recoverEther(address payable _recipient, uint256 _ethAmount) external onlyOwner nonReentrant{
        _recipient.transfer(_ethAmount);
        emit EtherRecovered(_recipient, _ethAmount);
    }

    // Functions to pause or unpause the contract.
    function pause() external onlyOwner nonReentrant {
        _pause();
    }
    function unpause() external onlyOwner nonReentrant {
        _unpause();
    }

    // Defines various events for logging activities like liquidity addition/removal, reward claims, and administrative actions.
    event LiquidityAdded(address indexed provider, uint256 tokenId, uint256 wethAmount, uint256 hanAmount, uint256 liquidity);
    event LiquidityRemoved(address indexed provider, uint256 tokenId, uint256 liquidity);
    event RewardsClaimed(address indexed provider, uint256 reward);
    event SwapWETHForHAN(address indexed sender, uint256 wethAmount, uint256 hanReceived);
    event SafeApprove(address indexed token, address indexed spender, uint256 amount);
    event ERC20Recovered(address indexed token, address indexed to, uint256 amount);
    event EtherRecovered(address indexed to, uint256 amount);
}
