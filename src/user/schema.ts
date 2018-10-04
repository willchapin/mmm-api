import * as Joi from 'joi';
import { email, password } from '../shared/schema';

const id = Joi.number();

export const getUserSchema = {
    id: id.required()
};

export const createUserSchema = {
    email: email.required(),
    password: password.required(),
};

export const updateUserSchema = {
    id: id.required(),
    email: email,
    password: password,
};