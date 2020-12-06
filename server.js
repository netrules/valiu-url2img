const app = require('./core/app');
const config = require('./core/config');
const http = require('http')
const server = http.createServer(app);
const PORT = config.app.port;

server.listen(PORT, function() {
   console.log('Server started on port: ' + PORT);
//    console.log(`Server started on port: ${PORT}`);
});