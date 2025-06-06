:root {
  --azul: #060bff;
  --azul-escuro: #0408b3;
  --vermelho: #f60300;
  --branco: #ffffff;
  --cinza-claro: #f0f0f0;
  --cinza-medio: #e0e0e0;
  --cinza-escuro: #333333;
  --sombra: 0 4px 6px rgba(0, 0, 0, 0.1);
  --max-width: 1600px;
  --padding-lateral: 5vw;
  --transicao: all 0.3s ease;
}

/* Reset e Estilos Base */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Roboto", sans-serif;
  background-color: var(--branco);
  color: var(--cinza-escuro);
  line-height: 1.6;
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Cabeçalho */
header {
  background-color: #060bff;
  color: white;
  padding: 0.8rem var(--padding-lateral);
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: var(--sombra);
}

header > .container {
  max-width: none;
  margin: 0;
  padding: 0;
  width: 100%;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
}

.logo-titulo {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-right: auto;
}

.logo {
  height: 50px;
  width: auto;
}

nav h1 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  padding: 0;
  line-height: 1.2;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  white-space: nowrap;
}

/* Botão Menu Hamburger (Mobile) */
.menu-toggle {
  display: none; /* Visível apenas em media queries */
  background: none;
  border: none;
  color: var(--branco);
  font-size: 1.8rem; /* Ícone maior para facilitar toque */
  cursor: pointer;
  padding: 0.5rem;
  order: 2; /* Ordem no flex container em telas pequenas */
  margin-left: 1rem;
}

/* Menu de Navegação Principal */
.menu {
  display: flex;
  gap: 2rem;
}

.menu a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem;
  transition: color 0.3s;
  position: relative;
  font-size: 1.1rem;
}

.menu a:hover {
  color: var(--cinza-claro);
}

.menu a::after {
  /* Efeito de sublinhado no hover */
  content: "";
  position: absolute;
  width: calc(100% - 1rem);
  height: 2px;
  background: white;
  bottom: 0;
  left: 0.5rem;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.menu a:hover::after {
  transform: scaleX(1);
}

.menu-carrinho {
  display: flex;
  align-items: center;
  gap: 2rem;
}

/* Estilização do drop no menu */

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-btn {
  /* Estilos para parecer com os outros links do menu */
  background: none;
  border: none;
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem;
  font-size: 1.1rem;
  font-family: "Roboto", sans-serif;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem; /* Espaço entre o texto "Produtos" e a seta */
}

.dropdown-btn .fa-chevron-down {
  font-size: 0.8em; /* Deixa a seta um pouco menor que o texto */
  transition: transform 0.3s ease;
}

/* Gira a seta para cima quando o menu está aberto */
.dropdown-btn.open .fa-chevron-down {
  transform: rotate(180deg);
}

.dropdown-content {
  display: none; /* O menu fica escondido por padrão */
  position: absolute;
  background-color: #f9f9f9; /* Cor de fundo do menu */
  min-width: 260px; /* Largura mínima */
  box-shadow: var(--sombra);
  z-index: 1001; /* Garante que fique acima de outros elementos */
  border-radius: 8px;
  margin-top: 10px; /* Distância entre o botão e o menu */
  overflow: hidden; /* Para garantir que os cantos dos links sejam arredondados */
  opacity: 0;
  transform: translateY(-10px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

/* Classe 'show' que será adicionada via JS para exibir o menu */
.dropdown-content.show {
  display: block;
  opacity: 1;
  transform: translateY(0);
}

.dropdown-content a {
  color: var(--cinza-escuro);
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  transition: background-color 0.2s ease;
}

.dropdown-content a:hover {
  background-color: #e7e7e7;
}

/* Estilos do Carrinho */
.carrinho-container {
  position: relative;
  margin-left: 10px;
  padding-left: 2rem;
}

.carrinho-btn {
  background: none;
  border: none;
  color: var(--branco);
  font-size: 1.5rem;
  cursor: pointer;
  position: relative;
  transition: var(--transicao);
}

.carrinho-btn:hover {
  color: var(--vermelho);
}

.carrinho-quantidade {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: var(--vermelho);
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: bold;
}

.carrinho-dropdown {
  position: absolute;
  right: 0;
  top: 100%;
  width: 350px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  transform: translateY(10px);
}

.carrinho-container:hover .carrinho-dropdown,
.carrinho-container.active .carrinho-dropdown {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.carrinho-items {
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 1.5rem;
  padding-right: 0.5rem;
}

.carrinho-item {
  display: flex;
  align-items: flex-start;
  padding: 1rem 0;
  gap: 1rem;
  border-bottom: 1px solid var(--cinza-claro);
}

.carrinho-item:last-child {
  border-bottom: none;
  margin-bottom: 0.5rem;
}

.carrinho-item img {
  width: 70px;
  height: 70px;
  object-fit: contain;
  margin-right: 1rem;
  border-radius: 8px;
  background: var(--cinza-claro);
}

.carrinho-item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.carrinho-item-nome {
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0;
  line-height: 1.3;
  color: var(--cinza-escuro);
}

.carrinho-item-preco {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vermelho);
  margin-bottom: 0;
}

.carrinho-item-controls {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 0.25rem;
}

.carrinho-item-controls button {
  background-color: var(--cinza-claro);
  color: var(--cinza-escuro);
  border: 1px solid var(--cinza-medio);
  border-radius: 50%;
  width: 28px;
  height: 28px;
  font-size: 1.1rem;
  font-weight: normal;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  transition: background-color 0.2s ease, border-color 0.2s ease;
  padding: 0;
}

.carrinho-item-controls button:hover {
  background-color: var(--cinza-medio);
  border-color: #b0b0b0;
}

.carrinho-item-controls .carrinho-item-quantidade {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--cinza-escuro);
  min-width: 20px;
  text-align: center;
  padding: 0 0.2rem;
}
.carrinho-item-remover-total {
  background: none;
  border: none;
  color: #aaa;
  cursor: pointer;
  font-size: 1.15rem;
  padding: 0.5rem;
  margin-left: 0.5rem;
  align-self: center;
  transition: color 0.2s ease;
}

.carrinho-item-remover-total:hover {
  color: var(--vermelho);
}

.carrinho-total {
  border-top: 2px solid var(--cinza-claro);
  padding-top: 1rem;
  margin-top: 1rem;
}

.carrinho-total p {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
}

.carrinho-total span {
  color: var(--vermelho);
  font-size: 1.3rem;
  font-weight: 700;
}

.btn-finalizar {
  background-color: var(--azul);
  color: white;
  border: none;
  padding: 0.9rem 1.5rem;
  border-radius: 50px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.btn-finalizar:hover {
  background-color: var(--azul-escuro);
}

.carrinho-vazio {
  text-align: center;
  color: var(--cinza-escuro);
  padding: 1rem 0;
}

/* Seção de Introdução */
.intro {
  text-align: center;
  padding: 4rem 5%;
  position: relative;
  background-image: linear-gradient(
      180deg,
      rgba(6, 11, 255, 0.7),
      rgba(255, 255, 255, 0.7)
    ),
    url("assets/img/fundo-farmacia.avif");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-blend-mode: lighten;
  color: var(--cinza-escuro);
}

.intro::before {
  /* Overlay para melhorar contraste do texto */
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.6);
  z-index: 0;
}

.intro h2 {
  position: relative;
  z-index: 1;
  font-size: 2.8rem;
  font-weight: 800;
  padding: 1rem 2rem;
  border-radius: 10px;
  display: inline-block;
  color: var(--azul);
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
}

.intro p {
  position: relative;
  z-index: 1;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
  font-size: 1.1rem;
  max-width: 800px;
  margin: 1rem auto 0;
}

/* Carrossel de Produtos */
.produtos-container {
  width: 100%;
  max-width: var(--max-width);
  margin: 4rem auto;
  padding: 0 var(--padding-lateral);
  position: relative;
}

.produtos-container h2 {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.2rem;
  color: var(--azul-escuro);
}

.produtos-carrossel {
  display: flex;
  overflow-x: auto;
  /* scroll-snap-type: x mandatory; /* IMPORTANTE: Para carrossel infinito JS, considere remover ou usar 'proximity' */
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  padding: 2rem 1rem;
  scrollbar-width: none; /* Esconde scrollbar no Firefox */
  position: relative;
}

/* Fade gradiente nas laterais do carrossel (opcional para carrossel infinito) */
.produtos-carrossel::after {
  content: "";
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 60px;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.9) 100%
  );
  pointer-events: none;
  opacity: 0; /* Controlado por hover no JS ou CSS */
  transition: opacity 0.3s ease;
}

.produtos-carrossel:hover::after {
  opacity: 1;
}

.produtos-carrossel::-webkit-scrollbar {
  display: none; /* Esconde scrollbar em navegadores WebKit */
}

.produtos-grid {
  display: flex;
  gap: 1.5rem;
  padding: 0.5rem;
}

.produto-card {
  min-width: 280px;
  max-width: 300px;
  background: var(--branco);
  border-radius: 18px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1),
    box-shadow 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1);
  position: relative; /* Para z-index no hover */
  flex-shrink: 0;
  border: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  z-index: 1; /* Ordem de empilhamento base */
}

.produto-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
  z-index: 10; /* Card em hover fica por cima */
}

.produto-img-container {
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    var(--cinza-claro) 0%,
    var(--branco) 100%
  );
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
}

.produto-img {
  max-height: 150%;
  max-width: 150%;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.produto-card:hover .produto-img {
  transform: scale(1.05);
}

.produto-info {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* Essencial para alinhar conteúdo (botão/preço) ao final */
}

.produto-info h3 {
  color: var(--azul-escuro);
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  min-height: 2.6em; /* Garante altura consistente para títulos de 1 ou 2 linhas */
}

.produto-descricao {
  color: var(--cinza-escuro);
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  min-height: 40px; /* Altura mínima para descrições */
  flex-grow: 1; /* Faz a descrição ocupar espaço, empurrando preço/botão para baixo */
}

.produto-preco {
  color: var(--vermelho);
  font-weight: 800;
  font-size: 1.5rem;
  margin: 0.3rem 0;
}

.produtos-container:hover .carrossel-btn {
  opacity: 1;
}

.btn-comprar {
  background-color: var(--azul);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 1rem;
}

.btn-comprar:hover {
  background-color: var(--azul-escuro);
  transform: translateY(-2px);
}

.carrossel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  background: var(--branco);
  border: none;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--azul);
  font-size: 1.3rem;
  opacity: 0;
  transition: all 0.3s ease;
}

.carrossel-btn.prev {
  left: 20px;
}

.carrossel-btn.next {
  right: 20px;
}

.carrossel-btn:hover {
  background-color: var(--azul);
  color: var(--branco);
  transform: translateY(-50%) scale(1.1);
}

.section {
  padding: 4rem 0;
  text-align: center;
}

.section h2 {
  font-size: 2.5rem;
  color: var(--azul-escuro);
  margin-bottom: 3rem;
}

.equipe {
  background-color: var(--cinza-claro);
}

.equipe-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 0 20px;
}

.fotos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  padding: 0 20px;
}

.card {
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: white;
  transition: all 0.3s ease;
  margin: 0.5rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.card:hover img {
  filter: brightness(1.05);
}

.card img {
  width: 100%;
  height: 300px;
  object-fit: contain;
  object-position: center;
  background-color: #f8f8f8;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.card-content {
  /* Para o conteúdo textual dentro dos cards genéricos */
  padding: 1rem 1.5rem;
  flex-grow: 1;
}

.card h3 {
  margin: 0 0 0.5rem 0;
  padding: 0;
  font-size: 1.3rem;
  color: #060bff;
  font-weight: 700;
  line-height: 1.3;
}

.card p {
  /* Estilo base para parágrafos nos cards */
  margin: 0.3rem 0;
  color: var(--cinza-escuro);
}

.equipe-grid .card p:first-of-type, /* Cargo na equipe */
.fotos-grid .card figcaption {
  /* Legenda das fotos */
  font-weight: 600;
  color: #333;
  margin-bottom: 0.8rem;
  font-size: 1.1rem;
}

.equipe-grid .card .bio {
  /* Bio na equipe */
  font-size: 0.9rem;
  color: #666;
  font-style: italic;
  flex-grow: 1;
}

.novo-tag {
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: var(--vermelho);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 600;
  z-index: 2;
}

/* Feedback de Adição ao Carrinho */
.feedback-carrinho {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--azul);
  color: white;
  padding: 12px 24px;
  border-radius: 50px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1000;
}

.feedback-carrinho.show {
  opacity: 1;
}

/* === ESTILOS OTIMIZADOS PARA O RODAPÉ === */
footer {
  background-color: var(--cinza-escuro);
  color: var(--branco);
  padding: 2.5rem var(--padding-lateral) 1.5rem;
  text-align: left; /* Alinhamento base */
}

footer .container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.5rem;
}

.footer-info,
.footer-links-social {
  /* Este seletor assume que você criou a div .footer-links-social no HTML */
  flex-grow: 1;
  margin-bottom: 1rem;
}

/* Fallback se .footer-links-social não for usado (estiliza nav e .social individualmente) */
footer nav[aria-label="Navegação do rodapé"],
footer .social {
  flex-grow: 1;
  margin-bottom: 1rem; /* Assegura espaçamento quando empilhados */
}

.footer-info p {
  margin-bottom: 0.4rem;
  font-size: 0.875rem;
  line-height: 1.6;
}

.footer-info p strong {
  font-size: 1rem;
  display: block;
  margin-bottom: 0.5rem;
}

footer nav[aria-label="Navegação do rodapé"] {
  margin-bottom: 1rem;
}

footer nav[aria-label="Navegação do rodapé"] a {
  color: var(--branco);
  text-decoration: none;
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

footer nav[aria-label="Navegação do rodapé"] a:hover {
  color: var(--cinza-claro);
}

footer nav[aria-label="Navegação do rodapé"] a::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background-color: var(--cinza-claro);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease-in-out;
}

footer nav[aria-label="Navegação do rodapé"] a:hover::after {
  transform: scaleX(1);
}

footer .social a {
  color: var(--branco);
  text-decoration: none;
  font-size: 1.4rem;
  margin-right: 1rem;
  transition: color 0.3s ease, transform 0.3s ease;
}
footer .social a:last-child {
  margin-right: 0;
}

footer .social a:hover {
  color: var(--cinza-claro);
  transform: translateY(-2px) scale(1.1);
}

.footer-copyright {
  flex-basis: 100%;
  text-align: center;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #4a4a4a; /* Linha separadora sutil */
  font-size: 0.8rem;
  color: #ccc;
}

.footer-developer-credit {
  flex-basis: 100%; /* Ocupa toda a largura, abaixo do copyright */
  text-align: center;
  margin-top: 0.4rem; /* Espaço entre o copyright e este crédito */
  padding-bottom: 0.5rem; /* Um pequeno respiro na parte inferior do rodapé */
  font-size: 0.75rem; /* Fonte pequena para ser discreto */
  color: #aaa; /* Cor um pouco mais clara que o copyright, ou a mesma */
}

.footer-developer-credit .developer-link {
  color: #bbb; /* Cor para o link do desenvolvedor */
  text-decoration: none;
  display: inline-flex; /* Alinha o logo e o texto na mesma linha de forma elegante */
  align-items: center; /* Centraliza verticalmente o logo com o texto */
  gap: 0.1rem; /* Pequeno espaço entre o logo e o nome da empresa */
  transition: color 0.3s ease;
}

.footer-developer-credit .developer-link:hover {
  color: var(--branco); /* Cor mais clara no hover */
}

.footer-developer-credit .developer-logo {
  height: 50px; /* Ajuste a altura do logo conforme necessário */
  width: auto; /* Mantém a proporção */
}
.footer-copyright {
  /* ... seus estilos existentes ... */
  margin-top: 0rem;
  padding-top: 1rem;
  margin-bottom: 0rem; /* Remove margem inferior se o crédito do dev vier logo abaixo */
}

/* --- Estilos para o Ícone Flutuante do WhatsApp --- */

.whatsapp-float-btn {
  position: fixed;
  width: 60px;
  height: 60px;
  bottom: 25px; /* Distância da parte de baixo da tela */
  right: 25px; /* Distância da parte direita da tela */
  background-color: #25d366; /* Cor oficial do WhatsApp */
  color: #fff;
  border-radius: 50%;
  text-align: center;
  font-size: 30px; /* Tamanho do ícone de whatsapp */
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.25);
  z-index: 1000;

  display: flex;
  align-items: center;
  justify-content: center;

  text-decoration: none; /* Remove o sublinhado do link */
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.whatsapp-float-btn:hover {
  background-color: #128c7e; /* Cor mais escura para o efeito hover */
  transform: scale(1.1); /* Aumenta um pouco de tamanho ao passar o mouse */
}

/* Media Queries (Responsividade) */

@media (max-width: 992px) {
  .menu {
    gap: 1.5rem;
  }
  .menu a {
    font-size: 1rem;
  }
  .produtos-container {
    padding: 0 20px;
  }
  .produtos-carrossel {
    padding: 1rem 0.5rem;
  }
  .carrossel-btn.prev {
    left: 5px;
  }
  .carrossel-btn.next {
    right: 5px;
  }
  .carrinho-dropdown {
    width: 300px;
  }
}

@media (max-width: 768px) {
  .logo-titulo {
    flex-grow: 1;
    justify-content: flex-start;
  }
  header > nav {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 1rem 20px;
  }
  .logo-titulo h1 {
    font-size: 1.5rem;
    margin-bottom: 0;
    text-align: left;
  }
  .menu-toggle {
    display: block;
    order: 2;
  }
  .menu {
    display: none;
    flex-direction: column;
    width: 100%;
    order: 3;
    gap: 0.5rem;
    padding-top: 1rem;
    text-align: center;
  }
  .menu.active {
    display: flex;
  }
  .menu a {
    font-size: 1.1rem;
    padding: 0.5rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }
  .menu a:last-child {
    border-bottom: none;
  }
  .carrinho-container {
    order: 1;
    position: static;
    margin-left: 0;
    padding-left: 0;
  }
  .carrinho-dropdown {
    position: absolute;
    top: calc(100% + 10px);
    right: 20px;
    width: 360px;
    max-width: 400px;
    left: auto;
    transform: translateY(0);
  }
  .intro h2 {
    font-size: 2rem;
  }
  .intro p {
    font-size: 1rem;
    padding: 0.5rem 1rem;
  }
  .section {
    padding: 3rem 0;
  }
  .section h2 {
    font-size: 1.8rem;
    margin-bottom: 2rem;
  }
  .equipe-grid,
  .fotos-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
  .produto-card {
    min-width: 150px;
  }
  .produto-img-container {
    height: 150px;
  }

  /* Footer em telas médias: blocos empilhados e centralizados */
  .footer-info,
  .footer-links-social, /* Aplica se a div wrapper existir */
  footer nav[aria-label="Navegação do rodapé"], /* Fallback */
  footer .social {
    /* Fallback */
    flex-basis: 100%;
    text-align: center;
  }
  footer nav[aria-label="Navegação do rodapé"] {
    align-items: center; /* Centraliza os links <a> */
  }
}

@media (min-width: 768px) {
  /* Layout do Footer para Desktop */
  .footer-info {
    flex-basis: 48%;
    margin-bottom: 0;
    padding-right: 1rem;
  }
  .footer-links-social {
    flex-basis: 48%;
    margin-bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  footer nav[aria-label="Navegação do rodapé"]:not(.footer-links-social nav) {
    flex-basis: auto;
    align-items: flex-start;
    margin-bottom: 1rem;
  }
  footer nav[aria-label="Navegação do rodapé"]:not(.footer-links-social nav) a {
    display: inline-block; /* Links lado a lado */
    margin: 0 1rem 0.3rem 0;
  }
  footer .social:not(.footer-links-social .social) {
    flex-basis: auto;
    text-align: left;
    margin-bottom: 0;
  }
}

@media (max-width: 480px) {
  .logo-titulo h1 {
    font-size: 1.2rem;
  }
  .logo {
    height: 35px;
  }
  .menu-toggle {
    font-size: 1.5rem;
  }
  .intro h2 {
    font-size: 1.8rem;
    padding: 0.8rem 1rem;
  }
  .intro p {
    font-size: 0.9rem;
    padding: 0.5rem;
  }
  .section h2 {
    font-size: 1.6rem;
    margin-bottom: 1.5rem;
  }
  .produtos-carrossel {
    padding-top: 0.5rem;
    padding-bottom: 1rem;
    gap: 1rem;
  }
  .produtos-grid {
    padding-left: 1rem;
    padding-right: 1rem;
    gap: 0.8rem;
  }
  .produto-card {
    min-width: 160px;
    max-width: 160px;
    border-radius: 12px;
    margin: 0;
  }

  .produto-img-container {
    height: 160px; /* Altura da área da imagem bem menor */
    padding: 0.8rem;
  }

  .produto-info {
    padding: 1rem;
  }

  .produto-info h3 {
    font-size: 0.8rem;
    min-height: auto;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .produto-descricao {
    font-size: 0.6rem;
    margin-bottom: 0.8rem;
    line-height: 1.4;
    height: 2.8em;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .produto-preco {
    font-size: 1.25rem;
  }
  .carrossel-btn {
    width: 40px;
    height: 40px;
    font-size: 1rem;
    display: none;
  }
  .btn-comprar {
    padding: 0.7rem 1.2rem;
    font-size: 0.9rem;
  }
  .equipe-grid,
  .fotos-grid {
    grid-template-columns: 1fr;
  }
  .card {
    margin: 0.5rem 10px;
  }
  .carrinho-dropdown {
    width: calc(100% - 40px);
    left: 20px;
    right: 20px;
  }

  footer {
    padding: 1.5rem 1rem 1rem;
  }
  footer nav[aria-label="Navegação do rodapé"] a {
    display: block;
    margin: 0.3rem 0;
  }
  footer .social a {
    margin: 0 0.4rem;
  }
}
