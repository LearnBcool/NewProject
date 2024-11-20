// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

contract DescenToken is ERC20Burnable, Ownable, ReentrancyGuard, Pausable {
    uint256 public pricePerToken;
    uint256 public totalTokensSold;

    // Declaração dos endereços das criptos aceitas
    address public constant POL = 0x455e53CBB86018Ac2B8092FdCd39d8444aFFC3F6; // Substituir pelo endereço real do token POL
    address public constant ETH_BNB = address(0); // Endereço padrão para ETH e BNB (moedas nativas)

    // Lista de moedas aceitas e seus contratos ERC20
    mapping(address => bool) public acceptedTokens;

    // Registro de compras por usuário
    mapping(address => uint256) public userPurchases;

    event TokensPurchased(
        address indexed buyer,
        uint256 amount,
        uint256 price,
        address paymentToken
    );
    event PriceUpdated(uint256 oldPrice, uint256 newPrice);
    event TokensWithdrawn(address indexed owner, uint256 amount);
    event EtherWithdrawn(address indexed owner, uint256 amount);
    event TokenAccepted(address indexed token, bool status);

    /**
     * @dev Construtor do contrato.
     */
    constructor()
        ERC20("DEFLATOR", "DFR") // Nome e símbolo do token
        Ownable(msg.sender) // Passa o deployer como proprietário inicial.
    {
        // Atualiza o preço para 0.005 MATIC (0.005 * 10^18 wei)
        pricePerToken = 0.005 * 10**18; // preço de 0.005 MATIC (em wei)

        _mint(address(this), 21_000_000 * 10**decimals());

        // Configuração inicial de moedas aceitas
        acceptedTokens[ETH_BNB] = true; // ETH e BNB
        acceptedTokens[POL] = true; // POLYGON

        // Define o deployer como proprietário
        transferOwnership(msg.sender);
    }

    // Função de pausa (permitindo pausar o contrato)
    function pause() external onlyOwner {
        _pause();
    }

    // Função de despausa (permitindo retomar o contrato)
    function unpause() external onlyOwner {
        _unpause();
    }

    /**
     * @dev Compra tokens com ETH, BNB ou tokens ERC20 aceitos.
     * @param amount Quantidade de tokens a comprar.
     * @param paymentToken Endereço do token usado para pagamento (0x0 para moeda nativa).
     */
    function buy(uint256 amount, address paymentToken)
        external
        payable
        nonReentrant
        whenNotPaused
    {
        require(amount > 0, "Amount must be greater than zero");
        require(
            totalTokensSold + amount <= totalSupply(),
            "Not enough tokens left for sale"
        );
        require(acceptedTokens[paymentToken], "Payment method not accepted");

        uint256 cost = pricePerToken * amount;

        if (paymentToken == address(0)) {
            // Moeda nativa (ETH ou BNB)
            require(msg.value >= cost, "Insufficient native currency sent");
        } else {
            // Tokens ERC20
            IERC20 token = IERC20(paymentToken);
            uint256 allowance = token.allowance(msg.sender, address(this));
            require(allowance >= cost, "Insufficient token allowance");
            uint256 balance = token.balanceOf(msg.sender);
            require(balance >= cost, "Insufficient token balance");
            token.transferFrom(msg.sender, address(this), cost);
        }

        // Transferência de tokens para o comprador
        uint256 contractBalance = balanceOf(address(this));
        require(contractBalance >= amount, "Insufficient tokens in contract");
        _transfer(address(this), msg.sender, amount);

        // Atualiza contadores e logs
        totalTokensSold += amount;
        userPurchases[msg.sender] += amount;
        emit TokensPurchased(msg.sender, amount, cost, paymentToken);
    }

    // Outras funções permanecem inalteradas

    /**
     * @dev Adiciona ou remove tokens aceitos.
     * @param token O endereço do token (0x0 para moedas nativas).
     * @param status Se o token será aceito (true) ou não (false).
     */
    function updateAcceptedToken(address token, bool status)
        external
        onlyOwner
    {
        acceptedTokens[token] = status;
        emit TokenAccepted(token, status);
    }

    /**
     * @dev Atualiza o preço por token.
     * @param newPrice Novo preço por token (em USDT, será convertido para Ether).
     */
    function updatePrice(uint256 newPrice) external onlyOwner {
        require(newPrice > 0, "Price must be greater than zero");
        uint256 oldPrice = pricePerToken;
        pricePerToken = (newPrice * 10**18) / 3100; // preço em Ether
        emit PriceUpdated(oldPrice, pricePerToken);
    }

    /**
     * @dev Retira tokens remanescentes do contrato.
     * @param amount Quantidade de tokens a retirar.
     */
    function withdrawTokens(uint256 amount) external onlyOwner {
        require(amount <= balanceOf(address(this)), "Insufficient tokens");
        _transfer(address(this), msg.sender, amount);
        emit TokensWithdrawn(msg.sender, amount);
    }

    /**
     * @dev Retira ETH ou BNB acumulados no contrato.
     * @param amount Quantidade de ETH/BNB a retirar.
     */
    function withdrawEther(uint256 amount) external onlyOwner {
        require(address(this).balance >= amount, "Insufficient balance");
        payable(msg.sender).transfer(amount);
        emit EtherWithdrawn(msg.sender, amount);
    }

    /**
     * @dev Obtém o saldo de ETH/BNB do contrato.
     */
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
