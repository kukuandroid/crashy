

const filePath = 'index.android.bundle.map';

var fs = require('fs');
var sourceMapLib = require('source-map');
var sourceMap = fs.readFileSync(filePath).toString();

export const translate  = async (line, column) => sourceMapLib.SourceMapConsumer.with(sourceMap, null, (consumer) => {
  const result = consumer.originalPositionFor({
    line: parseInt(line),
    column: parseInt(column),
  });
  console.log(JSON.stringify(result, null, 2));
  return {
    statusCode: 200,
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(result, null, 2),
  };
});