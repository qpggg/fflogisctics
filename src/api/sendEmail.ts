import { Resend } from 'resend';

const resend = new Resend('re_fHbLCy6S_7wyctb8T5ZVw7MkHyioqQy8a');

export interface EmailData {
  name: string;
  phone: string;
}

export const sendEmail = async (data: EmailData) => {
  try {
    const response = await fetch('http://10.177.64.209:3004/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}; 