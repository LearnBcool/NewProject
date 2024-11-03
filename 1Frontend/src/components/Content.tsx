const Content: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      {/* Imagem + Texto */}
      <div className="flex flex-col md:flex-row items-center mb-8">
        <img
          src="/img/Timtin.jpg"
          alt="Descrição da Imagem 1"
          className="w-1/3 h-auto mr-8"
        />
        <p className="text-lg mt-4 md:mt-0">
          <ul>
            A coragem de enfrentar o desconhecido: Tintim e seus companheiros se
            aventuram por lugares exóticos e perigosos, sempre dispostos a
            enfrentar novos desafios.
          </ul>
          <br />
          <br />
          <ul>
            A persistência em busca da verdade: Mesmo diante de dificuldades e
            adversidades, Tintim nunca desiste de desvendar os mistérios que o
            cercam.
          </ul>
          <br />
          <br />
          <ul>
            A importância da amizade e da lealdade: A relação entre Tintim e
            seus amigos, como Milu e o Capitão Haddock, é um exemplo de
            companheirismo e lealdade.
          </ul>
          <br />
          <br />
        </p>
      </div>

      {/* Texto + Imagem */}
      <div className="flex flex-col md:flex-row items-center mb-8">
        <p className="text-lg mr-8 mb-4 md:mb-0">
          <ul>
            A coragem de enfrentar o desconhecido: Tintim e seus companheiros se
            aventuram por lugares exóticos e perigosos, sempre dispostos a
            enfrentar novos desafios.
          </ul>
          <br></br>
          <ul>
            A persistência em busca da verdade: Mesmo diante de dificuldades e
            adversidades, Tintim nunca desiste de desvendar os mistérios que o
            cercam.
          </ul>
          <br></br>
          <ul>
            A importância da amizade e da lealdade: A relação entre Tintim e
            seus amigos, como Milu e o Capitão Haddock, é um exemplo de
            companheirismo e lealdade.
          </ul>
          <br />
        </p>
        <img
          src="/img/Timtin2.jpg"
          alt="Descrição da Imagem 2"
          className="w-1/3 h-auto"
        />
      </div>
      
    </div>
  );
};

export default Content;
