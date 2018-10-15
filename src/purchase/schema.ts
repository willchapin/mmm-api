import * as Joi from 'joi';
import { tagName } from '../tag/schema';

const id = Joi.number();
const description = Joi.string().min(1).max(280);
const userId = Joi.number().integer();
const cost = Joi.number().integer();
const tagNames = Joi.array().items(tagName);

export const getPurchaseSchema = {
  id: id.required()
};

export const createPurchaseSchema = {
  cost: cost.required(),
  tagNames: tagNames.required(),
  description,
};
