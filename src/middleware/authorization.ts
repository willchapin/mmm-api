import { getRepository } from 'typeorm';

export async function byUser(ctx: any, next: Function) {
  console.log('params', JSON.stringify(ctx.params));
  console.log(ctx.user.id, ctx.params.userId);
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
