// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";


contract MunieAirdrop is Ownable, Pausable {
    IERC721 public token;

    constructor(IERC721 _token) onlyOwner {
        token = _token;
    }

    mapping(uint256 => address) public tokenOwner;

    function getToken(uint256 _tokenId) public {
        require(tokenOwner[_tokenId] == token.ownerOf(_tokenId), "already received a token");
        require(tokenOwner[_tokenId] == msg.sender, "It's not my token");
        token.transferFrom(address(this), msg.sender, _tokenId);
        emit GetToken(msg.sender, _tokenId);
    }

    function setTokenOwner(address _owner, uint256 _tokenId) public onlyOwner {
        tokenOwner[_tokenId] = _owner;
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
        IERC721(_tokenAddress).safeTransferFrom(address(this), msg.sender, _tokenId);
        emit RecoveredERC721(_tokenAddress, _tokenId);
    }

    event GetToken(address user, uint256 tokenId);
    event RecoveredERC20(address token, uint256 amount);
    event RecoveredERC721(address token, uint256 tokenId);
}
