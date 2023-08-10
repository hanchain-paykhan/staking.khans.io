// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract HanepBonusStaking is ReentrancyGuard, Ownable, Pausable {
    IERC20 public immutable hanToken;
    IERC20 public immutable epToken;

    constructor(address _hanToken, address _epToken) onlyOwner {
        hanToken = IERC20(_hanToken);
        epToken = IERC20(_epToken);
    }

    struct Staker {
        uint256 amount;
        uint256 startTime; 
        uint256 withdrawalTime;
        uint256 remainingEpAmount;
        uint256 hanRewardAmount;
    }

    struct Total {
        uint256 epRewardReleased;
        uint256 hanRewardReleased;
        uint256 stakedAmount;
        uint256 hanAmount;
    }

    mapping(address => Staker) private stakers;
    mapping(address => Staker[]) private stakerArray;
    mapping(address => Total) public totalData;

    mapping(address => uint256) public whitelistAmount;
    address[] private whitelistArray;

    uint256 public immutable hanTokenPerLpToken = 1268391679351;
    uint256 public immutable epTokenPerLpToken = 15854900000;

    uint256 public tokenQuota = 10000 ether;
    uint256 public totalSupply;

    function addWhitelist(address[] memory _accounts, uint256[] memory _amounts) public onlyOwner {
        require(_accounts.length == _amounts.length, "Accounts and amounts arrays must have the same length");
        for (uint i = 0; i < _accounts.length; i++) {
            address user = _accounts[i];
            uint256 amount = _amounts[i];
            // Check for duplicates within the input array
            for (uint j = 0; j < i; j++) {
                require(_accounts[j] != user, "Duplicate accounts are not allowed");
            }
            // Check if user is already in the whitelist
            bool isExisting = false;
            for (uint k = 0; k < whitelistArray.length; k++) {
                if (whitelistArray[k] == user) {
                    isExisting = true;
                    break;
                }
            }
            // If not existing, add to the whitelistArray
            if (!isExisting) {
                whitelistArray.push(user);
            }
            whitelistAmount[user] += amount; // Assuming whitelistAmount is a mapping from address to uint256
        }
    }

    // "STAKE" function
    function stake() public nonReentrant whenNotPaused {
        Staker storage staker = stakers[msg.sender];
        Total storage total = totalData[msg.sender];
        require(whitelistAmount[msg.sender] + totalSupply <= tokenQuota, "Too Many Token");
        require(epToken.balanceOf(address(this)) > whitelistAmount[msg.sender] * epTokenPerLpToken * 365 days / 10**18, "Total amount of rewards is too high");
        require(whitelistAmount[msg.sender] > 0, "Not a whitelisted user");
        uint256 amount = whitelistAmount[msg.sender];

        staker.amount = amount;
        staker.startTime = block.timestamp;
        staker.withdrawalTime = block.timestamp + 365 days;
        staker.remainingEpAmount = amount * epTokenPerLpToken * 365 days / 10**18;
        staker.hanRewardAmount = amount * hanTokenPerLpToken * 365 days / 10**18;
        total.hanAmount += staker.hanRewardAmount;

        stakerArray[msg.sender].push(staker);

        total.stakedAmount += amount;
        totalSupply += amount;
        delete whitelistAmount[msg.sender];
        removeAddress(whitelistArray, msg.sender);
        emit Staked(msg.sender, amount);
    }

    // "WITHDRAW" function
    function withdraw(uint256 _index) public nonReentrant {
        Staker storage staker = stakerArray[msg.sender][_index];
        Total storage total = totalData[msg.sender];
        require(block.timestamp > staker.withdrawalTime, "It's not the time to withdraw");
        totalSupply -= staker.amount;
        total.stakedAmount -= staker.amount;
        total.epRewardReleased += staker.remainingEpAmount;
        total.hanRewardReleased += staker.hanRewardAmount;
        total.hanAmount -= staker.hanRewardAmount;
        epToken.transfer(msg.sender, staker.amount + staker.remainingEpAmount);
        hanToken.transfer(msg.sender, staker.hanRewardAmount);
        emit Withdrawn(msg.sender, staker.amount);
        removeStaker(_index);
    }

    // "epToken CLAIM" function
    function claimReward() public {
        Total storage total = totalData[msg.sender];
        uint256 reward;
        for(uint i = 0; i < stakerArray[msg.sender].length; i++) {
            Staker storage staker = stakerArray[msg.sender][i];
            uint256 rewardValue = (block.timestamp - staker.startTime) * (staker.amount * epTokenPerLpToken) / 10**18;
            if (rewardValue > staker.remainingEpAmount) {
                rewardValue = staker.remainingEpAmount; 
            }
            if (rewardValue > 0) {
                reward += rewardValue;
                staker.remainingEpAmount -= rewardValue;
                staker.startTime = block.timestamp;
            }
        }
        if (reward > 0) {
            epToken.transfer(msg.sender, reward);
            total.epRewardReleased += reward;
            emit RewardPaid(msg.sender, reward);
        }
        if (reward == 0) {
            revert("There's no reward for your claim");
        }
    }

    // Current Rewardable Amount Output Function
    function rewardView(address _user) public view returns(uint256) {
        uint256 reward;
        for(uint i = 0; i < stakerArray[_user].length; i++) {
            Staker storage staker = stakerArray[_user][i];
            uint256 rewardValue = (block.timestamp - staker.startTime) * (staker.amount * epTokenPerLpToken) / 10**18;
            if (rewardValue > staker.remainingEpAmount) {
                rewardValue = staker.remainingEpAmount; 
            }
            if (rewardValue > 0) {
                reward += rewardValue;
            }
        }
        if (reward == 0) {
            return 0;
        }
        return reward;
    }

    function remainingDuration(address _user ,uint _index) public view returns (uint256) {
        Staker storage staker = stakerArray[_user][_index];
        if(staker.withdrawalTime > block.timestamp) {
            return staker.withdrawalTime - block.timestamp;
        } else {
            return 0;
        }
    }

    function getStakerArray(address _user) public view returns(Staker[] memory) {
        return stakerArray[_user];
    }

    function getWhitelistArray() public view returns(address[] memory) {
        return whitelistArray;
    }

    function setTokenQuota(uint256 _newTokenQuota) public onlyOwner {
        require(_newTokenQuota > totalSupply, "Too Small Quota");
        tokenQuota = _newTokenQuota;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function recoverERC20(address _tokenAddress, uint256 _tokenAmount) external onlyOwner {
        IERC20(_tokenAddress).transfer(msg.sender, _tokenAmount);
        emit RecoveredERC20(_tokenAddress, _tokenAmount);
    }

    function recoverERC721(address _tokenAddress, uint256 _tokenId) external onlyOwner {
        IERC721(_tokenAddress).safeTransferFrom(address(this),msg.sender,_tokenId);
        emit RecoveredERC721(_tokenAddress, _tokenId);
    }

    function removeStaker(uint256 _index) internal {
        require(_index < stakerArray[msg.sender].length, "Invalid index");
        stakerArray[msg.sender][_index] = stakerArray[msg.sender][stakerArray[msg.sender].length - 1];
        stakerArray[msg.sender].pop();
    }

    function removeAddress(address[] storage _array, address _address) internal {
        for (uint256 i = 0; i < _array.length; i++) {
            if (_array[i] == _address) {
                _array[i] = _array[_array.length - 1];
                _array.pop();
                break;
            }
        }
    }

    // ------------------ EVENTS ------------------ //

    event Staked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event RewardPaid(address indexed user, uint256 reward);
    event RecoveredERC20(address token, uint256 amount);
    event RecoveredERC721(address token, uint256 tokenId);
}