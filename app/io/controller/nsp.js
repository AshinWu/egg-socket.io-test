'use strict';

const Controller = require('egg').Controller;

class NspController extends Controller {
  async exchange() {
    const { ctx, app } = this;
    const message = ctx.args[0] || {};
    const socket = ctx.socket;
    try {
      socket.emit('res', message);
      // qs1:这里console不出，为什么?
      console.log('into exchange()...');
      
      // qs2: socket.io test怎么mocksession? 试过app.mockSession({})无效?
      if (ctx.session.user) {
        // do something...
      }
    } catch (error) {
      app.logger.error(error);
    }
  }
}

module.exports = NspController;
