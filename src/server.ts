import 'reflect-metadata';

import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';

import { createConnection } from "typeorm";

import { routes } from './routes';
import { authentication } from './middleware/authentication';

async function start() {
  await createConnection();

  const app = new Koa();
  const router = new Router();

  app.use(bodyParser());
  app.use(authentication());

  app.use(router.routes());
  app.use(router.allowedMethods());

  routes.forEach((route: any) => {
    let partialRoute = router[route.method].bind(router, route.path);
    if (route.validation) {
      partialRoute = partialRoute.bind(router, route.validation);
    } 

    partialRoute(route.action);
  });

  app.listen(3000);
}

start();