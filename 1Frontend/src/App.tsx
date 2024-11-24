import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PrivyProvider } from "@privy-io/react-auth";
import LoginPage from "./components/LoginPage";
import NFTBuySection from "./components/NFTBuySection";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Content from "./components/Content";
import CountdownTimer from "./components/CountdownTimer";
import PrivacyPolicy from "./components/sub-components/PrivacyPolicy";
import TermsOfUse from "./components/sub-components/TermsOfUse";
import ParticlesBackground from "./components/ParticlesBackground";
import BuyTokenButton from "./components/BuyTokenButton";

// Calculando a data alvo específica para o CountdownTimer
const targetDate = new Date("2025-04-20T00:00:00"); // Exemplo: 20 de abril de 2025 à meia-noite

const App: React.FC = () => {
  return (
    <PrivyProvider
      appId="cm3vpm98z002tamwc3dgnj91e"
      config={{
        appearance: {
          accentColor: "#6A6FF5",
          theme: "#222224",
          showWalletLoginFirst: false,
          logo: "https://auth.privy.io/logos/privy-logo-dark.png",
          walletChainType: "ethereum-and-solana",
          walletList: ["detected_wallets", "phantom"],
        },
        loginMethods: ["wallet", "google", "discord"],
        fundingMethodConfig: {
          moonpay: {
            useSandbox: true,
          },
        },
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
          requireUserPasswordOnCreate: false,
        },
        mfa: {
          noPromptOnMfaRequired: false,
        },
      }}
    >
      <Router>
        <ParticlesBackground />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <CountdownTimer
            targetDate={targetDate}
            message="BTC 120K, get ready for next run!"
          />
          <main className="flex-grow flex items-center justify-center">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/"
                element={
                  <div className="container mx-auto p-8 text-center text-white">
                    <div className="mb-8">
                      <BuyTokenButton />
                    </div>
                    <div className="mb-8">
                      <NFTBuySection />
                    </div>
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
    </PrivyProvider>
  );
};

export default App;




