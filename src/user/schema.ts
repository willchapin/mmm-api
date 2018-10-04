import * as Joi from 'joi';
import { email, password } from '../shared/schema';

const id = Joi.number();

export const createUserSchema = {
    email: email.required(),
    password: password.required(),
};

export const updateUserSchema = {
    email: email,
    password: password,
};