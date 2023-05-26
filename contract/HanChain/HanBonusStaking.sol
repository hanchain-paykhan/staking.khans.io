// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract HanBonusStaking is ReentrancyGuard, Ownable, Pausable {
    IERC20Metadata private hanToken; // HAN token

    constructor(address _token) onlyOwner {
        hanToken = IERC20Metadata(_token);
    }

    struct Staker {
        uint256 amount;
        uint256 startTime;
        uint256 withdrawalTime;
        uint256 totalRewardAmount;
    }

    mapping(address => Staker) private stakers;
    mapping(address => Staker[]) public stakerArray;
    mapping(address => uint256) public totalStakedAmount;
    mapping(address => uint256) public totalRewardReleased;

    uint256 public constant hanTokenInterest = 43189120370;
    uint256 public totalSupply; 

    // "STAKE" function
    function stake(uint256 amount) public nonReentrant whenNotPaused {
        Staker storage staker = stakers[msg.sender];
        require(amount > 0, "Cannot stake 0");
        require(rewardableAmount() > amount * hanTokenInterest * 365 days / 10**18, "Total amount of rewards is too high");
        require(hanToken.balanceOf(msg.sender) != 0, "Do not have token");
        totalSupply += amount;
        totalStakedAmount[msg.sender] += amount;
        staker.amount = amount;
        staker.startTime = block.timestamp;
        staker.withdrawalTime = block.timestamp + 365 days;
        staker.totalRewardAmount = amount * hanTokenInterest * 365 days / 10**18;
        stakerArray[msg.sender].push(staker);
        hanToken.transferFrom(msg.sender, address(this), amount);
        emit Staked(msg.sender, amount);
    }

    // "WITHDRAW" function
    function withdraw(uint256 index) public nonReentrant {
        Staker storage stakerArr = stakerArray[msg.sender][index];
        require(block.timestamp > stakerArr.withdrawalTime, "It's not the time to withdraw");
        if (stakerArr.totalRewardAmount > 0) { // Expired amounts include rewards and are transferred.
            claimReward(); 
        }
        totalSupply -= stakerArr.amount;
        totalStakedAmount[msg.sender] -= stakerArr.amount;
        hanToken.transfer(msg.sender, stakerArr.amount);
        emit Withdrawn(msg.sender, stakerArr.amount);
        removeElement(index);
    }

    // "CLAIM" function
    function claimReward() public {
        uint256 reward;
        for(uint i = 0; i < stakerArray[msg.sender].length; i++) {
            uint256 rewardValue = (block.timestamp - stakerArray[msg.sender][i].startTime) * (stakerArray[msg.sender][i].amount * hanTokenInterest / 10**18);
            if (rewardValue > stakerArray[msg.sender][i].totalRewardAmount) {
                rewardValue = stakerArray[msg.sender][i].totalRewardAmount; 
            }
            if (rewardValue > 0) {
                reward += rewardValue;
                stakerArray[msg.sender][i].totalRewardAmount -= rewardValue;
                stakerArray[msg.sender][i].startTime = block.timestamp;
            }
        }
        if (reward > 0) {
            hanToken.transfer(msg.sender, reward);
            totalRewardReleased[msg.sender] += reward;
            emit RewardPaid(msg.sender, reward);
        }
        if (reward == 0) {
            revert("There's no reward for your claim");
        }
    }

    function remainingDuration(address user, uint256 index) public view returns (uint256) {
        if(stakerArray[user][index].withdrawalTime >= block.timestamp) {
            return stakerArray[user][index].withdrawalTime - block.timestamp;
        } else {
            return 0;
        }
    }

// Current Rewardable Amount Output Function
    function rewardView(address user) public view returns(uint256) {
        uint256 reward;
        for(uint256 i = 0; i < stakerArray[user].length; i++) {
            uint256 rewardValue = (block.timestamp - stakerArray[user][i].startTime) * (stakerArray[user][i].amount * hanTokenInterest / 10**18);
            if (rewardValue > stakerArray[user][i].totalRewardAmount) {
                rewardValue = stakerArray[user][i].totalRewardAmount; // Limit the reward to totalRewardAmount
            }
            if (rewardValue > 0) {
                reward += rewardValue;
            }
        }
        return reward;
    }

    function getStakerArray(address user) public view returns(Staker[] memory) {
        return stakerArray[user];
    }

    function rewardableAmount() public view returns(uint256) {
        return hanToken.balanceOf(address(this)) - totalSupply;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function recoverERC20(address tokenAddress, uint256 tokenAmount) external onlyOwner {
        IERC20(tokenAddress).transfer(msg.sender, tokenAmount);
        emit RecoveredERC20(tokenAddress, tokenAmount);
    }

    function recoverERC721(address tokenAddress, uint256 tokenId) external onlyOwner {
        IERC721(tokenAddress).safeTransferFrom(address(this),msg.sender,tokenId);
        emit RecoveredERC721(tokenAddress, tokenId);
    }


    function removeElement(uint256 index) internal {
        require(index < stakerArray[msg.sender].length, "Invalid index");
        stakerArray[msg.sender][index] = stakerArray[msg.sender][stakerArray[msg.sender].length - 1];
        stakerArray[msg.sender].pop();
    }

    // ------------------ EVENTS ------------------ //

    event Staked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event RewardPaid(address indexed user, uint256 reward);
    event RecoveredERC20(address token, uint256 amount);
    event RecoveredERC721(address token, uint256 tokenId);
}
