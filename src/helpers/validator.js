import Joi from 'joi';

import { dateRegex } from '../constants/regs.js';

const validator = schema => payload => schema.validate(
  payload,
  { abortEarly: false }
);

const createMeetupSchema = Joi.object({
  title: Joi.string().max(50).required(),
  desc: Joi.string().max(255).optional(),
  tags: Joi.array().items(Joi.string()).optional(),
  date: Joi.string().regex(dateRegex).required(),
  location: Joi.string().max(50).required()
});

const updateMeetupSchema = Joi.object({
  title: Joi.string().max(50).optional(),
  desc: Joi.string().max(255).optional(),
  tags: Joi.array().items(Joi.string()).optional(),
  date: Joi.string().regex(dateRegex).optional(),
  location: Joi.string().max(50).optional()
});

export const validateCreateMeetup = validator(createMeetupSchema);
export const validateUpdateMeetup = validator(updateMeetupSchema);
