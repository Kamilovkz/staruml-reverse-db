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
    const sqlStr = "select databases";
    const request = new Request(sqlStr);
    return this.executeSql(request);
  }
}

module.exports = MySqlAnalyzer;
