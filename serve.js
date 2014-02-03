var http     = require('http'),
    url      = require('url'),
    path     = require('path'),
    fs       = require('fs'),
    yslow    = require('yslow'),
    events   = require('./app/event'),
    generate = require('./app/generate.js');

// Check that phantomjs exists.
var file = '/usr/local/bin/phantomjs';
fs.exists(file, function(exists) {
  if (exists) return;

  throw new Error('Couldn’t find phantom js in', file);

});

function _isEmpty(obj){
    return !Object.keys(obj).length;
}

function writeHarToDisk (url,har) {
    var harsPath = "/hars/" + url + "_" + Date.now();
    fs.writeFile("/hars/", "Hey there!", function(err) {
        if(err) {
            console.log(err);
            return false;
        } else {
            console.log("File was saved at",harsPath);
            return harsPath;
        }
    });
}

http.createServer(function(request, response) {
    var url_parts = url.parse(request.url, true);
    var query = url_parts.query;

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write('<h1>HAR time</h1>');

    if(! _isEmpty(query)){

        // console.log(query);
        response.write("<p>Getting URL...</p>");
        response.write(query.url);

        var har = generate.generateHAR(query.url);

        // response.write("<p>",har.toString(),"</p>");

        events.on('error',function(err){
            console.log('error', err);
        });


        // eventEmitter.on('harGenerated', function(msg){
        //     console.log('harGenerated');
            // var saved_har = writeHarToDisk(query.url,har);

            // if(saved_har){
            //     response.write("<p>" + saved_har + "</p>");
            // } else {
            //     response.write("<p class='error'>Sorry there was a problem saving the HAR.</p>");
            // }
        // });

    }
    response.end('');
}).listen(8080);
