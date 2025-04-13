const ANIMATION_SEQUENCE = [
  { selector: '.header', delay: 0 },
  { selector: '.header-content', delay: 100 },
  { selector: '.logo-container', delay: 200 },
  { selector: '.company-name', delay: 300 },
  { selector: '.phone-link', delay: 400 },
  { selector: '.hero-text', delay: 200 },
  { selector: '.hero-text h1', delay: 300 },
  { selector: '.hero-subtitle', delay: 400 },
  { selector: '.hero-description', delay: 500 },
  { selector: '.additional-text', delay: 600 }
];

export const startAnimations = () => {
  // Ждем загрузки шрифтов
  document.fonts.ready.then(() => {
    // Ждем загрузки всех изображений
    const images = Array.from(document.images);
    const imagePromises = images.map(img => {
      if (img.complete) {
        return Promise.resolve();
      }
      return new Promise(resolve => {
        img.onload = resolve;
        img.onerror = resolve; // Продолжаем даже если изображение не загрузилось
      });
    });

    // Когда все загружено, запускаем анимации
    Promise.all(imagePromises).then(() => {
      ANIMATION_SEQUENCE.forEach(({ selector, delay }) => {
        setTimeout(() => {
          document.querySelectorAll(selector).forEach(element => {
            element.classList.add('visible');
          });
        }, delay);
      });
    });
  });
}; 