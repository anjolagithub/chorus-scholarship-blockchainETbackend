import rateLimit from "express-rate-limit";

export class AccountRateLimiter {
  static loginRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login attempts per windowMs
    message: {
      success: false,
      message: "Too many login attempts, please try again later.",
    },
  });

  static signUpRateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5,
    message: {
      success: false,
      message: "Too many sign-up attempts, please try again later.",
    },
  });

  static resendVerificationRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 3,
    message: {
      success: false,
      message:
        "Too many requests to resend verification link, please try again later.",
    },
  });

  static forgetPasswordRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 3,
    message: {
      success: false,
      message: "Too many password reset requests, please try again later.",
    },
  });
}
