'use strict';

const Controller = require('egg').Controller;

class NspController extends Controller {
  async exchange() {
    const { ctx, app } = this;
    const message = ctx.args[0] || {};
    const socket = ctx.socket;
    try {
      socket.emit('res', message);
      console.log('into exchange()...');
      if (ctx.session.user) {
        // do someing...
      }
    } catch (error) {
      app.logger.error(error);
    }
  }
}

module.exports = NspController;