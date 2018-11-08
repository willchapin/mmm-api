import 'reflect-metadata';
import { createTypeOrmConnection } from "./db-utils";
import { getApp } from "./server";

async function start() {
  await createTypeOrmConnection();
  const app = await getApp();
  app.listen(3000);
}

start();

