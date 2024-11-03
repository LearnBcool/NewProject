import React from "react";
import NFTBuySection from "./components/NFTBuySection";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Content from "./components/Content";
import CountdownTimer from "./components/CountdownTimer";
import ParticlesBackground from "./components/ParticlesBackground";
import TokenBuy from "./components/TokenBuy";

const App: React.FC = () => {
  // Define a data alvo para a contagem regressiva
  const targetDate = new Date("2024-11-07T23:59:59");

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      {/* Fundo de partículas */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      >
        <ParticlesBackground />
      </div>

      {/* Conteúdo principal da página */}
      <div
        className="content flex flex-col min-h-screen"
        style={{ position: "relative", zIndex: 1 }}
      >
        {/* Cabeçalho */}
        <Header />

        {/* Conteúdo principal */}
        <main className="flex-grow">
          {/* Seção do Timer */}
          <div className="container mx-auto p-4 text-center">
            <CountdownTimer
              targetDate={targetDate}
              message="BTC 120K, get ready for next run!"
            />

            {/* Seção de compra de NFT */}
            <div className="container mx-auto p-4">
              <TokenBuy />
              {/* Seção de compra de Tokens */}
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
