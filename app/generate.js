// Quick wrapper around the phantomjs netsniff example
var path         = require('path'),
    exec         = require('child_process').exec,
    // spawn        = require('child_process').spawn,
    phantomjs    = require('phantomjs'),
    events       = require('events'),
    binPath      = phantomjs.path,
    command;

var eventEmitter = new events.EventEmitter();

module.exports = function(url)
{

    var childArgs = [
        path.join(__dirname, ' ./lib/netsniff.js')
    ];

    return {
        generateHAR: function generateHAR(url)
        {
            childArgs.push(url);
            // get phantom to write to file
            childArgs.push('> ./hars/' + url + "_" + Date.now());
            command = binPath + childArgs.join(' ');
            exec(command, function(err, stdout, stderr) {
                console.log(command);
                // console.log(stdout);
                console.log(err,stderr);
                eventEmitter.emit('harGenerated');
                return stdout;
            });
        }
    };
}();
