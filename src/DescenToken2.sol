// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

contract DescenToken is ERC20Burnable, Ownable, ReentrancyGuard, Pausable {
    uint256 public pricePerToken; // Preço do token em wei (0.0005 MATIC)
    uint256 public totalTokensSold; // Total de tokens vendidos

    // Evento para compras de tokens
    event TokensPurchased(
        address indexed buyer,
        uint256 amount, // Quantidade de tokens comprados
        uint256 cost,   // Custo total em wei
        address paymentMethod // Pagamento: MATIC (endereço nativo)
    );

    // Evento para transferências customizadas
    event CustomTransfer(
        address from,
        address receiver,
        uint256 amount,
        string message,
        uint256 timestamp,
        string keyword
    );

    // Estrutura de dados para armazenar transferências
    struct TransferStruct {
        address sender;
        address receiver;
        uint256 amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    TransferStruct[] public transactions; // Histórico de transferências

    constructor() ERC20("DEFLATOR", "DFR") Ownable(msg.sender) {
        // Inicializa o contrato com 1 milhão de tokens
        _mint(address(this), 1_000_000 * 10**decimals());
        // Define o preço inicial: 0.0005 MATIC em wei
        pricePerToken = 500000000000000; // 0.0005 MATIC em wei
    }

    // Função para comprar tokens com MATIC
    function buy() external payable nonReentrant whenNotPaused {
    require(msg.value > 0, "MATIC value must be greater than zero");

    // Calcula a quantidade de tokens com base no valor enviado
    uint256 amountToBuy = msg.value / pricePerToken;
    require(amountToBuy > 0, "Insufficient MATIC sent for any tokens");
    require(balanceOf(address(this)) >= amountToBuy, "Not enough tokens available");

    // Transfere os tokens para o comprador
    _transfer(address(this), msg.sender, amountToBuy);
    totalTokensSold += amountToBuy;

    // Emite o evento de compra
    emit TokensPurchased(msg.sender, amountToBuy, msg.value, address(0));
}
    // Função para realizar transferências com mensagem personalizada
    function transferWithMessage(
        address receiver,
        uint256 amount,
        string memory message,
        string memory keyword
    ) external whenNotPaused {
        require(receiver != address(0), "Invalid receiver address");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");

        // Executa a transferência
        _transfer(msg.sender, receiver, amount);

        // Registra a transferência
        TransferStruct memory newTransfer = TransferStruct({
            sender: msg.sender,
            receiver: receiver,
            amount: amount,
            message: message,
            timestamp: block.timestamp,
            keyword: keyword
        });

        transactions.push(newTransfer);

        // Emite o evento de transferência
        emit CustomTransfer(msg.sender, receiver, amount, message, block.timestamp, keyword);
    }

    // Atualizar o preço por token (em wei)
    function updatePrice(uint256 newPrice) external onlyOwner {
        require(newPrice > 0, "Price must be greater than zero");
        pricePerToken = newPrice;
    }

    // Pausar ou despausar o contrato
    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    // Retirada de MATIC pelo proprietário
    function withdrawETH() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No ETH available to withdraw");
        payable(owner()).transfer(balance);
    }

    // Função para obter todas as transferências (opcional)
    function getAllTransfers() external view returns (TransferStruct[] memory) {
        return transactions;
    }
}

