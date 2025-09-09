import { useEffect, useRef, useState } from 'react';

export default function Hero() {
  const truckRef = useRef<HTMLImageElement>(null);
  const [isTruckLoaded, setIsTruckLoaded] = useState(false);
  const [isTruckVisible, setIsTruckVisible] = useState(false);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  useEffect(() => {
    const img = truckRef.current;
    if (!img) return;

    const handleImageLoad = () => {
      setIsTruckLoaded(true);
      // Небольшая задержка для плавности
      setTimeout(() => {
        setIsTruckVisible(true);
      }, 100);
    };

    const handleImageError = () => {
      // Если изображение не загрузилось, все равно показываем анимацию
      setIsTruckLoaded(true);
      setTimeout(() => {
        setIsTruckVisible(true);
      }, 100);
    };

    const handleAnimationEnd = () => {
      setIsAnimationComplete(true);
    };

    if (img.complete) {
      handleImageLoad();
    } else {
      img.addEventListener('load', handleImageLoad);
      img.addEventListener('error', handleImageError);
    }

    // Добавляем слушатель завершения анимации
    img.addEventListener('animationend', handleAnimationEnd);

    return () => {
      img.removeEventListener('load', handleImageLoad);
      img.removeEventListener('error', handleImageError);
      img.removeEventListener('animationend', handleAnimationEnd);
    };
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
              Мы предлагаем оптимальные решения для перевозки любых грузов, включая те, что требуют особых условий.
            </div>
          </div>
          <div className="hero-image-container">
            <img
              ref={truckRef}
              src="/truck.png"
              alt="Грузовой автомобиль"
              width={1200}
              height={675}
              className={`truck-image ${isTruckLoaded ? 'loaded' : ''} ${isTruckVisible ? 'visible' : ''} ${isAnimationComplete ? 'animation-complete' : ''}`}
              loading="eager"
              onLoad={() => setIsTruckLoaded(true)}
              onError={() => setIsTruckLoaded(true)}
            />
          </div>
        </div>
      </div>
    </section>
  );
} 