var request = require('request');
const url = require('url');
const fs = require('fs');
const captureWebsite = require('capture-website');

const captureOptions = {
    launchOptions: {
        headless: true,
        args: [ // Disable Chromium's unnecessary SUID sandbox.
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
    }
};

var valiu = {
    find: async function(req, res, next) {
        let urlLoad = url.parse(req.url,true).query.urlLoad;

        // use capture-website to save capture as byte stream
        let content = await captureWebsite.buffer(urlLoad, captureOptions);
        
        //specify the content type in the response will be an image
        res.writeHead(200,{'Content-type':'image/png'});

        //send byte load forward to request
        res.end(content, 'binary');
    }
};

module.exports = valiu;