// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol"; // Importa utilitários para scripts do Foundry
import "../src/MyFirstProjectDapp.sol"; // Importa o contrato principal

contract DeployMyFirstProjectDapp is Script {
    function run() external {
        // Recupera a chave privada do deployer do ambiente de execução
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        // Inicia o broadcasting das transações para a rede utilizando a chave privada
        vm.startBroadcast(deployerPrivateKey);

        // Realiza o deploy do contrato
        MyFirstProjectDapp deployedContract = new MyFirstProjectDapp();

        // Exibe o endereço do contrato implantado no console
        console.log("MyFirstProjectDapp deployed at:", address(deployedContract));

        // Finaliza o broadcasting
        vm.stopBroadcast();
    }
}



       

