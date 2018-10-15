import * as Joi from 'joi';

export const tagName = Joi.string().min(2).max(30);

export const createTagSchema = {
    name: tagName.required()
};
