import { getConnection } from "typeorm";
import { getRepository } from 'typeorm';

import { compare, hash } from 'bcryptjs';
import { randomBytes, createHash } from 'crypto';

import { User } from '../user/entity';
import { Session } from './entity';

import { bcryptCost } from '../shared/constants';
import { forbidden } from 'joi';
import { password } from '../shared/schema';

export async function login(ctx) {
  const email = ctx.request.body.email;
  const user = await getRepository(User).findOne({ where: { email } });
  if (!user) {
    unauthorized(ctx);
    return;
  }

  const match = await compare(ctx.request.body.password, user.password);
  if (!match) {
    unauthorized(ctx);
    return;
  }

  const token = randomBytes(16).toString('hex');

  // remove old sessions for this user
  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Session)
    .where("userId = :userId", { userId: user.id })
    .execute();

  await getRepository(Session).save({
    user,
    token: createHash('sha256').update(token).digest('hex')
  });

  ctx.body = { token };
}

function unauthorized(ctx) {
  ctx.status = 401;
  ctx.body = {
    error: {
      message: 'Invalid email or password'
    }
  };
}