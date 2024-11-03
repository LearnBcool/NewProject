import { useState } from "react";
import { ethers } from "ethers";
import TokenContract from "./abis/TokenContract.json";

const BuyToken = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [setIsBuyingMainBuyToken] = useState(false);

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

  const handleTokenBuy = async () => {
    try {
      if (!account) {
        alert("Please connect to MetaMask first.");
        return;
      }

      setIsBuyingToken(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        TokenContract.contractAddress,
        TokenContract.abi,
        signer
      );

      const tokenPrice = ethers.parseUnits("0.5", "ether");
      const tx = await contract.buyToken({ value: tokenPrice });

      await tx.wait();
      alert("NFT purchased successfully!");
    } catch (error) {
      console.error("Error purchasing NFT:", error);
      alert("Failed to purchase NFT.");
    } finally {
      setIsBuyingToken(false);
    }
  };

  return (
    <div className="text-center flex justify-center items-center min-h-96">
      <button
        onClick={account ? handleTokenBuy : connectToMetaMask}
        disabled={isConnecting || setIsBuyingMainBuyToken}
        className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 mt-2"
      >
        {isConnecting
          ? "Connecting..."
          : setIsBuyingMainBuyToken
          ? "Purchasing NFT..."
          : account
          ? "Buy NFT for 0.5 MATIC"
          : "Connect to MetaMask"}
      </button>
    </div>
  );
};

export default BuyToken;
