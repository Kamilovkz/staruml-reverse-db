const DbManager = require("../db/DbManager");
const PostgreSqlDbClient = require("./ClickhouseDbClient");

class ClickhouseManager extends DbManager {

  /**
   * ClickhouseManager
   *
   * @constructor
   * @param {object} options
   */
  constructor(options) {
    super(new ClickhouseDbClient(options && {
      user: options.userName,
      password: options.password,
      host: options.server,
      port: options.options.port,
      database: options.options.database || options.userName,
      ssl: options.options.ssl,
      logging: options.options.logging
    }));
  }
}

module.exports = ClickhouseManager;
