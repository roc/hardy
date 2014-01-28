var http     = require('http'),
    url      = require('url'),
    path     = require('path'),
    fs       = require('fs'),
    yslow    = require('yslow'),
    generate = require('./generate.js');
    // sniff           = require('./lib/netsniff'),
    //EventEmitter    = require('events').EventEmitter,
    //url             = require('url'),
    //split           = require('event-stream').split,
    //util            = require('./util');


// Check that phantomjs exists.
var file = '/usr/local/bin/phantomjs';
fs.exists(file, function(exists) {
  if (exists) return;

  throw new Error('Couldn’t find phantom js in', file);

});

function _isEmpty(obj){
    return !Object.keys(obj).length
}

http.createServer(function(request, response) {
    var url_parts = url.parse(request.url, true);
    var query = url_parts.query;
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write('<h1>HAR time</h1>');
    if(! _isEmpty(query)){
        console.log(query);
        response.write("<p>Getting URL...</p>");
        response.write(query.url);
    }
    response.end('');
}).listen(8080)