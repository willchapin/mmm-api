import * as Joi from 'joi';
import { email, password } from '../shared/schema';

export const loginSchema = Joi.object().keys({
  email: email.required(),
  password: password.required()
});