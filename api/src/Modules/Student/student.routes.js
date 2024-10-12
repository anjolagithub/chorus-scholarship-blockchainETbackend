import { Router } from "express";
import StudentController from "./student.controller.js";
import { isAuthenticated } from "../../Shared/Middlewares/Account/isAuthenticated.middleware.js";

const router = Router();

router.put("/update_profile", isAuthenticated, StudentController.updateStudentProfile);

export default router;
