import { getApp } from "./server";

async function start() {
  const app = await getApp();
  app.listen(3000);
}

start();

