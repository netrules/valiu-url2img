'use strict';

var properties = require('../package.json')
var valiu = require('../service/valiu');

var controllers = {
   about: function(req, res) {
        var aboutInfo = {
            name: properties.name,
            version: properties.version
        }
        res.json(aboutInfo);
   },
   status: function(req, res) {
        res.send({
            status: 'Ok'
        })
   },
   captureImageFromUrl: function(req, res) {
    valiu.find(req, res, function(code, err, dist) {
        // V not impl. yet
        if (code)
            res.status(code);
            
        res.send(err);
        res.end(dist, "json");
    });
   }
};

module.exports = controllers;