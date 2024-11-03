import React from "react";
import NFTBuySection from "./components/NFTBuySection";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Content from "./components/Content";
import CountdownTimer from "./components/CountdownTimer";
//import BuyToken from "./components/BuyToken";
// import ParticlesBackground from "./components/ParticlesBackground"; <ParticlesBackground />

const App: React.FC = () => {
  // Define a data alvo para a contagem regressiva
  const targetDate = new Date("2024-11-07T23:59:59");

  return (
    <div>
      {/* Envolve todo o conteúdo principal com a classe "content" */}
      <div className="content flex flex-col min-h-screen">
        {/* Cabeçalho */}
        <Header />
        {/* BuyToken inserir abaixo*/}
        

        {/* Conteúdo principal */}
        <main className="flex-grow">
          {/* Seção do Timer */}
          <div className="container mx-auto p-4 text-center">
            <CountdownTimer targetDate={targetDate} />

            {/* Seção de compra de NFT */}
            <div className="container mx-auto p-4">
              <NFTBuySection />
            </div>

            {/* Conteúdo com imagem e texto */}
            <div className="container mx-auto p-4">
              <Content />
            </div>
          </div>
        </main>

        {/* Rodapé */}
        <Footer />
      </div>
    </div>
  );
};

export default App;
