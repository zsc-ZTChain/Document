// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract FoxPE is Ownable {
    using SafeERC20 for IERC20;

    struct User {
        address referrer;
        address leader;
        uint256 amount;
        uint256 reward;
        uint256 groupReward;
        bool isLeader;
        bool hasWithdraw;
    }

    IERC20 public fox;
    IERC20 public buyToken;

    uint256 public pricePer = 50 * 10**18;
    uint256 public amountPer = 100000 * 10**18;

    uint256 public totalAmount;
    uint256 public totalFunds;

    uint256 rate = 0;

    address private _burnPool = address(0x000000000000000000000000000000000000dEaD);
    address private buyTokenReceiver;

    mapping(address => User) internal users;

    constructor(IERC20 fox_, IERC20 buyToken_, address buyTokenReceiver_) {
        fox = fox_;
        buyToken = buyToken_;
        buyTokenReceiver = buyTokenReceiver_;
    }

    function updateLeaderReward(address account, uint256 reward) internal {
        address leader = users[account].leader;

        if (users[leader].isLeader && !users[leader].hasWithdraw) {
            users[leader].reward += reward;
            users[leader].groupReward += reward;
        }
    }

    function buy(address referrer, uint256 amount) external {
        require(amount > 0, "FoxPE: amount great than 1");
        require(users[msg.sender].amount + amount <= 50, "FoxPE: buy amount less than 50");
        require(totalAmount <= 5600, "FoxPE: Sold out");

        if (!users[msg.sender].isLeader && users[msg.sender].amount == 0) {
            users[msg.sender].referrer = referrer;
            if (users[referrer].leader != address(0)) {
                users[msg.sender].leader = users[referrer].leader;
            } else {
                require(users[referrer].isLeader, "FoxPE: referrer must be leader when referrer has not leader");
                users[msg.sender].leader = referrer;
            }
        }
        users[msg.sender].amount += amount;
        if (!users[msg.sender].hasWithdraw) {
            users[msg.sender].reward += amount * amountPer * 2;
        }

        buyToken.safeTransferFrom(
            address(msg.sender),
            buyTokenReceiver,
            amount * pricePer
        );
        totalAmount += amount;
        totalFunds += amount * pricePer;
        updateLeaderReward(msg.sender, amount * amountPer * 2 * 15 / 100);
    }

    function rewarded(address account) public view returns(uint256) {
        return users[account].reward * rate / 100;
    }

    function withdraw() external {
        uint256 rewardWithdraw = rewarded(msg.sender);

        safeFoxTransfer(msg.sender, rewardWithdraw);
        if (users[msg.sender].reward - rewardWithdraw > 0) {
            safeFoxTransfer(_burnPool, users[msg.sender].reward - rewardWithdraw);
        }
        users[msg.sender].reward = 0;
        users[msg.sender].groupReward = 0;
        users[msg.sender].hasWithdraw = true;
    }

    function getUser(address account) external view returns(User memory) {
        return users[account];
    }

    function setPricePer(uint256 newPrice) external onlyOwner {
        pricePer = newPrice;
    }

    function setAmountPer(uint256 newAmount) external onlyOwner {
        amountPer = newAmount;
    }

    function setBuyTokenReceiver(address newBuyTokenReceiver) external onlyOwner {
        buyTokenReceiver = newBuyTokenReceiver;
    }

    function setLeader(address leader, bool isLeader) external onlyOwner {
        users[leader].isLeader = isLeader;
    }

    function importLeaders(address[] memory leaders) external onlyOwner {
        for (uint256 i = 0; i < leaders.length; i++) {
            users[leaders[i]].isLeader = true;
        }
    }

    function setRate() external onlyOwner {
        require(rate < 100, "FoxPE: rate has the maximum");
        if (rate == 0) {
            rate = 40;
        } else {
            rate += 6;
        }
    }

    function safeFoxTransfer(address _to, uint256 _amount) internal {
        uint256 foxBal = IERC20(fox).balanceOf(address(this));
        if (_amount > foxBal) {
            fox.transfer(_to, foxBal);
        } else {
            fox.transfer(_to, _amount);
        }
    }

    function emergencyWithdraw() external onlyOwner {
        fox.transfer(msg.sender, IERC20(fox).balanceOf(address(this)));
    }
}