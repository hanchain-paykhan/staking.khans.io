// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

import "./MusikhanStaking.sol";

contract MusikhanRewardV2 is ReentrancyGuard, Ownable, Pausable {
    // IERC20Metadata public constant rewardToken = IERC20Metadata(0xE947Af98dC5c2FCfcc2D2F89325812ba5d332b41);    // Token to be used for rewards (HANeP) Optimistic Goerli
    IERC20Metadata public constant rewardToken = IERC20Metadata(0xC3248A1bd9D72fa3DA6E6ba701E58CbF818354eB);    // Token to be used for rewards (HANeP) Optimistic Mainnet
    // MusikhanStaking public constant previousStakingContract = MusikhanStaking(0x9812c7624111f6CE55cC43Ab0e6a6CaC42A5F783);   // Previous version of staking contract Optimistic Goerli
    MusikhanStaking public constant previousStakingContract = MusikhanStaking(0xa8fd67f0b3380550A9aA7A260558f0c8937633f2);   // Previous version of staking contract Optimistic Mainnet

    // Staker structure - stores information about the staker
    struct Staker {
        string name;   // Name
        string symbol;   // Symbol
        uint256 amount;   // Amount staked in v1
        uint256 amountRewarded;   // Amount of reward received
        uint256 remainingReward;   // Remaining reward amount
        uint256 lastUpdateTime;   // Last update time
        uint256 stakingPeriod;   // Staking period
    }

    // Stakable token structure - stores information about tokens that can be staked
    struct TokenInfo {
        string name;
        string symbol;
        address tokenAddress;
    }

    // Structure for tokens currently being staked - stores information about the staked tokens
    struct StakedToken {
        string symbol;
        uint256 amount;
        uint256 rewardEndDate;
        address tokenAddress;
    }

    // Various mapping variables definition
    mapping (uint256 => address[]) private tokensByPeriod; // Manages the list of tokens staked for a given period using the staking period as the key
    mapping (address => address[]) private stakersByToken; // Manages the list of addresses that staked a given token, using the token address as the key
    mapping (address => address[]) private stakedTokenList; // Manages the list of tokens that a given wallet address has staked, using the wallet address as the key
    
    mapping (address => mapping (address => StakedToken)) private stakedTokens; // Manages information of staked tokens, using wallet address and token address as the key
    mapping (address => mapping (address => Staker)) public stakers; // Stores staker data using token address and wallet address as the key
    mapping (address => mapping (address => bool)) public hasStaked; // Checks the staking status using token address and wallet address as the key

    mapping (address => TokenInfo) public enabledTokens; // Manages information of stakable tokens using token address as the key
    mapping (address => uint256) public totalSupply; // Manages the total supply of a given token using token address as the key
    mapping (address => uint256) public totalRewardReleased; // Manages the total reward using wallet address as the key
    mapping (address => bool) public isTokenListed; // Checks if a given token is listed using token address as the key
    mapping (address => uint256) public tokenStakingPeriod; // Manages the staking period of a given token using token address as the key

    address[] private stakingEnabledTokenList; // List of addresses of tokens that can be staked.
    uint256 private constant weiMultiplier = 10**18; // 1 ether = 10^18 wei
    uint256 public constant rewardPerToken = 1157407407; // Amount of reward token per second

    // Function to get the list of tokens by period
    function getTokensByPeriod(uint256 _period) public view returns(address[] memory) {
        return tokensByPeriod[_period];
    }

    // Function to get the address list by token
    function getStakersByToken(address _token) public view returns(address[] memory) {
        return stakersByToken[_token];
    }

    // Function to get the current staked token list
    function getStakedTokenList(address _user) public view returns(address[] memory) {
        return stakedTokenList[_user];
    }

    // Function to get the current stakable token list
    function getStakingEnabledTokens() public view returns(address[] memory) {
        return stakingEnabledTokenList;
    }

    // Function to get the name, symbol, and address of stakable tokens
    function getEnabledTokens() public view returns(TokenInfo[] memory) {
        TokenInfo[] memory tokens = new TokenInfo[](stakingEnabledTokenList.length);
        for(uint i = 0; i < stakingEnabledTokenList.length; i++) {
            tokens[i] = enabledTokens[stakingEnabledTokenList[i]];
        }
        return tokens;
    }

    // Function to get the symbol, amount, and reward end time of staked tokens
    function getStakedTokens(address _user) public view returns(StakedToken[] memory) {
        StakedToken[] memory tokens = new StakedToken[](stakedTokenList[_user].length);
        for(uint i = 0; i < stakedTokenList[_user].length; i++) {
            tokens[i] = stakedTokens[_user][stakedTokenList[_user][i]];
        }
        return tokens;
    }

    // Admin function to add multiple tokens to the stakable list in an array format
    function addTokens(address[] memory _tokens, uint256 _period) public nonReentrant onlyOwner {

        checkTokenDuplicates(_tokens); // Check for duplicate addresses in the provided token address array

        for (uint i = 0; i < _tokens.length; i++) {  // Iterate through each token address in the provided array
            address token = _tokens[i];  // Get the token address at the current index (i)
            TokenInfo storage enabledToken = enabledTokens[token];

            // Check if the token is already in the stakingEnabledTokenList: If it's not already there, add it
            if(!isTokenExisting(token, stakingEnabledTokenList)) {
                isTokenListed[token] = true;  // Set the value to true in the isTokenListed mapping for the current token address (indicating it's added to the list)
                stakingEnabledTokenList.push(token);  // Add the current token to the stakingEnabledTokenList array
                tokenStakingPeriod[token] = _period;  // Set the staking period for the current token
                tokensByPeriod[_period].push(token);  // Add the current token to the list of tokens staked for the given period in the tokensByPeriod mapping
                enabledToken.name = IERC20Metadata(token).name();  // Set the name of the enabled token from the token's contract
                enabledToken.symbol = IERC20Metadata(token).symbol();  // Set the symbol of the enabled token from the token's contract
                enabledToken.tokenAddress = token;  // Set the token address of the enabled token
                emit AddedToken(token, _period, block.timestamp);  // Emit an event indicating a token has been added, with the current block timestamp
            }
        }
    }

    // Admin removes mistakenly added tokens from the list
    function removeTokens(address[] memory _tokens) public nonReentrant onlyOwner {
        checkTokenDuplicates(_tokens); // Check if there are duplicated addresses in the received token address array

        for(uint i = 0; i < _tokens.length; i++) {
            address token = _tokens[i];  // Get the token address at the current index (i)

            if(stakersByToken[token].length > 0) {
                revert("There are stakers in the token"); // Cannot delete a token that is being staked
            }

            uint256 period = tokenStakingPeriod[token]; // Get the staking period of the current token
            if(isTokenExisting(token, stakingEnabledTokenList)) {
                tokenStakingPeriod[token] = 0;  // Set the staking period of the current token to 0
                removeByAddress(token, tokensByPeriod[period]); // Remove the current token from the token list by period
                removeByAddress(token, stakingEnabledTokenList); // Remove the current token from the stakable token list
                isTokenListed[token] = false; // Set false value for the current token address in isTokenListed mapping (mark it as removed)
                emit RemovedToken(token, block.timestamp); // Emit a token removal event, along with the current block timestamp
            } else {
                revert("Token is not listed");
            }
        }
    }

    // Admin sets the staking period for the entered tokens
    function setTokenStakingPeriod(address[] memory _tokens, uint256 _period) public nonReentrant onlyOwner {
        checkTokenDuplicates(_tokens); // Check if there are duplicated addresses in the received token address array

        for (uint i = 0; i < _tokens.length; i++) {
            address token = _tokens[i]; // Get the token address at the current index (i)

            uint256 period = tokenStakingPeriod[token]; // Get the staking period of the current token
            if(isTokenExisting(token, tokensByPeriod[period])) { // Check if the current token is in the existing staking period
                removeByAddress(token, tokensByPeriod[period]); // Remove the current token from the token list by period
                tokensByPeriod[_period].push(token); // Add the current token to the token list of the new period
                tokenStakingPeriod[token] = _period; // Set the staking period of the current token
                emit AvailableTime(token, _period, block.timestamp); // Emit an event for the staking period change, along with the current block timestamp
            } else {
                revert("Token is not listed");
            }
        }
    }

    // User stakes a specific token
    function stake(address _token) public nonReentrant {
        Staker storage staker = stakers[_token][msg.sender]; // Reference (or create) the current caller's staking information
        StakedToken storage stakedToken = stakedTokens[msg.sender][_token]; // Reference (or create) information of the token currently being staked
        require(!hasStaked[_token][msg.sender], "Already staked"); // Duplication check: verify if the token is already staked
        require(isTokenListed[_token], "This is a non-staking token"); // Check if it's a token listed by the admin: verify if the token is eligible for staking
        require(previousStakingContract.getStakerAmount(_token, msg.sender) > 0, "No staking amount"); // Check if there are tokens staked in v1 staking contract
    
        hasStaked[_token][msg.sender] = true; // Mark that the current caller has staked this token

        // Store v1 data in v2: retrieve the caller’s staking information from the previous staking contract and store it in the current staking info
        staker.name = previousStakingContract.getStaker(_token, msg.sender).name;
        staker.symbol = previousStakingContract.getStaker(_token, msg.sender).symbol;
        staker.amount = previousStakingContract.getStakerAmount(_token, msg.sender);

        staker.stakingPeriod = tokenStakingPeriod[_token]; // Store the currently set staking period in the staker’s information
        staker.remainingReward = staker.amount * rewardPerToken * tokenStakingPeriod[_token] / weiMultiplier; // Calculate the total amount of token that can be rewarded and store it in the staker’s information
        staker.lastUpdateTime = block.timestamp; // Set the last update time to the current block time

        totalSupply[_token] += staker.amount; // Update the total supply of the staked token

        stakersByToken[_token].push(msg.sender); // Add the current caller’s address to the token-specific wallet address list
        stakedTokenList[msg.sender].push(_token); // Add the token currently being staked by the caller to the wallet-specific token list

        stakedToken.symbol = staker.symbol; // Set the name of the token currently being staked to the stakedToken struct's name
        stakedToken.amount = staker.amount; // Set the amount of the token currently being staked to the stakedToken struct's amount
        stakedToken.rewardEndDate = block.timestamp + tokenStakingPeriod[_token]; // Set the reward end time of the token currently being staked to the current block time + staking period
        stakedToken.tokenAddress = _token; // Set the address of the token currently being staked to the stakedToken struct's address

        emit Staked(_token, msg.sender, staker.amount); // Emit a staking event
    }

    // User claims reward for a specific token
    function claimReward(address _token) public nonReentrant {
        Staker storage staker = stakers[_token][msg.sender];  // Reference (or create) the current caller’s staking information
        require(staker.amount == previousStakingContract.getStakerAmount(_token, msg.sender), "Different from v1 token amount"); // Duplication check: verify if the token amount staked in v1 staking contract is the same as in the current contract
        require(staker.remainingReward != 0, "No rewards left"); // Reward token amount check: verify if there are remaining rewards

        uint256 stakedTime = block.timestamp - staker.lastUpdateTime; // Calculate the time staked: the time from the last update to now
        uint256 reward = staker.amount * stakedTime * rewardPerToken / weiMultiplier; // Calculate the reward token amount that can be claimed until now: staked amount * staking time * reward per token

        // If the calculated reward is greater than the remaining reward, limit the reward to the remaining reward
        if(reward > staker.remainingReward) {
            reward = staker.remainingReward;
        }

        staker.amountRewarded += reward;  // Add the current reward to the amount already rewarded to the user
        staker.remainingReward -= reward; // Deduct the current reward from the remaining reward
        staker.lastUpdateTime = block.timestamp;  // Update the last update time to the current block time

        totalRewardReleased[msg.sender] += reward; // Update the total amount of reward received from all Musicoin tokens: add the current reward to the total reward received by the user

        rewardToken.transfer(msg.sender, reward); // Send the reward token to the user
        emit RewardPaid(_token, msg.sender, reward); // Emit a reward payment event

        if(staker.remainingReward == 0) {
            totalSupply[_token] -= staker.amount; // Deduct the amount of token staked by the current caller from the total supply
            removeByAddress(msg.sender, stakersByToken[_token]); // Remove the current caller’s address from the token-specific wallet address list
            removeByAddress(_token, stakedTokenList[msg.sender]); // Remove the token currently being staked by the caller from the wallet-specific token list
            delete stakers[_token][msg.sender];  // If there is no remaining reward, delete the staker data
            delete stakedTokens[msg.sender][_token]; // If there is no remaining reward, delete the staking token data
            hasStaked[_token][msg.sender] = false; // Mark that the current caller has not staked this token
            emit StakerDataReset(_token, msg.sender);  // Emit a staker data reset event
        }
    }

    // Function to check how much reward a user can receive so far
    function rewardView(address _token, address _user) public view returns(uint256) {
        Staker storage staker = stakers[_token][_user];
        uint256 stakedTime = block.timestamp - staker.lastUpdateTime;
        uint256 reward = staker.amount * stakedTime * rewardPerToken / weiMultiplier;
        if(reward > staker.remainingReward) {
            reward = staker.remainingReward;
        }
        return reward;
    }

    // Function to check for duplicate tokens
    function checkTokenDuplicates(address[] memory _tokens) internal pure {
        for (uint i = 0; i < _tokens.length; i++) {
            for (uint j = 0; j < i; j++) {
                require(_tokens[j] != _tokens[i], "Duplicate tokens are not allowed");
            }
        }
    }

    // Function to check if a token exists
    function isTokenExisting(address _token, address[] storage _tokenList) internal view returns (bool) {
        for (uint i = 0; i < _tokenList.length; i++) {
            if (_tokenList[i] == _token) {
                return true;
            }
        }
        return false;
    }

    // Function to find a specific address in an array
    function find(address _address, address[] storage _array) internal view returns (uint) {
        for (uint i = 0; i < _array.length; i++) {
            if (_array[i] == _address) {
                return i;
            }      
        }
        revert("Address not found in array");
    }

    // Function to remove an address from an array using index
    function removeByIndex(uint _i, address[] storage _array) internal {
        while (_i < _array.length - 1) {
            _array[_i] = _array[_i + 1];
            _i++;
        }
        _array.pop();
    }

    // Function to remove an address from an array
    function removeByAddress(address _address, address[] storage _array) internal {
        uint i = find(_address, _array);
        removeByIndex(i, _array);
    }

    // Function that can only be called by the admin, and it pauses all functions of the contract
    function pause() external nonReentrant onlyOwner {
        _pause();
    }

    // Function that can only be called by the admin, and it reactivates all functions of the contract that were previously paused
    function unpause() external nonReentrant onlyOwner {
        _unpause();
    }

    // Function that can only be called by the admin, and it is used to recover ERC20 tokens tied to the contract
    // This function acts as a safety measure for use in emergency situations to prevent errors or abuse
    function recoverERC20(address _tokenAddress, uint256 _tokenAmount) external nonReentrant onlyOwner {
        IERC20(_tokenAddress).transfer(msg.sender, _tokenAmount);
        emit RecoveredERC20(_tokenAddress, _tokenAmount);
    }

    // Function that can only be called by the admin, and it is used to recover ERC721 tokens tied to the contract
    // This function acts as a safety measure for use in emergency situations to prevent errors or abuse
    function recoverERC721(address _tokenAddress, uint256 _tokenId) external nonReentrant onlyOwner {
        IERC721(_tokenAddress).safeTransferFrom(address(this), msg.sender, _tokenId);
        emit RecoveredERC721(_tokenAddress, _tokenId);
    }

    // ------------------ EVENTS ------------------ //

    // Event: Notifies that the staking period for a specific token has changed, takes the token address and the changed period as arguments
    event AvailableTime(address token, uint256 period, uint256 currentTime);

    // Event: Notifies that a specific token has been added to the staking list, includes the token address and the time of event occurrence
    event AddedToken(address indexed tokenAddress, uint256 period, uint256 currentTime);

    // Event: Notifies that a specific token has been removed from the staking list, includes the token address and the time of event occurrence
    event RemovedToken(address indexed tokenAddress, uint256 currentTime);

    // Event: Notifies that a user has staked a specific token, takes the token address, user address, and staking amount as arguments
    event Staked(address indexed tokenAddress, address indexed user, uint256 amount);

    // Event: Notifies that a user has received a reward for a specific token, takes the token address, user address, and reward amount as arguments
    event RewardPaid(address indexed tokenAddress, address indexed user, uint256 amount);

    // Event: Notifies that the staker's data has been reset, takes the token address and user address as arguments
    event StakerDataReset(address indexed tokenAddress, address indexed user);

    // Event: Notifies that a wrongly sent ERC20 token has been recovered, takes the recovered token's address and amount as arguments
    event RecoveredERC20(address token, uint256 amount);

    // Event: Notifies that a wrongly sent ERC721 token has been recovered, takes the recovered token's address and token ID as arguments
    event RecoveredERC721(address token, uint256 tokenId);
}
