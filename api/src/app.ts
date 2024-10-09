import express, { Application } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import logger from "./Shared/utils/logger";

import studentRoutes from "./Modules/Student/student.routes";
import googleOauthRoutes from "./Modules/Oauth/Google/googleOauth.routes";

const app: Application = express();

const corsOptions: CorsOptions = {
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

app.use("/v1/students", studentRoutes);
app.use("/v1/auth/google", googleOauthRoutes);

export default app;
