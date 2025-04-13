import { useEffect, useRef } from 'react';

export default function Hero() {
  const truckRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Инициализация анимации грузовика
    if (truckRef.current) {
      const img = truckRef.current;
      
      if (img.complete) {
        requestAnimationFrame(() => {
          img.classList.add('loaded');
        });
      } else {
        img.onload = () => {
          requestAnimationFrame(() => {
            img.classList.add('loaded');
          });
        };
      }
    }
  }, []);

  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Надежные перевозки для вашего бизнеса</h1>
            <div className="hero-subtitle">
              Более 20 лет опыта в сфере автомобильных перевозок изотермами
            </div>
            <div className="hero-description">
              Мы понимаем, как важен каждый груз, и гарантируем его безопасность на всех этапах перевозки. Наши услуги предназначены для того, чтобы сделать ваш бизнес более эффективным и обеспечить бесперебойные поставки.
            </div>
            <div className="additional-text">
              Мы предлагаем оптимальные решения для перевозки любых грузов, включая те, что требуют особых условий. Наши изотермические фургоны оснащены современным оборудованием для поддержания необходимого температурного режима.
            </div>
          </div>
          <div className="hero-image-container">
            <img
              ref={truckRef}
              src="/truck.png"
              alt="Грузовой автомобиль"
              width={1200}
              height={675}
              className="truck-image"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
} 