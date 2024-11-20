import React from 'react';
import { FaTelegram, FaFileAlt } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Navbar: React.FC = () => {
  return (
    <header className="bg-cyan-500 text-white bg-opacity-0 py-5 fixed w-full top-0 z-50">
      <nav className="flex justify-center items-center space-x-11">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex items-center hover:underline">
          <FaXTwitter className="mr-2" size={20} /> 
          Twitter
        </a>
        <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="flex items-center hover:underline">
          <FaTelegram className="mr-2" size={20} />
          Telegram
        </a>
        <a href="https://app.gitbook.com/" target="_blank" rel="noopener noreferrer" className="flex items-center hover:underline">
          <FaFileAlt className="mr-2" size={20} />
          Docs
        </a>

        {/* O botão de conexão com carteira foi removido */}
      </nav>
    </header>
  );
};

export default Navbar;




