import * as Joi from 'joi';

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