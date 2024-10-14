import { Router } from "express";
import ScholarshipController from "./scholarship.controller.js";
// import { isAuthenticated } from "../../Shared/Middlewares/Account/isAuthenticated.middleware.js";
import {handleUpload} from "../../Shared/Middlewares/upload.middleware.js";

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

router.post(
  "/upload_cover",
  handleUpload,
  ScholarshipController.handleImageUpload
)

export default router;
