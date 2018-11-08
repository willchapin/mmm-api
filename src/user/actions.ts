import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import { User } from './entity';
import { bcryptCost } from '../shared/constants';
import { Context, Request } from 'koa';

import { validateCreateUser, validateUpdateUser } from './validators';
import { UpdateUserBody, updateUserSchema } from './schema';
import { _validateParams } from '../validation-util';

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

export async function createUser(ctx: Context) {
  const body = ctx.request.body;
  if (!validateCreateUser(body, ctx)) {
    return;
  }

  const email = body.email;

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
  user.name = body.name;
  user.password = await hash(body.password, bcryptCost);

  const savedUser = await getRepository(User).save(user);
  ctx.body = savedUser;
}

export async function updateUser(ctx: Context) {
  const body = ctx.request.body;
  if (validateUpdateUser(body, ctx)) {
    if (body.password) {
      body.password = await hash(body.password, bcryptCost);
    }

    const updatedUser = {...ctx.user, ...body};
    ctx.body = await getRepository(User).save(updatedUser);
  } 
}