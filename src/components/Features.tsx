import { useEffect } from 'react';

const Features = () => {
  useEffect(() => {
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('animate');
      }, 100 * (index + 1));
    });
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
  };

  return (
    <section className="features-section">
      <div className="container">
        <h2 className="features-title">Наши преимущества</h2>
        <div className="features-grid">
          {[
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M3 8.4V15.6C3 17.8402 3 18.9603 3.43597 19.816C3.81947 20.5686 4.43139 21.1805 5.18404 21.564C6.03969 22 7.15979 22 9.4 22H14.6C16.8402 22 17.9603 22 18.816 21.564C19.5686 21.1805 20.1805 20.5686 20.564 19.816C21 18.9603 21 17.8402 21 15.6V8.4C21 6.15979 21 5.03969 20.564 4.18404C20.1805 3.43139 19.5686 2.81947 18.816 2.43597C17.9603 2 16.8402 2 14.6 2H9.4C7.15979 2 6.03969 2 5.18404 2.43597C4.43139 2.81947 3.81947 3.43139 3.43597 4.18404C3 5.03969 3 6.15979 3 8.4Z" />
                  <path d="M12 6L12 18M12 6L16 10M12 6L8 10" />
                </svg>
              ),
              title: "Собственный автопарк",
              description: "20-тонные грузовики с изотермическими полуприцепами для безопасной перевозки вашего груза"
            },
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6V12L16 14" />
                </svg>
              ),
              title: "Опытные водители",
              description: "Профессиональные водители с многолетним стажем и безупречной репутацией"
            },
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 12L12 21M12 12L15 9M12 12L9 9" />
                  <path d="M20.5 7.2778C20.5 10.2454 15.5 14 12 14C8.5 14 3.5 10.2454 3.5 7.2778C3.5 4.31013 7.35786 2 12 2C16.6421 2 20.5 4.31013 20.5 7.2778Z" />
                </svg>
              ),
              title: "Система мониторинга",
              description: "Отслеживание груза в реальном времени с помощью современной системы мониторинга"
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="feature-card"
              onMouseMove={handleMouseMove}
            >
              <div className="feature-icon">
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features; 