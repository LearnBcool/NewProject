// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/DescenToken.sol";

contract DeployDescenToken is Script {
    function run() external {
        // Obtém a chave privada do deployer
        uint256 privateKey = vm.envUint("PRIVATE_KEY");

        // Inicia a transação com a chave privada
        vm.startBroadcast(privateKey);

        // Faz o deploy do contrato
        DescenToken descenToken = new DescenToken();

        // Loga o endereço do contrato implantado
        console.log("DescenToken deployed at:", address(descenToken));

        vm.stopBroadcast();
    }
}



