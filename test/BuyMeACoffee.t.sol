// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import { BuyMeACoffee } from "../src/BuyMeACoffee.sol";  // Caminho do seu contrato;

contract BuyMeACoffeeTest is Test {
    BuyMeACoffee buyMeACoffee;
    address owner = address(0x123);  // Endereço do proprietário (geralmente é o deployer)
    address user = address(0x456);   // Endereço do usuário que vai interagir com o contrato

    function setUp() public {
        // Faz o deploy do contrato antes de cada teste
        buyMeACoffee = new BuyMeACoffee();
    }

    // Testa se a função buyCoffee funciona corretamente
    function testBuyCoffee() public {
        string memory name = "Lucas";
        string memory message = "Obrigado pelo cafe!";
        
        // Envia 0.1 ether para a função buyCoffee
        vm.deal(user, 1 ether); // Simula um saldo de 1 ETH para o usuário
        vm.prank(user);  // Faz o usuário interagir com o contrato
        buyMeACoffee.buyCoffee(name, message);

        // Verifica se o último memo adicionado corresponde aos valores enviados
        BuyMeACoffee.Memo[] memory memos = buyMeACoffee.getMemos();
        assertEq(memos[memos.length - 1].from, user);
        assertEq(memos[memos.length - 1].name, name);
        assertEq(memos[memos.length - 1].message, message);
    }

    // Testa a função getMemos
    function testGetMemos() public {
        string memory name = "Lucas";
        string memory message = "Obrigado pelo cafe!";
        
        // Envia um pagamento para a função buyCoffee
        vm.deal(user, 1 ether);
        vm.prank(user);
        buyMeACoffee.buyCoffee(name, message);

        // Verifica se o memo foi armazenado corretamente
        BuyMeACoffee.Memo[] memory memos = buyMeACoffee.getMemos();
        assertEq(memos.length, 1);  // Deve ter apenas 1 memo
        assertEq(memos[0].name, name);
        assertEq(memos[0].message, message);
    }

    // Testa a função withdrawTips
    function testWithdrawTips() public {
        uint256 initialBalance = address(this).balance;
        uint256 contractBalance = address(buyMeACoffee).balance;

        // O contrato precisa ter um saldo para realizar o teste de retirada
        vm.deal(user, 1 ether);
        vm.prank(user);
        buyMeACoffee.buyCoffee("Lucas", "Obrigado pelo cafe!");

        // O contrato deve agora ter algum saldo após a compra do café
        contractBalance = address(buyMeACoffee).balance;
        assertGt(contractBalance, 0);

        // Faz o teste de retirada
        vm.prank(owner);  // O proprietário faz a retirada
        buyMeACoffee.withdrawTips();

        uint256 finalBalance = address(this).balance;

        // Verifica se o saldo final foi alterado após a retirada
        assertEq(finalBalance, initialBalance + contractBalance);
    }
}
