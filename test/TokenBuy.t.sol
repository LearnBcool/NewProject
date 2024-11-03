// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../src/TokenBuy.sol";

contract TokenBuyTest is Test {
    TokenBuy public tokenBuy;

    address public owner = address(1);
    address public user = address(2);
    address public btcWallet = address(3);

    uint256 public initialSupply = 5000000 * 10 ** 18;

    function setUp() public {
        vm.prank(owner);
        tokenBuy = new TokenBuy(owner, btcWallet);
    }

    function testInitialSupply() public {
        assertEq(tokenBuy.totalSupply(), initialSupply);
    }

    function testTokenPurchase() public {
        // Configurar o preço do token
        uint256 tokenAmount = 100 * 10 ** 18;
        uint256 totalPrice = tokenAmount * tokenBuy.tokenPrice();

        // Enviar valor em MATIC para o contrato
        vm.deal(user, totalPrice);
        vm.prank(user);
        tokenBuy.buyTokens{value: totalPrice}(tokenAmount);

        // Verificar saldo do usuário
        assertEq(tokenBuy.balanceOf(user), tokenAmount);

        // Verificar se 5% do total foi destinado para BTC
        uint256 btcFund = (totalPrice * 5) / 100;
        assertEq(tokenBuy.btcAccumulatedFunds(), btcFund);
    }

    function testTokenSale() public {
        uint256 tokenAmount = 100 * 10 ** 18;
        uint256 totalPrice = tokenAmount * tokenBuy.tokenPrice();

        // Comprar tokens para depois vender
        vm.deal(user, totalPrice);
        vm.prank(user);
        tokenBuy.buyTokens{value: totalPrice}(tokenAmount);

        // Verificar saldo do usuário
        assertEq(tokenBuy.balanceOf(user), tokenAmount);

        // Vender os tokens
        vm.prank(user);
        tokenBuy.sellTokens(tokenAmount);

        // Verificar que o saldo do usuário foi zerado
        assertEq(tokenBuy.balanceOf(user), 0);

        // Verificar se os fundos de BTC foram atualizados
        uint256 btcFund = (totalPrice * 5) / 100;
        assertEq(tokenBuy.btcAccumulatedFunds(), btcFund * 2); // Compra e venda acumulam
    }

    function testBTCDistributionAfter50Months() public {
    // Endereços de teste para receber a distribuição de BTC
    address receiver1 = address(0x123);
    address receiver2 = address(0x456);

    // Distribuir tokens FÃS para esses endereços
    vm.prank(owner);
    tokenBuy.transfer(receiver1, 1000 * 10 ** tokenBuy.decimals());
    tokenBuy.transfer(receiver2, 2000 * 10 ** tokenBuy.decimals());

    // Avançar o tempo em 50 meses
    vm.warp(block.timestamp + 50 * 30 days);

    // Adicionar fundos de BTC ao contrato
    uint256 btcFunds = 1 ether;
    vm.deal(address(tokenBuy), btcFunds);

    // Verificar o saldo do contrato antes da distribuição
    assertEq(address(tokenBuy).balance, btcFunds);

    // Executar a distribuição de BTC
    vm.prank(owner);
    tokenBuy.distributeBTC();

    // Verificar que o saldo do contrato foi zerado
    assertEq(address(tokenBuy).balance, 0);

    // Verificar que os holders receberam BTC
    // Exemplo: verificar se receiver1 e receiver2 receberam suas proporções
    // Dependendo da implementação, é possível verificar o saldo dos endereços aqui.
    // Exemplo:
    // uint256 expectedShare1 = btcFunds * 1000 / (1000 + 2000);
    // uint256 expectedShare2 = btcFunds * 2000 / (1000 + 2000);
    // assertEq(receiver1.balance, expectedShare1);
    // assertEq(receiver2.balance, expectedShare2);
}
}