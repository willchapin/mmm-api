import * as Joi from 'joi';
import { email, password } from '../shared/schema';

const id = Joi.number();
const name = Joi.string().min(3).max(20);

export const createUserSchema = Joi.object().keys({
    email: email.required(),
    password: password.required(),
    name: name.required(),
});

export const updateUserSchema = Joi.object().keys({
    email,
    password,
    name,
});