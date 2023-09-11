// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/*
    1. Users and owners need to pre-arrange the tokens they want to swap (e.g., HAN/WETH, HANeP/USDC ...)
    2. The owner updates the agreed amount
    3. The owner grants permission to the user's wallet
    4. The owner transfers the amount of tokens the user wants to swap to the contract
    5. The user approves the token amount specified by the owner and executes the swap function
    6. The owner receives the tokens sent to the contract by the user through withdraw
 */

contract TokenSwap is Ownable {

    IERC20 public token0;   // The first token object (tokens to be transferred by the owner)
    IERC20 public token1;   // The second token object (tokens to be transferred by the user)

    constructor(address _token0, address _token1) {
        token0 = IERC20(_token0);
        token1 = IERC20(_token1);
    }

    mapping(address => bool) public swappableUsers;     // List of users who can swap
    mapping(address => uint256) public swapTokenAmount; // Swap available token amount for each token address

    // Function to change the tokens
    function setToken(address _token0, address _token1) public onlyOwner {
        // Can set new tokens only if swap amount is 0, if user has not received the swap then execution denied
        require(swapTokenAmount[address(token0)] == 0, "Tokens left");
        token0 = IERC20(_token0);
        token1 = IERC20(_token1);
    }

    // Function to set the token swap amount
    function setSwapTokenAmount(uint256 _token0, uint256 _token1) public onlyOwner {
        // Cannot set 0 as the swap amount, if user has not received the swap then execution denied
        require(_token0 != 0 && _token1 != 0, "0 cannot be entered");
        swapTokenAmount[address(token0)] = _token0;
        swapTokenAmount[address(token1)] = _token1;
    }

    // Adding user to the list of users who can swap
    function authorization(address _user) public onlyOwner {
        swappableUsers[_user] = true;
    }

    function swap() public {
        // Function called when user wants to swap token1
        require(token1.transferFrom(msg.sender, address(this), swapTokenAmount[address(token1)]), "transfer failed");
        require(swappableUsers[msg.sender] == true, "You do not have permission");
        token0.transfer(msg.sender, swapTokenAmount[address(token0)]);  // Transferring token0 to user
        swappableUsers[msg.sender] = false;         // Removing user from the swappable list
        delete swapTokenAmount[address(token0)];    // Deleting the swap amount for token0
    }

    function withdraw() public onlyOwner {
        // Function called when owner wants to retrieve token1, only possible after user executed the swap
        require(swapTokenAmount[address(token1)] != 0, "No token balance");
        token1.transfer(msg.sender, swapTokenAmount[address(token1)]);  // Transferring token1 to owner
        delete swapTokenAmount[address(token1)];    // Deleting the swap amount for token1
    }
    
    // Function used to recover wrongly sent tokens
    function recoverERC20(address _tokenAddress, uint256 _tokenAmount) external onlyOwner {
        IERC20(_tokenAddress).transfer(msg.sender, _tokenAmount);
    }

}