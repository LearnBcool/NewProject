// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenBuy is ERC20, Ownable {
    uint256 public constant maxSupply = 5000000 * 10**18;  // 5 milhões de tokens com 18 casas decimais
    uint256 public tokenPrice = 0.0005 ether;              // Preço inicial por unidade
    uint256 public constant btcDistributionDelay = 50 * 30 days; // 50 meses

    uint256 public btcAccumulatedFunds;                    // Armazena o MATIC acumulado para compra de BTC
    uint256 public deploymentTimestamp;                    // Data do deploy do contrato para calcular o tempo de 50 meses
    address public btcWallet;                              // Endereço da carteira onde o BTC será comprado

    event TokensBought(address indexed buyer, uint256 amount, uint256 price, uint256 timestamp);
    event TokensSold(address indexed seller, uint256 amount, uint256 price, uint256 timestamp);
    event BTCFundsAccumulated(uint256 amount);
    event BTCDistributed(uint256 amount);

    // Construtor atualizado para aceitar o endereço de owner e o endereço da carteira BTC
    constructor(address initialOwner, address _btcWallet) ERC20("FEITO", "FAZ") Ownable(initialOwner) {
        require(_btcWallet != address(0), "BTC wallet address cannot be zero");
        btcWallet = _btcWallet;
        deploymentTimestamp = block.timestamp;

        // Mintando todo o supply para o contrato para gerenciar as vendas de tokens
        _mint(address(this), maxSupply);
    }

    modifier onlyAfter50Months() {
        require(block.timestamp >= deploymentTimestamp + btcDistributionDelay, "BTC distribution is only available after 50 months");
        _;
    }

    function buyTokens(uint256 amount) external payable {
        uint256 totalPrice = amount * tokenPrice;
        require(msg.value >= totalPrice, "Insufficient funds to buy tokens");

        // Calcula 5% do valor da transação para acumular para compra de BTC
        uint256 btcPortion = (totalPrice * 5) / 100;
        btcAccumulatedFunds += btcPortion;
        emit BTCFundsAccumulated(btcPortion);

        // Transferência dos tokens para o comprador
        require(balanceOf(address(this)) >= amount, "Insufficient token supply");
        _transfer(address(this), msg.sender, amount);

        emit TokensBought(msg.sender, amount, tokenPrice, block.timestamp);

        // Enviar mudança de volta, se houver
        uint256 change = msg.value - totalPrice;
        if (change > 0) {
            (bool sent, ) = msg.sender.call{value: change}("");
            require(sent, "Failed to send change");
        }
    }

    function sellTokens(uint256 amount) external {
        require(balanceOf(msg.sender) >= amount, "Insufficient tokens to sell");

        // Calcula o valor de venda e 5% para BTC
        uint256 totalValue = amount * tokenPrice;
        uint256 btcPortion = (totalValue * 5) / 100;
        uint256 sellerValue = totalValue - btcPortion;

        // Acumula o valor para compra de BTC
        btcAccumulatedFunds += btcPortion;
        emit BTCFundsAccumulated(btcPortion);

        // Transfere os tokens de volta para o contrato
        _transfer(msg.sender, address(this), amount);

        // Paga o usuário em MATIC pelo valor descontado de 5%
        (bool sent, ) = msg.sender.call{value: sellerValue}("");
        require(sent, "Failed to send MATIC to seller");

        emit TokensSold(msg.sender, amount, tokenPrice, block.timestamp);
    }

    function distributeBTC() external onlyAfter50Months {
        require(btcAccumulatedFunds > 0, "No BTC funds to distribute");

        uint256 totalSupply = totalSupply();
        uint256 distributionAmount = btcAccumulatedFunds;

        for (uint256 i = 0; i < totalSupply; i++) {
            address holder = address(uint160(i));
            uint256 holderBalance = balanceOf(holder);

            if (holderBalance > 0) {
                uint256 holderShare = (distributionAmount * holderBalance) / totalSupply;

                // Envia a porção de BTC para cada holder
                (bool sent, ) = holder.call{value: holderShare}("");
                require(sent, "Failed to distribute BTC");
            }
        }

        emit BTCDistributed(distributionAmount);
        btcAccumulatedFunds = 0;  // Zera os fundos acumulados após a distribuição
    }

    function setTokenPrice(uint256 newPrice) external onlyOwner {
        tokenPrice = newPrice;
    }
}