document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mouseenter', function () {
    this.style.transform = 'translateY(-10px)';
    this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.15)';
  });

  card.addEventListener('mouseleave', function () {
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = 'var(--sombra)';
  });
});
document.addEventListener('DOMContentLoaded', function () {
  const carrossel = document.querySelector('.produtos-carrossel');
  const btnPrev = document.querySelector('.prev');
  const btnNext = document.querySelector('.next');
  const produtosGrid = document.querySelectorAll('.produtos-grid');
  let currentIndex = 0;

  function updateCarrossel() {
    const width = document.querySelector('.produto-card').offsetWidth;
    const gap = 32; // 2rem em pixels
    const scrollAmount = (width + gap) * 3; // Mover 3 produtos

    carrossel.scrollTo({
      left: currentIndex * scrollAmount,
      behavior: 'smooth'
    });

    // Desativar botões quando apropriado
    btnPrev.disabled = currentIndex === 0;
    btnNext.disabled = currentIndex >= produtosGrid.length - 1;
  }

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

  // Inicializar
  updateCarrossel();
});