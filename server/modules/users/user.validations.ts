import Joi from "joi";

const UserValidationSchema = Joi.object({
  email: Joi.string()
    .max(50)
    .email({ minDomainSegments: 2, tlds: { allow: false } })
    .required(),

  password: Joi.string().min(6).required(),
}).options({ abortEarly: false, allowUnknown: false });

export default UserValidationSchema;
