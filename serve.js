var http     = require('http'),
    url      = require('url'),
    path     = require('path'),
    fs       = require('fs'),
    os       = require('os'),
    jsdom    = require('jsdom'),
    yslow    = require('yslow').YSLOW,
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

// function writeHarToDisk (url,har) {
//     var harsPath = "/hars/" + url + "_" + Date.now();
//     fs.writeFile("/hars/", "Hey there!", function(err) {
//         if(err) {
//             console.log(err);
//             return false;
//         } else {
//             console.log("File was saved at",harsPath);
//             return harsPath;
//         }
//     });
// }

function yslowIt(harPath, options){

    var fullPath = [path.dirname(require.main.filename), harPath].join('');
    console.log('[YSLOW] Reading', fullPath);

    fs.readFile(fullPath, function (err, data) {

    if(err){
        console.log(err);
        return false;
    }

    var har = JSON.parse(data),
        doc = jsdom.jsdom(),
        res = yslow.harImporter.run(doc, har, 'ydefault'),
        content = yslow.util.getResults(res.context, 'all');

    console.log('[YSLOW] Results',content);

    return content;
});
}

console.log('starting server on localhost:8080');

http.createServer(function(request, response) {
    var url_parts = url.parse(request.url, true);
    var query = url_parts.query;
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write('<h1>HAR time</h1>');

    if(! _isEmpty(query)){

        // console.log(query);
        response.write("<p>Getting URL...</p>");
        response.write("<p>"+query.url+"</p>");

        var har = generate.generateHAR(query.url);

        // response.write("<p>",har.toString(),"</p>");

        events.on('error', function(err){
            console.log('error', err);
            response.write("<p class='error'>Sorry there was an error: " + err + "</p>");
            response.end('');
        });

        events.on( 'harGenerated', function(path){
            response.write("<p>"+path+"</p>");
            var results = yslowIt(path);
            console.log(results);
            // response.write(results);
            // response.end('');
        });

    }
    response.write('checking...');
}).listen(8080);