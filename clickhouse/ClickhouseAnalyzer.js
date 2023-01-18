const Request = require("../db/DbRequest");
const DbAnalyzer = require("../db/DbAnalyzer");
const Manager = require("./PostgreSqlManager");

class MySqlAnalyzer extends DbAnalyzer {
  /**
   * MySqlAnalyzer
   *
   * @constructor
   */
  constructor(options, model) {
    super(options, model, new Manager(options));
  }

  analyze() {
    const sqlStr = "SELECT "
        + "  database                                           AS table_catalog, "
        + "  column.database                                    AS owner, " // from system.columns
        + "  column.table                                       AS table_name, " // from system.columns
        + "  column.name                                        AS column_name, " // from system.columns
        + "  column.position                                    AS ordinal_position, " // from system.columns
        + "  column.default_kind, column.default_expression     AS default_setting, " // from system.columns
        + "  column.type                                        AS data_type, " // from system.columns
        + "  column.datetime_precision                          AS date_precision " // from system.columns
        + "FROM system.columns AS column;";
    const request = new Request(sqlStr);
    return this.executeSql(request);
  }
}

module.exports = MySqlAnalyzer;
