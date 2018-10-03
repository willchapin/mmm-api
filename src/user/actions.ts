import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import * as Joi from 'joi';

import { User } from './entity';

const hashingWork = 5;

export async function getAllUsers(ctx, next) {
  ctx.body = await getRepository(User).find();
  await next();
}

export async function getUserById(ctx) {
  const id = ctx.params.id;
  const user = await getRepository(User).findOne(id);
  if (!user) {
    ctx.status = 404;
    ctx.body = {
      error: {
        message: `User with id ${id} does not exist.`,
      }
    }
    return;
  }

  ctx.body = user;
}

export async function createUser(ctx, next) {
  const email = ctx.request.body.email;
  const existingUser = await getRepository(User).findOne({ where: { email } });
  if (existingUser) {
    ctx.status = 409;
    ctx.body = {
      error: {
        message: `A User with email "${email}" already exists.`,
      }
    }
    return;
  }

  const user = new User();
  user.email = email;
  user.password = await hash(ctx.request.body.password, hashingWork);

  const savedUser = await getRepository(User).save(user);
  // { select: false } in the entity doesn't work here because it's a save, not select
  delete savedUser.password;

  ctx.body = savedUser;
  await next();
}

export async function updateUser(ctx) {
  const body = ctx.request.body;
  if (body.password) {
    body.password = await hash(body.password, hashingWork);
  }

  const updatedUser = await getRepository(User).save(body);
  // { select: false } in the entity doesn't work here because it's a save, not select
  delete updatedUser.password;

  ctx.body = await getRepository(User).save(updatedUser);
}