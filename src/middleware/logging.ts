export function logging() {
  return async (ctx: any, next: Function) => {
    const start = Date.now();
    await next();
    const time = Date.now() - start;
    const requestOut = `${time}ms | ${ctx.status} | ` +
      `${ctx.request.method} ${ctx.request.path}`;

    console.log(requestOut);
  };
}
