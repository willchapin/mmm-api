import 'reflect-metadata';

import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';

import { createConnection } from "typeorm";

import { routes } from './routes';

async function start() {
  await createConnection();

  const app = new Koa();
  const router = new Router();

  app.use(bodyParser());
  app.use(router.routes());
  routes.forEach((route: any) => {
    if (route.validation) {
      router[route.method](route.path, route.validation, route.action);
    } else {
      router[route.method](route.path, route.action);
    }
  });

  app.listen(3000);
}

start();