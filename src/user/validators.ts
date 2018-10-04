import { createUserSchema, updateUserSchema } from './schema';
import { validateParams } from '../validation-util';

export async function validateCreateUser(ctx, next) {
  await validateParams(ctx.request.body, createUserSchema, ctx, next);
}

export async function validateUpdateUser(ctx, next) {
  await validateParams(ctx.request.body, updateUserSchema, ctx, next);
}
