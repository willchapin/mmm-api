import { createPurchaseSchema } from './schema';
import { validateParams } from '../validation-util';

export async function validateCreatePurchase(ctx: any, next: Function) {
  await validateParams(ctx, createPurchaseSchema, next);
}
