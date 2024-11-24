// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol"; // Importa utilitários para scripts do Foundry
import "../src/DescenToken.sol"; // Importa o contrato principal

contract DeployDescenToken is Script {
    function run() external {
        // Recupera a chave privada do deployer do ambiente
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        // Inicia o broadcasting das transações para a rede com a chave privada
        vm.startBroadcast(deployerPrivateKey);

        // Faz o deploy do contrato
        DescenToken token = new DescenToken();

        // Loga o endereço do contrato no console
        console.log("DescenToken deployed at:", address(token));

        // Finaliza o broadcasting
        vm.stopBroadcast();
    }
}


       

