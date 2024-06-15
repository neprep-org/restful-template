import { Response } from "express";

export default class ApiResponse {
  public static success(
    res: Response,
    data: any,
    message?: string,
    statusCode = 200
  ) {
    return res.status(statusCode).json({
      success: true,
      message: message || "Operation successful",
      data,
    });
  }

  public static error(res: Response, message: string, statusCode = 400) {
    return res.status(statusCode).json({
      success: false,
      message,
    });
  }
}
