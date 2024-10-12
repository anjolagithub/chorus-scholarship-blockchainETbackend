import axios from 'axios';
import { config } from '../../Config/app.config.js';

class BrevoEmailService {
  apiUrl;
  apiKey;

  constructor() {
    this.apiUrl = 'https://api.brevo.com/v3/smtp/email';
    this.apiKey = config.brevo.apiKey;
  }

  createPayload(receiverEmail, subject, templateName) {
    return {
      sender: {
        name: 'Chorus',
        email: 'adamsakorede5@gmail.com',
      },
      to: [
        {
          email: receiverEmail,
        //   name: receiverName,
        },
      ],
      subject: subject || 'Hello',
      htmlContent: templateName,
    };
  }

  async sendMail(receiverEmail, templateName, subject) {
    const emailPayload = this.createPayload(receiverEmail, subject, templateName);

    try {
      const response = await axios.post(this.apiUrl, emailPayload, {
        headers: {
          accept: 'application/json',
          'api-key': this.apiKey,
          'content-type': 'application/json',
        },
      });

      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Error sending email: ${error.message}`);
      } else {
        throw new Error('An unexpected error occurred while sending the email.');
      }
    }
  }
}

export default BrevoEmailService;
