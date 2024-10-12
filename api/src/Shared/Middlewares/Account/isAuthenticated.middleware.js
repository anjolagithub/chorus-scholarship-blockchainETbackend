import jwt from "jsonwebtoken";
import { config } from "../../../Config/app.config.js";

export const isAuthenticated = (
  req,
  res,
  next
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Authentication required" });
    return; 
  }

  const token = authHeader.split(" ")[1];

  try {
    const secret = config.tokenSecrets.accessToken.secret;
    const decoded = jwt.verify(token, secret);

    req.user = decoded; 

    next(); // Pass control to the next middleware or route handler
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.status(401).json({ message: "Token expired" });
    } else if (error.name === "JsonWebTokenError") {
      res.status(401).json({ message: "Invalid token" });
    } else {
      res.status(500).json({ message: "Server error. Try again." });
    }
  }
};
