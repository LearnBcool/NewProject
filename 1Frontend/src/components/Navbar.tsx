import React, { useState, FC } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom"; // Importado para criar links de navegação

interface NavItemProps {
  title: string;
  path: string; // Caminho da rota
  classProps?: string;
}

const NavigationItem: FC<NavItemProps> = ({ title, path, classProps }) => (
  <li className={`mx-4 cursor-pointer ${classProps}`}>
    <Link to={path}>{title}</Link>
  </li>
);

const Navbar: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Navbar fixa no topo */}
      <nav className="w-full fixed top-0 left-0 z-50 bg-black flex md:justify-center justify-between items-center p-4 shadow-lg">
        <div className="md:flex-[0.5] flex-initial justify-center items-center">
          <img
            src="/img/Mobiupcrafiti.png"
            alt="logo"
            className="w-32 cursor-pointer"
          />
        </div>
        <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
          {/* Navegação por links dinâmicos */}
          {[
            { title: "Market", path: "/" },
            { title: "Exchange", path: "/" },
            { title: "Tutorials", path: "/" },
            { title: "Wallets", path: "/" },
          ].map((item, index) => (
            <NavigationItem
              key={`${item.title}-${index}`}
              title={item.title}
              path={item.path}
            />
          ))}
          {/* Botão de login redirecionando para a página de login */}
          <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
            <Link to="/login">Login</Link>
          </li>
        </ul>
        <div className="flex relative">
          {!isMenuOpen && (
            <HiMenuAlt4
              fontSize={28}
              className="text-white md:hidden cursor-pointer"
              onClick={() => setIsMenuOpen(true)}
            />
          )}
          {isMenuOpen && (
            <AiOutlineClose
              fontSize={28}
              className="text-white md:hidden cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            />
          )}
          {isMenuOpen && (
            <ul
              className="z-10 fixed top-0 right-0 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
              flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in bg-black"
            >
              <li className="text-xl w-full my-2">
                <AiOutlineClose onClick={() => setIsMenuOpen(false)} />
              </li>
              {[
                { title: "Market", path: "/" },
                { title: "Exchange", path: "/" },
                { title: "Tutorials", path: "/" },
                { title: "Wallets", path: "/" },
              ].map((item, index) => (
                <NavigationItem
                  key={`${item.title}-${index}`}
                  title={item.title}
                  path={item.path}
                  classProps="my-2 text-lg"
                />
              ))}
              {/* Botão de login no menu móvel */}
              <li
                className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]"
              >
                <Link to="/login">Login</Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
      {/* Espaçamento abaixo do Navbar */}
      <div className="h-16 md:h-20"></div>
    </>
  );
};

export default Navbar;



