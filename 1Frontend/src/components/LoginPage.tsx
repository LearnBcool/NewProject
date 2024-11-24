import React, { useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const { login, authenticated } = usePrivy();
  const navigate = useNavigate();

  // Monitorando a autenticação e redirecionando para a página principal
  useEffect(() => {
    if (authenticated) {
      console.log("Usuário autenticado, redirecionando para a página principal...");
      navigate("/"); // Redireciona para a rota principal
    }
  }, [authenticated, navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="text-center text-white">
        <h1 className="text-3xl font-bold mb-4">Bem-vindo ao LearnB!</h1>
        <p className="mb-8">Faça login para acessar nosso conteúdo exclusivo.</p>
        <button
          onClick={() => {
            console.log("Iniciando login...");
            login(); // Inicia o login
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Entrar com Privy
        </button>
      </div>
    </div>
  );
};

export default LoginPage;



