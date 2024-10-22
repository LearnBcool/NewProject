// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract NearxNFT is ERC721, ERC721Enumerable {
    constructor() ERC721("MyToken", "MTK") {}

    function _baseURI() internal pure override returns (string memory) {
        return
            "https://yellow-glad-meadowlark-949.mypinata.cloud/ipfs/QmQroPEZMT8uTWb8qhK2yJLsCkWGHN9wvdf8A76F6ixGYR";
    }

    // Supply máximo e preço do NFT
    uint256 public constant MAX_SUPPLY = 10;
    uint256 public nftPrice = 1000000000000000000; // 1 MATIC

    // Evento para notificar compra do NFT
    event NFTBought(address indexed buyer, uint256 tokenId);

    // The following functions are overrides required by Solidity.

    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721, ERC721Enumerable) returns (address) {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(
        address account,
        uint128 value
    ) internal override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, value);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    // Função de compra, pode ser chamada a partir do frontend
    function buyNFT() external payable {
        require(totalSupply() < MAX_SUPPLY, "Todas as NFTs foram vendidas!");
        require(msg.value >= nftPrice, "Valor insuficiente para comprar o NFT");

        // Mintar o novo NFT (o ID será totalSupply() para garantir unicidade)
        uint256 tokenId = totalSupply() + 1;
        _safeMint(msg.sender, tokenId);

        // Emitir evento
        emit NFTBought(msg.sender, tokenId);
    }

    // Função para retornar o supply restante
    function remainingSupply() external view returns (uint256) {
        return MAX_SUPPLY - totalSupply();
    }
}

