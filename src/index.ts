import { createConnection } from "typeorm";
import { getApp } from "./server";

async function start() {
  await createConnection();
  const app = await getApp();
  app.listen(3000);
}

start();

