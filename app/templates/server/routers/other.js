var fs = require('fs');
var path = require('path');

// return index.html for any requests
module.exports = function(req, res, next) {
  fs.createReadStream(path.join(__dirname, '../../src/index.html')).pipe(res);
};
