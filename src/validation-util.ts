import * as Joi from 'joi';

export async function validateParams(params, schema, ctx, next) {
  const result = Joi.validate(params, schema, { abortEarly: false });
  if (!result.error) {
    await next();
  } else {
    ctx.status = 400;
    ctx.body = {
      error: {
        message: 'Invalid parameters',
        details: result.error.details
      }
    }
  }
}