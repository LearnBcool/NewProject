import React, { useState } from "react";

interface ConnectionManagerProps {
  onAccountConnected: (account: string | null) => void;
}

const ConnectionManager: React.FC<ConnectionManagerProps> = ({ onAccountConnected }) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const connectToMetaMask = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask not found. Please install it.");
        return;
      }
      setIsConnecting(true);
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const networkId = await window.ethereum.request({ method: "net_version" });

      if (networkId !== "80002") {
        alert("Please connect to the Polygon Amoy Testnet!");
        setIsConnecting(false);
        return;
      }

      onAccountConnected(accounts[0]);
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <button
      onClick={connectToMetaMask}
      disabled={isConnecting}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
    >
      {isConnecting ? "Connecting..." : "Connect Wallet"}
    </button>
  );
};

export default ConnectionManager;

