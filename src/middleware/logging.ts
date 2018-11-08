import { Context } from "koa";

export function logging() {
  return async (ctx: Context, next: Function) => {
    const start = Date.now();
    await next();
    const time = Date.now() - start;
    const requestOut = `${time}ms | ${ctx.status} | ` +
      `${ctx.request.method} ${ctx.request.path}`;

    console.log(requestOut);
  };
}
