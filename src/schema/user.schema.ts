import Joi from 'joi';

export const registerSchema = Joi.object().keys({
  fullname: Joi.string().max(54).required(),
  handle: Joi.string()
    .regex(/^@[A-Za-z]+/)
    .min(4)
    .required(),
  password: Joi.string().min(8).max(30).required(),
  email: Joi.string().email().required(),
});

export const loginSchema = Joi.object()
  .keys({
    handle: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().min(8).max(30).required(),
  })
  .xor('handle', 'email');

export const updateSchema = Joi.object().keys({
  fullname: Joi.string().max(54),
  handle: Joi.string(),
  password: Joi.string().min(8).max(30),
});
