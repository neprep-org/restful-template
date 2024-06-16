import Joi from "joi";

export const CreateUserValidationSchema = Joi.object({
  email: Joi.string()
    .max(50)
    .email({ minDomainSegments: 2, tlds: { allow: false } })
    .required(),

  password: Joi.string().min(6).max(12).required(),
}).options({ abortEarly: false, allowUnknown: false });

export const UpdateUserValidationSchema = Joi.object({
  email: Joi.string()
    .max(50)
    .email({ minDomainSegments: 2, tlds: { allow: false } })
    .required(),
}).options({ abortEarly: false, allowUnknown: false });

export const GetAllUsersQueryValidationSchema = Joi.object({
  page: Joi.number().min(1).required(),
  limit: Joi.number().min(1).required(),
}).options({ abortEarly: false, allowUnknown: false });
