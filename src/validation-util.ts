import * as Joi from 'joi';
import { Context, Request } from 'koa';

export function validateParams(body: Request['body'], ctx: Context, schema: Joi.ObjectSchema) {
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