const DbPreferences = require("../db/DbPreferences");

class ClickhousePreferences extends DbPreferences {
  /**
   * ClickhousePreferences
   *
   * @constructor
   */
  constructor() {
    super("db.clickhouse");
  }
}

module.exports = ClickhousePreferences;
