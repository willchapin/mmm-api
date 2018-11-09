import * as Joi from 'joi';
import { tagName,  } from '../tag/schema';

const id = Joi.number();
const description = Joi.string().min(1).max(280);
const cost = Joi.number().integer();
const tagNames = Joi.array().items(tagName);

export type CreatePurchaseBody = {
  cost: number,
  tagNames: string[],
  description?: string
};

export const getPurchaseSchema = Joi.object().keys({
  id: id.required()
});

export const createPurchaseSchema = Joi.object().keys({
  cost: cost.required(),
  tagNames: tagNames.required(),
  description,
});
