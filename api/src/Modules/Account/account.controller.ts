import { Request, Response, NextFunction } from "express";
import AccountServices from "./account.services";
import { AccountValidator } from "./account.validator";
import TokenHelper from "../../Shared/Helpers/token.helper";

export default class AccountController {
  public static async signUp(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
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

  public static async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
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

  public static logout(_, res: Response) {
    TokenHelper.clearTokenCookie(res);

    res.status(200).json({
      message: "Logout successful",
    });
  }
  updatedAccount;
  public static async forgetPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result = await AccountServices.forgetAccountPassword(req.body);
      res.status(200).json({ message: result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  public static async resetPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result = await AccountServices.resetCustomerPassword(req.body);
      res.status(200).json({ message: result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  public static async createGoogleAccount(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // Call service to create Google account
      const result = await AccountServices.createGoogleAccount(req.body);
      res.status(201).json({ account: result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  public static async verifyAccount(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
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
