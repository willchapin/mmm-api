import { createTagSchema } from './schema';
import { validateParams } from '../validation-util';

export async function validateCreateTag(ctx: any, next: Function) {
  await validateParams(ctx, createTagSchema, next);
}
