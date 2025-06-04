document.addEventListener("DOMContentLoaded", function () {
  const carrosselContainer = document.querySelector(".produtos-container");
  if (carrosselContainer) {
    const carrossel = carrosselContainer.querySelector(".produtos-carrossel");
    const btnPrev = carrosselContainer.querySelector(".carrossel-btn.prev");
    const btnNext = carrosselContainer.querySelector(".carrossel-btn.next");
    const produtosGrid = carrossel
      ? carrossel.querySelector(".produtos-grid")
      : null;

    if (
      produtosGrid &&
      produtosGrid.children.length > 0 &&
      btnPrev &&
      btnNext
    ) {
      const originalCards = Array.from(produtosGrid.children);
      const numOriginalCards = originalCards.length;

      originalCards
        .slice()
        .reverse()
        .forEach((card) => {
          const clone = card.cloneNode(true);
          produtosGrid.insertBefore(clone, produtosGrid.firstChild);
        });
      originalCards.forEach((card) => {
        const clone = card.cloneNode(true);
        produtosGrid.appendChild(clone);
      });

      let cardWidth = originalCards[0].offsetWidth;
      let gap = parseFloat(getComputedStyle(produtosGrid).gap) || 24;
      let currentIndex = numOriginalCards;
      let isTransitioning = false;

      function calculateDimensions() {
        if (produtosGrid.children[numOriginalCards]) {
          cardWidth = produtosGrid.children[numOriginalCards].offsetWidth;
        } else if (originalCards.length > 0) {
          cardWidth = originalCards[0].offsetWidth;
        }
        gap = parseFloat(getComputedStyle(produtosGrid).gap) || 24;
      }

      function setInitialPosition() {
        calculateDimensions();
        const initialOffset = currentIndex * (cardWidth + gap);
        carrossel.style.scrollBehavior = "auto";
        carrossel.scrollLeft = initialOffset;
        requestAnimationFrame(() => {
          carrossel.style.scrollBehavior = "smooth";
        });
      }

      setInitialPosition();

      function moveTo(newIndexDirection) {
        if (isTransitioning) return;
        isTransitioning = true;

        currentIndex += newIndexDirection;
        const targetScrollLeft = currentIndex * (cardWidth + gap);

        carrossel.scrollTo({
          left: targetScrollLeft,
          behavior: "smooth",
        });

        setTimeout(() => {
          let jumped = false;
          if (currentIndex >= numOriginalCards * 2) {
            currentIndex = numOriginalCards;
            jumped = true;
          } else if (currentIndex < numOriginalCards) {
            currentIndex = numOriginalCards * 2 - 1;
            jumped = true;
          }

          if (jumped) {
            carrossel.style.scrollBehavior = "auto";
            carrossel.scrollLeft = currentIndex * (cardWidth + gap);
            requestAnimationFrame(() => {
              carrossel.style.scrollBehavior = "smooth";
            });
          }
          isTransitioning = false;
        }, 500);
      }

      btnNext.addEventListener("click", () => moveTo(1));
      btnPrev.addEventListener("click", () => moveTo(-1));

      function updateButtonVisibility() {
        const canScroll =
          numOriginalCards > 0 &&
          produtosGrid.scrollWidth > Math.ceil(carrossel.clientWidth) + 1;
        btnPrev.style.visibility = canScroll ? "visible" : "hidden";
        btnNext.style.visibility = canScroll ? "visible" : "hidden";
      }

      updateButtonVisibility();
      window.addEventListener("resize", () => {
        setInitialPosition();
        updateButtonVisibility();
      });
    } else {
      if (btnPrev) btnPrev.style.display = "none";
      if (btnNext) btnNext.style.display = "none";
    }
  }

  const carrinhoBtn = document.querySelector(".carrinho-btn");
  const carrinhoDropdown = document.querySelector(".carrinho-dropdown");
  const carrinhoItemsContainer = document.querySelector(".carrinho-items");
  const carrinhoQuantidadeIcone = document.querySelector(
    ".carrinho-quantidade"
  );
  const carrinhoTotalDisplay = document.querySelector(".carrinho-total span");
  const btnFinalizarCompra = document.querySelector(".btn-finalizar");

  let carrinho = JSON.parse(localStorage.getItem("carrinhoTorresFarma")) || [];

  function salvarCarrinho() {
    localStorage.setItem("carrinhoTorresFarma", JSON.stringify(carrinho));
  }

  function atualizarInterfaceCarrinho() {
    if (
      !carrinhoItemsContainer ||
      !carrinhoQuantidadeIcone ||
      !carrinhoTotalDisplay
    ) {
      return;
    }

    const totalItens = carrinho.reduce(
      (total, item) => total + item.quantidade,
      0
    );
    carrinhoQuantidadeIcone.textContent = totalItens;

    if (carrinho.length === 0) {
      carrinhoItemsContainer.innerHTML =
        '<p class="carrinho-vazio">Seu carrinho está vazio</p>';
      carrinhoTotalDisplay.textContent = "R$ 0,00";
    } else {
      carrinhoItemsContainer.innerHTML = "";
      let subTotalPedido = 0;
      carrinho.forEach((item, index) => {
        const itemElement = document.createElement("div");
        itemElement.className = "carrinho-item";
        itemElement.innerHTML = `
                    <img src="${item.imagem}" alt="${item.nome}">
                    <div class="carrinho-item-info">
                        <p class="carrinho-item-nome">${item.nome}</p>
                        <p class="carrinho-item-preco">R$ ${item.preco.toFixed(
                          2
                        )}</p>
                        <div class="carrinho-item-controls">
                            <button class="carrinho-item-diminuir" data-index="${index}" aria-label="Diminuir quantidade de ${
          item.nome
        }">-</button>
                            <span class="carrinho-item-quantidade">Qtd: ${
                              item.quantidade
                            }</span>
                            <button class="carrinho-item-aumentar" data-index="${index}" aria-label="Aumentar quantidade de ${
          item.nome
        }">+</button>
                        </div>
                    </div>
                    <button class="carrinho-item-remover-total" data-index="${index}" aria-label="Remover ${
          item.nome
        } do carrinho">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                `;
        carrinhoItemsContainer.appendChild(itemElement);
        subTotalPedido += item.preco * item.quantidade;
      });
      carrinhoTotalDisplay.textContent = `R$ ${subTotalPedido.toFixed(2)}`;
    }
    salvarCarrinho();
  }

  function adicionarProdutoAoCarrinho(
    nome,
    preco,
    imagem,
    mostrarFeedback = true
  ) {
    const itemExistente = carrinho.find((item) => item.nome === nome);
    if (itemExistente) {
      itemExistente.quantidade += 1;
    } else {
      carrinho.push({ nome, preco: parseFloat(preco), imagem, quantidade: 1 });
    }
    atualizarInterfaceCarrinho();

    if (mostrarFeedback && document.body) {
      const feedback = document.createElement("div");
      feedback.className = "feedback-carrinho";
      feedback.textContent = "Produto adicionado ao carrinho!";
      document.body.appendChild(feedback);
      setTimeout(() => {
        feedback.classList.add("show");
      }, 10);
      setTimeout(() => {
        feedback.classList.remove("show");
        setTimeout(() => {
          if (document.body.contains(feedback)) {
            document.body.removeChild(feedback);
          }
        }, 300);
      }, 2000);
    }
  }

  function diminuirQuantidadeItem(index) {
    if (carrinho[index].quantidade > 1) {
      carrinho[index].quantidade -= 1;
    } else {
      carrinho.splice(index, 1);
    }
    atualizarInterfaceCarrinho();
  }

  function aumentarQuantidadeItem(index) {
    adicionarProdutoAoCarrinho(
      carrinho[index].nome,
      carrinho[index].preco,
      carrinho[index].imagem,
      false
    );
  }

  function removerItemCompletamente(index) {
    carrinho.splice(index, 1);
    atualizarInterfaceCarrinho();
  }

  const containerDeProdutosPrincipal = document.querySelector(".produtos-grid");
  if (containerDeProdutosPrincipal) {
    containerDeProdutosPrincipal.addEventListener("click", function (event) {
      if (event.target.classList.contains("btn-comprar")) {
        const card = event.target.closest(".produto-card");
        if (card) {
          const nome = card.querySelector("h3").textContent;
          const precoText = card.querySelector(".produto-preco").textContent;
          const preco = parseFloat(
            precoText.replace("R$ ", "").replace(",", ".").trim()
          );
          const imagem = card.querySelector(".produto-img").src;
          adicionarProdutoAoCarrinho(nome, preco, imagem);
        }
      }
    });
  }

  if (carrinhoItemsContainer) {
    carrinhoItemsContainer.addEventListener("click", function (event) {
      const target = event.target;
      const index = parseInt(
        target.closest("button")?.getAttribute("data-index")
      );

      if (isNaN(index) || index < 0 || index >= carrinho.length) return;

      if (
        target.classList.contains("carrinho-item-diminuir") ||
        target.closest(".carrinho-item-diminuir")
      ) {
        diminuirQuantidadeItem(index);
      } else if (
        target.classList.contains("carrinho-item-aumentar") ||
        target.closest(".carrinho-item-aumentar")
      ) {
        aumentarQuantidadeItem(index);
      } else if (
        target.classList.contains("carrinho-item-remover-total") ||
        target.closest(".carrinho-item-remover-total")
      ) {
        removerItemCompletamente(index);
      }
    });
  }

  if (btnFinalizarCompra) {
    btnFinalizarCompra.addEventListener("click", function () {
      if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
      }

      let subTotalPedido = 0;
      const itensParaMensagem = carrinho
        .map((item) => {
          const totalItem = item.preco * item.quantidade;
          subTotalPedido += totalItem;
          return `${item.quantidade}x ${item.nome} (R$ ${item.preco.toFixed(
            2
          )} cada) - Total Item: R$ ${totalItem.toFixed(2)}`;
        })
        .join("\n");

      const mensagemWhatsapp =
        "Olá, Drogaria Torres Farma! Gostaria de fazer o seguinte pedido:\n" +
        itensParaMensagem +
        `\n\nTOTAL DO PEDIDO: R$ ${subTotalPedido.toFixed(2)}`;

      const numeroFarmacia = "5522999404155";

      if (numeroFarmacia.length < 10) {
         alert("Número de WhatsApp da farmácia não configurado corretamente no script.js!");
         return;
      }
      
      alert(
        "Você será redirecionado para o WhatsApp para finalizar seu pedido. Seu carrinho no site será esvaziado."
      );

      const mensagemCodificada = encodeURIComponent(mensagemWhatsapp);
      window.open(
        `https://wa.me/${numeroFarmacia}?text=${mensagemCodificada}`,
        "_blank"
      );

      carrinho = [];
      atualizarInterfaceCarrinho();

      if (carrinhoDropdown && carrinhoDropdown.classList.contains("active")) {
        carrinhoDropdown.classList.remove("active");
      }
    });
  }

  if (carrinhoBtn && carrinhoDropdown) {
    carrinhoBtn.addEventListener("click", function (event) {
      carrinhoDropdown.classList.toggle("active");
      event.stopPropagation();
    });
  }

  document.addEventListener("click", function (event) {
    if (
      carrinhoDropdown &&
      !carrinhoDropdown.contains(event.target) &&
      carrinhoBtn &&
      !carrinhoBtn.contains(event.target)
    ) {
      carrinhoDropdown.classList.remove("active");
    }
  });

  atualizarInterfaceCarrinho();

  const menuToggle = document.querySelector(".menu-toggle");
  const menuPrincipal = document.querySelector("header .menu");

  if (menuToggle && menuPrincipal) {
    menuToggle.addEventListener("click", function () {
      menuPrincipal.classList.toggle("active");
    });

    menuPrincipal.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (menuPrincipal.classList.contains("active")) {
          menuPrincipal.classList.remove("active");
        }
      });
    });
  }

  const formContato = document.getElementById('formContatoWhatsApp');

  if (formContato) {
      formContato.addEventListener('submit', function(event) {
          event.preventDefault(); 

          const nome = document.getElementById('nome').value.trim();
          const email = document.getElementById('email').value.trim();
          const telefone = document.getElementById('telefone').value.trim();
          const assunto = document.getElementById('assunto').value.trim();
          const mensagemUsuario = document.getElementById('mensagem').value.trim();

          if (!nome || !email || !assunto || !mensagemUsuario) {
              alert('Por favor, preencha todos os campos obrigatórios (Nome, E-mail, Assunto, Mensagem).');
              return;
          }

          let mensagemWhatsApp = `Nova Mensagem de Contato (do Site):\n\n`;
          mensagemWhatsApp += `Nome: ${nome}\n`;
          mensagemWhatsApp += `E-mail: ${email}\n`;
          if (telefone) {
              mensagemWhatsApp += `Telefone: ${telefone}\n`;
          }
          mensagemWhatsApp += `Assunto: ${assunto}\n\n`;
          mensagemWhatsApp += `Mensagem:\n${mensagemUsuario}`;
          
          const numeroFarmaciaContato = "5522999404155"; 

          if (numeroFarmaciaContato.length < 10) {
               alert("O número de WhatsApp para contato não está configurado corretamente. Por favor, avise ao administrador do site.");
               return;
          }

          alert('Você será redirecionado para o WhatsApp para enviar sua mensagem. Após confirmar o envio no WhatsApp, se desejar, pode fechar esta aba.');

          const mensagemCodificada = encodeURIComponent(mensagemWhatsApp);
          const urlWhatsApp = `https://wa.me/${numeroFarmaciaContato}?text=${mensagemCodificada}`;

          window.open(urlWhatsApp, '_blank');
      });
  }
});
