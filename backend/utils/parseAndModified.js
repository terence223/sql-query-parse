const { Parser } = require('@florajs/sql-parser');
const toSQL = require('@florajs/sql-parser').util.astToSQL;

const parser = new Parser();
const REGEX_COLUMN_OBJECT = /\{"type":"column_ref"[^}]*\}/g;
const REGEX_COLUMN = /"column":"(.*?)"/;

// simple hash code function
String.prototype.hashCode = function () {
  let hash = 0,
    i,
    chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr = this.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash;
};

// change input SQL to Modified SQL and map
const parseAndModified = queryString => {
  const map = {};
  let JSONString = JSON.stringify(parser.parse(queryString));
  const allColumn = JSONString.match(REGEX_COLUMN_OBJECT);
  allColumn.forEach(str => {
    const columnFetch = REGEX_COLUMN.exec(str);
    if (!map[columnFetch[1]]) {
      const hashResult = `column_${columnFetch[1].hashCode()}`;
      map[columnFetch[1]] = hashResult;
      const columnWithHashValue = str.replace(
        `"column":"${columnFetch[1]}"`,
        `"column":"${hashResult}"`
      );
      JSONString = JSONString.replaceAll(str, columnWithHashValue);
    }
  });
  return {
    modifiedSQL: toSQL(JSON.parse(JSONString)),
    map,
  };
};

module.exports = parseAndModified;
