import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import ApiResponse from "../common/api_response";

export interface AuthRequest extends Request {
  user?: any;
}

const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return ApiResponse.error(res, "Unauthorized", 401);
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;

    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return ApiResponse.error(res, "Unauthorized", 401); // Return an unauthorized response
  }
};

export default authMiddleware;
