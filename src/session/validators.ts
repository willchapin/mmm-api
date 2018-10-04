import { loginSchema } from './schema';
import { validateParams } from '../validation-util';

export async function validateLogin(ctx, next) {
  await validateParams(ctx.request.body, loginSchema, ctx, next);
}
