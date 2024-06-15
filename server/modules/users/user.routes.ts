import { Router } from "express";

import {
  signup,
  getUserById,
  updateUser,
  getLoggedInUser,
  deleteUser,
  getAllUsers,
  login,
  logout,
} from "./user.controller";

const router = Router();

// auth routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/all", getAllUsers);
router.get("/:userId", getUserById);
router.get("/logged-in-user", getLoggedInUser);

router.put("/:userId", updateUser);

router.delete("/:userId", deleteUser);

export default router;
