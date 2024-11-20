// Footer.tsx
import React from 'react';
import { FaDiscord, FaTelegram, FaMedium } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 bg-opacity-10 text-white py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo e Descrição */}
        <div className="space-y-2">
          <a href="/" className="text-2xl font-semibold text-pink-500 hover:text-pink-400">
            LEARNB
          </a>
          <p className="text-sm">
            LEARNB is your AI-powered copilot for yield farming on Blast, offering multiple investment strategies tailored to your preferences.
          </p>
          <p className="text-xs text-gray-400">
            * Expected profit at the exchange rate of $0.06. The exchange rate is subject to change during trading. Use at your own risk.
          </p>
        </div>

        {/* Redes Sociais */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">FOLLOW US</h3>
          <div className="flex flex-col space-y-2">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:text-pink-300">
              <span className="text-pink-500"><FaXTwitter /></span>
              <span>Twitter</span>
            </a>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:text-pink-300">
              <span className="text-pink-500"><FaDiscord /></span>
              <span>Discord</span>
            </a>
            <a href="https://t.me/telegramChannel" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:text-pink-300">
              <span className="text-pink-500"><FaTelegram /></span>
              <span>Telegram Channel</span>
            </a>
            <a href="https://t.me/telegramCommunity" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:text-pink-300">
              <span className="text-pink-500"><FaTelegram /></span>
              <span>Telegram Community Chat</span>
            </a>
            <a href="https://medium.com" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:text-pink-300">
              <span className="text-pink-500"><FaMedium /></span>
              <span>Medium</span>
            </a>
          </div>
        </div>

        {/* Links Legais */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">LEGAL</h3>
          <div className="flex flex-col space-y-2">
            <a href="/terms-of-use" target="_blank" rel="noopener noreferrer" className="hover:underline">
              Terms and Conditions
            </a>
            <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:underline">
              Privacy Policy
            </a>
            <a href="/documentation" target="_blank" rel="noopener noreferrer" className="hover:underline">
              Documentation
            </a>
            <a href="/referral-program" target="_blank" rel="noopener noreferrer" className="hover:underline">
              Referral Program
            </a>
          </div>
        </div>
      </div>

      {/* Direitos Reservados */}
      <div className="mt-8 text-center text-xs text-gray-500">
        © 2024 LEARNB. Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default Footer;
