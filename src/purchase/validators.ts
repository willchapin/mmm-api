import { Context, Request } from 'koa';
import { createPurchaseSchema, CreatePurchaseBody } from './schema';
import { validateParams } from '../validation-util';

export function validateCreatePurchase(body: Request['body'], ctx: Context): body is CreatePurchaseBody {
  return validateParams(body, ctx, createPurchaseSchema);
}
