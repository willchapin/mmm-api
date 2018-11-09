import { loginSchema, LoginBody } from './schema';
import { validateParams } from '../validation-util';
import { Request, Context } from 'koa';

export function validateLogin(body: Request['body'], ctx: Context): body is LoginBody {
  return validateParams(body, ctx, loginSchema);
}