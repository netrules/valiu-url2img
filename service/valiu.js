var request = require('request');
const url = require('url');
const fs = require('fs');
const captureWebsite = require('capture-website');

const thirdPartyURL = 'https://random.dog/woof.json';

var valiu = {
    find: async function(req, res, next) {
        // res.send(url.parse(req.url,true).query.urlLoad);
        let urlLoad = url.parse(req.url,true).query.urlLoad;

        // use capture-website to save capture as byte stream
        await captureWebsite.file('https://sindresorhus.com', 'screenshot.png');

        //let content = await captureWebsite.buffer(urlLoad);
        
        //specify the content type in the response will be an image
        res.writeHead(200,{'Content-type':'image/png'});

        var img = fs.readFileSync('./screenshot.png');
        res.end(img, 'binary');
        //res.end(content);
        //res.send();
    }
};

module.exports = valiu;