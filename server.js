const express = require('express');
const app = express();
const config = require('./core/config');
const port = config.app.port;

const routes = require('./api/routes');
routes(app);
app.listen(port, function() {
   console.log('Server started on port: ' + port);
});
