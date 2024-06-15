import "reflect-metadata";

import http from "http";
import dotenv from "dotenv";

import app from "./app";
import AppDataSource from "./db/data-source";

dotenv.config(); // load environment variables

const server = http.createServer(app);

if (process.env.ENV_LOADED == undefined) {
  console.error("Exiting, environment variables not loaded.");
  process.exit(1);
}

const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
    console.log("Database connected");
  })
  .catch((err) => {
    console.error("Database connection failed", err);
    process.exit(1);
  });
