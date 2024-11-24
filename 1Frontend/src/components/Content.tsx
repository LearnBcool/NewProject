const Content: React.FC = () => {
  return (
    <div className="container mx-auto py-8 text-white">
      {/* Imagem + Texto */}
      <div className="flex flex-col md:flex-row items-center mb-12">
        <img
          src="https://sapphire-accepted-dragonfly-363.mypinata.cloud/ipfs/QmTXSBeHoEG6Xdtsez7ihA8PftnCi64fVZhaVnqSRxCWaT"
          alt="Descrição da Imagem 1"
          className="w-2/5 h-auto mr-8"
        />
        <p className="text-lg font-poppins leading-relaxed tracking-wide mt-4 md:mt-0">
          <ul className="mb-4 transition duration-300 hover:text-blue-400 hover:scale-105">
            O graffiti no fundo não é apenas um cenário, mas um símbolo de
            expressão artística e resistência da cultura de rua.
          </ul>
          <ul className="mb-4 transition duration-300 hover:text-blue-400 hover:scale-105">
            Ele contrasta perfeitamente com a moda vintage, conectando-nos aos
            anos 80 e 90, períodos revolucionários no estilo urbano.
          </ul>
          <ul className="mb-4 transition duration-300 hover:text-blue-400 hover:scale-105">
            A atmosfera de alegria e festividade torna a imagem mais atraente e
            cativante.
          </ul>
          <ul className="mb-4 transition duration-300 hover:text-blue-400 hover:scale-105">
            Essa peça celebra a fusão entre moda, arte e cultura, imortalizando
            uma atitude confiante que define gerações.
          </ul>
          <ul className="mb-4 transition duration-300 hover:text-blue-400 hover:scale-105">
            É mais que um NFT: é a personificação de ideias que transcendem o
            tempo.
          </ul>
        </p>
      </div>

      {/* Texto + Imagem */}
      <div className="flex flex-col md:flex-row items-center mb-12">
        <p className="text-lg font-poppins leading-relaxed tracking-wide mr-8 mb-4 md:mb-0">
          <ul className="mb-4 transition duration-300 hover:text-rose-400 hover:scale-105">
            O grafite é uma arte que transforma paredes em telas de criatividade,
            expressando emoções e protestos de uma geração.
          </ul>
          <ul className="mb-4 transition duration-300 hover:text-rose-400 hover:scale-105">
            Mais que cores e formas, ele carrega mensagens universais, refletindo
            as contradições das cidades.
          </ul>
          <ul className="mb-4 transition duration-300 hover:text-rose-400 hover:scale-105">
            Rebelde e efêmero, deixa uma marca profunda ao unir arte e
            resistência, moldando novos significados urbanos.
          </ul>
          <ul className="mb-4 transition duration-300 hover:text-rose-400 hover:scale-105">
            Ele inspira novas formas de expressão e se consolida como um símbolo
            de liberdade e autenticidade nos tempos modernos.
          </ul>
        </p>
        <img
          src="https://sapphire-accepted-dragonfly-363.mypinata.cloud/ipfs/QmbfhWdFMAmWuA2VP6onVZs4YdGCLWG6kPnLj5Gt3n6jGC"
          alt="Descrição da Imagem 2"
          className="w-1/3 h-auto"
        />
      </div>
    </div>
  );
};

export default Content;

