import { getRepository } from 'typeorm';

import { createHash } from 'crypto';
import { Session } from '../session/entity';

export function authentication() {
  return async function(ctx, next) {
    const bypassAuth = (
      // when logging in
      ctx.request.path === '/login' ||
      // when creating new users (signing up)
      (
        ctx.request.path === '/users' &&
        ctx.request.method === 'POST'
      )
    );

    if (bypassAuth) {
      await next();
      return;
    }

    const authHeader = ctx.request.header.authorization;
    if (!authHeader) {
      unauthorized(ctx);
      return;
    }

    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token) {
      unauthorized(ctx);
      return;
    }

    const hashedToken = createHash('sha256').update(token).digest('hex');

    const session = await getRepository(Session).findOne({
      relations: ['user'],
      where: { token: hashedToken }
    });

    if (!session) {
      unauthorized(ctx);
      return;
    }

    ctx.user = session.user;

    await next();
  }

  function unauthorized(ctx) {
    ctx.status = 401;
    ctx.body = {
      error: {
        message: 'Unauthorized.'
      }
    };
  }
}
