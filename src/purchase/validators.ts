import { createPurchaseSchema } from './schema';
import { validateParams } from '../validation-util';

export async function validateCreatePurchase(ctx, next) {
  await validateParams(ctx.request.body, createPurchaseSchema, ctx, next);
}
