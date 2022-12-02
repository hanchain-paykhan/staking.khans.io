// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract SheepooriStaking is Ownable, ERC721Holder, ReentrancyGuard, Pausable {
    IERC721 public stakingToken; // Sheepoori
    IERC20 public rewardToken; // Han

    constructor(address _stakingToken, address _rewardToken) onlyOwner {
        stakingToken = IERC721(_stakingToken);
        rewardToken = IERC20(_rewardToken);
    }

    struct Staker {
        uint256[] tokenIds; // Stacked token ID
        uint256 totalReward; // The total amount of HAN Token received as reward
        uint256 unclaimedRewards; // The accumulated amount of HAN token before "CLAIM"
        uint256 amountStaked; // The amount of tokenId staked
        uint256 timeOfLastUpdate; // Last updated time by token ID
    }

    uint256 public constant rewardTokenPerstakingToken = 1157407407407; // Quantity of HAN tokens rewarded per LP token
    uint256 public totalSupply; // Total amount of tokenId staked
    uint256 public rewardsDuration = 31536000; // The total amount of HAN token available for reward = rewardTokenPerstakingToken * rewardsDuration
    // 36500000000000000001
    mapping(uint256 => address) public tokenOwner; // Return owner address when token ID is entered
    mapping(address => Staker) public stakers;

    // ------------------ Admin ------------------ //

    // Staking pause
    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function setRewardsDuration(uint256 _newDuration) public onlyOwner {
        rewardsDuration = _newDuration;
    }

    // Blunder staking token lookup function of contract
    function unappliedStakingToken() public view returns (uint256) {
        uint256 unappliedToken;
        uint256 balance = stakingToken.balanceOf(address(this));
        unappliedToken = balance - totalSupply;
        return unappliedToken;
    }

    // LP Token Transfer Function of Contract
    function transferStakingToken(uint256 _tokenId) public onlyOwner {
        require(
            tokenOwner[_tokenId] == address(0),
            "The owner of NFT tokenID must not exist"
        ); // 확인
        stakingToken.safeTransferFrom(address(this), msg.sender, _tokenId);
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

    // ------------------ Transaction Function ------------------ //

    // "STAKE" function
    function stake(uint256 _tokenId) public nonReentrant whenNotPaused {
        require(
            stakingToken.ownerOf(_tokenId) == msg.sender,
            "user must be the owner of the token"
        );
        require(rewardToken.balanceOf(address(this)) > 0, "Reward Token 0");
        require(
            rewardToken.balanceOf(address(this)) -
                rewardsDuration *
                (totalSupply * rewardTokenPerstakingToken) >
                rewardsDuration * rewardTokenPerstakingToken,
            "Total amount of rewards is too high"
        );
        Staker storage staker = stakers[msg.sender];
        if (staker.amountStaked == 0) {
            staker.timeOfLastUpdate = block.timestamp;
            tokenOwner[_tokenId] = msg.sender;
            staker.amountStaked += 1;
            totalSupply += 1;
            staker.tokenIds.push(_tokenId);
            stakingToken.safeTransferFrom(msg.sender, address(this), _tokenId);
            emit Staked(msg.sender, _tokenId);
        } else {
            staker.unclaimedRewards += calculateRewards(msg.sender);
            staker.timeOfLastUpdate = block.timestamp;
            tokenOwner[_tokenId] = msg.sender;
            staker.amountStaked += 1;
            totalSupply += 1;
            staker.tokenIds.push(_tokenId);
            stakingToken.safeTransferFrom(msg.sender, address(this), _tokenId);
            emit Staked(msg.sender, _tokenId);
        }
    }

    // "UNSTAKE" function
    function unstake(uint256 _tokenId) public nonReentrant {
        Staker storage staker = stakers[msg.sender];
        require(
            tokenOwner[_tokenId] == msg.sender,
            "user must be the owner of the token"
        );
        staker.unclaimedRewards += calculateRewards(msg.sender);
        staker.timeOfLastUpdate = block.timestamp;
        tokenOwner[_tokenId] = address(0);
        staker.amountStaked--;
        totalSupply--;
        removeByValue(_tokenId, staker.tokenIds);
        stakingToken.safeTransferFrom(address(this), msg.sender, _tokenId);
        emit Unstaked(msg.sender, _tokenId);
    }

    // "CLAIM" function
    function claimReward() public nonReentrant {
        Staker storage staker = stakers[msg.sender];
        uint256 rewards = calculateRewards(msg.sender) +
            staker.unclaimedRewards;
        require(rewards > 0, "You have no rewards to claim");
        require(
            block.timestamp - uint256(staker.timeOfLastUpdate) != 0,
            "Too Early"
        );
        require(
            rewards < rewardToken.balanceOf(address(this)),
            "Not enough tokens"
        );
        staker.totalReward += rewards;
        staker.timeOfLastUpdate = block.timestamp;
        staker.unclaimedRewards = 0;
        rewardToken.transfer(msg.sender, rewards);
        emit RewardPaid(msg.sender, rewards);
    }

    // ------------------ View Function ------------------ //
    function amountRewards() public view returns (uint256) {
        Staker storage staker = stakers[msg.sender];
        uint256 reward;
        reward = staker.amountStaked * rewardTokenPerstakingToken;
        return reward;
    }

    function getStakedTokenIds(address _user)
        public
        view
        returns (uint256[] memory tokenIds)
    {
        return stakers[_user].tokenIds;
    }

    // The total amount of HAN Token received as reward
    function getTotalReward(address _user) public view returns (uint256) {
        return stakers[_user].totalReward;
    }

    // The accumulated amount of HAN token before "CLAIM"
    function getUnclaimedRewards(address _user) public view returns (uint256) {
        return stakers[_user].unclaimedRewards;
    }

    // The amount of tokenId staked
    function getAmountStaked(address _user) public view returns (uint256) {
        return stakers[_user].amountStaked;
    }

    // Last updated time by token ID
    function getTimeOfLastUpdate(address _user) public view returns (uint256) {
        return stakers[_user].timeOfLastUpdate;
    }

    // ------------------ Private Function ------------------ //

    // Reward amount check function
    function calculateRewards(address _user) private view returns (uint256) {
        Staker storage staker = stakers[_user];
        uint256 reward;
        uint256 stakedTime = block.timestamp - staker.timeOfLastUpdate;
        reward =
            stakedTime *
            (staker.amountStaked * rewardTokenPerstakingToken);
        return reward;
    }

    function find(uint256 value, uint256[] storage tokenIds)
        private
        view
        returns (uint256)
    {
        uint256 i = 0;
        while (tokenIds[i] != value) {
            i++;
        }
        return i;
    }

    function removeByValue(uint256 value, uint256[] storage tokenIds) private {
        uint256 i = find(value, tokenIds);
        removeByIndex(i, tokenIds);
    }

    function removeByIndex(uint256 i, uint256[] storage tokenIds) private {
        while (i < tokenIds.length - 1) {
            tokenIds[i] = tokenIds[i + 1];
            i++;
        }
        tokenIds.pop();
    }

    // ------------------ Event ------------------ //

    event Unstaked(address owner, uint256 tokenId);
    event Staked(address owner, uint256 tokenId);
    event RewardPaid(address indexed user, uint256 reward);
    event RecoveredERC20(address token, uint256 amount);
    event RecoveredERC721(address token, uint256 tokenId);
}
