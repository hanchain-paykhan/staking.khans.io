// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract PrivateStakingRakis6 is ReentrancyGuard, Ownable, Pausable {
    IERC20 private stakingToken; // RAKIS-6 token 0x3fa8CEE6795220Ac25DD35D4d39ec306a3e4fb3f
    IERC20 private rewardToken; // HAN token 0x50Bce64397C75488465253c0A034b8097FeA6578
    uint32 private participationCode;

    constructor(address _stakingToken, address _rewardToken, uint32 _participationCode) onlyOwner {
        stakingToken = IERC20(_stakingToken);
        rewardToken = IERC20(_rewardToken);
        participationCode = _participationCode;
    }

    uint64 private constant hanTokenPerLpToken = 48445704606; // Quantity of HAN tokens rewarded per LP token
    uint32 private constant withdrawDuration = 365 days; // The total amount of HAN token available for reward = hanTokenPerLpToken * tokenVolume * rewardsDuration
    uint256 public totalSupply; // Total amount of token staked
    uint256 public tokenQuota = 10000 ether; // The total amount of LP token that users can stake to contract

    struct Staker {
        uint256 amount;    // The amount of LP token staked
        uint256 timeStarted;   // Staking time started
        uint256 totalRewardReceived;   // The total amount of HAN Token received as reward
        uint256 unclaimedReward;  // The accumulated amount of HAN token before "CLAIM"
        uint256 withdrawalTime;    // Withdrawal time
        uint256 totalAmount;   // Total Staking Amount
    }

    mapping(address => Staker) private stakers;  // mapping the struct
    mapping(address => Staker[]) private stakerArray; // mapping the struct Array

    // Array struct return mapping
    function getStakerArrayData(address _user) public view returns(Staker[] memory) {
        return stakerArray[_user];
    }

    // Struct Return Mapping
    function getStakerData(address _user) public view returns(Staker memory) {
        return stakers[_user];
    }

    // "STAKE" function
    function stake(uint32 _participationCode, uint256 _amount) public nonReentrant whenNotPaused {
        require(_participationCode == participationCode, "Invalid participationCode");
        require(_amount + totalSupply <= tokenQuota, "Too Many Token");
        require(rewardToken.balanceOf(address(this)) - (((withdrawDuration * (totalSupply * hanTokenPerLpToken)) / 10**18)) > withdrawDuration * ((_amount * hanTokenPerLpToken) / 10**18), "Total amount of rewards is too high");
        Staker storage staker = stakers[msg.sender];
        totalSupply += _amount;
        stakingToken.transferFrom(msg.sender, address(this), _amount);
        staker.amount = _amount;
        staker.timeStarted = block.timestamp;
        staker.withdrawalTime = block.timestamp + withdrawDuration;
        staker.totalAmount += _amount;
        stakerArray[msg.sender].push(staker);
        staker.amount = 0;
        staker.timeStarted = 0;
        staker.withdrawalTime = 0;
        emit Staked(msg.sender, _amount);
    }

    // "WITHDRAW" function
    function withdraw(uint256 _index) public nonReentrant {
        Staker storage staker = stakers[msg.sender];
        Staker storage array = stakerArray[msg.sender][_index];
        // require(stakerArray[msg.sender][_index].timeStarted + withdrawDuration <= block.timestamp,"It's not the time to withdraw");
        totalSupply -= array.amount;
        staker.totalAmount -= array.amount;
        staker.unclaimedReward += (block.timestamp - stakerArray[msg.sender][_index].timeStarted) * ((stakerArray[msg.sender][_index].amount * hanTokenPerLpToken) / 10**18);
        stakingToken.transfer(msg.sender, stakerArray[msg.sender][_index].amount);
        emit Withdrawn(msg.sender, array.amount);
        removeByIndex(_index, stakerArray[msg.sender]);
    }

    // "CLAIM" function
    function claimReward() public nonReentrant {
        uint reward;
        Staker storage staker = stakers[msg.sender];
        for(uint i = 0; i < stakerArray[msg.sender].length; i++) {
            reward += (block.timestamp - stakerArray[msg.sender][i].timeStarted) * ((stakerArray[msg.sender][i].amount * hanTokenPerLpToken) / 10**18);
            stakerArray[msg.sender][i].timeStarted = block.timestamp;
        }
        require(reward != 0 || staker.unclaimedReward != 0, "Don't have any money to claim");
        staker.totalRewardReceived += (reward + staker.unclaimedReward);
        rewardToken.transfer(msg.sender, (reward + staker.unclaimedReward));
        emit RewardPaid(msg.sender, (reward + staker.unclaimedReward));
        staker.unclaimedReward = 0;
    }

    // Current Rewardable Amount Output Function
    function rewardView(address _user) public view returns(uint256) {
        uint reward;
        for(uint i = 0; i < stakerArray[_user].length; i++) {
            reward += (block.timestamp - stakerArray[_user][i].timeStarted) * ((stakerArray[_user][i].amount * hanTokenPerLpToken) / 10**18);
        }
        return reward;
    }

    // Withdrawable Time Output Function
    function remainingDuration(address _user ,uint _index) public view returns (uint256) {
        Staker storage array = stakerArray[_user][_index];
        if(array.withdrawalTime >= block.timestamp) {
            return array.withdrawalTime - block.timestamp;
        } else {
            return 0;
        }
    }

    // ------------------ Admin ------------------ //

    // Pause Staking
    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function setParticipationCode(uint32 _newParticipationCode) public onlyOwner {
        require(participationCode != _newParticipationCode, "Same particiationCode");
        participationCode = _newParticipationCode;
    }

    function getParticipationCode() public view onlyOwner returns (uint32) {
        return participationCode;
    }

    // The total amount of token that can be staked to the contract may change
    function setTokenQuota(uint256 _newTokenQuota) public onlyOwner {
        require(_newTokenQuota > totalSupply, "Too Small Quota");
        tokenQuota = _newTokenQuota;
    }

    // Lookup function for LP token deposited by mistake (not by staking)
    function unappliedStakingToken() public view returns (uint256) {
        uint256 unappliedToken;
        uint256 balance;
        balance = stakingToken.balanceOf(address(this));
        unappliedToken = balance - totalSupply;
        return unappliedToken;
    }

    function recoverERC20(address _tokenAddress, uint256 _tokenAmount) external onlyOwner {
        IERC20(_tokenAddress).transfer(msg.sender, _tokenAmount);
        if(address(_tokenAddress) == address(stakingToken)) {
            require(unappliedStakingToken() >= _tokenAmount, "You have exceeded the withdrawable amount");
        }
        emit RecoveredERC20(_tokenAddress, _tokenAmount);
    }

    function recoverERC721(address _tokenAddress, uint256 _tokenId) external onlyOwner {
        IERC721(_tokenAddress).safeTransferFrom(address(this), msg.sender, _tokenId);
        emit RecoveredERC721(_tokenAddress, _tokenId);
    }

    function removeByIndex(uint i, Staker[] storage _array) private {
        while (i < _array.length - 1) {
            _array[i] = _array[i + 1];
            i++;
        }
        _array.pop();
    }

    // ------------------ EVENTS ------------------ //

    event Staked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event RewardPaid(address indexed user, uint256 reward);
    event RecoveredERC20(address token, uint256 amount);
    event RecoveredERC721(address token, uint256 tokenId);
}
