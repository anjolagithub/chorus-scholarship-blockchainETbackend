import { Router } from "express";
import StudentController from "./student.controller";
import { isAuthenticated } from "../../Shared/Middlewares/Account/isAuthenticated.middleware";
import { AccountRateLimiter } from "../../Shared/Middlewares/Account/accountRateLimiter.middleware";

const router = Router();

router.get("/verify/:verificationToken", StudentController.verifyStudent);
router.get("/logout", isAuthenticated, StudentController.logoutStudent);
router.get(
  "/getStudentAccountDetails",
  isAuthenticated,
  StudentController.getStudentAccountDetails
);

router.post(
  "/signup",
  AccountRateLimiter.signUpRateLimiter,
  StudentController.signUpStudent
);
router.post(
  "/resend-verification-link",
  AccountRateLimiter.resendVerificationRateLimiter,
  StudentController.resendVerificationLink
);
router.post(
  "/login",
  AccountRateLimiter.loginRateLimiter,
  StudentController.loginStudent
);
router.post(
  "/forget-password",
  AccountRateLimiter.forgetPasswordRateLimiter,
  StudentController.forgetStudentPassword
);
router.post("/reset-password", StudentController.resetStudentPassword);
router.post(
  "/change-password",
  isAuthenticated,
  StudentController.changeStudentPassword
);

export default router;
