// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {NearxNFT} from "../src/NearxNFT.sol";  // Certifique-se de ajustar o caminho corretamente

contract DeployNearxNFT is Script {
    function run() external {
        // Recuperar a chave privada do deployer do ambiente
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        // Iniciar a transmissão para a Polygon Amoy Testnet
        vm.startBroadcast(deployerPrivateKey);

        // Deployar o contrato NearxNFT
        new NearxNFT();

        // Finalizar a transmissão
        vm.stopBroadcast();
    }
}

