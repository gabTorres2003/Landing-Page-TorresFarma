document.addEventListener('DOMContentLoaded', function() {
  const carrossel = document.querySelector('.produtos-carrossel');
  const btnPrev = document.querySelector('.prev');
  const btnNext = document.querySelector('.next');
  const produtosGrid = document.querySelectorAll('.produtos-grid');
  let currentIndex = 0;

  // Atualiza a posição do carrossel
  function updateCarrossel() {
    const cardWidth = document.querySelector('.produto-card').offsetWidth;
    const gap = 24; // 1.5rem em pixels
    const scrollAmount = (cardWidth + gap) * 3; // Mover 3 produtos
    
    carrossel.scrollTo({
      left: currentIndex * scrollAmount,
      behavior: 'smooth'
    });
    
    // Atualiza estado dos botões
    btnPrev.disabled = currentIndex === 0;
    btnNext.disabled = currentIndex >= produtosGrid.length - 1;
  }

  // Event listeners para os botões
  btnNext.addEventListener('click', () => {
    if (currentIndex < produtosGrid.length - 1) {
      currentIndex++;
      updateCarrossel();
    }
  });

  btnPrev.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarrossel();
    }
  });

  // Esconde botões quando não há mais itens para navegar
  function checkButtons() {
    btnPrev.style.visibility = currentIndex === 0 ? 'hidden' : 'visible';
    btnNext.style.visibility = currentIndex >= produtosGrid.length - 1 ? 'hidden' : 'visible';
  }

  // Inicializa
  updateCarrossel();
  checkButtons();
});

document.addEventListener('DOMContentLoaded', function() {
  // Seletores
  const carrinhoBtn = document.querySelector('.carrinho-btn');
  const carrinhoDropdown = document.querySelector('.carrinho-dropdown');
  const carrinhoItemsContainer = document.querySelector('.carrinho-items');
  const carrinhoQuantidade = document.querySelector('.carrinho-quantidade');
  const carrinhoTotal = document.querySelector('.carrinho-total span');
  const btnFinalizar = document.querySelector('.btn-finalizar');
  
  // Carrinho de compras
  let carrinho = [];
  
  // Função para atualizar o carrinho na interface
  function atualizarCarrinho() {
    // Atualiza a quantidade no ícone
    const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
    carrinhoQuantidade.textContent = totalItens;
    
    // Atualiza a lista de itens
    if (carrinho.length === 0) {
      carrinhoItemsContainer.innerHTML = '<p class="carrinho-vazio">Seu carrinho está vazio</p>';
      carrinhoTotal.textContent = 'R$ 0,00';
      return;
    }
    
    carrinhoItemsContainer.innerHTML = '';
    let total = 0;
    
    carrinho.forEach((item, index) => {
      const itemElement = document.createElement('div');
      itemElement.className = 'carrinho-item';
      itemElement.innerHTML = `
        <img src="${item.imagem}" alt="${item.nome}">
        <div class="carrinho-item-info">
          <p class="carrinho-item-nome">${item.nome}</p>
          <p class="carrinho-item-preco">R$ ${item.preco.toFixed(2)}</p>
        </div>
        <button class="carrinho-item-remover" data-index="${index}">
          <i class="fas fa-times"></i>
        </button>
      `;
      carrinhoItemsContainer.appendChild(itemElement);
      
      total += item.preco * item.quantidade;
    });
    
    // Atualiza o total
    carrinhoTotal.textContent = `R$ ${total.toFixed(2)}`;
    
    // Adiciona eventos aos botões de remover
    document.querySelectorAll('.carrinho-item-remover').forEach(btn => {
      btn.addEventListener('click', function() {
        const index = parseInt(this.getAttribute('data-index'));
        removerItemCarrinho(index);
      });
    });
  }
  
  // Função para adicionar item ao carrinho
  function adicionarAoCarrinho(nome, preco, imagem) {
    // Verifica se o item já está no carrinho
    const itemExistente = carrinho.find(item => item.nome === nome);
    
    if (itemExistente) {
      itemExistente.quantidade += 1;
    } else {
      carrinho.push({
        nome,
        preco: parseFloat(preco),
        imagem,
        quantidade: 1
      });
    }
    
    atualizarCarrinho();
    
    // Mostra feedback visual
    const feedback = document.createElement('div');
    feedback.className = 'feedback-carrinho';
    feedback.textContent = 'Produto adicionado ao carrinho!';
    document.body.appendChild(feedback);
    
    setTimeout(() => {
      feedback.classList.add('show');
    }, 10);
    
    setTimeout(() => {
      feedback.classList.remove('show');
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
  document.querySelectorAll('.btn-comprar').forEach(btn => {
    btn.addEventListener('click', function() {
      const card = this.closest('.produto-card');
      const nome = card.querySelector('h3').textContent;
      const preco = card.querySelector('.produto-preco').textContent.replace('R$ ', '').trim();
      const imagem = card.querySelector('.produto-img').src;
      
      adicionarAoCarrinho(nome, preco, imagem);
    });
  });
  
  // Evento para finalizar compra
  btnFinalizar.addEventListener('click', function() {
    if (carrinho.length === 0) {
      alert('Seu carrinho está vazio!');
      return;
    }
    
    // Aqui você pode implementar a lógica de finalização de compra
    alert('Compra finalizada com sucesso! Obrigado por comprar na Drogaria Torres Farma.');
    carrinho = [];
    atualizarCarrinho();
  });
  
  // Feedback visual CSS (adicione ao seu CSS)
  const style = document.createElement('style');
  style.textContent = `
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
  `;
  document.head.appendChild(style);
});
