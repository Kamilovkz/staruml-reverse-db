const DbErdGenerator = require("../db/DbErdGenerator");
const PostgreSqlAnalyzer = require("./ClickhouseAnalyzer");

class ClickhouseErdGenerator extends DbErdGenerator {

  /**
   * ClickhouseErdGenerator
   *
   * @constructor
   */
  constructor(options, model) {
    super(options, new ClickhouseAnalyzer(options, model));
  }
}

module.exports = ClickhouseErdGenerator;
