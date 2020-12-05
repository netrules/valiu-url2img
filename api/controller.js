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
//    getDistance: function(req, res) {
//            distance.find(req, res, function(err, dist) {
//                if (err)
//                    res.send(err);
//                res.json(dist);
//            });
//        },
   captureImageFromUrl: function(req, res) {
           valiu.find(req, res, function(err, dist) {
               if (err)
                   res.send(err);

               res.end(dist);
               //res.json(dist);
           });
       }
};

module.exports = controllers;