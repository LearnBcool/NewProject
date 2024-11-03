// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract DeflatorToken {
    string public name = "DeflatorToken";
    string public symbol = "DFT";
    uint8 public decimals = 18;
    uint256 public totalSupply = 500_000_000 * (10 ** uint256(decimals)); // 500M tokens

    address public owner;
    uint256 public tokenPrice = 0.0005 ether; // Preço inicial em Amoy Testnet

    mapping(address => uint256) public balanceOf;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event BuyTokens(address indexed buyer, uint256 amountSpent, uint256 tokensBought);

    modifier onlyOwner() {
        require(msg.sender == owner, "Apenas o owner pode executar essa funcao");
        _;
    }

    constructor() {
        owner = msg.sender;
        balanceOf[owner] = totalSupply; // O owner começa com o supply total
        emit Transfer(address(0), owner, totalSupply);
    }

    // Função para comprar tokens
    function buyTokens() public payable {
        require(msg.value >= tokenPrice, "Valor insuficiente para comprar tokens");

        // Calcula a quantidade de tokens a serem comprados
        uint256 tokensToBuy = (msg.value * (10 ** uint256(decimals))) / tokenPrice;
        require(tokensToBuy <= balanceOf[owner], "Tokens insuficientes no contrato");

        // Calcula 20% dos tokens para o owner
        uint256 ownerShare = (tokensToBuy * 20) / 100;
        uint256 buyerTokens = tokensToBuy - ownerShare;

        // Transfere tokens para o comprador e o owner
        balanceOf[owner] -= tokensToBuy;
        balanceOf[msg.sender] += buyerTokens;
        balanceOf[owner] += ownerShare;

        emit Transfer(owner, msg.sender, buyerTokens);
        emit BuyTokens(msg.sender, msg.value, tokensToBuy);
    }

    // Função de retirada para o owner retirar fundos acumulados no contrato
    function withdraw() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    // Função para atualizar o preço dos tokens (apenas o owner)
    function setTokenPrice(uint256 newPrice) public onlyOwner {
        tokenPrice = newPrice;
    }
}
