'use strict';

const controller = require('./controller');

module.exports = function(app) {
   app.route('/about')
       .get(controller.about);
   app.route('/status')
       .get(controller.status);
   app.route('/capture')
        .get(controller.captureImageFromUrl);
};