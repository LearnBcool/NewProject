import React from 'react';
import { FaTelegram, FaFileAlt } from 'react-icons/fa'; // Importando os ícones desejados
import {FaXTwitter} from 'react-icons/fa6'

const Header: React.FC = () => {
  return (
    <header className="bg-cyan-500 text-white py-5">
      <nav className="flex justify-center space-x-11">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex items-center hover:underline">
          <FaXTwitter className="mr-2" size={20} /> {/* Ícone do Twitter */}
          Twitter
        </a>
        <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="flex items-center hover:underline">
          <FaTelegram className="mr-2" size={20} /> {/* Ícone do Telegram */}
          Telegram
        </a>
        <a href="https://app.gitbook.com/" target="_blank" rel="noopener noreferrer" className="flex items-center hover:underline">
          <FaFileAlt className="mr-2" size={20} /> {/* Ícone para Docs */}
          Docs
        </a>
      </nav>
    </header>
  );
};

export default Header;

