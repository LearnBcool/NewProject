// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NearxNFT is ERC721URIStorage {
    uint256 public tokenCounter; // Contador de NFT criados
    string public contractURI = "https://sapphire-accepted-dragonfly-363.mypinata.cloud/ipfs/QmeUwAy6TUkHMzob8Np1ZS3zUtqazH4SktrZ2Aca3RB1MQ";   // URI do contrato
    string public nftTokenURI = "https://sapphire-accepted-dragonfly-363.mypinata.cloud/ipfs/Qmcd9TKbTvG2168mU8Mb3LQ7w1A6p35fzFKgyiZLdnULCd";   // URI do token

    // Evento para emitir o nome do usuario e o endereco da wallet
    event UserMinted(address indexed userAddress, string userName);

    constructor() ERC721("NFTNEARX", "NFT") {
        tokenCounter = 0;
    }

    // Funcao para mintar um NFT
    function mintNFT() public {
        tokenCounter += 1;
        uint256 newTokenId = tokenCounter;
        _safeMint(_msgSender(), newTokenId);
        _setTokenURI(newTokenId, nftTokenURI);
    }

    // Funcao separada para adicionar o nome do usuario e emitir o evento
    function addUserName(string memory userName) public {
        // Emitir o evento com o nome do usuario e o endereco
        emit UserMinted(_msgSender(), userName);
    }
}