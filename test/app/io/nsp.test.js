'use strict';


const { mock, assert } = require('egg-mock/bootstrap');
const ioc = require('socket.io-client');
const basePort = 17001;

function client(nsp = '', opts = {}) {
  let url = 'http://127.0.0.1:' + opts.port + (nsp || '');
  if (opts.query) {
    url += '?' + opts.query;
  }
  // 需要这样写
  return ioc.connect(url, Object.assign({}, opts, { forceNew: true, transports: [ 'websocket' ] }));
}

describe.only('test/app/io/nsp.test.js', () => {
  const emitBody = { command: 'who am i' };
  const app = mock.cluster({});
  let socket;
  beforeEach(done => {
    app.ready().then(() => {
      socket = client('/', { port: basePort });
      socket.on('connect', () => {
        console.log('connect...');
        socket.emit('exchange', emitBody);
        done();
      });
      socket.on('disconnect', () => {
        console.log('disconnect...');
      });
    });
  });
  afterEach(mock.restore);

  it('should receive from exchange', done => {
    socket.on('res', msg => {
      console.log(msg);
      assert(msg);
    });
    done();
  });
});
