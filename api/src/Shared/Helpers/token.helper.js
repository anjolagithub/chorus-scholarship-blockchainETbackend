import jwt from 'jsonwebtoken';
import { config } from '../../Config/app.config.js';


export default class TokenHelper {
  static generateVerificationToken(payload) {
    return TokenHelper.generateToken(
      payload,
      config.tokenSecrets.verificationToken.secret,
      config.tokenSecrets.verificationToken.expiresIn,
    );
  }
 
  static verifyVerificationToken(token) {
    return TokenHelper.verifyToken(token, config.tokenSecrets.verificationToken.secret);
  }

  static generateResetToken(payload) {
    return TokenHelper.generateToken(
      payload,
      config.tokenSecrets.resetToken.secret,
      config.tokenSecrets.resetToken.expiresIn,
    );
  }

  static verifyResetToken(token) {
    return TokenHelper.verifyToken(token, config.tokenSecrets.resetToken.secret);
  }

  static generateAccessToken(payload) {
    return TokenHelper.generateToken(
      payload,
      config.tokenSecrets.accessToken.secret,
      config.tokenSecrets.accessToken.expiresIn,
    );
  }

  static verifyAccessToken(token) {
    return TokenHelper.verifyToken(token, config.tokenSecrets.accessToken.secret);
  }


  static generateNewsLetterSubscriptionToken(email) {
    return TokenHelper.generateToken(
      { email },
      config.tokenSecrets.newsletterSubscription.secret,
      config.tokenSecrets.newsletterSubscription.expiresIn,
    );
  }

  static verifyNewsLetterSubscriptionToken(token) {
    return TokenHelper.verifyToken(token, config.tokenSecrets.newsletterSubscription.secret);
  }

  static generateToken(payload, secret, expiresIn) {
    const generatedToken = jwt.sign(payload, secret, { expiresIn });
    return generatedToken
  }

  static verifyToken(token, secret) {
    const res = jwt.verify(token, secret);
    return res
  }

  // Set JWT as a cookie
  static setTokenCookie(res, token) {
    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict', 
      maxAge: 3600000,
    });
  }

  static clearTokenCookie(res) {
    res.clearCookie('auth_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
  }
}
