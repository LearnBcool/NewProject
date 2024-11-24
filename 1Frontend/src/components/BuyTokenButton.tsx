import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { abi, contractAddress } from "./abis/DescenTokenABI.json";

const BuyTokenButton: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [amountToBuy, setAmountToBuy] = useState<number>(0);
  const [pricePerToken, setPricePerToken] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<string>("0");
  const [isBuying, setIsBuying] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState<string>("");

  // Carregar o preço por token ao carregar o componente
  useEffect(() => {
    const fetchPrice = async () => {
      if (!window.ethereum) return;
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, abi, provider);
      const price = await contract.pricePerToken();
      setPricePerToken(parseFloat(ethers.formatUnits(price, 18))); // Ajustado para 18 casas decimais (MATIC)
    };
    fetchPrice();
  }, []);

  // Conectar ao MetaMask
  const connectToMetaMask = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask not found. Please install it.");
        return;
      }
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  };

  // Atualizar a quantidade de tokens a serem comprados
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = parseInt(event.target.value) || 0;
    setAmountToBuy(input);
    const cost = pricePerToken * input;
    setTotalCost(cost.toString());
  };

  // Função para comprar tokens
  const buyTokens = async () => {
    if (!account) {
      alert("Connect your wallet first!");
      return;
    }
    if (amountToBuy <= 0) {
      alert("Enter a valid token amount!");
      return;
    }

    try {
      setIsBuying(true);
      setTransactionStatus("Processing...");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      // Calcular o custo total em Wei (MATIC)
      const costInWei = ethers.parseUnits(totalCost, 18); // Ajuste para wei
      const tx = await contract.buy(amountToBuy, { value: costInWei });

      // Aguardar confirmação da transação
      await tx.wait();

      setTransactionStatus(`Successfully purchased ${amountToBuy} tokens!`);
    } catch (error) {
      console.error("Error buying tokens:", error);
      setTransactionStatus("Transaction failed!");
    } finally {
      setIsBuying(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Buy <span className="text-indigo-500">DEFLATOR</span> Tokens
      </h2>
      {!account ? (
        <button
          onClick={connectToMetaMask}
          className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:ring focus:ring-indigo-300"
        >
          Connect Wallet
        </button>
      ) : (
        <>
          <p className="text-sm text-gray-600 text-center mb-4">
            Connected: <span className="text-indigo-500">{account}</span>
          </p>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Amount to Buy:
            </label>
            <input
              type="number"
              value={amountToBuy}
              onChange={handleAmountChange}
              min="1"
              className="text-black w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-300"
              placeholder="Enter token amount"
            />
          </div>
          <p className="text-gray-700 font-medium mb-4">
            Total Cost:{" "}
            <span className="text-indigo-500 font-bold">{totalCost} MATIC</span>
          </p>
          <button
            onClick={buyTokens}
            disabled={isBuying}
            className={`w-full px-4 py-2 font-semibold rounded-md ${
              isBuying
                ? "bg-gray-400 text-gray-800 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700 focus:ring focus:ring-green-300"
            }`}
          >
            {isBuying ? "Processing..." : "Buy Tokens"}
          </button>
          {transactionStatus && (
            <p className="text-center text-sm mt-4 text-gray-600">{transactionStatus}</p>
          )}
        </>
      )}
    </div>
  );
};

export default BuyTokenButton;
