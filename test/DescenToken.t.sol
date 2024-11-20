// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../src/DescenToken.sol";

// Contrato Simulado de ERC20 com função mint
contract MockERC20 is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {}

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}

contract DescenTokenTest is Test {
    DescenToken descenToken;
    MockERC20 POL; // Usaremos MockERC20 para simular o token POL
    address owner;
    address user1;
    address user2;

    function setUp() public {
        // Configuração inicial
        owner = vm.addr(1);
        user1 = vm.addr(2);
        user2 = vm.addr(3);

        // Funde contas com ETH
        vm.deal(owner, 100 ether);
        vm.deal(user1, 10 ether);
        vm.deal(user2, 10 ether);

        // Implanta o contrato DescenToken
        vm.startPrank(owner);
        descenToken = new DescenToken();
        POL = new MockERC20("POL", "POL"); // Cria o token POL simulado
        vm.stopPrank();

        // Mint tokens POL para user1
        POL.mint(user1, 1000 ether);
    }

    function testBuyWithETH() public {
        vm.startPrank(user1);
        uint256 amount = 10;
        uint256 cost = descenToken.pricePerToken() * amount;

        descenToken.buy{value: cost}(amount, address(0));

        assertEq(descenToken.balanceOf(user1), amount);
        vm.stopPrank();
    }

    function testBuyWithERC20() public {
        vm.startPrank(user1);
        uint256 amount = 10;
        uint256 cost = descenToken.pricePerToken() * amount;

        POL.approve(address(descenToken), cost);

        descenToken.buy(amount, address(POL));

        assertEq(descenToken.balanceOf(user1), amount);
        assertEq(POL.balanceOf(address(descenToken)), cost);
        vm.stopPrank();
    }

    function testWithdrawTokens() public {
        vm.startPrank(owner);
        uint256 initialBalance = descenToken.balanceOf(owner);
        uint256 amount = 100 ether;

        descenToken.withdrawTokens(amount);

        assertEq(descenToken.balanceOf(owner), initialBalance + amount);
        vm.stopPrank();
    }

    function testWithdrawEther() public {
        vm.startPrank(owner);
        uint256 initialBalance = owner.balance;
        uint256 amount = 1 ether;

        descenToken.withdrawEther(amount);

        assertEq(owner.balance, initialBalance + amount);
        vm.stopPrank();
    }
}
