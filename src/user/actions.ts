import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import { User } from './entity';
import { bcryptCost } from '../shared/constants';

export async function getAllUsers(ctx: any) {
  ctx.body = await getRepository(User).find();
}

export async function getUserAuth(ctx: any) {
  ctx.body = { auth: true };
}

export async function getUserById(ctx: any) {
  const id = ctx.params.userId;
  const user = await getRepository(User).findOne(id);
  if (!user) {
    ctx.status = 404;
    ctx.body = {
      error: {
        message: `User with id ${id} does not exist.`,
      }
    };
    return;
  }

  ctx.body = user;
}

export async function createUser(ctx: any) {
  const email = ctx.request.body.email;

  const existingUser = await getRepository(User).findOne({ where: { email } });
  if (existingUser) {
    ctx.status = 409;
    ctx.body = {
      error: {
        message: `A User with email "${email}" already exists.`,
      }
    };
    return;
  }

  const user = new User();
  user.email = email;
  user.name = ctx.request.body.name;
  user.password = await hash(ctx.request.body.password, bcryptCost);

  const savedUser = await getRepository(User).save(user);
  ctx.body = savedUser;
}

export async function updateUser(ctx: any) {
  const body = ctx.request.body;
  if (body.password) {
    body.password = await hash(body.password, bcryptCost);
  }

  const updatedUser = {...ctx.user, ...ctx.request.body};
  ctx.body = await getRepository(User).save(updatedUser);
}