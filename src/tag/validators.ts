import { createTagSchema, CreateTagBody } from './schema';
import { validateParams } from '../validation-util';
import { Request, Context } from 'koa';

export function validateCreateTag(body: Request['body'], ctx: Context): body is CreateTagBody {
  return validateParams(body, ctx, createTagSchema);
}
