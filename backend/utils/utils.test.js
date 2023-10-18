const parseAndModified = require('./parseAndModified');
const rebuildSQL = require('./rebuildSQL');
const testSQL = require('./testSQL');

const basicInput = 'SELECT "a" FROM "table"';
const basicModifiedObj = {
  modifiedSQL: 'SELECT "column_97" FROM "table"',
  map: {
    a: 'column_97',
  },
};

describe('Test for changing input SQL to modified SQL and map', function () {
  test('Basic SQL', function () {
    const result = parseAndModified(basicInput);

    expect(typeof result.modifiedSQL).toBe('string');
    expect(typeof result.map).toBe('object');

    expect(result.modifiedSQL.replace(result.map['a'], 'a')).toBe(basicInput);
  });
});

describe('Test for changing modified SQL and map back to SQL', function () {
  test('Basic SQL', function () {
    const result = rebuildSQL(basicModifiedObj);

    expect(result).toBe(basicInput);
  });
});

describe('Test complicated edge cases', function () {
  test('complicated case', function () {
    const modifiedData = parseAndModified(testSQL);
    const result = rebuildSQL(modifiedData);

    expect(typeof modifiedData.modifiedSQL).toBe('string');
    expect(typeof modifiedData.map).toBe('object');

    expect(result).toBe(testSQL);
  });
});
