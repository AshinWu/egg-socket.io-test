'use strict';

module.exports = () => {
  return async (ctx, next) => {
    if (!ctx.session || !ctx.session.user) {
      ctx.logger.info(`未登录连接请求: [${ctx.socket.id}] ${ctx.query}`);
      ctx.socket.emit('res', '未登录连接请求');
      return;
    }
    const userInfo = ctx.session.user;
    ctx.logger.info(`connect: [${ctx.socket.id}] ${userInfo}`);
    await next();
    ctx.logger.info(`disconnect: [${ctx.socket.id}] ${userInfo}`);
  };
};
