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
    },
    scaleFactor: 1,
    type: 'jpeg',
    quality: 0.5
};

var valiu = {
    find: async function(req, res, callbackError) {
        let urlLoad = url.parse(req.url,true).query.q;
        if(!urlLoad) {
            let message = {
                message: "no url provided"
            }, statusCode = 400;
            return callbackError(statusCode, message, "no-url");
        }
        if(urlLoad.toString().indexOf("www.") === 0) {
            let message = {
                message: "please start your query with 'http://' or 'https://' ...",
                validation: req.headers.host + "/capture?q=https://" + urlLoad
            };
            return callbackError(null, message, "no-www-url");
        }
        if(urlLoad.toString().indexOf("http://") === -1 && urlLoad.toString().indexOf("https://") === -1) {
            let message = {
                message: "not a valid url"
            }, statusCode = 400;
            return callbackError(statusCode, message, "invalid-url");
        }

        try {
            // use capture-website to save capture as byte stream
            let content = await captureWebsite.buffer(urlLoad, captureOptions);
            
            //specify the content type in the response will be an image
            res.writeHead(200,{'Content-type':'image/jpeg'});

            //send byte load forward to request
            res.end(content, 'binary');
        } catch (error) {
            return callbackError(500, {message: error.message}, "runtime-error")
        }
    }
};

module.exports = valiu;