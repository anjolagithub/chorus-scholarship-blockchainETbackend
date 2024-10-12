import { Router } from "express";
import AccountController from "./account.controller";
import { isAuthenticated } from "../../Shared/Middlewares/Account/isAuthenticated.middleware";
import { AccountRateLimiter } from "../../Shared/Middlewares/Account/accountRateLimiter.middleware";

const router = Router();

router.get("/verify/:token", AccountController.verifyAccount);
router.get("/logout", isAuthenticated, AccountController.logout);

router.post(
  "/signup",
  AccountRateLimiter.signUpRateLimiter,
  AccountController.signUp
);
router.post(
  "/login",
  AccountRateLimiter.loginRateLimiter,
  AccountController.login
);
router.post(
  "/forget-password",
  AccountRateLimiter.forgetPasswordRateLimiter,
  AccountController.forgetPassword
);
router.post("/reset-password", AccountController.resetPassword);

export default router;
