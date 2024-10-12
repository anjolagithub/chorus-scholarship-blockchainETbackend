import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { config } from "../../../Config/app.config";
import { IDecodedToken } from "../../../Modules/Account/accountTypes";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Authentication required" });
    return; // Ensure request-response cycle ends here
  }

  const token = authHeader.split(" ")[1];

  try {
    const secret = config.tokenSecrets.accessToken.secret;
    const decoded = jwt.verify(token, secret) as IDecodedToken;

    req.user = decoded; // Attach the decoded token to req.user
    next(); // Pass control to the next middleware or route handler
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      res.status(401).json({ message: "Token expired" });
    } else if (error.name === "JsonWebTokenError") {
      res.status(401).json({ message: "Invalid token" });
    } else {
      res.status(500).json({ message: "Server error. Try again." });
    }
  }
};
