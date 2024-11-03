// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol"; // Proteção contra reentrância
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract QUANTUM is ERC20, ERC20Burnable, ERC20Pausable, Ownable, ERC20Permit, ReentrancyGuard {
    // Definindo as variáveis como não constantes para evitar o erro
    uint256 public constant INITIAL_SUPPLY = 50000000 * 10 ** decimals();
    uint256 public tokenPrice = 0.00005 ether;
    uint256 public totalTokensSold = 0;
    
    
    // Definindo as variáveis máximas como não constantes
    uint256 public MAX_SUPPLY;
    uint256 public PRICE_INCREMENT_STEP;
    uint256 public MAX_PRICE_INCREASE_TOKENS;

    

    constructor(address initialOwner)
        ERC20("QUANTUM", "LEAP")
        Ownable(initialOwner)
        ERC20Permit("QUANTUM")
    {
        MAX_SUPPLY = 550_000_000 * 10 ** decimals(); // Inicializa a variável
        PRICE_INCREMENT_STEP = 5_000_000 * 10 ** decimals(); // Inicializa a variável
        MAX_PRICE_INCREASE_TOKENS = 250_000_000 * 10 ** decimals(); // Inicializa a variável
        _mint(initialOwner, INITIAL_SUPPLY); // Mint initial supply for the owner

        
    }

    

    function buyTokens(uint256 amount) public payable whenNotPaused nonReentrant {
        uint256 cost = tokenPrice * amount;
        require(msg.value >= cost, "Insufficient payment");
        require(totalSupply() + amount <= MAX_SUPPLY, "Exceeds maximum supply");

        // Mint tokens to the buyer
        _mint(msg.sender, amount);
        totalTokensSold += amount;

        // Adjust token price
        uint256 increments = totalTokensSold / PRICE_INCREMENT_STEP;
        if (totalTokensSold <= MAX_PRICE_INCREASE_TOKENS && increments > 0) {
            tokenPrice = (tokenPrice * 1005 ** increments) / 1000 ** increments;
        }

        // Refund excess payment
        if (msg.value > cost) {
            payable(msg.sender).transfer(msg.value - cost);
        }
        
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    // Override for Solidity requirements
    function _update(address from, address to, uint256 value)
        internal
        override(ERC20, ERC20Pausable)
    {
        super._update(from, to, value);
    }

    // Withdraw funds collected from token sales
    function withdraw() external onlyOwner nonReentrant {
        payable(owner()).transfer(address(this).balance);
    }

}

