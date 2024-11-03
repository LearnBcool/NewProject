// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NearxNFT2024 is ERC721URIStorage {
    uint256 public tokenCounter; // Contador de NFT criados
    string private contractURI = "https://yellow-glad-meadowlark-949.mypinata.cloud/ipfs/Qmab6wFttbo2heMsGVXHDPRwSexucpnqVNmdWts3m6A2zk"; // Variável para armazenar o URI do contrato
    string private nftTokenURI = "https://yellow-glad-meadowlark-949.mypinata.cloud/ipfs/QmNrtLeWGqbgfpqvpLhZgj7FvHSBAKtmgYx451tn45vT7R";
    uint16 public MAX_SUPPLY = 10;

    constructor() ERC721("TIMTIN", "TMTN") {
        tokenCounter = 0;
    }

    mapping(uint256 => bool) private _tokenExists;

    function _getTokenURI()  external view returns (string memory) {
        return contractURI;
    }
    function _getnfTokenURI() external view returns (string memory) {
        return nftTokenURI;
    }
                    
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