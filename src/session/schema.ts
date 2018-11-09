import * as Joi from 'joi';
import { email, password } from '../shared/schema';

export type LoginBody = {
    email: string;
    password: string;
};

export const loginSchema = Joi.object().keys({
  email: email.required(),
  password: password.required()
});