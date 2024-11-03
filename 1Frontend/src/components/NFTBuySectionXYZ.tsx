import { useState } from "react";
import { ethers } from "ethers";
import ContractData from "./abis/NFTContractData.json";
import NFTContract1Data from "./abis/NFTContract1Data.json";
import NFTContract2Data from "./abis/NFTContract2Data.json";


const NFTBuySection = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [isBuying, setIsBuying] = useState(false);

  // Função para conectar à MetaMask
  const connectToMetaMask = async () => {
    try {
      if (window.ethereum) {
        setIsConnecting(true);
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        setIsConnecting(false);

        // Garantir que o usuário está na rede correta
        const networkId = await window.ethereum.request({
          method: "net_version",
        });
        if (networkId !== "80002") {
          alert("Please connect to the Polygon Amoy Testnet!");
        }
      } else {
        alert("MetaMask not found. Please install it.");
      }
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
      setIsConnecting(false);
    }
  };

  // Função para comprar NFT do contrato principal
  const handleBuyNFT = async () => {
    try {
      if (!account) {
        alert("Please connect to MetaMask first.");
        return;
      }

      setIsBuying(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(ContractData.contractAddress, ContractData.abi, signer);

      const nftPrice = ethers.parseUnits("0.5", "ether");
      const tx = await contract.buyNFT({ value: nftPrice });

      await tx.wait();
      alert("NFT purchased successfully!");
    } catch (error) {
      console.error("Error purchasing NFT:", error);
      alert("Failed to purchase NFT.");
    } finally {
      setIsBuying(false);
    }
  };

  // Função para comprar NFT do contrato 1
  const handleBuyNFTContract1 = async () => {
    try {
      if (!account) {
        alert("Please connect to MetaMask first.");
        return;
      }

      setIsBuying(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(NFTContract1Data.contractAddress, NFTContract1Data.abi, signer);

      const nftPrice = ethers.parseUnits("0.5", "ether");
      const tx = await contract.buyNFT({ value: nftPrice });

      await tx.wait();
      alert("NFT from Contract 1 purchased successfully!");
    } catch (error) {
      console.error("Error purchasing NFT from Contract 1:", error);
      alert("Failed to purchase NFT from Contract 1.");
    } finally {
      setIsBuying(false);
    }
  };

  // Função para comprar NFT do contrato 2
  const handleBuyNFTContract2 = async () => {
    try {
      if (!account) {
        alert("Please connect to MetaMask first.");
        return;
      }

      setIsBuying(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(NFTContract2Data.contractAddress, NFTContract2Data.abi, signer);

      const nftPrice = ethers.parseUnits("0.5", "ether");
      const tx = await contract.buyNFT({ value: nftPrice });

      await tx.wait();
      alert("NFT from Contract 2 purchased successfully!");
    } catch (error) {
      console.error("Error purchasing NFT from Contract 2:", error);
      alert("Failed to purchase NFT from Contract 2.");
    } finally {
      setIsBuying(false);
    }
  };

  return (
    <div className="text-center">
      <div className="flex justify-center mb-8">
        <img src="https://sapphire-accepted-dragonfly-363.mypinata.cloud/ipfs/QmPWGzHxMHMmB8gHxfN4RokYiUsxbKydiCromebVkTFeyE" alt="Main NFT" className="w-40 h-40 rounded-md" />
      </div>
      <button
        onClick={account ? handleBuyNFT : connectToMetaMask}
        disabled={isConnecting || isBuying}
        className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-4 rounded transition-colors disabled:opacity-50"
      >
        {isConnecting
          ? "Connecting..."
          : isBuying
          ? "Purchasing NFT..."
          : account
          ? "Buy NFT for 0.5 MATIC"
          : "Connect to MetaMask"}
      </button>

      <div className="flex justify-around mt-8">
        <div className="flex flex-col items-center">
          <img src="https://sapphire-accepted-dragonfly-363.mypinata.cloud/ipfs/QmPWGzHxMHMmB8gHxfN4RokYiUsxbKydiCromebVkTFeyE" alt="NFT Contract 1" className="w-32 h-32 rounded-md mb-6" />
          <button
            onClick={account ? handleBuyNFTContract1 : connectToMetaMask}
            disabled={isConnecting || isBuying}
            className="bg-cyan-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors disabled:opacity-50"
          >
            {isConnecting ? "Connecting..." : "Buy NFT 1 for 0.5 MATIC"}
          </button>
        </div>
        <div className="flex flex-col items-center">
          <img src="https://sapphire-accepted-dragonfly-363.mypinata.cloud/ipfs/QmPWGzHxMHMmB8gHxfN4RokYiUsxbKydiCromebVkTFeyE" alt="NFT Contract 2" className="w-32 h-32 rounded-md mb-6" />
          <button
            onClick={account ? handleBuyNFTContract2 : connectToMetaMask}
            disabled={isConnecting || isBuying}
            className="bg-cyan-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors disabled:opacity-50"
          >
            {isConnecting ? "Connecting..." : "Buy NFT 2 for 0.5 MATIC"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NFTBuySection;

