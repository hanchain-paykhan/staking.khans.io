// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract StakingRakis6 is ReentrancyGuard, Ownable, Pausable {
    IERC20 public stakingToken; // RAKIS-6 token
    IERC20 public rewardToken; // HAN token

    constructor(address _stakingToken, address _rewardToken) onlyOwner {
        stakingToken = IERC20(_stakingToken);
        rewardToken = IERC20(_rewardToken);
    }

    uint256 public constant hanTokenPerLpToken = 274959775134; // Quantity of HAN tokens rewarded per LP token

    uint256 public totalSupply; // Total amount of token staked
    uint256 public tokenVolume = 10000 ether; // The total amount of LP token that users can stake to contract
    uint256 public rewardsDuration = 365 days; // The total amount of HAN token available for reward = hanTokenPerLpToken * tokenVolume * rewardsDuration

    mapping(address => uint256) public getAmount; // The amount of LP token staked
    mapping(address => uint256) public getStakingStartTime; // Staking time started
    mapping(address => uint256) public getRewardReleased; // The total amount of HAN Token received as reward
    mapping(address => uint256) public getBalance; // The accumulated amount of HAN token before "CLAIM"

    
    // ------------------ Admin ------------------ //

    // Pause Staking
    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function setRewardsDuration(uint256 _newDuration) public onlyOwner {
        rewardsDuration = _newDuration;
    }

    // The total amount of token that can be staked to the contract may change
    function setTokenVolume(uint256 _newVolume) public onlyOwner {
        require(_newVolume > totalSupply, "Too Small Volume");
        tokenVolume = _newVolume;
    }

    // Lookup function for LP token amount in the contract
    function stakingTokenBalance() public view returns (uint256) {
        uint256 balance;
        balance = stakingToken.balanceOf(address(this));
        return balance;
    }

    // Lookup function for LP token deposited by mistake (not by staking)
    function unappliedStakingToken() public view returns (uint256) {
        uint256 unappliedToken;
        unappliedToken = stakingTokenBalance() - totalSupply;
        return unappliedToken;
    }

    function transferStakingToken(uint256 _amount) public onlyOwner {
        require(
            unappliedStakingToken() >= _amount,
            "Exceeded Unapplied Token Amount"
        );
        stakingToken.transfer(msg.sender, _amount);
    }

    function recoverERC20(address _tokenAddress, uint256 _tokenAmount)
        external
        onlyOwner
    {
        require(
            _tokenAddress != address(stakingToken),
            "Cannot withdraw the staking token"
        );
        IERC20(_tokenAddress).transfer(msg.sender, _tokenAmount);
        emit RecoveredERC20(_tokenAddress, _tokenAmount);
    }

    function recoverERC721(address _tokenAddress, uint256 _tokenId)
        external
        onlyOwner
    {
        require(
            _tokenAddress != address(stakingToken),
            "Cannot withdraw the staking token"
        );
        IERC721(_tokenAddress).safeTransferFrom(
            address(this),
            msg.sender,
            _tokenId
        );
        emit RecoveredERC721(_tokenAddress, _tokenId);
    }

    
    // ------------------ Staking Functions ------------------ //

    // "STAKE" function
    function stake(uint256 amount) public nonReentrant whenNotPaused {
        require(amount > 0, "Cannot stake 0");
        require(stakingToken.balanceOf(msg.sender) != 0, "Do Not Have Token");
        require((amount + totalSupply) <= tokenVolume, "Too Many Token");
        require(totalSupply < tokenVolume, "Already Token Full");
        require(rewardToken.balanceOf(address(this)) > 0, "Reward Token 0");
        require(
            rewardToken.balanceOf(address(this)) -
                (
                    ((rewardsDuration * (totalSupply * hanTokenPerLpToken)) /
                        10**18)
                ) >
                rewardsDuration * ((amount * hanTokenPerLpToken) / 10**18),
            "Total amount of rewards is too high"
        );
        if (getAmount[msg.sender] > 0) {
            totalSupply += amount;
            uint256 stakedTime = (block.timestamp -
                uint256(getStakingStartTime[msg.sender]));
            getBalance[msg.sender] +=
                stakedTime *
                ((getAmount[msg.sender] * hanTokenPerLpToken) / 10**18);
            stakingToken.transferFrom(msg.sender, address(this), amount);
            getAmount[msg.sender] += amount;
            getStakingStartTime[msg.sender] = block.timestamp;
            emit Staked(msg.sender, amount);
        } else {
            totalSupply += amount;
            stakingToken.transferFrom(msg.sender, address(this), amount);
            getAmount[msg.sender] += amount;
            getStakingStartTime[msg.sender] = block.timestamp;
            emit Staked(msg.sender, amount);
        }
    }

    // "WITHDRAW" function
    function withdraw(uint256 amount) public nonReentrant {
        require(amount > 0, "Cannot withdraw 0");
        require(getAmount[msg.sender] >= amount, "Insufficient Balance");
        totalSupply -= amount;
        uint256 stakedTime = (block.timestamp -
            uint256(getStakingStartTime[msg.sender]));
        getBalance[msg.sender] +=
            stakedTime *
            ((getAmount[msg.sender] * hanTokenPerLpToken) / 10**18);
        getAmount[msg.sender] -= amount;
        getStakingStartTime[msg.sender] = block.timestamp;
        stakingToken.transfer(msg.sender, amount);
        emit Withdrawn(msg.sender, amount);
    }

    // "CLAIM" function
    function claimReward(address _user) public nonReentrant {
        require(
            block.timestamp - uint256(getStakingStartTime[_user]) != 0,
            "Too Early"
        );
        require(
            getBalance[_user] < rewardToken.balanceOf(address(this)),
            "Short Reward"
        );
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

    function updateReward() public view returns (uint256) {
        uint256 value;
        value += ((getAmount[msg.sender] * hanTokenPerLpToken) / 10**18);
        return value;
    }

    // Staking time checking function
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

    // ------------------ EVENTS ------------------ //

    event Staked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event RewardPaid(address indexed user, uint256 reward);
    event RecoveredERC20(address token, uint256 amount);
    event RecoveredERC721(address token, uint256 tokenId);
}
