import React from 'react';
import { FaFacebookF, FaPinterestP, FaInstagram, FaYoutube, FaLinkedinIn, FaRedditAlien, FaTelegram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-gray-800 text-white py-12 px-6 mt-32 z-0">
      {/* Imagem de fundo */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none z-0"
        style={{
          backgroundImage:
            "url('https://sapphire-accepted-dragonfly-363.mypinata.cloud/ipfs/QmVgG1fb1yWBdfhPMjdZ2Xxhworao51dB57Vgd4jLZ2Yhp')",
        }}
      ></div>

      {/* Conteúdo principal */}
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Logo e Descrição */}
        <div className="flex flex-col items-start space-y-4">
          <a href="/" className="text-2xl font-semibold text-pink-500 hover:text-pink-400">
            LEARNB
          </a>
          <p className="text-sm leading-relaxed">
            LEARNB is your AI-powered copilot for yield farming on Blast, offering multiple investment strategies tailored to your preferences.
          </p>
          <p className="text-xs text-gray-400 leading-relaxed">
            * Expected profit at the exchange rate of $0.06. The exchange rate is subject to change during trading. Use at your own risk.
          </p>
        </div>

        {/* Redes Sociais */}
        <div className="flex flex-col items-start space-y-6">
          <h3 className="text-lg font-semibold tracking-wide">FOLLOW US</h3>
          <div className="grid grid-cols-4 gap-6">
            {/* Redes sociais */}
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center hover:text-pink-300"
            >
              <FaFacebookF className="text-pink-500 text-4xl" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center hover:text-pink-300"
            >
              <FaXTwitter className="text-pink-500 text-4xl" />
            </a>
            <a
              href="https://www.pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center hover:text-pink-300"
            >
              <FaPinterestP className="text-pink-500 text-4xl" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center hover:text-pink-300"
            >
              <FaInstagram className="text-pink-500 text-4xl" />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center hover:text-pink-300"
            >
              <FaYoutube className="text-pink-500 text-4xl" />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center hover:text-pink-300"
            >
              <FaLinkedinIn className="text-pink-500 text-4xl" />
            </a>
            <a
              href="https://www.reddit.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center hover:text-pink-300"
            >
              <FaRedditAlien className="text-pink-500 text-4xl" />
            </a>
            <a
              href="https://t.me/telegramChannel"
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center hover:text-pink-300"
            >
              <FaTelegram className="text-pink-500 text-4xl" />
            </a>
          </div>
        </div>

        {/* Links Legais */}
        <div className="flex flex-col items-start space-y-6">
          <h3 className="text-lg font-semibold tracking-wide">LEGAL</h3>
          <div className="flex flex-col space-y-4">
            <a
              href="/terms-of-use"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Terms and Conditions
            </a>
            <a
              href="/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Privacy Policy
            </a>
            <a
              href="/documentation"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Documentation
            </a>
          </div>
        </div>
      </div>

      {/* Direitos Reservados */}
      <div className="relative mt-12 text-center text-xs text-gray-500">
        © 2024 LEARNB. Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default Footer;

