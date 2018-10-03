import { createTagSchema } from './schema';
import { validateParams } from '../validation-util';

export async function validateCreateTag(ctx, next) {
  await validateParams(ctx.request.body, createTagSchema, ctx, next);
}
