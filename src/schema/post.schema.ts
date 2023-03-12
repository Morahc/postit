import Joi from 'joi';

export const createSchema = Joi.object().keys({
  title: Joi.string().required(),
  body: Joi.string().required(),
});

export const updateSchema = Joi.object().keys({
  title: Joi.string(),
  body: Joi.string(),
});
