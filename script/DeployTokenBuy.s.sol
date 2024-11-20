// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/TokenBuy.sol";

contract DeployTokenBuy is Script {
    function run() external {
        // Substitua pelos endereços corretos para o owner e a carteira BTC
        address initialOwner = vm.envAddress("INITIAL_OWNER_ADDRESS"); // Endereço do owner a partir do .env
        address btcWallet = vm.envAddress("BTC_WALLET_ADDRESS");       // Endereço da carteira BTC a partir do .env

        vm.startBroadcast();

        // Fazendo o deploy do contrato com os endereços fornecidos
        TokenBuy tokenBuy = new TokenBuy(initialOwner, btcWallet);

        console.log("Contrato TokenBuy deployado no endereco:", address(tokenBuy));

        vm.stopBroadcast();
    }
}
