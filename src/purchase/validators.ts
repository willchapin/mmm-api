import { createPurchaseSchema } from './schema';
import { validateParams } from '../validation-util';
import { Context } from 'koa';

export async function validateCreatePurchase(ctx: Context, next: Function) {
  await validateParams(ctx, createPurchaseSchema, next);
}
