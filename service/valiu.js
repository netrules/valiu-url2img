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
    find: async function(req, res, next) {
        let urlLoad = url.parse(req.url,true).query.q;
        if(!urlLoad) {
            return res.status(400).send({
                message: "not url provided"
            })
        }
        if(urlLoad.toString().indexOf("http://") === -1 && urlLoad.toString().indexOf("https://") === -1) {
            return res.status(400).send({
                message: "not a valid url"
            })
        }

        // use capture-website to save capture as byte stream
        let content = await captureWebsite.buffer(urlLoad, captureOptions);
        
        //specify the content type in the response will be an image
        res.writeHead(200,{'Content-type':'image/jpeg'});

        //send byte load forward to request
        res.end(content, 'binary');
    }
};

module.exports = valiu;