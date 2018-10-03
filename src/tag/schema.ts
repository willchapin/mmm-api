import * as Joi from 'joi';

const name = Joi.string().min(2).max(30);

export const createTagSchema = {
    name: name.required()
};