import { Router } from "express";

import {
  signup,
  getUserById,
  updateUser,
  getLoggedInUser,
  deleteUser,
  getAllUsers,
  login,
} from "./user.controller";
import authMiddleware from "../../middlewares/auth.middleware";

const router = Router();

// auth routes - unprotected
router.post("/signup", signup);
router.post("/login", login);

// Authenticator middleware
router.use(authMiddleware);

// other routes - protected
router.get("/all", getAllUsers);
router.get("/:userId", getUserById);
router.get("/logged-in-user", getLoggedInUser);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);

export default router;
