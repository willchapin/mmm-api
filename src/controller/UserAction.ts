import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import * as Joi from 'joi';

import { User } from '../entity/User';
import { createUserSchema, getUserSchema, updateUserSchema } from '../schema/User';

const hashingWork = 10;

export async function getAllUsers(context) {
  context.body = await getRepository(User).find();
}

export async function getUserById(context) {
  const result = Joi.validate(context.params, getUserSchema, { abortEarly: false });
  if (result.error) {
    context.status = 400;
    context.body = {
      error: {
        message: 'Invalid parameters',
        details: result.error.details
      }
    }
    return;
  }

  const id = context.params.id;
  const user = await getRepository(User).findOne(id);
  if (!user) {
    context.status = 404;
    context.body = {
      error: {
        message: `User with id ${id} does not exist.`,
      }
    }
    return;
  }

  context.body = user;
}

export async function createUser(context) {
  const result = Joi.validate(context.request.body, createUserSchema, { abortEarly: false });
  if (result.error) {
    context.status = 400;
    context.body = {
      error: {
        message: 'Invalid parameters',
        details: result.error.details
      }
    }
    return;
  }

  const email = context.request.body.email;
  const existingUser = await getRepository(User).findOne({ where: { email } });
  if (existingUser) {
    context.status = 409;
    context.body = {
      error: {
        message: `A User with email "${email}" already exists.`,
      }
    }
    return;
  }

  const user = new User();
  user.email = email;
  user.password = await hash(context.request.body.password, hashingWork);

  const savedUser = await getRepository(User).save(user);
  // { select: false } in the entity doesn't work here because it's a save, not select
  delete savedUser.password;

  context.body = savedUser;
}

export async function updateUser(context) {
  const body = context.request.body;
  const result = Joi.validate(body, updateUserSchema, { abortEarly: false });
  if (result.error) {
    context.status = 400;
    context.body = {
      error: {
        message: 'Invalid parameters',
        details: result.error.details
      }
    }
    return;
  }

  if (body.password) {
    body.password = await hash(body.password, hashingWork);
  }

  const updatedUser = await getRepository(User).save(body);
  // { select: false } in the entity doesn't work here because it's a save, not select
  delete updatedUser.password;

  context.body = await getRepository(User).save(updatedUser);
}