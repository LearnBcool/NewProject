import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 text-center">
      <div className="flex justify-center space-x-8">
        <a href="/privacy" target="_blank" className="hover:underline">
          Política de Privacidade
        </a>
        <a href="/terms" target="_blank" className="hover:underline">
          Termos de Uso
        </a>
        <span>© 2024 Todos os direitos reservados</span>
      </div>
    </footer>
  );
};

export default Footer;
