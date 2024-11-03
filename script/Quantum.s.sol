// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/Quantum.sol";

contract DeployQuantum is Script {
    function run() external {
        // Ler o endereço do owner (pode ser o mesmo da chave privada)
        address initialOwner = msg.sender;

        // Carregar a chave privada diretamente do .env usando vm.env
        uint256 privateKey = vm.envUint("PRIVATE_KEY");

        // Iniciar o broadcast usando a chave privada
        vm.startBroadcast(privateKey);

        // Realizar o deploy do contrato QUANTUM
        QUANTUM quantum = new QUANTUM(initialOwner);

        // Parar o broadcast
        vm.stopBroadcast();

        // Exibir o endereço do contrato no console
        console.log("Contrato QUANTUM deployado em:", address(quantum));
    }
}
