const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');

const app = express();
const resend = new Resend('re_W6k2iqMG_8r4KXDyasFZDgqyPzy3JCvXj');

app.use(cors());
app.use(express.json());

app.post('/api/send-email', async (req, res) => {
  console.log('Received request:', req.body);
  
  try {
    const { name, phone } = req.body;
    console.log('Sending email for:', { name, phone });
    
    const emailData = {
      from: 'onboarding@resend.dev',
      to: 'fedorova.olga1981@yandex.ru',
      subject: 'Новая заявка на расчет стоимости',
      html: `
        <h2>Новая заявка на расчет стоимости</h2>
        <p><strong>Имя:</strong> ${name}</p>
        <p><strong>Телефон:</strong> ${phone}</p>
      `
    };
    
    console.log('Attempting to send email with config:', emailData);
    
    const { data, error } = await resend.emails.send(emailData);
    
    if (error) {
      console.error('Resend API Error:', error);
      return res.status(400).json({ error });
    }

    console.log('Email sent successfully:', data);
    return res.json({ success: true, data });
  } catch (error) {
    console.error('Detailed server error:', {
      error,
      message: error.message,
      stack: error.stack
    });
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
});

const PORT = 3004;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Resend API Key:', resend?.config?.apiKey ? 'Present' : 'Missing');
}); 