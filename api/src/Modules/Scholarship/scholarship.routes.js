import { Router } from "express";
import ScholarshipController from "./scholarship.controller.js";
import { isAuthenticated } from "../../Shared/Middlewares/Account/isAuthenticated.middleware.js";

const router = Router();

router.post(
  "/create",
  // isAuthenticated,
  ScholarshipController.createScholarship
);

router.get(
  "/",
  ScholarshipController.getAllOpenScholarships
);

export default router;
