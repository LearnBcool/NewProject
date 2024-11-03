// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract QUANTUM is ERC20, Ownable, ERC20Permit {

    uint256 public constant MAX_SUPPLY = 1000000 * 10 ** 18;
    uint256 public tokensSold;
    uint256 public price;
    address public initialHolder;
    bool public isFinalized; // retire finalized

    event TokensPurchased(address indexed buyer, uint256 amount);
    event PriceUpdated(uint256 newPrice);
    event ContractFinalized();
    event Withdrawal(address indexed owner, uint256 amount);

    constructor(address initialOwner) 
        ERC20("QUANTUM", "LEAP")
        Ownable(initialOwner)
        ERC20Permit("QUANTUM")
    {
        initialHolder = initialOwner;
        _mint(initialHolder, 100000 * 10 ** 18);
        price = 0.00005 ether; // Preço inicial
        isFinalized = false; // retire
    }
    
    function getTokensSold() public view returns (uint256) {
        return tokensSold;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        require(!isFinalized, "Contract is finalized."); /// loop infinity
        require(totalSupply() + amount <= MAX_SUPPLY, "Minting would exceed max supply.");
        _mint(to, amount);
        tokensSold += amount;
        updatePrice();
    }

    function updatePrice() internal {
        if (tokensSold % 100000 == 0 && tokensSold > 0) {
            price = price + (price * 30 / 100);
            emit PriceUpdated(price);
        }
    }

    // Função para finalizar o contrato se o supply for atingido
    function finalizeContract() external onlyOwner {
        require(tokensSold >= MAX_SUPPLY, "Tokens still available for purchase.");
        isFinalized = true;
        emit ContractFinalized();
    }

    // Função para permitir que o proprietário retire Ether
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        payable(owner()).transfer(balance);
        emit Withdrawal(owner(), balance);
    }

    // Função para ver o preço atual do token
    function getCurrentPrice() external view returns (uint256) {
        return price;
    }
}

// Every buyer and seller have exponetial gains in cryptocurrencies,
// thinking this many that people sometimes loose all money;
// some people for don't know how play this game is;
// Cryptocurrency can be fascinating and desesperate,
// because you can be a rich one day and other day powerty;

//This SmartContract have a power to reduce this gap between
//loose all money; 
// Here you go become your afraid to oportunity;
// I believe that every people think that this, to be a rich,
// is not possible and party of this not is your blame.

// Many nations have this education implemented in their minds,
// only when was children;
// Don't think more, here are the best option to change your drems to reality;

// in this moment all you need to do is Buy the token and plan for the next phase;

// infinity looping is real; 

