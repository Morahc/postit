import Joi from 'joi';

export const schema = Joi.object().keys({
  body: Joi.string().required(),
});

