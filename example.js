var fs = require('fs'),
http = require('http'),
https = require('https');

var Stream = require('stream').Transform;

var downloadImageToUrl = (url, filename, callback) => {

    var client = http;
    if (url.toString().indexOf("https") === 0){
      client = https;
     }

    client.request(url, function(response) {                                        
      var data = new Stream();                                                    

      response.on('data', function(chunk) {                                       
         data.push(chunk);                                                         
      });                                                                         

      response.on('end', function() {                                             
         fs.writeFileSync(filename, data.read());                               
      });                                                                         
   }).end();
};

let serveUrl = "https://localhost:32696/capture?q=https://ecosia.org";
// let serveUrl = "https://32696-ccdee727-0355-4452-aa1b-ce15a833efd2.ws-us03.gitpod.io/capture?q=https://ecosia.org";
let imageName = "example.jpeg";
downloadImageToUrl(serveUrl, imageName);
