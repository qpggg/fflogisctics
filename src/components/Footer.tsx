const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <div className="footer-logo">
            <img src="/logo_futer.png" alt="FF Логистика" className="logo-icon" />
          </div>
        </div>
        <div className="footer-center">
          <h2 className="company-name">Федоров Александр Михайлович, ИП</h2>
          <div className="rating">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="star-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            ))}
          </div>
          <p className="company-id">Паспорт участника ATI.SU, код 48 075</p>
        </div>
        <div className="footer-right">
          <a href="tel:+79036301464" className="contact-link phone-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="contact-icon">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            8-903-630-14-64
          </a>
          <a href="mailto:fam-69@yandex.ru" className="contact-link email-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="contact-icon">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <path d="M22 6l-10 7L2 6" />
            </svg>
            fam-69@yandex.ru
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 