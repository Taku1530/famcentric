var mongoload = require('mongoload');

module.exports = function (mongoose) {
  mongoload
    .bind(mongoose)
    .load({
      pattern: __dirname + '/api/**/*.model.js',
      nameRegExp: /([^\/\\]+).model.js$/
    });
};
