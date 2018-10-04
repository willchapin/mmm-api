import * as Joi from 'joi';

export const email = Joi.string().email({ minDomainAtoms: 2 });
// Minimum eight characters, at least one uppercase letter, one lowercase letter and one number
export const password = Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/);