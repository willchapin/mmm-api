import { loginSchema } from './schema';
import { validateParams } from '../validation-util';

export async function validateLogin(ctx: any, next: Function) {
  await validateParams(ctx, loginSchema, next);
}
