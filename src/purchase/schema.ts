import * as Joi from 'joi';

const id = Joi.number();
const description = Joi.string().min(1).max(280);
const userId = Joi.number().integer();
const tagIds = Joi.array().items(Joi.number().integer());

export const getPurchaseSchema = {
  id: id.required()
};

export const createPurchaseSchema = {
  tagIds: tagIds.required(),
  description,
};

export const updatePurchaseSchema = {
  id: id.required(),
  description,
  userId,
  tagIds,
};