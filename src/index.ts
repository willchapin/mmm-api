import 'reflect-metadata';
import { createTypeOrmConnection } from "./db-utils";
import { getApp } from "./server";
import { User } from './user/entity';

declare module 'koa' {
  interface Context {
    user: User;
  }
}

async function start() {
  await createTypeOrmConnection();
  const app = await getApp();
  app.listen(3000);
}

start();

