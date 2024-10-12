import AccountServices from "./account.services.js";
import { AccountValidator } from "./account.validator.js";
import TokenHelper from "../../Shared/Helpers/token.helper.js";

export default class AccountController {
  static async signUp(
    req,
    res,
  ) {
    try {
      // Validate request body
      const { error } = AccountValidator.validateSignup(req.body);

      if (error) {
        res.status(400).json({ errors: error.details.map((e) => e.message) });
        return;
      }

      const result = await AccountServices.signUp(req.body);
      res.status(201).json({ message: result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async login(
    req,
    res,
  ) {
    try {
      // Validate request body
      const { error } = AccountValidator.validateLogin(req.body);
      if (error) {
        res.status(400).json({ errors: error.details.map((e) => e.message) });
        return;
      }
      const token = await AccountServices.login(req.body);
      res.status(200).json({ message: "logged in successfully.", token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static logout(_, res) {
    TokenHelper.clearTokenCookie(res);

    res.status(200).json({
      message: "Logout successful",
    });
  }
  updatedAccount;
  static async forgetPassword(
    req,
    res,
  ) {
    try {
      const result = await AccountServices.forgetAccountPassword(req.body);
      res.status(200).json({ message: result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async resetPassword(
    req,
    res,
  ) {
    try {
      const result = await AccountServices.resetCustomerPassword(req.body);
      res.status(200).json({ message: result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createGoogleAccount(
    req,
    res,
  ) {
    try {
      // Call service to create Google account
      const result = await AccountServices.createGoogleAccount(req.body);
      res.status(201).json({ account: result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async verifyAccount(
    req,
    res,
  ) {
    try {
      const { token } = req.params;
      await AccountServices.verifyAccount(token);
      res.status(200).json({ message: "Account verified successfully" });
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: error.message });
    }
  }
}
