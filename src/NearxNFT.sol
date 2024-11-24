// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NearxNFT is ERC721URIStorage {
    uint256 public tokenCounter; // Contador de NFT criados
    string private contractURI = "https://sapphire-accepted-dragonfly-363.mypinata.cloud/ipfs/QmVh5kfjXmCGXK13CxAKHmgxvydKx4SY9wnHxB4nUStocK"; // Variável para armazenar o URI do contrato
    string private nftTokenURI = "https://sapphire-accepted-dragonfly-363.mypinata.cloud/ipfs/QmfEoiyphzTQXr4iRFHxUxg8KH7CZSCV1ji8g9mvR7SPrS";
    uint16 public MAX_SUPPLY = 150;

    constructor() ERC721("POP CULTURE POP", "PCP") {
        tokenCounter = 0;
    }

    mapping(uint256 => bool) private _tokenExists; // adicionado para teste <=//
        
    // Preço do NFT
    uint256 public nftPrice = 0.5 ether; // 0,5 MATIC

    function buyNFT() external payable {
        require(tokenCounter < MAX_SUPPLY, "Todas as NFTs foram vendidas!");
        require(msg.value >= nftPrice, "Valor insuficiente para comprar o NFT");

        tokenCounter += 1;
        uint256 newTokenId = tokenCounter;
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, nftTokenURI);
    }
}
