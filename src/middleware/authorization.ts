import { getRepository } from 'typeorm';
import { User } from '../User/entity';

export async function byUser(ctx, next) {
  if (ctx.user.id != ctx.params.userId) {
    ctx.status = 403;
    ctx.body = {
      error: {
        message: 'Forbidden',
      }
    }
    return;
  }
  await next();
}