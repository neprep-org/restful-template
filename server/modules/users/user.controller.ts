import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserRepository from "./user.repository";
import ApiResponse from "../../common/api_response";
import UserValidationSchema from "./user.validations";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = await UserValidationSchema.validateAsync(
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
    console.error(error);
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = await UserValidationSchema.validateAsync(
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
    console.error(error);
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const getLoggedInUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
