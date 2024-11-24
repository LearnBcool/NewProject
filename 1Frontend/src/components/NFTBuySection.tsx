import { useState } from "react";
import { ethers } from "ethers";
import NFTContractData from "./abis/NFTContractData.json";
import NFTContract1Data from "./abis/NFTContract1Data.json";
import NFTContract2Data from "./abis/NFTContract2Data.json";

const NFTBuySection = () => {
  const [account, setAccount] = useState<string | null>(null);

  // Estados específicos para cada NFT
  const [isConnectingMainNFT, setIsConnectingMainNFT] = useState(false);
  const [isBuyingMainNFT, setIsBuyingMainNFT] = useState(false);

  const [isConnectingNFT1, setIsConnectingNFT1] = useState(false);
  const [isBuyingNFT1, setIsBuyingNFT1] = useState(false);

  const [isConnectingNFT2, setIsConnectingNFT2] = useState(false);
  const [isBuyingNFT2, setIsBuyingNFT2] = useState(false);

  // Função de conexão genérica
  const connectToMetaMask = async (
    setConnectingState: (connecting: boolean) => void
  ) => {
    try {
      if (window.ethereum) {
        setConnectingState(true);
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
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
    } finally {
      setConnectingState(false);
    }
  };

  // Funções de compra específicas para cada NFT
  const handleBuyNFT = async () => {
    if (!account) {
      alert("Please connect to MetaMask first.");
      return;
    }

    setIsBuyingMainNFT(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        NFTContractData.contractAddress,
        NFTContractData.abi,
        signer
      );
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
    if (!account) {
      alert("Please connect to MetaMask first.");
      return;
    }

    setIsBuyingNFT1(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        NFTContract1Data.contractAddress,
        NFTContract1Data.abi,
        signer
      );
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
    if (!account) {
      alert("Please connect to MetaMask first.");
      return;
    }

    setIsBuyingNFT2(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        NFTContract2Data.contractAddress,
        NFTContract2Data.abi,
        signer
      );
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

  //-------------------------------------------------------------------------------------------------------------------------------------------------------------- //

  return (
    <div className="text-center flex justify-center items-center min-h-screen">
      <div className="flex justify-around max-w-7xl w-full gap-4">
        {/* Main NFT */}
        <div className="flex flex-col items-center w-1/3">
          <img
            src="https://sapphire-accepted-dragonfly-363.mypinata.cloud/ipfs/QmP6YvXFdU6Fg3Gp8SY4eL2j7RfpDhXgH2npEnTQhKczQk"
            alt="Main NFT"
            className="w-full max-w-[400px] h-auto rounded-md transition-transform transform hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-pink-500/50"
          />
          <button
            onClick={
              account
                ? handleBuyNFT
                : () => connectToMetaMask(setIsConnectingMainNFT)
            }
            disabled={isConnectingMainNFT || isBuyingMainNFT}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 mt-4"
          >
            {isConnectingMainNFT
              ? "Connecting..."
              : isBuyingMainNFT
              ? "Purchasing NFT..."
              : account
              ? "Buy NFT for 0.5 MATIC"
              : "Connect to MetaMask"}
          </button>
        </div>

        {/* NFT Contract 1 */}
        <div className="flex flex-col items-center w-1/3">
          <img
            src="https://sapphire-accepted-dragonfly-363.mypinata.cloud/ipfs/QmRksyyiYjcSmcd6z7YWjP3o95vj65uQUsary2miS9kaKv"
            alt="NFT Contract 1"
            className="w-full max-w-[400px] h-auto rounded-md transition-transform transform hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-pink-500/50"
          />
          <button
            onClick={
              account
                ? handleBuyNFTContract1
                : () => connectToMetaMask(setIsConnectingNFT1)
            }
            disabled={isConnectingNFT1 || isBuyingNFT1}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 mt-4"
          >
            {isConnectingNFT1
              ? "Connecting..."
              : isBuyingNFT1
              ? "Purchasing NFT..."
              : "Buy NFT 1 for 0.5 MATIC"}
          </button>
        </div>

        {/* NFT Contract 2 */}
        <div className="flex flex-col items-center w-1/3">
          <img
            src="https://sapphire-accepted-dragonfly-363.mypinata.cloud/ipfs/QmWZozxu96wrFYhAHe2m7ncLrFMHFsBPXDGestJcDB7bNP"
            alt="NFT Contract 2"
            className="w-full max-w-[400px] h-auto rounded-md transition-transform transform hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-pink-500/50"
          />
          <button
            onClick={
              account
                ? handleBuyNFTContract2
                : () => connectToMetaMask(setIsConnectingNFT2)
            }
            disabled={isConnectingNFT2 || isBuyingNFT2}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 mt-4"
          >
            {isConnectingNFT2
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
