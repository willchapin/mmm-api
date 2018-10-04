import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import { User } from './entity';
import { bcryptCost } from '../shared/constants';

export async function getAllUsers(ctx, next) {
  ctx.body = await getRepository(User).find();
  await next();
}

export async function getUserById(ctx) {
  debugger;
  const id = ctx.params.id;
  if (ctx.user.id != id) {
    ctx.status = 403;
    ctx.body = {
      error: {
        message: 'Forbidden',
      }
    }
    return;
  }

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
  user.password = await hash(ctx.request.body.password, bcryptCost);

  const savedUser = await getRepository(User).save(user);
  ctx.body = savedUser;

  await next();
}

export async function updateUser(ctx) {
  const body = ctx.request.body;
  if (body.password) {
    body.password = await hash(body.password, bcryptCost);
  }

  const updatedUser = await getRepository(User).save(body);
  ctx.body = await getRepository(User).save(updatedUser);
}