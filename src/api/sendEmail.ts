export interface EmailData {
  name: string;
  phone: string;
}

export const sendEmail = async (data: EmailData) => {
  try {
    const response = await fetch('http://localhost:3000/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const errorMessage = responseData.error || responseData.details || 'Network response was not ok';
      throw new Error(errorMessage);
    }

    return responseData;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}; 