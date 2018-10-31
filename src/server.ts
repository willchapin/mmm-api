import 'reflect-metadata';
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';

import { routes, Route } from './routes';
import { logging } from './middleware/logging';
import { authentication } from './middleware/authentication';

export const getApp = () => {
  const app = new Koa();
  const router = new Router();

  app.use(bodyParser());

  app.use(logging());
  app.use(authentication());

  app.use(router.routes());
  app.use(router.allowedMethods());

  routes.forEach((route: Route) => {
    let partialRoute = router[route.method].bind(router, route.path);

    if (route.authorization) {
      partialRoute = partialRoute.bind(router, route.authorization);
    } 

    if (route.validation) {
      partialRoute = partialRoute.bind(router, route.validation);
    } 

    partialRoute(route.action);
  });

  return app;
};
