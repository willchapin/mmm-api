import * as Joi from 'joi';

export const tagName = Joi.string().min(2).max(30);

export type CreateTagBody = {
  name: string;
};

export const createTagSchema = Joi.object().keys({
  name: tagName.required()
});
