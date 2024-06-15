import { Request, Response, NextFunction } from "express";
import ApiResponse from "../common/api_response";

const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error middleware:", error);
  const message = error.message || "Internal server error";
  const statusCode = message == "Internal server error" ? 500 : 400;
  return ApiResponse.error(res, message, statusCode);
};

export default errorMiddleware;
