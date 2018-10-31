import { createUserSchema, updateUserSchema } from './schema';
import { validateParams } from '../validation-util';

import { IRouterContext } from 'koa-router';

export async function validateCreateUser(ctx: IRouterContext, next: Function) {
  await validateParams(ctx, createUserSchema, next);
}

export async function validateUpdateUser(ctx: IRouterContext, next: Function) {
  await validateParams(ctx, updateUserSchema, next);
}
