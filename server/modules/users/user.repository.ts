import AppDataSource from "../../db/data-source";
import User from "./user.model";

const UserRepository = AppDataSource.getRepository(User);

export default UserRepository;
