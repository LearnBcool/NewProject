// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {Script} from "forge-std/Script.sol";
import { NearxNFT2024} from "../src/NearxNFT2024.sol";  // Certifique-se de ajustar o caminho corretamente;

contract DeployNearxNFT2024 is Script {
    function run() external {
        // Recuperar a chave privada do deployer do ambiente
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        // Iniciar a transmissão para a Polygon Amoy Testnet
        vm.startBroadcast(deployerPrivateKey);

        // Deployar o contrato NearxNFT
        new NearxNFT2024();

        // Finalizar a transmissão
        vm.stopBroadcast();
    }
}
