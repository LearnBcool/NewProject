// PrivacyPolicy.tsx
import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-gray-100 text-gray-800 p-8 max-w-3xl mx-auto my-10 rounded shadow-lg">
      <h1 className="text-3xl font-bold mb-4">Política de Privacidade</h1>
      <p className="mb-4">
        Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações
        quando você acessa nosso site e utiliza nossos serviços.
      </p>

      <section className="mt-4">
        <h2 className="text-2xl font-semibold mb-2">1. Informações que Coletamos</h2>
        <p>Coletamos informações pessoais que você nos fornece voluntariamente ao se registrar em nosso site ou usar nossos serviços.</p>
        <ul className="list-disc pl-6 mt-2">
          <li>Informações de contato, como nome e endereço de e-mail.</li>
          <li>Dados de navegação e uso, como endereço IP e histórico de uso.</li>
          <li>Informações financeiras, se aplicável, para processar pagamentos.</li>
        </ul>
      </section>

      <section className="mt-4">
        <h2 className="text-2xl font-semibold mb-2">2. Uso das Informações</h2>
        <p>Utilizamos suas informações para fornecer e melhorar nossos serviços, realizar análises e oferecer uma experiência personalizada.</p>
        <ul className="list-disc pl-6 mt-2">
          <li>Para autenticar e gerenciar seu acesso ao nosso site.</li>
          <li>Para responder a suas solicitações e oferecer suporte ao cliente.</li>
          <li>Para enviar comunicações relacionadas a marketing, quando permitido.</li>
        </ul>
      </section>

      <section className="mt-4">
        <h2 className="text-2xl font-semibold mb-2">3. Compartilhamento de Informações</h2>
        <p>Não compartilhamos suas informações com terceiros, exceto quando necessário para cumprir a lei ou proteger nossos direitos.</p>
        <ul className="list-disc pl-6 mt-2">
          <li>Com fornecedores de serviços, como provedores de pagamento e análise.</li>
          <li>Para atender a exigências legais ou solicitações de autoridades.</li>
          <li>No caso de fusão, aquisição ou venda de ativos, suas informações podem ser transferidas.</li>
        </ul>
      </section>

      <section className="mt-4">
        <h2 className="text-2xl font-semibold mb-2">4. Segurança</h2>
        <p>Adotamos medidas para proteger suas informações contra acesso não autorizado, mas não podemos garantir total segurança.</p>
        <p className="mt-2">Utilizamos técnicas de criptografia e monitoramento para proteger seus dados.</p>
      </section>

      <section className="mt-4">
        <h2 className="text-2xl font-semibold mb-2">5. Retenção de Dados</h2>
        <p>Mantemos suas informações apenas enquanto necessário para os fins descritos nesta Política, ou conforme exigido por lei.</p>
      </section>

      <section className="mt-4">
        <h2 className="text-2xl font-semibold mb-2">6. Seus Direitos</h2>
        <p>Você tem o direito de acessar, corrigir ou excluir suas informações pessoais. Para exercer esses direitos, entre em contato conosco.</p>
      </section>

      <section className="mt-4">
        <h2 className="text-2xl font-semibold mb-2">7. Cookies e Tecnologias de Rastreamento</h2>
        <p>Utilizamos cookies e tecnologias similares para aprimorar sua experiência. Você pode controlar o uso de cookies em seu navegador.</p>
      </section>

      <section className="mt-4">
        <h2 className="text-2xl font-semibold mb-2">8. Alterações nesta Política</h2>
        <p>Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre quaisquer alterações publicando a nova política em nosso site.</p>
      </section>

      <section className="mt-4">
        <h2 className="text-2xl font-semibold mb-2">9. Contato</h2>
        <p>Se tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco por meio das informações fornecidas em nosso site.</p>
      </section>

      <p className="text-gray-600 mt-8">Última atualização: 06 de novembro de 2024</p>
    </div>
  );
};

export default PrivacyPolicy;

