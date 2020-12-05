const config = require("./config.json");
config.app.port = process.env.URL2IMG_PORT || config.app.port;
console.log(config);

module.exports = config;