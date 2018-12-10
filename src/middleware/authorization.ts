import { Context } from 'koa';

export async function byUser(ctx: Context, next: Function) {
  if (ctx.user.id !== Number(ctx.params.userId)) {
    ctx.status = 403;
    ctx.body = {
      error: {
        message: 'Forbidden',
      }
    };
    return;
  }
  await next();
}
