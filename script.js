document.addEventListener('DOMContentLoaded', () => {
  // Sidebar Toggle for Mobile
  const hamburger = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');
  hamburger.addEventListener('click', () => {
    sidebar.classList.toggle('show-sidebar');
  });

  // Theme Toggle (Dark/Light Mode)
  const body = document.getElementById('body');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  let isDarkMode = true; // Start in dark mode
  themeToggleBtn.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    if (isDarkMode) {
      body.classList.add('dark-mode');
      body.classList.remove('light-mode');
      themeToggleBtn.innerHTML = '<i class="fa fa-sun"></i>';
    } else {
      body.classList.remove('dark-mode');
      body.classList.add('light-mode');
      themeToggleBtn.innerHTML = '<i class="fa fa-moon"></i>';
    }
  });

  /*-------------------------------------
    Banner Slider Setup
  -------------------------------------*/
  const bannerSlides = document.querySelectorAll('.banner-slide');
  const bannerArrowLeft = document.getElementById('bannerArrowLeft');
  const bannerArrowRight = document.getElementById('bannerArrowRight');
  let currentBannerIndex = 0;
  function showBannerSlide(index) {
    bannerSlides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === index);
    });
  }
  bannerArrowRight.addEventListener('click', () => {
    currentBannerIndex = (currentBannerIndex + 1) % bannerSlides.length;
    showBannerSlide(currentBannerIndex);
  });
  bannerArrowLeft.addEventListener('click', () => {
    currentBannerIndex =
      (currentBannerIndex - 1 + bannerSlides.length) % bannerSlides.length;
    showBannerSlide(currentBannerIndex);
  });
  // Auto-slide every 5 seconds
  setInterval(() => {
    currentBannerIndex = (currentBannerIndex + 1) % bannerSlides.length;
    showBannerSlide(currentBannerIndex);
  }, 5000);

  /*-------------------------------------
    Reusable Scroll Slider Setup Function
    (applies to Flash Sale, Valorant & PUBG sections)
  -------------------------------------*/
  function setupScrollSlider(arrowLeftId, arrowRightId, trackId) {
    const track = document.getElementById(trackId);
    const arrowLeft = document.getElementById(arrowLeftId);
    const arrowRight = document.getElementById(arrowRightId);
    let cardWidth = 0;

    function initSlider() {
      // Get dimensions based on the first card (works for both slider-card & small-slider-card)
      const cards = track.querySelectorAll('.slider-card, .small-slider-card');
      if (cards.length > 0) {
        const gap = parseInt(getComputedStyle(track).gap) || 0;
        cardWidth = cards[0].offsetWidth + gap;
      }
    }

    arrowRight.addEventListener('click', () => {
      track.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });

    arrowLeft.addEventListener('click', () => {
      track.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });

    window.addEventListener('load', initSlider);
    window.addEventListener('resize', initSlider);
  }

  // Initialize Scroll Sliders for each section
  setupScrollSlider('flashSaleArrowLeft', 'flashSaleArrowRight', 'flashSaleTrack');
  setupScrollSlider('valorantArrowLeft', 'valorantArrowRight', 'valorantTrack');
  setupScrollSlider('pubgArrowLeft', 'pubgArrowRight', 'pubgTrack');

  /*-------------------------------------
    "Show All" Toggles for each section
  -------------------------------------*/
  function toggleSection(btnId, trackId) {
    const btn = document.getElementById(btnId);
    const track = document.getElementById(trackId);
    const hiddenCards = track.querySelectorAll('.hidden');
    let expanded = false;
    btn.addEventListener('click', () => {
      hiddenCards.forEach(card => {
        card.style.display = expanded ? 'none' : 'block';
      });
      btn.textContent = expanded ? 'Show All' : 'Show Less';
      expanded = !expanded;
      // Reinitialize slider dimensions after toggling
      window.dispatchEvent(new Event('resize'));
    });
  }

  toggleSection('toggleFlashSaleBtn', 'flashSaleTrack');
  toggleSection('toggleValorantBtn', 'valorantTrack');
  toggleSection('togglePUBGBtn', 'pubgTrack');

  // Back Button functionality (if exists)
  const backBtn = document.querySelector('.back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      window.history.back();
    });
  }

  /*-------------------------------------
    Setup Theme Toggle with localStorage
  -------------------------------------*/
  function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggleBtn');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.innerHTML =
      savedTheme === 'dark'
        ? '<i class="fa fa-sun"></i>'
        : '<i class="fa fa-moon"></i>';

    themeToggle.addEventListener('click', () => {
      const newTheme =
        document.documentElement.getAttribute('data-theme') === 'dark'
          ? 'light'
          : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      themeToggle.innerHTML =
        newTheme === 'dark'
          ? '<i class="fa fa-sun"></i>'
          : '<i class="fa fa-moon"></i>';
    });
  }
  setupThemeToggle();

  // Performance Monitoring
  window.addEventListener('load', () => {
    const perfEntries = performance.getEntriesByType('navigation');
    const loadTime = perfEntries[0].domContentLoadedEventEnd;
    console.log(`Page loaded in ${loadTime}ms`);
  });
});
