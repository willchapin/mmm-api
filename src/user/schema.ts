import * as Joi from 'joi';

const id = Joi.number();
const email = Joi.string().email({ minDomainAtoms: 2 });
// Minimum eight characters, at least one uppercase letter, one lowercase letter and one number
const password = Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/);

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