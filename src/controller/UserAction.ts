import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import { User } from '../entity/User';

const hashingWork = 10;

export async function getAllUsers(context) {
  context.body = await getRepository(User).find();
}

export async function getUserById(context) {
  const user = await getRepository(User).findOne(context.params.id);

  context.body = user;
}

export async function createUser(context) {
  const user = new User();
  user.email = context.request.body.email;
  user.password = await hash(context.request.body.password, hashingWork);

  const savedUser = await getRepository(User).save(user);
  context.body = savedUser;
}

export async function updateUser(context) {
  const body = context.request.body;

  if (body.password) {
    body.password = await hash(body.password, hashingWork);
  }

  context.body = await getRepository(User).save(body);
}