import React, { useState } from 'react';
import { sendEmail } from '../api/sendEmail';

const CTA = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await sendEmail(formData);
      console.log('Email sent:', response);
      
      setSubmitStatus({
        type: 'success',
        message: 'Спасибо! Мы свяжемся с вами в ближайшее время.'
      });
      setFormData({ name: '', phone: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      const errorMessage = error instanceof Error ? error.message : 'Произошла ошибка при отправке';
      setSubmitStatus({
        type: 'error',
        message: `Ошибка: ${errorMessage}. Пожалуйста, попробуйте позже.`
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-content">
          <div className="cta-form-container">
            <h2 className="cta-title">Готовы начать сотрудничество?</h2>
            <p className="cta-description">
              Оставьте свои данные, и мы свяжемся с вами для быстрого расчета стоимости перевозки
            </p>
            <form onSubmit={handleSubmit} className="cta-form">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ваше имя"
                className="cta-input"
                required
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Ваш телефон"
                className="cta-input"
                required
              />
              <button
                type="submit"
                className="cta-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Отправка...' : 'Рассчитать стоимость перевозки'}
              </button>
            </form>
          </div>
          {submitStatus.type && (
            <div className={`submit-status ${submitStatus.type}`}>
              {submitStatus.message}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTA; 