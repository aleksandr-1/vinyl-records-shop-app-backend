const Joi = require("joi");

export const musicRecordSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  description: Joi.string(),
  price: Joi.number().positive().required(),
  count: Joi.number().positive().required(),
});
