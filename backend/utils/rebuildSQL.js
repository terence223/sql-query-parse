const { Parser } = require('@florajs/sql-parser');
const toSQL = require('@florajs/sql-parser').util.astToSQL;

const parser = new Parser();

// change Modified SQL and MAP back to input SQL
const rebuildSQL = data => {
  const queryString = data.modifiedSQL;
  let astString = JSON.stringify(parser.parse(queryString));
  Object.entries(data.map).forEach(keyAndValue => {
    astString = astString.replaceAll(
      `"${keyAndValue[1]}"`,
      `"${keyAndValue[0]}"`
    );
  });
  return toSQL(JSON.parse(astString));
};

module.exports = rebuildSQL;
