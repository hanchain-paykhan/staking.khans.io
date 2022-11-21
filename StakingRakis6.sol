// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract StakingRakis6 is ReentrancyGuard, Ownable, Pausable {

    IERC20 public stakingToken; // rakis-6
    IERC20 public rewardToken;  // Han

    constructor(address _stakingToken, address _rewardToken) onlyOwner {
        stakingToken = IERC20(_stakingToken);
        rewardToken = IERC20(_rewardToken);
    }
    
    uint public constant hanTokenPerLpToken = 274959775134; // HanToken quantity per LP token

    uint public totalSupply;    // Total amount of tokens staked
    uint public tokenVolume = 10000 ether;   // Amount of tokens that the user can stake in the contract
    uint public rewardsDuration = 365 days;

    mapping(address => uint) public getAmount;  // Amount of tokens staked
    mapping(address => uint) public getStakingStartTime;    // Time Staking Started
    mapping(address => uint) public getRewardReleased;  // The total amount of Han Token received as a reward
    mapping(address => uint) public getBalance;     // Han Token is piled up before making a claim

    /* ==================== Admin ==================== */

    // Staking pause
    function pause() public onlyOwner {
        _pause();
    }
    function unpause() public onlyOwner {
        _unpause();
    }

    function setRewardsDuration(uint _newDuration) public onlyOwner {
        rewardsDuration = _newDuration;
    }

    // Token amount modification function that can be staked into a contract
    function setTokenVolume(uint _newVolume) public onlyOwner {
        require(_newVolume > totalSupply, "Too Small Volume");
        tokenVolume = _newVolume;
    }

    // LP Token lookup function of contract
    function stakingTokenBalance() public view returns (uint) {
        uint balance;
        balance = stakingToken.balanceOf(address(this));
        return balance;
    }
    // Blunder staking token lookup function of contract
    function unappliedStakingToken() public view returns (uint) {
        uint unappliedToken;
        unappliedToken = stakingTokenBalance() - totalSupply;
        return unappliedToken;
    }

    // LP Token Transfer Function of Contract
    function transferStakingToken(uint _amount) public onlyOwner {
        require(unappliedStakingToken() >= _amount, "Exceeded Unapplied Token Amount");
        stakingToken.transfer(msg.sender ,_amount);
    }


    function recoverERC20(address _tokenAddress, uint _tokenAmount) external onlyOwner {
        require(_tokenAddress != address(stakingToken), "Cannot withdraw the staking token");
        IERC20(_tokenAddress).transfer(msg.sender, _tokenAmount);
        emit RecoveredERC20(_tokenAddress, _tokenAmount);
    }

    function recoverERC721(address _tokenAddress, uint _tokenId) external onlyOwner {
        require(_tokenAddress != address(stakingToken), "Cannot withdraw the staking token");
        IERC721(_tokenAddress).safeTransferFrom(address(this), msg.sender, _tokenId);
        emit RecoveredERC721(_tokenAddress, _tokenId);
    }

    /* ==================== Staking Function ==================== */

    // Staking function
    function stake(uint amount) public nonReentrant whenNotPaused {
        require(amount > 0, "Cannot stake 0");
        require(stakingToken.balanceOf(msg.sender) != 0, "Do Not Have Token");
        require((amount + totalSupply) <= tokenVolume, "Too Many Token");
        require(totalSupply < tokenVolume, "Already Token Full");
        require(rewardToken.balanceOf(address(this)) > 0, "Reward Token 0");
        require(rewardToken.balanceOf(address(this)) - ((rewardsDuration * (totalSupply * hanTokenPerLpToken) / 10**18)) > rewardsDuration * ((amount * hanTokenPerLpToken) / 10**18), "Total amount of rewards is too high");
        if(getAmount[msg.sender] > 0) {
            totalSupply += amount;
            uint stakedTime = (block.timestamp - uint(getStakingStartTime[msg.sender]));
            getBalance[msg.sender] += stakedTime * ((getAmount[msg.sender] * hanTokenPerLpToken) / 10**18);
            stakingToken.transferFrom(msg.sender ,address(this), amount);
            getAmount[msg.sender] += amount;
            getStakingStartTime[msg.sender] = block.timestamp;
            emit Staked(msg.sender, amount);
        }
        else{
            totalSupply += amount;
            stakingToken.transferFrom(msg.sender ,address(this), amount);
            getAmount[msg.sender] += amount;
            getStakingStartTime[msg.sender] = block.timestamp;
            emit Staked(msg.sender, amount);
        }
    }

    // withdrawal function
    function withdraw(uint256 amount) public nonReentrant {
        require(amount > 0, "Cannot withdraw 0");
        require(getAmount[msg.sender] >= amount, "Insufficient Balance");
        totalSupply -= amount;
        uint stakedTime = (block.timestamp - uint(getStakingStartTime[msg.sender]));
        getBalance[msg.sender] += stakedTime * ((getAmount[msg.sender] * hanTokenPerLpToken) / 10**18);
        getAmount[msg.sender] -= amount;
        getStakingStartTime[msg.sender] = block.timestamp;
        stakingToken.transfer(msg.sender, amount);
        emit Withdrawn(msg.sender, amount);
    }

    // Compensation claim function
    function claimReward(address _user) public nonReentrant {
        require(block.timestamp - uint(getStakingStartTime[_user]) != 0, "Too Early");
        require(getBalance[_user] < rewardToken.balanceOf(address(this)), "Short Reward");
        uint stakedTime = (block.timestamp - uint(getStakingStartTime[_user]));
        getBalance[_user] += stakedTime * ((getAmount[msg.sender] * hanTokenPerLpToken) / 10**18);
        rewardToken.transfer(_user ,getBalance[_user]);
        getRewardReleased[_user] += getBalance[_user];
        emit RewardPaid(_user, getBalance[_user]);
        getBalance[_user] = 0;
        getStakingStartTime[_user] = block.timestamp;
    }

    // Compensation lookup function
    function updateReward() public view returns (uint) {
        uint value;
        value += ((getAmount[msg.sender] * hanTokenPerLpToken) / 10**18);
        return value;
    }

    // Staked time lookup function
    function stakingTimeData() public view returns (uint) {
        if(getAmount[msg.sender] == 0) {
            return block.timestamp;
        }else {
            uint stakedTime;
            stakedTime = (block.timestamp - uint(getStakingStartTime[msg.sender]));
            return stakedTime;
        }
    }

    /* ==================== EVENTS ==================== */

    event Staked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event RewardPaid(address indexed user, uint256 reward);
    event RecoveredERC20(address token, uint256 amount);
    event RecoveredERC721(address token, uint256 tokenId);
}
