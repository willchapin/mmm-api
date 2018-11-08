import * as Joi from 'joi';
import { Context, Request } from 'koa';

export function _validateParams(body: Request['body'], ctx: Context, schema: Joi.ObjectSchema) {
  const result = Joi.validate(body, schema, { abortEarly: false });
  if (!result.error) {
    return true;
  } else {
    ctx.status = 400;
    ctx.body = {
      error: {
        message: 'Invalid parameters',
        details: result.error.details
      }
    };

    return false;
  }
}

export async function validateParams(ctx: any, schema: Joi.ObjectSchema, next: Function) {
  const result = Joi.validate(ctx.request.body, schema, { abortEarly: false });
  if (!result.error) {
    await next();
  } else {
    ctx.status = 400;
    ctx.body = {
      error: {
        message: 'Invalid parameters',
        details: result.error.details
      }
    };
  }
}