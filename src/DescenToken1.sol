// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DescenToken is ERC20, Ownable {
    uint256 public constant INITIAL_PRICE = 500000000000000; // 0.0005 MATIC em wei (18 casas decimais)
    uint256 public pricePerToken = INITIAL_PRICE;
    uint256 public totalTokensSold;
    uint256 public immutable totalSupplyCap = 100000 * 10 ** decimals(); // Limite de 100.000 tokens
    address public treasuryWallet;
    uint256 public walletPercentage = 5; // 5% das vendas vão para a wallet especificada

    uint256 public transactionCount;

    struct TransferStruct {
        address sender;
        address receiver;
        uint256 amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    TransferStruct[] transactions;

    event Transfer(address indexed from, address indexed receiver, uint256 amount, string message, uint256 timestamp, string keyword);
    event TokensPurchased(address indexed buyer, uint256 amount, uint256 price);
    event Withdrawal(address indexed to, uint256 amount);

    // Ajuste no construtor
    constructor(address _treasuryWallet) ERC20("DescenToken", "DSC") Ownable(msg.sender) {
        require(_treasuryWallet != address(0), "Treasury wallet cannot be zero address");
        treasuryWallet = _treasuryWallet;

        // Mint the total supply cap to the contract itself for sale
        _mint(address(this), totalSupplyCap);
    }

    function buy(uint256 amount, string memory message, string memory keyword) external payable {
        require(amount > 0, "Amount must be greater than zero");
        require(totalTokensSold + amount <= totalSupplyCap, "Not enough tokens left for sale");

        uint256 cost = pricePerToken * amount;
        require(msg.value >= cost, "Insufficient MATIC sent");

        // Transfer tokens to the buyer
        _transfer(address(this), msg.sender, amount);
        totalTokensSold += amount;

        // Register transaction details
        transactionCount += 1;
        transactions.push(TransferStruct(msg.sender, address(this), amount, message, block.timestamp, keyword));
        emit Transfer(msg.sender, address(this), amount, message, block.timestamp, keyword);

        // Calculate treasury wallet share
        uint256 walletShare = (msg.value * walletPercentage) / 100;
        (bool sentToWallet, ) = payable(treasuryWallet).call{value: walletShare}("");
        require(sentToWallet, "Failed to send to treasury wallet");

        // Adjust price every time 5% of total supply is sold
        if ((totalTokensSold * 100) / totalSupplyCap >= (totalTokensSold / (totalSupplyCap / 20) * 5)) {
            pricePerToken = (pricePerToken * 105) / 100; // Increase by 5%
        }

        emit TokensPurchased(msg.sender, amount, pricePerToken);
    }

    function addToBlockchain(address payable receiver, uint256 amount, string memory message, string memory keyword) public {
        transactionCount += 1;
        transactions.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp, keyword));
        emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);
    }

    function getAllTransactions() public view returns (TransferStruct[] memory) {
        return transactions;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds available for withdrawal");

        (bool sent, ) = payable(owner()).call{value: balance}("");
        require(sent, "Failed to withdraw balance");

        emit Withdrawal(owner(), balance);
    }

    // Function to update the treasury wallet address (only owner)
    function setTreasuryWallet(address _treasuryWallet) external onlyOwner {
        require(_treasuryWallet != address(0), "Invalid treasury wallet address");
        treasuryWallet = _treasuryWallet;
    }

    receive() external payable {} // Fallback to receive MATIC directly
}
