/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1577500064207_578';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.io = {
    namespace: {
      '/': {
        connectionMiddleware: [
          'auth',
        ],
        packetMiddleware: [],
      },
      '/example': {
        connectionMiddleware: [],
        packetMiddleware: [],
      },
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
