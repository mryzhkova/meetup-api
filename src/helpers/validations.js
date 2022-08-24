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

const singUpSchema = Joi.object({
  login: Joi.string().min(3).max(50).required(),
  password: Joi.string().min(5).max(50).required()
});

const singInSchema = Joi.object({
  login: Joi.string().min(3).max(50).required(),
  password: Joi.string().min(5).max(50).required()
});

const tokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

export const validateCreateMeetup = validator(createMeetupSchema);
export const validateUpdateMeetup = validator(updateMeetupSchema);

export const validateSingUp = validator(singUpSchema);
export const validateSingIn = validator(singInSchema);
export const validateToken = validator(tokenSchema);

export const checkValue = (value, oldvalue) => ({
  title: value.title ? value.title : oldvalue.meetuptitle,
  date: value.date ? value.date : oldvalue.meetupdate,
  location: value.location ? value.location : oldvalue.meetuplocation,
  desc: value.desc ? value.desc : oldvalue.meetupdesc,
  tags: value.tags ? value.tags : oldvalue.meetuptags
});
