// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract StakingRakis6 is ReentrancyGuard, Ownable {
    IERC20 public stakingToken; // rakis-6
    IERC20 public rewardToken; // Han
    IERC20 public wethToken; // WETH
    IERC20 public usdcToken; // USDC
    IERC721 public uniV3Token; // Uniswap V3

    uint256 public constant hanTokenPerLpToken = 1256958972041; // HanToken quantity per LP token

    uint256 public totalSupply; // Total amount of tokens staked
    uint256 public tokenVolume = 10000 ether; // Amount of tokens that the user can stake in the contract

    mapping(address => uint256) public getAmount; // Amount of tokens staked
    mapping(address => uint256) public getStakingStartTime; // Time Staking Started
    mapping(address => uint256) public getRewardReleased; // The total amount of Han Token received as a reward
    mapping(address => uint256) public getBalance; // Han Token is piled up before making a claim

    constructor(
        address _stakingToken,
        address _rewardToken,
        address _wethToken,
        address _usdcToken,
        address _uniV3Token
    ) {
        stakingToken = IERC20(_stakingToken);
        rewardToken = IERC20(_rewardToken);
        wethToken = IERC20(_wethToken);
        usdcToken = IERC20(_usdcToken);
        uniV3Token = IERC721(_uniV3Token);
    }

    // Staked time lookup function
    function stakingTimeData() public view returns (uint256) {
        if (getAmount[msg.sender] == 0) {
            return block.timestamp;
        } else {
            uint256 stakedTime;
            stakedTime = (block.timestamp -
                uint256(getStakingStartTime[msg.sender]));
            return stakedTime;
        }
    }

    /* ==================== Admin ==================== */

    // Token amount modification function that can be staked into a contract
    function setTokenVolume(uint256 _newVolume) public onlyOwner {
        require(_newVolume > totalSupply, "Too Small Volume");
        tokenVolume = _newVolume;
    }

    // Contract's UNI-V3-TokenIds lookup function
    function uniTokenBalance() public view returns (uint256) {
        uint256 tokenIds;
        tokenIds = uniV3Token.balanceOf(address(this));
        return tokenIds;
    }

    // Contract's UNI-V3-TokenIds Transfer Function
    function transferUniToken(uint256 _tokenId) public onlyOwner {
        uniV3Token.safeTransferFrom(address(this), msg.sender, _tokenId);
    }

    // Contract's Han Token lookup function
    function rewardTokenBalance() public view returns (uint256) {
        uint256 balance;
        balance = rewardToken.balanceOf(address(this));
        return balance;
    }

    // Contract's Han Token Transfer Function
    function transferHanToken(uint256 _amount) public onlyOwner {
        rewardToken.transfer(msg.sender, _amount);
    }

    // LP Token lookup function of contract
    function stakingTokenBalance() public view returns (uint256) {
        uint256 balance;
        balance = stakingToken.balanceOf(address(this));
        return balance;
    }

    // Blunder staking token lookup function of contract
    function unappliedStakingToken() public view returns (uint256) {
        uint256 unappliedToken;
        unappliedToken = stakingTokenBalance() - totalSupply;
        return unappliedToken;
    }

    // LP Token Transfer Function of Contract
    function transferStakingToken(uint256 _amount) public onlyOwner {
        require(
            unappliedStakingToken() >= _amount,
            "Exceeded Unapplied Token Amount"
        );
        stakingToken.transfer(msg.sender, _amount);
    }

    // WETH Token lookup function that contract has
    function wethTokenBalance() public view returns (uint256) {
        uint256 balance;
        balance = wethToken.balanceOf(address(this));
        return balance;
    }

    // WETH Token Transfer Function of Contract
    function transferWethToken(uint256 _amount) public onlyOwner {
        wethToken.transfer(msg.sender, _amount);
    }

    // Contract's USDC Token lookup function
    function usdcTokenBalance() public view returns (uint256) {
        uint256 balance;
        balance = usdcToken.balanceOf(address(this));
        return balance;
    }

    // Contract's USDC Token Transfer Function
    function transferUsdcToken(uint256 _amount) public onlyOwner {
        usdcToken.transfer(msg.sender, _amount);
    }

    /* ==================== Staking Function ==================== */

    // Staking function
    function stake(uint256 amount) public {
        _stake(msg.sender, amount);
    }

    // withdrawal function
    function withdraw(uint256 amount) public {
        _withdraw(msg.sender, amount);
    }

    // Compensation claim function
    function claimReward(address _user) public {
        require(
            block.timestamp - uint256(getStakingStartTime[_user]) != 0,
            "Too Early"
        );
        require(getBalance[_user] < rewardTokenBalance(), "Short Reward");
        uint256 stakedTime = (block.timestamp -
            uint256(getStakingStartTime[_user]));
        getBalance[_user] +=
            stakedTime *
            ((getAmount[msg.sender] * hanTokenPerLpToken) / 10**18);
        rewardToken.transfer(_user, getBalance[_user]);
        getRewardReleased[_user] += getBalance[_user];
        emit RewardPaid(_user, getBalance[_user]);
        getBalance[_user] = 0;
        getStakingStartTime[_user] = block.timestamp;
    }

    // Steakings function Detail Logic
    function _stake(address _user, uint256 _amount) internal {
        require(_amount > 0, "Cannot stake 0");
        require(stakingToken.balanceOf(_user) != 0, "Do Not Have Token");
        require((_amount + totalSupply) <= tokenVolume, "Too Many Token");
        require(totalSupply < tokenVolume, "Already Token Full");
        require(rewardTokenBalance() > 0, "Reward Token 0");
        if (getAmount[_user] > 0) {
            totalSupply += _amount;
            uint256 stakedTime = (block.timestamp -
                uint256(getStakingStartTime[_user]));
            getBalance[_user] +=
                stakedTime *
                ((getAmount[msg.sender] * hanTokenPerLpToken) / 10**18);
            stakingToken.transferFrom(_user, address(this), _amount);
            getAmount[_user] += _amount;
            getStakingStartTime[_user] = block.timestamp;
            emit Staked(_user, _amount);
        } else {
            totalSupply += _amount;
            stakingToken.transferFrom(_user, address(this), _amount);
            getAmount[_user] += _amount;
            getStakingStartTime[_user] = block.timestamp;
            emit Staked(_user, _amount);
        }
    }

    // withdrawal function detail logic
    function _withdraw(address _user, uint256 _amount) internal {
        require(_amount > 0, "Cannot withdraw 0");
        require(getAmount[_user] >= _amount, "Insufficient Balance");
        require(_amount < rewardTokenBalance(), "Do Not Have Reward Token");
        totalSupply -= _amount;
        uint256 stakedTime = (block.timestamp -
            uint256(getStakingStartTime[_user]));
        getBalance[_user] +=
            stakedTime *
            ((getAmount[msg.sender] * hanTokenPerLpToken) / 10**18);
        getAmount[_user] -= _amount;
        getStakingStartTime[_user] = block.timestamp;
        stakingToken.transfer(_user, _amount);
        emit Withdrawn(_user, _amount);
    }

    // Compensation lookup function
    function updateReward() public view returns (uint256) {
        uint256 value;
        // uint stakedTime = (block.timestamp - uint(getStakingStartTime[msg.sender]));
        value += ((getAmount[msg.sender] * hanTokenPerLpToken) / 10**18);
        return value;
    }

    // 0.000001256958972041
    // 1256958972041
    // 1000000000000000000
    /* ==================== EVENTS ==================== */

    event Staked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event RewardPaid(address indexed user, uint256 reward);
}
