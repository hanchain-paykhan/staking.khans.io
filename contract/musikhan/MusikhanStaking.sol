// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

import "../Musikhan.sol";
import "../IMusikhan.sol";

contract MusikhanStaking is ReentrancyGuard, Ownable, Pausable {
    IERC20 private rewardToken;
    Musikhan private musikhan;

    constructor(address _rewardToken, address _musikhan) onlyOwner {
        rewardToken = IERC20(_rewardToken);
        musikhan = Musikhan(_musikhan);
    }

    uint public constant hanTokenPerLpToken = 2314814815;
    uint public  tokenQuota = 5000000 ether;
    uint public  rewardsDuration = 365 days;

    bool private check;
    uint public totalSupply;

    struct Staker {
        string name;
        string symbol;
        address l2Ca;
        uint amountStaked;
        uint claimedReward;
        uint timeOfLastUpdate;
        uint unclaimedRewards;
    }

    mapping(address => mapping(address => Staker)) public stakers;
    mapping(address => uint) public totalReward;

    mapping(address => address[]) private stakedTokenList;
    mapping(address => address[]) private canClaimedTokenList;

    mapping(address => address[]) private stakerAddressList;
    mapping(address => mapping(address => uint)) private stakerAmount;

    function getStakedTokenList(address _user) public view returns(address[] memory) {
        return stakedTokenList[_user];
    }

    function getCanClaimedTokenList(address _user) public view returns(address[] memory) {
        return canClaimedTokenList[_user];
    }

    function getStakerAddressList(address _tokenAddress) public view returns(address[] memory) {
        return stakerAddressList[_tokenAddress];
    }

    function getStakerAmount(address _l2Ca, address _user) public view returns (uint) {
        return stakerAmount[_l2Ca][_user];
    }

    function getStaker(address _l2Ca, address _user) public view returns(Staker memory) {
        return stakers[_l2Ca][_user];
    }

    function setRewardsDuration(uint _newDuration) public onlyOwner {
        rewardsDuration = _newDuration;
    }

    function setTokenQuota(uint _newQuota) public onlyOwner {
        require(_newQuota > totalSupply, "Too Small Quota");
        tokenQuota = _newQuota;
    }

    function stake(address _l2Ca, uint _amount) public nonReentrant whenNotPaused {
        require(rewardToken.balanceOf(address(this)) - ((rewardsDuration * (totalSupply * hanTokenPerLpToken) / 10**18)) > rewardsDuration * ((_amount * hanTokenPerLpToken) / 10**18), "Total amount of rewards is too high");
        require((_amount + totalSupply) <= tokenQuota, "Too Many Token");
        Staker storage staker = stakers[_l2Ca][msg.sender];
        validationCheck(_l2Ca);
        addStakedTokenList(_l2Ca);
        addCanClaimedTokenList(_l2Ca);
        addStakerAddressList(_l2Ca);
        stakerAmount[_l2Ca][msg.sender] += _amount;
        totalSupply += _amount;
        if(staker.amountStaked > 0) {
            uint stakedTime = block.timestamp - staker.timeOfLastUpdate;
            staker.unclaimedRewards += stakedTime * ((staker.amountStaked * hanTokenPerLpToken) / 10**18);
            _stake(_l2Ca, _amount);
        } else{
            _stake(_l2Ca, _amount);
        }
    }

    function _stake(address _l2Ca, uint _amount) internal {
        IMusikhan stakingToken = IMusikhan(_l2Ca);
        Staker storage staker = stakers[_l2Ca][msg.sender];
        stakingToken.transferFrom(msg.sender ,address(this), _amount);
        staker.timeOfLastUpdate = block.timestamp;
        staker.amountStaked += _amount;
        staker.name = stakingToken.name();
        staker.symbol = stakingToken.symbol();
        staker.l2Ca = _l2Ca;
        emit Staked(_l2Ca, msg.sender, _amount);
    }

    function withdraw(address _l2Ca,uint256 _amount) public nonReentrant {
        IMusikhan stakingToken = IMusikhan(_l2Ca);
        Staker storage staker = stakers[_l2Ca][msg.sender];
        require(staker.amountStaked >= _amount, "Insufficient Balance");
        totalSupply -= _amount;
        uint stakedTime = block.timestamp - staker.timeOfLastUpdate;
        staker.unclaimedRewards += stakedTime * ((staker.amountStaked * hanTokenPerLpToken) / 10**18);
        staker.amountStaked -= _amount;
        staker.timeOfLastUpdate = block.timestamp;
        stakingToken.transfer(msg.sender, _amount);
        stakerAmount[_l2Ca][msg.sender] -= _amount;
        emit Withdrawn(_l2Ca, msg.sender, _amount);
        if(staker.amountStaked == 0) {
            removeByValue(_l2Ca, stakedTokenList[msg.sender]);
            removeByValue(msg.sender, stakerAddressList[_l2Ca]);
        }
        if(staker.amountStaked == 0 && staker.unclaimedRewards == 0) {
            removeByValue(_l2Ca, canClaimedTokenList[msg.sender]);
        }
    }

    function claimReward(address _l2Ca) public nonReentrant {
        Staker storage staker = stakers[_l2Ca][msg.sender];
        require(block.timestamp - staker.timeOfLastUpdate != 0, "Too Early");
        require(staker.unclaimedRewards < rewardToken.balanceOf(address(this)), "Short Reward");
        uint stakedTime = block.timestamp - staker.timeOfLastUpdate;
        staker.unclaimedRewards += stakedTime * ((staker.amountStaked * hanTokenPerLpToken) / 10**18);
        rewardToken.transfer(msg.sender ,staker.unclaimedRewards);
        staker.claimedReward += staker.unclaimedRewards;
        totalReward[msg.sender] += staker.unclaimedRewards;
        emit RewardPaid(_l2Ca, msg.sender, staker.unclaimedRewards);
        staker.unclaimedRewards = 0;
        staker.timeOfLastUpdate = block.timestamp;
        if(staker.amountStaked == 0 && staker.unclaimedRewards == 0) {
            removeByValue(_l2Ca, canClaimedTokenList[msg.sender]);
        }
    }

    function validationCheck(address _tokenAddress) internal {
        checkAddress(_tokenAddress, musikhan.getL2TokenList());
        if(check == false) {
            revert("Not our token");
        }
        check = false;
    }

    function addStakedTokenList(address _tokenAddress) internal {
        checkAddress(_tokenAddress, stakedTokenList[msg.sender]);
        if(check == false) {
            stakedTokenList[msg.sender].push(_tokenAddress);
        }
        check = false;
    }

    function addCanClaimedTokenList(address _tokenAddress) internal {
        checkAddress(_tokenAddress, canClaimedTokenList[msg.sender]);
        if(check == false) {
            canClaimedTokenList[msg.sender].push(_tokenAddress);
        }
        check = false;
    }

    function addStakerAddressList(address _tokenAddress) internal {
        checkAddress(msg.sender, stakerAddressList[_tokenAddress]);
        if(check == false) {
            stakerAddressList[_tokenAddress].push(msg.sender);
        }
        check = false;
    }

    function checkAddress(address _address, address[] memory _tokenList) internal {
        for(uint i = 0; i < _tokenList.length; i++) {
            if(_tokenList[i] == _address) {
                check = true;
            }
        }

    }

    function find(address _value, address[] storage _tokenList) private view returns (uint) {
        uint i = 0;
        while (_tokenList[i] != _value) {
            i++;
        }
        return i;
    }

    function removeByIndex(uint i, address[] storage _tokenList) private {
        while (i < _tokenList.length - 1) {
            _tokenList[i] = _tokenList[i + 1];
            i++;
        }
        _tokenList.pop();
    }

    function removeByValue(address _value, address[] storage _tokenList) private {
        uint i = find(_value, _tokenList);
        removeByIndex(i, _tokenList);
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

    // ------------------ EVENTS ------------------ //

    event Staked(address indexed tokenAddress, address indexed user, uint256 amount);
    event Withdrawn(address indexed tokenAddress, address indexed user, uint256 amount);
    event RewardPaid(address indexed tokenAddress, address indexed user, uint256 amount);
    event RecoveredERC20(address token, uint256 amount);
    event RecoveredERC721(address token, uint256 tokenId);
}
