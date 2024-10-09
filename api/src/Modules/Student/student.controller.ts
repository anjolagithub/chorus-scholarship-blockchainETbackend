import { NextFunction, Request, Response } from "express";
import StudentServices from "./student.services";
import TokenHelper from "../../Shared/Helpers/token.helper";
import {
  ChangeStudentPasswordDTO,
  ChangeStudentPasswordInput,
  ForgetStudentPasswordInput,
  CreateBaseAccountInput,
  LoginStudentInput,
  ResetStudentPasswordInput,
} from "./studentTypes";
import { AccountValidator } from "../Account/account.validator";

export default class StudentController {
  public static async signUpStudent(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const data: CreateBaseAccountInput = req.body;

      const { error } = AccountValidator.validateSignup(req.body);

      if (error) {
        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: error.details,
        });

        return;
      }

      const message = await StudentServices.signUpStudent(data);

      res.status(200).json({ message });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  public static async resendVerificationLink(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { email } = req.body;

      const message = await StudentServices.resendVerificationLink(email);

      res.status(200).json({ message });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  public static async verifyStudent(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { verificationToken } = req.params;

      const message = await StudentServices.verifyStudent(verificationToken);

      res.status(200).json({ message });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  public static async loginStudent(req: Request, res: Response): Promise<void> {
    try {
      const data: LoginStudentInput = req.body;

      const { error } = AccountValidator.validateLogin(data);

      if (error) {
        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: error.details,
        });

        return;
      }

      const token = await StudentServices.loginStudent(data);

      token && TokenHelper.setTokenCookie(res, token);

      res.status(200).json({
        message: "Login successful",
        token,
      });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }

  public static logoutStudent(_, res: Response) {
    TokenHelper.clearTokenCookie(res);

    res.status(200).json({
      message: "Logout successful",
    });
  }

  public static async forgetStudentPassword(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const data: ForgetStudentPasswordInput = req.body;

      const message = await StudentServices.forgetStudentPassword(data);

      res.status(200).json({ message });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  public static async resetStudentPassword(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const data: ResetStudentPasswordInput = req.body;

      const message = await StudentServices.resetStudentPassword(data);
      res.status(200).json({ message });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  public static async changeStudentPassword(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const userInput: ChangeStudentPasswordInput = req.body;

      const { accountId, accountType, accountTypeId } = req.user;

      const data: ChangeStudentPasswordDTO = {
        ...userInput,
        accountId,
        accountType,
        accountTypeId,
      };

      const message = await StudentServices.changeStudentPassword(data);

      res.status(200).json({ message });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /*

  public static async createStudentGoogleAccount(req: Request, res: Response): Promise<void> {
    try {
      const account = await StudentServices.createStudentGoogleAccount();
      res.status(200).json(account);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
 */

  public static async getStudentAccountDetails(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const givenAccountId = req.user.accountId;

      const student = await StudentServices.getStudentAccountDetails(
        givenAccountId
      );

      if (!student) {
        res.status(404).json({ message: "Student not found" });
        return;
      }

      res.status(200).json({ student }); // Return the student data
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal server error", details: error.message });
    }
  }
}
