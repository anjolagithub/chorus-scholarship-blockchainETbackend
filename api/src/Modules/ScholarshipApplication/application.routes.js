import { Router } from "express";
import ApplicationController from "./application.controller.js";
import { isAuthenticated } from "../../Shared/Middlewares/Account/isAuthenticated.middleware.js";
import {handleUpload} from "../../Shared/Middlewares/upload.middleware.js";

const router = Router();

router.post(
  "/create",
  isAuthenticated,
  ApplicationController.createApplication
);

router.post(
  "/upload",
  isAuthenticated,
  handleUpload,
  ApplicationController.handleFileUpload
);

router.get(
  "/",
  ApplicationController.getAllApplications
);

export default router;
