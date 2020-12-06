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
    valiu.find(req, res, function(err, dist) {
        // V not impl. yet
        if (err)
            res.send(err);
            res.end(dist);
        });
    }
};

module.exports = controllers;