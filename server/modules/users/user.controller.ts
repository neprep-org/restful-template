import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserRepository from "./user.repository";
import ApiResponse from "../../common/api_response";
import {
  CreateUserValidationSchema,
  UpdateUserValidationSchema,
  GetAllUsersQueryValidationSchema,
} from "./user.validations";

import { AuthRequest } from "../../middlewares/auth.middleware";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = await CreateUserValidationSchema.validateAsync(
      req.body
    );

    // check if user with provided email doesn't exist already.
    const userWithEmailExist = await UserRepository.existsBy({ email });

    if (userWithEmailExist) {
      return ApiResponse.error(res, "User with this email already exists", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10); // hash the password

    const user = UserRepository.create({
      email,
      password: hashedPassword,
    });

    const newUser = await UserRepository.save(user);

    if (!newUser) {
      return ApiResponse.error(res, "Failed to create user", 400);
    }

    // remove password from the response
    newUser.password = "";

    // generate jwt token
    const token = await jwt.sign({ user: newUser }, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return ApiResponse.success(
      res,
      { ...newUser, token },
      "User created successfully",
      201
    );
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.id;

    const user = await UserRepository.findOne({ where: { id: userId } });

    if (!user) {
      return ApiResponse.error(res, "User not found", 404);
    }

    // remove password from the response
    user.password = "";

    return ApiResponse.success(res, user, "User fetched successfully", 200);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.id;
    const { email } = await UpdateUserValidationSchema.validateAsync(req.body);

    const user = await UserRepository.findOne({ where: { id: userId } });

    if (!user) {
      return ApiResponse.error(res, "User not found", 404);
    }

    // check if user with provided email doesn't exist already.
    const userWithEmailExist = await UserRepository.existsBy({
      email,
      id: userId,
    });

    if (userWithEmailExist) {
      return ApiResponse.error(res, "User with this email already exists", 400);
    }

    user.email = email;

    const updatedUser = await UserRepository.save(user);

    if (!updatedUser) {
      return ApiResponse.error(res, "Failed to update user", 400);
    }

    // remove password from the response
    updatedUser.password = "";

    return ApiResponse.success(
      res,
      updatedUser,
      "User updated successfully",
      200
    );
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.id;

    const user = await UserRepository.findOne({ where: { id: userId } });

    if (!user) {
      return ApiResponse.error(res, "User not found", 404);
    }

    const deletedUser = await UserRepository.delete(user.id);

    if (!deletedUser) {
      return ApiResponse.error(res, "Failed to delete user", 400);
    }

    return ApiResponse.success(res, null, "User deleted successfully", 200);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page = 1, limit = 10 } =
      await GetAllUsersQueryValidationSchema.validateAsync(req.query);

    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const [users, total] = await UserRepository.findAndCount({
      skip,
      take,
    });

    const totalPages = Math.ceil(total / parseInt(limit as string, 10));

    // remove passwords from the response
    const usersWithoutPasswords = users.map((user) => {
      user.password = "";
      return user;
    });

    return ApiResponse.success(
      res,
      {
        usersWithoutPasswords,
        total,
        totalPages,
        currentPage: Number(page),
      },
      "All users fetched successfully",
      200
    );
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = await CreateUserValidationSchema.validateAsync(
      req.body
    );

    const user = await UserRepository.findOne({ where: { email } });

    // check if user with provided email exists.
    if (!user) {
      return ApiResponse.error(res, "Invalid email or password", 400);
    }

    // check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return ApiResponse.error(res, "Invalid email or password", 400);
    }

    // remove password from the response
    user.password = "";

    // generate jwt token
    const token = await jwt.sign({ user }, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return ApiResponse.success(
      res,
      { ...user, token },
      "Logged in successfully",
      201
    );
  } catch (error) {
    next(error);
  }
};

export const getLoggedInUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await UserRepository.findOne(req.user.id);

    if (!user) {
      return ApiResponse.error(res, "User not found", 404);
    }

    // remove password from the response
    user.password = "";

    return ApiResponse.success(res, user, "User fetched successfully", 200);
  } catch (error) {
    next(error);
  }
};
