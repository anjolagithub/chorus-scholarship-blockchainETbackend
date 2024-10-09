import { Response } from "express";
import MongoConnection from "./Infrastructure/Databases/mongoConnection";
import { config } from "./Config/app.config";
import app from "./app";
import logger from "./Shared/utils/logger";

app.get("/", (_, res: Response) => {
  res.status(200).send({
    message: "Welcome, This is Chorus API!",
  });
});

const startServer = async () => {
  try {
    await MongoConnection.connect();
    app.listen(config.port, () => {
      logger.info(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    logger.error("Failed to start the server:", error);
  }
};

startServer();
