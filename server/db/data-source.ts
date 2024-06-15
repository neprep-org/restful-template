import dotenv from "dotenv";
import { DataSource } from "typeorm";

import User from "../modules/users/user.model";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User],
  subscribers: [],
  migrations: [],
});

export default AppDataSource;
