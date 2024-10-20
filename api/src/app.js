import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import logger from "./Shared/utils/logger.js";

import accountRoutes from "./Modules/Account/account.routes.js";
import studentRoutes from "./Modules/Student/student.routes.js";
import applicationRoutes from "./Modules/ScholarshipApplication/application.routes.js";
import scholarshipRoutes from "./Modules/Scholarship/scholarship.routes.js";

const app = express();

const corsOptions = {
  //   origin: ["http://localhost:3000"],
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.set("trust proxy", 1);

app.use(
  morgan("combined", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/v1/account", accountRoutes);
app.use("/v1/students", studentRoutes);
app.use("/v1/applications", applicationRoutes);
app.use("/v1/scholarships", scholarshipRoutes);

export default app;
