import { createUserSchema, updateUserSchema, CreateUserBody, UpdateUserBody } from './schema';
import { validateParams } from '../validation-util';
import { Context, Request } from 'koa';

export function validateCreateUser(body: Request['body'], ctx: Context): body is CreateUserBody {
  return validateParams(body, ctx, createUserSchema);
}

export function validateUpdateUser(body: Request['body'], ctx: Context): body is UpdateUserBody {
  return validateParams(body, ctx, updateUserSchema);
}
