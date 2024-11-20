// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/DescenToken.sol";

contract DeployDescenToken is Script {
    function run() external {
        // Carrega o deployer e a treasury wallet a partir do .env
        address treasuryWallet = vm.envAddress("TREASURY_WALLET");
        uint256 deployerPrivateKey = vm.envUint("DEPLOYER_PRIVATE_KEY");

        // Inicia a transação com o sender como o deployer
        vm.startBroadcast(deployerPrivateKey);

        // Deploya o contrato com a wallet especificada
        DescenToken token = new DescenToken(treasuryWallet);

        console.log("Contrato DescenToken foi deployado com sucesso!");
        console.log("Endereco do contrato:", address(token));
        console.log("Treasury Wallet:", treasuryWallet);

        // Finaliza a transação
        vm.stopBroadcast();
    }
}
