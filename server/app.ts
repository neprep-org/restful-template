import express, { Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import ApiResponse from "./common/api_response";
import { corsOptions } from "./common/app_constants";

import usersRoutes from "./modules/users/user.routes";
import errorMiddleware from "./middlewares/error.middleware";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json()); // for parsing application/json
app.use(helmet()); // for security
app.use(morgan("common")); // for logging
app.use(cors(corsOptions)); // for cross-origin resource sharing

// Routes
app.use("/users", usersRoutes);

// Not Found Route
app.use("*", async (req: Request, res: Response) => {
  return ApiResponse.error(res, "Route not found", 404);
});

app.get("/health", async (req: Request, res: Response) => {
  const date = new Date();
  const uptime = process.uptime(); // How long node process have been learning
  return ApiResponse.success(res, { date, uptime }, "Server is up and running");
});

// Error Middleware
app.use(errorMiddleware);

export default app;
