import winston from "winston";

// logger configuration
const logger = winston.createLogger({
  level: "info", // Set logging level (info, error, debug, etc.)
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(), // Log to console
    new winston.transports.File({ filename: "logs/error.log", level: "error" }), // Log errors to file
    new winston.transports.File({ filename: "logs/combined.log" }), // Log everything to combined log
  ],
});

// If in development, log to the console with simple format
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

export default logger;
