export function logging() {
  return async function(ctx, next) {
    const start = Date.now();
    await next();
    const time = Date.now() - start;
    const requestOut = `${time}ms | ${ctx.status} | ` +
      `${ctx.request.method} ${ctx.request.path}`;

    console.log(requestOut);
  }
}
