// Quick wrapper around the phantomjs netsniff example
var path         = require('path'),
    execFile     = require('child_process').execFile,
    spawn     = require('child_process').spawn,
    phantomjs    = require('phantomjs'),
    events       = require('events'),
    binPath      = phantomjs.path;

var eventEmitter = new events.EventEmitter();

module.exports = function(url)
{

    var childArgs = [
        ('./lib/netsniff.js')
    ];

    return {
        generateHAR: function generateHAR(url)
        {
            childArgs.push(url);
            console.log(binPath);
            execFile(binPath, childArgs, function(err, stdout, stderr) {
              // console.log(stdout);
              eventEmitter.emit('harGenerated');
              return stdout;
            });
        }
    };
}();
