
var config = require('./config'),
    env = require('./config/env'),
    pkg = require('../package'),
    http = require('http'),
    port = process.env.PORT || 3000,
    app = require('./app'),
    mongoose = require('mongoose'),
    models = require('./models');

mongoose.connect(config.db);
models(mongoose);


http.createServer(app()).listen(port, function () {
  console.log(env.toUpperCase() + ' Server listening on port ' + port);
});
