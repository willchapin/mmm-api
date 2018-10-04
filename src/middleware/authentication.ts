import { getRepository } from 'typeorm';

import { createHash } from 'crypto';
import { User } from '../User/entity';
import { Session } from '../session/entity';

export function authentication() {
  return async function(ctx, next) {
    if (ctx.request.path === '/login') {
      await next();
      return;
    }

    const authHeader = ctx.request.header.authorization;
    const token = authHeader.split(' ')[1];
    const hashedToken = createHash('sha256').update(token).digest('hex');

    const session = await getRepository(Session).findOne({
      relations: ['user'],
      where: { token: hashedToken }
    });

    if (!session) {
      ctx.status = 401;
      ctx.body = {
        error: {
          message: 'Unauthorized.'
        }
      };
      return;
    }

    ctx.user = session.user;

    await next();
  }
}