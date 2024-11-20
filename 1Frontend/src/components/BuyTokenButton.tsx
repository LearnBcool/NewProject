import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { abi, contractAddress } from "./abis/DescenTokenABI.json";

const BuyTokenButton = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  const [amount, setAmount] = useState<number>(0);

  const pricePerToken = ethers.parseUnits("0.005", "ether"); // Preço de 0.005 Ether por token

  const connectToMetaMask = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask not found. Please install it.");
        return;
      }

      setIsConnecting(true);
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);

      const networkId = await window.ethereum.request({
        method: "net_version",
      });

      if (networkId !== "80002") {
        alert("Please connect to the Polygon Amoy Testnet!");
        disconnect();
      }
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    setAccount(null);
  };

  const handleBuyToken = async () => {
    if (!account) {
      alert("Please connect to MetaMask first.");
      return;
    }
    if (amount <= 0) {
      alert("Enter a valid amount of tokens.");
      return;
    }

    setIsBuying(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      const cost = pricePerToken * BigInt(amount); // Usando BigInt para cálculos

      const tx = await contract.buy(amount, ethers.ZeroAddress, {
        value: cost,
      });

      await tx.wait();
      alert(`Successfully purchased ${amount} tokens!`);
    } catch (error) {
      console.error("Error buying tokens:", error);
      alert("Failed to buy tokens.");
    } finally {
      setIsBuying(false);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          disconnect();
        }
      });
    }
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", () => {});
      }
    };
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg shadow-xl">
      {!account ? (
        <button
          onClick={connectToMetaMask}
          disabled={isConnecting}
          className={`w-full px-6 py-3 rounded-lg text-lg font-semibold bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 ${
            isConnecting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isConnecting ? "Connecting..." : "Connect MetaMask"}
        </button>
      ) : (
        <div className="text-center mb-6">
          <p className="mb-2 text-sm text-gray-200">Connected as: {account}</p>
          <button
            onClick={disconnect}
            className="w-full px-6 py-3 text-lg font-semibold bg-red-500 hover:bg-red-600 rounded-lg transition-all duration-300"
          >
            Disconnect
          </button>
        </div>
      )}

      {account && (
        <div className="text-center">
          <input
            type="number"
            min="1"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Enter amount"
            className="w-full px-4 py-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-yellow-500 mb-4"
          />
          <button
            onClick={handleBuyToken}
            disabled={isBuying}
            className={`w-full px-6 py-3 text-lg font-semibold bg-green-500 hover:bg-green-600 rounded-lg transition-all duration-300 ${
              isBuying ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isBuying ? "Processing..." : `Buy ${amount} Tokens`}
          </button>
        </div>
      )}
    </div>
  );
};

export default BuyTokenButton;



