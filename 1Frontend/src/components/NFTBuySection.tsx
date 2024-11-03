import { useState } from "react";
import { ethers } from "ethers";
import ContractData from "./abis/NFTContractData.json";
import NFTContract1Data from "./abis/NFTContract1Data.json";
import NFTContract2Data from "./abis/NFTContract2Data.json";

const NFTBuySection = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [isBuyingMainNFT, setIsBuyingMainNFT] = useState(false);
  const [isBuyingNFT1, setIsBuyingNFT1] = useState(false);
  const [isBuyingNFT2, setIsBuyingNFT2] = useState(false);

  const connectToMetaMask = async () => {
    try {
      if (window.ethereum) {
        setIsConnecting(true);
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        setIsConnecting(false);

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

  const handleBuyNFT = async () => {
    try {
      if (!account) {
        alert("Please connect to MetaMask first.");
        return;
      }

      setIsBuyingMainNFT(true);
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
      setIsBuyingMainNFT(false);
    }
  };

  const handleBuyNFTContract1 = async () => {
    try {
      if (!account) {
        alert("Please connect to MetaMask first.");
        return;
      }

      setIsBuyingNFT1(true);
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
      setIsBuyingNFT1(false);
    }
  };

  const handleBuyNFTContract2 = async () => {
    try {
      if (!account) {
        alert("Please connect to MetaMask first.");
        return;
      }

      setIsBuyingNFT2(true);
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
      setIsBuyingNFT2(false);
    }
  };

  return (
    <div className="text-center flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex justify-around mt-8 max-w-5xl w-full">
        <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg border-4 border-blue-500">
          <img
            src="https://sapphire-accepted-dragonfly-363.mypinata.cloud/ipfs/QmPWGzHxMHMmB8gHxfN4RokYiUsxbKydiCromebVkTFeyE"
            alt="Main NFT"
            className="w-64 h-64 rounded-md shadow-md transition-transform transform hover:scale-105"
          />
          <button
            onClick={account ? handleBuyNFT : connectToMetaMask}
            disabled={isConnecting || isBuyingMainNFT}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 mt-4 shadow-md"
          >
            {isConnecting
              ? "Connecting..."
              : isBuyingMainNFT
              ? "Purchasing NFT..."
              : account
              ? "Buy NFT for 0.5 MATIC"
              : "Connect to MetaMask"}
          </button>
        </div>
        <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg border-4 border-blue-500">
          <img
            src="https://sapphire-accepted-dragonfly-363.mypinata.cloud/ipfs/QmPWGzHxMHMmB8gHxfN4RokYiUsxbKydiCromebVkTFeyE"
            alt="NFT Contract 1"
            className="w-64 h-64 rounded-md shadow-md transition-transform transform hover:scale-105"
          />
          <button
            onClick={account ? handleBuyNFTContract1 : connectToMetaMask}
            disabled={isConnecting || isBuyingNFT1}
            className="bg-cyan-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 mt-4 shadow-md"
          >
            {isConnecting
              ? "Connecting..."
              : isBuyingNFT1
              ? "Purchasing NFT..."
              : "Buy NFT 1 for 0.5 MATIC"}
          </button>
        </div>
        <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg border-4 border-blue-500">
          <img
            src="https://sapphire-accepted-dragonfly-363.mypinata.cloud/ipfs/QmPWGzHxMHMmB8gHxfN4RokYiUsxbKydiCromebVkTFeyE"
            alt="NFT Contract 2"
            className="w-64 h-64 rounded-md shadow-md transition-transform transform hover:scale-105"
          />
          <button
            onClick={account ? handleBuyNFTContract2 : connectToMetaMask}
            disabled={isConnecting || isBuyingNFT2}
            className="bg-cyan-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 mt-4 shadow-md"
          >
            {isConnecting
              ? "Connecting..."
              : isBuyingNFT2
              ? "Purchasing NFT..."
              : "Buy NFT 2 for 0.5 MATIC"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NFTBuySection;

