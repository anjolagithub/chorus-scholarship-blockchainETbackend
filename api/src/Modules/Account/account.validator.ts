import Joi from 'joi';

const signupSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  accountType: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .required()
    .min(8)
    .pattern(/[A-Z]/, "uppercase letter")
    .pattern(/[0-9]/, "number")
    .pattern(/[@!#$%^+&*(),.?":{}|<>]/, "special character")
    .messages({
      "string.min": "Password must be at least 8 characters long",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one number, and one special character",
      "string.empty": "Password is required",
    }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .required()
});
export class AccountValidator {
  public static validateSignup = (data: any) => {
    return signupSchema.validate(data, { abortEarly: false });
  };

  public static validateLogin = (data: any) => {
    return loginSchema.validate(data, { abortEarly: false });
  };
}