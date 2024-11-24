import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NFTBuySection from "./components/NFTBuySection";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Content from "./components/Content";
import CountdownTimer from "./components/CountdownTimer";
import PrivacyPolicy from "./components/sub-components/PrivacyPolicy";
import TermsOfUse from "./components/sub-components/TermsOfUse";
import ParticlesBackground from "./components/ParticlesBackground";
import BuyTokenButton from "./components/BuyTokenButton";

//import Loader from "./components/Loader";
// Calculando a data alvo específica para o CountdownTimer
const targetDate = new Date("2025-04-20T00:00:00"); // Exemplo: 20 de abril de 2025 à meia-noite

const App: React.FC = () => {
  return (
    <Router>
      {/* Background de partículas cobrindo toda a página */}
      <ParticlesBackground /> 

      {/* Conteúdo principal com z-index maior para garantir interatividade */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header sem botão de conexão */}
        <Navbar />
       
        {/*<Loader /> */} 

        {/* Countdown Timer fixo abaixo do Header */}
        <CountdownTimer
          targetDate={targetDate}
          message="BTC 120K, get ready for next run!"
        />

        <main className="flex-grow flex items-center justify-center">
          <Routes>
            <Route
              path="/"
              element={
                <div className="container mx-auto p-8 text-center text-white">
                  {/* Seção para o botão de compra de tokens */}
                  <div className="mb-8">
                    <BuyTokenButton />
                  </div>
                  {/* Seção para a compra de NFTs */}
                  <div className="mb-8">
                    <NFTBuySection />
                  </div>
                  {/* Conteúdo principal */}
                  <div>
                    <Content />
                  </div>
                </div>
              }
            />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-use" element={<TermsOfUse />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;



