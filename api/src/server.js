import MongoConnection from "./Infrastructure/Databases/mongoConnection.js";
import { config } from "./Config/app.config.js";
import app from "./app.js";
import logger from "./Shared/utils/logger.js";

app.get("/", (_, res) => {
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
