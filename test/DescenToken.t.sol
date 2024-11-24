// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "../src/DescenToken.sol";

contract MockERC20 is ERC20 {
    constructor() ERC20("Mock Token", "MKT") {}

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}

contract DescenTokenTest is Test {
    DescenToken public descenToken;
    MockERC20 public token;

    address public owner = address(0x1);
    address public user1 = address(0x2);
    address public user2 = address(0x3);

    uint256 public initialSupply = 21_000_000 ether;
    uint256 public pricePerToken = 0.005 ether;

    function setUp() public {
        // Deployando o token de teste ERC20
        token = new MockERC20();

        // Deployando o contrato DescenToken
        vm.prank(owner);
        descenToken = new DescenToken();

        // Adicionando o token ERC20 à lista de aceitos
        vm.prank(owner);
        descenToken.updateAcceptedToken(address(token), true);
    }

    function testBuyWithETH() public {
        uint256 amount = 10 ether;
        uint256 cost = descenToken.pricePerToken() * amount;

        vm.deal(user1, 100 ether); // Configura o saldo de ETH do comprador
        vm.startPrank(user1);
        descenToken.buy{value: cost}(amount, address(0)); // Compra com ETH
        vm.stopPrank();

        // Verifica o saldo do comprador
        uint256 buyerBalance = descenToken.balanceOf(user1);
        assertEq(buyerBalance, amount, "Buyer did not receive the correct token amount");

        // Verifica o saldo do contrato em ETH
        uint256 contractBalance = address(descenToken).balance;
        assertEq(contractBalance, cost, "Contract did not receive the correct ETH amount");
    }

    function testBuyWithERC20() public {
        uint256 amount = 10 ether;
        uint256 cost = descenToken.pricePerToken() * amount;

        // Mint tokens para o comprador e aprova o contrato
        token.mint(user1, cost);
        vm.startPrank(user1);
        token.approve(address(descenToken), cost);

        // Compra tokens com ERC20
        descenToken.buy(amount, address(token));
        vm.stopPrank();

        // Verifica o saldo do comprador
        uint256 buyerBalance = descenToken.balanceOf(user1);
        assertEq(buyerBalance, amount, "Buyer did not receive the correct token amount");

        // Verifica o saldo do contrato em ERC20
        uint256 contractTokenBalance = token.balanceOf(address(descenToken));
        assertEq(contractTokenBalance, cost, "Contract did not receive the correct ERC20 amount");
    }

    function testWithdrawEther() public {
        uint256 amount = 10 ether;
        uint256 cost = descenToken.pricePerToken() * amount;

        // Compra tokens para o contrato ter saldo de ETH
        vm.deal(user1, 100 ether);
        vm.startPrank(user1);
        descenToken.buy{value: cost}(amount, address(0));
        vm.stopPrank();

        // Retira ETH do contrato como proprietário
        vm.startPrank(owner);
        uint256 contractBalanceBefore = address(descenToken).balance;
        descenToken.withdrawEther(contractBalanceBefore);
        vm.stopPrank();

        // Verifica se o saldo do contrato foi zerado
        uint256 contractBalanceAfter = address(descenToken).balance;
        assertEq(contractBalanceAfter, 0, "Contract balance should be zero after withdrawal");

        // Verifica se o saldo do proprietário aumentou
        uint256 ownerBalance = owner.balance;
        assertEq(ownerBalance, contractBalanceBefore, "Owner did not receive the correct ETH amount");
    }

    function testWithdrawTokens() public {
        uint256 amount = 100 ether;

        // Retira tokens remanescentes do contrato
        vm.startPrank(owner);
        uint256 contractTokenBalanceBefore = descenToken.balanceOf(address(descenToken));
        descenToken.withdrawTokens(amount);
        vm.stopPrank();

        // Verifica se o saldo do contrato foi reduzido
        uint256 contractTokenBalanceAfter = descenToken.balanceOf(address(descenToken));
        assertEq(contractTokenBalanceAfter, contractTokenBalanceBefore - amount, "Contract token balance mismatch");

        // Verifica se o proprietário recebeu os tokens
        uint256 ownerBalance = descenToken.balanceOf(owner);
        assertEq(ownerBalance, amount, "Owner did not receive the correct token amount");
    }
}
