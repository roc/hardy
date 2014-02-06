// Quick wrapper around the phantomjs netsniff example
    // spawn     = require('child_process').spawn,
var path      = require('path'),
    exec      = require('child_process').exec,
    phantomjs = require('phantomjs'),
    binPath   = phantomjs.path,
    appPath   = path.dirname(require.main.filename),
    sniffPath = [appPath, '/lib/netsniff.js'].join(''),
    events    = require('events'),
    events    = require('./event'),
    command;


module.exports = function(url)
{

    var childArgs = [];

    return {
        generateHAR: function generateHAR(url)
        {
            // get phantom to write to file
            var fileName = [encodeURIComponent(url),"_",Date.now().toString(),'.har'].join(''),
                filePath = path.join(appPath,'/hars/',fileName);
            childArgs.push(binPath);
            childArgs.push(sniffPath);
            childArgs.push(url);
            childArgs.push('>');
            childArgs.push(filePath);
            // childArgs.push(path.join(__dirname,'/hars/har_1.har'));
            command = childArgs.join(' ');
            console.log(command);

            exec(command, function(err, stdout, stderr) {
                if(err){
                    console.log(err);
                    events.emit( 'error', err );
                    return err;
                }
                // If we don't error, pass to a handling function - TODO - make better (with spawn?)
                events.emit( 'harGenerated', ['/hars/',fileName].join('') );
            });

        }
    };
}();