import fs from "fs";
import ejs from "ejs";
import BrevoEmailService from "../../Infrastructure/Brevo/brevoMail.js";

const emailServiceByBrevo = new BrevoEmailService();

export default class EmailServices {
  static async sendWelcomeEmail(firstName, email) {
    const subject = "Welcome to Farmily";
    const templateName = "welcomeEmail";
    const sendEmailParams = await EmailServices.buildSendEmailParams(
      email,
      subject,
      templateName,
      { firstName }
    );
    return EmailServices.sendEmail(sendEmailParams);
  }

  static async sendVerificationEmail(
    firstName,
    email,
    verificationLink
  ) {
    const subject = "Email Verification";
    const templateName = "verifyEmail";
    const sendEmailParams = await EmailServices.buildSendEmailParams(
      email,
      subject,
      templateName,
      {
        firstName,
        verificationLink,
      }
    );
    return EmailServices.sendEmail(sendEmailParams);
  }

  static async sendResetPasswordEmail(
    firstName,
    email,
    resetLink
  ) {
    const subject = "Reset Password";
    const templateName = "resetPasswordEmail";
    const sendEmailParams = await EmailServices.buildSendEmailParams(
      email,
      subject,
      templateName,
      {
        firstName,
        email,
        resetLink,
      }
    );
    return EmailServices.sendEmail(sendEmailParams);
  }

  static async sendNewsLetterSubscriptionEmail(
    firstName,
    email,
    newsletterLink
  ) {
    const subject = "Newsletter Subscription";
    const templateName = "subscribeToNewsLetterEmail";
    const sendEmailParams = await EmailServices.buildSendEmailParams(
      email,
      subject,
      templateName,
      {
        firstName,
        email,
        newsletterLink,
      }
    );
    return EmailServices.sendEmail(sendEmailParams);
  }

  static async sendThanksToNewsLetterSubscriptionEmail(
    firstName,
    email
  ) {
    const subject = "Thanks For Newsletter Subscription";
    const templateName = "thanksForNewsLetterSubscriptionEmail";
    const sendEmailParams = await EmailServices.buildSendEmailParams(
      email,
      subject,
      templateName,
      { firstName }
    );
    return EmailServices.sendEmail(sendEmailParams);
  }

  static async sendEmail(params) {
    const { toAddress, renderedTemplate, subject } = params;

    try {
      return await emailServiceByBrevo.sendMail(toAddress, renderedTemplate, subject);
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  }

  static async buildSendEmailParams(toAddress, subject, templateName, data) {
    const filePath = `./templates/${templateName}.html`;

    const template = fs.readFileSync(filePath, "utf8");

    const renderedTemplate = ejs.render(template, data);

    return { toAddress, renderedTemplate, subject };
  }
}
