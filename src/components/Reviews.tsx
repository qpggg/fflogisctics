import { useEffect } from 'react';

interface Review {
  text: string;
  date: string;
  company: string;
}

const Reviews = () => {
  useEffect(() => {
    const cards = document.querySelectorAll('.review-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('animate');
      }, 100 * (index + 1));
    });
  }, []);

  return (
    <section className="reviews-section">
      <div className="container">
        <h2 className="reviews-title">Отзывы наших клиентов</h2>
        <div className="reviews-grid">
          {[
            {
              text: "Благодарим за сотрудничество! Выполнили свою работу на отлично! Водитель вежливый, всегда на связи.",
              date: "23 дек 2024",
              company: "БумХимИнвест, ООО"
            },
            {
              text: "Отличный перевозчик!!! Зарекомендовал себя с очень хорошей стороны. Качество оказываемых услуг высокое. Благодарим за отличную и слаженную работу!",
              date: "16 фев 2021",
              company: "ТК 'Ветер Экспресс', ООО"
            },
            {
              text: "Надежный перевозчик. Всегда вовремя подает машины. Рекомендуем к сотрудничеству.",
              date: "5 мар 2023",
              company: "ЛогистикПро, ООО"
            },
            {
              text: "Отличная компания! Груз доставлен в срок и в сохранности. Будем продолжать сотрудничество.",
              date: "12 янв 2024",
              company: "ТрансКом, ООО"
            },
            {
              text: "Профессиональный подход к делу. Водители вежливые и пунктуальные. Техника в отличном состоянии.",
              date: "28 ноя 2023",
              company: "СтройМаркет, ООО"
            },
            {
              text: "Спасибо за оперативность и качественную работу! Всегда держат в курсе о местонахождении груза.",
              date: "19 дек 2023",
              company: "АгроПром, ООО"
            }
          ].map((review, index) => (
            <div
              key={index}
              className="review-card"
            >
              <p className="review-text">{review.text}</p>
              <div className="review-meta">
                <span className="review-date">{review.date}</span>
                <span className="review-company">{review.company}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews; 