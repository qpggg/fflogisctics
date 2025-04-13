import { useEffect } from 'react';

interface Review {
  text: string;
  date: string;
  company: string;
}

const reviews: Review[] = [
  {
    text: "Благодарим за сотрудничество! Выполнили свою работу на отлично! Водитель вежливый, всегда на связи.",
    date: "23 дек 2024",
    company: "БумХимИнвест, ООО"
  },
  {
    text: "Отличный перевозчик! Все слаженно и оперативно. Выполнили рейс без нареканий, машина прибывала без опозданий на погрузку и выгрузку. Ответственный подход к работе! Отдельное спасибо Ольге! Рекомендуем!",
    date: "07 апр 2025",
    company: "«АКТИВТРАНСГРУЗ», ООО"
  },
  {
    text: "Отличный перевозчик!!! Зарекомендовал себя с очень хорошей стороны. Качество оказываемых услуг высокое. Благодарим за отличную и слаженную работу!",
    date: "16 фев 2021",
    company: "ТК \"Ветер Экспресс\", ООО"
  },
  {
    text: "Надёжный-Ответственный Перевозчик! Всё сделано на Отлично! Благодарю за Качественно-выполненную работу! Рекомендую к Сотрудничеству!!!",
    date: "11 апр 2023",
    company: "РейсТранс, ООО"
  },
  {
    text: "Надежный и ответственный перевозчик! Подача машины и доставка груза без опозданий. Все документы предоставлены в срок. Желаем процветания. Рекомендуем всем к сотрудничеству!",
    date: "22 янв 2025",
    company: "АЛЬТЕКО (АЛЬТА-СЕРВИС, ООО)"
  },
  {
    text: "Отличный перевозчик! на погрузку/выгрузку приехали вовремя, документы в полном порядке! Отдельное спасибо Александру! Рекомендуем!",
    date: "09 апр 2025",
    company: "Гарант-Экспресс, ООО"
  }
];

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
          {reviews.map((review, index) => (
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