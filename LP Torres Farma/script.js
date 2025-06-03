document.addEventListener("DOMContentLoaded", function () {
  const carrossel = document.querySelector(".produtos-carrossel");
  const btnPrev = document.querySelector(".prev");
  const btnNext = document.querySelector(".next");
  const produtosGrid = carrossel.querySelector(".produtos-grid");

  // Validação inicial dos elementos do carrossel
  if (!produtosGrid || !produtosGrid.children.length || !btnPrev || !btnNext) {
    if (btnPrev) btnPrev.style.display = "none";
    if (btnNext) btnNext.style.display = "none";
    return;
  }

  const originalCards = Array.from(produtosGrid.children);
  const numOriginalCards = originalCards.length;

  if (numOriginalCards === 0) {
    btnPrev.style.display = "none";
    btnNext.style.display = "none";
    return;
  }
  originalCards
    .slice()
    .reverse()
    .forEach((card) => {
      produtosGrid.insertBefore(card.cloneNode(true), produtosGrid.firstChild);
    });
  originalCards.forEach((card) => {
    produtosGrid.appendChild(card.cloneNode(true));
  });

  // Variáveis de estado e dimensões
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
    carrossel.style.scrollBehavior = "auto"; // Scroll instantâneo para posição inicial
    carrossel.scrollLeft = initialOffset;
    carrossel.offsetHeight; // Força reflow
    carrossel.style.scrollBehavior = "smooth"; // Reabilita scroll suave
  }

  setInitialPosition();

  function moveTo(newIndex) {
    if (isTransitioning) return;
    isTransitioning = true;

    currentIndex = newIndex;
    const targetScrollLeft = currentIndex * (cardWidth + gap);

    carrossel.scrollTo({
      left: targetScrollLeft,
      behavior: "smooth",
    });

    setTimeout(() => {
      let jumped = false;

      if (currentIndex >= numOriginalCards * 2) {
        currentIndex = numOriginalCards; // Volta para o primeiro card "real"
        jumped = true;
      }
      // Chegou nos clones do início (que são cópia do fim)?
      else if (currentIndex < numOriginalCards) {
        currentIndex = numOriginalCards * 2 - 1; // Vai para o último card "real"
        jumped = true;
      }

      if (jumped) {
        carrossel.style.scrollBehavior = "auto"; // Salto instantâneo
        carrossel.scrollLeft = currentIndex * (cardWidth + gap);
        carrossel.offsetHeight; // Força reflow
        carrossel.style.scrollBehavior = "smooth"; // Reabilita scroll suave
      }
      isTransitioning = false; // Libera para nova ação
    }, 400);
  }

  btnNext.addEventListener("click", () => {
    if (isTransitioning) return;
    moveTo(currentIndex + 1);
  });

  btnPrev.addEventListener("click", () => {
    if (isTransitioning) return;
    moveTo(currentIndex - 1);
  });

  // Visibilidade dos botões: sempre visíveis se houver scroll possível.
  function updateButtonVisibility() {
    const canScroll =
      numOriginalCards > 0 &&
      produtosGrid.scrollWidth > Math.ceil(carrossel.clientWidth) + 1;
    if (btnPrev) btnPrev.style.visibility = canScroll ? "visible" : "hidden";
    if (btnNext) btnNext.style.visibility = canScroll ? "visible" : "hidden";
  }

  updateButtonVisibility();

  window.addEventListener("resize", () => {
    // É importante recalcular dimensões e reposicionar ao redimensionar.
    setInitialPosition();
    updateButtonVisibility();
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Seletores
  const carrinhoBtn = document.querySelector(".carrinho-btn");
  const carrinhoDropdown = document.querySelector(".carrinho-dropdown");
  const carrinhoItemsContainer = document.querySelector(".carrinho-items");
  const carrinhoQuantidade = document.querySelector(".carrinho-quantidade");
  const carrinhoTotal = document.querySelector(".carrinho-total span");
  const btnFinalizar = document.querySelector(".btn-finalizar");
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");

  // Carrinho de compras
  let carrinho = [];

  // Função para atualizar o carrinho na interface
  function atualizarCarrinho() {
    // Atualiza a quantidade no ícone
    const totalItens = carrinho.reduce(
      (total, item) => total + item.quantidade,
      0
    );
    carrinhoQuantidade.textContent = totalItens;

    // Atualiza a lista de itens
    if (carrinho.length === 0) {
      carrinhoItemsContainer.innerHTML =
        '<p class="carrinho-vazio">Seu carrinho está vazio</p>';
      carrinhoTotal.textContent = "R$ 0,00";
      return;
    }

    carrinhoItemsContainer.innerHTML = "";
    let total = 0;

    carrinho.forEach((item, index) => {
      const itemElement = document.createElement("div");
      itemElement.className = "carrinho-item";
      itemElement.innerHTML = `
        <img src="${item.imagem}" alt="${item.nome}">
        <div class="carrinho-item-info">
          <p class="carrinho-item-nome">${item.nome}</p>
          <p class="carrinho-item-preco">R$ ${item.preco.toFixed(2)}</p>
          <span class="carrinho-item-quantidade">Quantidade: ${
            item.quantidade
          }</span>
        </div>
        <button class="carrinho-item-remover" data-index="${index}" aria-label="Remover ${
        item.nome
      } do carrinho">
          <i class="fas fa-times"></i>
        </button>
      `;
      carrinhoItemsContainer.appendChild(itemElement);

      total += item.preco * item.quantidade;
    });

    // Atualiza o total
    carrinhoTotal.textContent = `R$ ${total.toFixed(2)}`;

    // Adiciona eventos aos botões de remover
    document.querySelectorAll(".carrinho-item-remover").forEach((btn) => {
      btn.addEventListener("click", function () {
        const index = parseInt(this.getAttribute("data-index"));
        removerItemCarrinho(index);
      });
    });
  }

  // Função para adicionar item ao carrinho
  function adicionarAoCarrinho(nome, preco, imagem) {
    // Verifica se o item já está no carrinho
    const itemExistente = carrinho.find((item) => item.nome === nome);

    if (itemExistente) {
      itemExistente.quantidade += 1;
    } else {
      carrinho.push({
        nome,
        preco: parseFloat(preco),
        imagem,
        quantidade: 1,
      });
    }

    atualizarCarrinho();

    // Mostra feedback visual
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
        document.body.removeChild(feedback);
      }, 300);
    }, 2000);
  }

  // Função para remover item do carrinho
  function removerItemCarrinho(index) {
    if (carrinho[index].quantidade > 1) {
      carrinho[index].quantidade -= 1;
    } else {
      carrinho.splice(index, 1);
    }
    atualizarCarrinho();
  }

  // Adiciona eventos aos botões "Comprar"
  document.querySelectorAll(".btn-comprar").forEach((btn) => {
    btn.addEventListener("click", function () {
      const card = this.closest(".produto-card");
      const nome = card.querySelector("h3").textContent;
      const preco = card
        .querySelector(".produto-preco")
        .textContent.replace("R$ ", "")
        .trim();
      const imagem = card.querySelector(".produto-img").src;

      adicionarAoCarrinho(nome, preco, imagem);
    });
  });

  // Evento para finalizar compra
  btnFinalizar.addEventListener("click", function () {
    if (carrinho.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }

    // Aqui você pode implementar a lógica de finalização de compra
    alert(
      "Compra finalizada com sucesso! Obrigado por comprar na Drogaria Torres Farma."
    );
    carrinho = [];
    atualizarCarrinho();
    carrinhoDropdown.classList.remove("active"); // Close cart after checkout
  });

  // Toggle carrinho dropdown on button click
  carrinhoBtn.addEventListener("click", function (event) {
    carrinhoDropdown.classList.toggle("active");
    event.stopPropagation(); // Prevent click from bubbling to document
  });

  // Close carrinho dropdown if clicked outside
  document.addEventListener("click", function (event) {
    if (
      !carrinhoDropdown.contains(event.target) &&
      !carrinhoBtn.contains(event.target)
    ) {
      carrinhoDropdown.classList.remove("active");
    }
  });

  menuToggle.addEventListener("click", function () {
    menu.classList.toggle("active");
  });
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
    });
  });
  atualizarCarrinho();
});
document.addEventListener("DOMContentLoaded", function () {
  const carrossel = document.querySelector(".produtos-carrossel");
  const btnPrev = document.querySelector(".prev");
  const btnNext = document.querySelector(".next");
  const produtosGrid = document.querySelectorAll(".produtos-grid"); // Esta linha pode ser otimizada se cada .produtos-grid for um slide único
  let currentIndex = 0;
  let totalSlides = produtosGrid.length > 0 ? produtosGrid.length : 1;

  function updateCarrossel() {
    if (!carrossel || !document.querySelector(".produto-card")) return; // Proteção

    const cardWidth = document.querySelector(".produto-card").offsetWidth;
    const gap =
      parseFloat(
        getComputedStyle(document.querySelector(".produtos-grid")).gap
      ) || 24; // 1.5rem em pixels

    const itemsPerSlide = produtosGrid[0] ? produtosGrid[0].children.length : 1;
    if (produtosGrid.length === 1 && carrossel.contains(produtosGrid[0])) {
      const scrollAmount = cardWidth + gap;
      carrossel.scrollTo({
        left: currentIndex * scrollAmount,
        behavior: "smooth",
      });
      totalSlides = produtosGrid[0].children.length;
    } else if (produtosGrid.length > 1) {
      // Se há múltiplos .produtos-grid como slides
      const slideWidth = produtosGrid[0].offsetWidth; // Largura de um slide/grupo
      carrossel.scrollTo({
        left: currentIndex * slideWidth,
        behavior: "smooth",
      });
      totalSlides = produtosGrid.length;
    }

    checkButtons();
  }

  if (btnNext && btnPrev) {
    // Só adiciona listeners se os botões existem
    btnNext.addEventListener("click", () => {
      // Para um único .produtos-grid contendo todos os cards:
      if (produtosGrid.length === 1 && carrossel.contains(produtosGrid[0])) {
        const numCards = produtosGrid[0].children.length;
        // Calcula quantos cards cabem na viewport do carrossel
        const cardWidthWithGap =
          document.querySelector(".produto-card").offsetWidth +
          (parseFloat(
            getComputedStyle(document.querySelector(".produtos-grid")).gap
          ) || 24);
        const visibleCards = Math.floor(
          carrossel.clientWidth / cardWidthWithGap
        );
        if (currentIndex < numCards - visibleCards) {
          // Permite rolar até o último card ficar visível
          currentIndex++;
          updateCarrossel();
        }
      } else if (produtosGrid.length > 1) {
        // Múltiplos .produtos-grid como slides
        if (currentIndex < totalSlides - 1) {
          currentIndex++;
          updateCarrossel();
        }
      }
    });

    btnPrev.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarrossel();
      }
    });
  }

  function checkButtons() {
    if (!carrossel || !btnPrev || !btnNext) return; // Proteção

    const maxScrollLeft = carrossel.scrollWidth - carrossel.clientWidth;
    btnPrev.style.visibility = carrossel.scrollLeft <= 5 ? "hidden" : "visible";
    btnNext.style.visibility =
      carrossel.scrollLeft >= maxScrollLeft - 5 ? "hidden" : "visible";

    // Se for um único grid, desabilitar o next se já mostrou todos os cards
    if (produtosGrid.length === 1 && carrossel.contains(produtosGrid[0])) {
      const numCards = produtosGrid[0].children.length;
      const cardWidthWithGap =
        document.querySelector(".produto-card").offsetWidth +
        (parseFloat(
          getComputedStyle(document.querySelector(".produtos-grid")).gap
        ) || 24);
      const visibleCards = Math.floor(carrossel.clientWidth / cardWidthWithGap);

      if (currentIndex >= numCards - visibleCards) {
        btnNext.style.visibility = "hidden";
      }
      if (currentIndex === 0) {
        btnPrev.style.visibility = "hidden";
      }
    } else if (produtosGrid.length > 1) {
      // Múltiplos .produtos-grid
      btnPrev.style.visibility = currentIndex === 0 ? "hidden" : "visible";
      btnNext.style.visibility =
        currentIndex === totalSlides - 1 ? "hidden" : "visible";
    }
  }

  if (carrossel) {
    // Só executa se o carrossel existir
    updateCarrossel(); // Chamada inicial
    window.addEventListener("resize", updateCarrossel);
    carrossel.addEventListener("scroll", checkButtons); // Atualiza botões ao rolar manualmente
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Seletores
  const carrinhoBtn = document.querySelector(".carrinho-btn");
  const carrinhoDropdown = document.querySelector(".carrinho-dropdown");
  const carrinhoItemsContainer = document.querySelector(".carrinho-items");
  const carrinhoQuantidade = document.querySelector(".carrinho-quantidade");
  const carrinhoTotal = document.querySelector(".carrinho-total span");
  const btnFinalizar = document.querySelector(".btn-finalizar");
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");

  // Carrinho de compras
  let carrinho = JSON.parse(localStorage.getItem("carrinhoTorresFarma")) || []; // Carrega carrinho do localStorage

  // Função para salvar carrinho no localStorage
  function salvarCarrinho() {
    localStorage.setItem("carrinhoTorresFarma", JSON.stringify(carrinho));
  }

  // Função para atualizar o carrinho na interface
  function atualizarCarrinho() {
    if (!carrinhoItemsContainer || !carrinhoQuantidade || !carrinhoTotal)
      return; // Proteção

    // Atualiza a quantidade no ícone
    const totalItens = carrinho.reduce(
      (total, item) => total + item.quantidade,
      0
    );
    carrinhoQuantidade.textContent = totalItens;

    // Atualiza a lista de itens
    if (carrinho.length === 0) {
      carrinhoItemsContainer.innerHTML =
        '<p class="carrinho-vazio">Seu carrinho está vazio</p>';
      carrinhoTotal.textContent = "R$ 0,00";
      salvarCarrinho(); // Salva estado vazio
      return;
    }

    carrinhoItemsContainer.innerHTML = "";
    let total = 0;

    carrinho.forEach((item, index) => {
      const itemElement = document.createElement("div");
      itemElement.className = "carrinho-item";
      itemElement.innerHTML = `
        <img src="${item.imagem}" alt="${item.nome}">
        <div class="carrinho-item-info">
          <p class="carrinho-item-nome">${item.nome}</p>
          <p class="carrinho-item-preco">R$ ${item.preco.toFixed(2)}</p>
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

      total += item.preco * item.quantidade;
    });

    // Atualiza o total
    carrinhoTotal.textContent = `R$ ${total.toFixed(2)}`;

    // Adiciona eventos aos botões de controle do carrinho
    document.querySelectorAll(".carrinho-item-remover-total").forEach((btn) => {
      btn.addEventListener("click", function () {
        const index = parseInt(this.getAttribute("data-index"));
        removerItemTotalCarrinho(index);
      });
    });
    document.querySelectorAll(".carrinho-item-diminuir").forEach((btn) => {
      btn.addEventListener("click", function () {
        const index = parseInt(this.getAttribute("data-index"));
        removerItemCarrinho(index); // Reutiliza a função de diminuir
      });
    });
    document.querySelectorAll(".carrinho-item-aumentar").forEach((btn) => {
      btn.addEventListener("click", function () {
        const index = parseInt(this.getAttribute("data-index"));
        // Adiciona pegando os dados do item no carrinho para garantir consistência
        adicionarAoCarrinho(
          carrinho[index].nome,
          carrinho[index].preco,
          carrinho[index].imagem,
          false
        ); // false para não mostrar feedback
      });
    });
    salvarCarrinho(); // Salva após cada atualização
  }

  // Função para adicionar item ao carrinho
  function adicionarAoCarrinho(nome, preco, imagem, mostrarFeedback = true) {
    const itemExistente = carrinho.find((item) => item.nome === nome);

    if (itemExistente) {
      itemExistente.quantidade += 1;
    } else {
      carrinho.push({
        nome,
        preco: parseFloat(preco), // Garante que o preço seja número
        imagem,
        quantidade: 1,
      });
    }

    atualizarCarrinho();

    if (mostrarFeedback) {
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
            // Verifica se o elemento ainda existe
            document.body.removeChild(feedback);
          }
        }, 300);
      }, 2000);
    }
  }

  // Função para remover UMA unidade do item do carrinho
  function removerItemCarrinho(index) {
    if (carrinho[index].quantidade > 1) {
      carrinho[index].quantidade -= 1;
    } else {
      carrinho.splice(index, 1); // Remove o item se a quantidade for 1
    }
    atualizarCarrinho();
  }

  function removerItemTotalCarrinho(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
  }
  document.querySelectorAll(".btn-comprar").forEach((btn) => {
    btn.addEventListener("click", function () {
      const card = this.closest(".produto-card");
      const nome = card.querySelector("h3").textContent;
      const precoText = card.querySelector(".produto-preco").textContent;
      const preco = parseFloat(
        precoText.replace("R$ ", "").replace(",", ".").trim()
      );
      const imagem = card.querySelector(".produto-img").src;

      adicionarAoCarrinho(nome, preco, imagem);
    });
  });

  if (btnFinalizar) {
    btnFinalizar.addEventListener("click", function () {
      if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
      }

      const mensagemWhatsapp =
        "Olá, gostaria de finalizar minha compra com os seguintes itens:\n" +
        carrinho
          .map(
            (item) =>
              `${item.quantidade}x ${item.nome} - R$ ${(
                item.preco * item.quantidade
              ).toFixed(2)}`
          )
          .join("\n") +
        "\nTotal: " +
        carrinhoTotal.textContent;
      const numeroFarmacia = "5522999404155";

      const mensagemCodificada = encodeURIComponent(mensagemWhatsapp);

      alert(
        "Você será redirecionado para o WhatsApp para finalizar sua compra. Se preferir, pode limpar o carrinho após confirmar o pedido."
      );

      window.open(
        `https://wa.me/${numeroFarmacia}?text=${mensagemCodificada}`,
        "_blank"
      );
    });
  }

  if (carrinhoBtn) {
    carrinhoBtn.addEventListener("click", function (event) {
      if (carrinhoDropdown) carrinhoDropdown.classList.toggle("active");
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

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", function () {
      menu.classList.toggle("active");
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("active");
      });
    });
  }

  atualizarCarrinho();
});
