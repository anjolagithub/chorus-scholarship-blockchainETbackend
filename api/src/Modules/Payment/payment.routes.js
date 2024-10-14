import { Router } from "express";
import PaymentController from "./payment.controller.js";
import { isAuthenticated } from "../../Shared/Middlewares/Account/isAuthenticated.middleware.js";

const router = Router();

router.post(
  "/create",
  isAuthenticated,
  PaymentController.createPayment
);

export default router;
