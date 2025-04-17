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
