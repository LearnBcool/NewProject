// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/TokenBuy.sol";

contract DeployTokenBuy is Script {
    function run() external {
        // Carregar a chave privada diretamente do .env usando vm.env
        uint256 privateKey = vm.envUint("PRIVATE_KEY");

        // Ler o endereço do owner (pode ser o mesmo da chave privada)
        address initialOwner = vm.envAddress("OWNER_ADDRESS");

        // Ler o endereço da carteira de BTC a partir do .env
        address btcWallet = vm.envAddress("BTC_WALLET_ADDRESS");

        // Iniciar o broadcast usando a chave privada
        vm.startBroadcast(privateKey);

        // Realizar o deploy do contrato TokenBuy com os parâmetros necessários
        TokenBuy token = new TokenBuy(initialOwner, btcWallet);

        // Parar o broadcast
        vm.stopBroadcast();

        // Exibir o endereço do contrato no console
        console.log("Contrato TokenBuy deployado em:", address(token));
    }
}
