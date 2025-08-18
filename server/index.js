require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');
const path = require('path');

const app = express();
// Check if RESEND_API_KEY is provided
if (!process.env.RESEND_API_KEY) {
  console.error('RESEND_API_KEY environment variable is not set');
  process.exit(1);
}

const resend = new Resend(process.env.RESEND_API_KEY);

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'https://your-domain.ru'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API routes
app.post('/api/send-email', async (req, res) => {
  console.log('Received request:', req.body);
  
  try {
    // Валидация входных данных
    const { name, phone } = req.body;
    
    if (!name || !phone) {
      console.error('Missing required fields:', { name, phone });
      return res.status(400).json({ 
        error: 'Missing required fields',
        details: 'Name and phone are required'
      });
    }

    if (typeof name !== 'string' || typeof phone !== 'string') {
      console.error('Invalid field types:', { name: typeof name, phone: typeof phone });
      return res.status(400).json({ 
        error: 'Invalid field types',
        details: 'Name and phone must be strings'
      });
    }

    console.log('Sending email for:', { name, phone });
    
    const emailData = {
      from: 'onboarding@resend.dev',
      to: 'fedorova.olga1981@yandex.ru',
      subject: 'Новая заявка на расчет стоимости',
      html: `
        <h2>Новая заявка на расчет стоимости</h2>
        <p><strong>Имя:</strong> ${name}</p>
        <p><strong>Телефон:</strong> ${phone}</p>
        <p><strong>Дата:</strong> ${new Date().toLocaleString('ru-RU')}</p>
      `
    };
    
    console.log('Attempting to send email with config:', emailData);
    
    const { data, error } = await resend.emails.send(emailData);
    
    if (error) {
      console.error('Resend API Error:', error);
      return res.status(400).json({ 
        error: 'Email service error',
        details: error.message || 'Failed to send email'
      });
    }

    console.log('Email sent successfully:', data);
    return res.json({ 
      success: true, 
      message: 'Email sent successfully',
      data 
    });
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

// Serve static files from the React app build
app.use(express.static(path.join(__dirname, '../dist')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Export for PM2
module.exports = app;
