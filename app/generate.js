// Quick wrapper around the phantomjs netsniff example
var sniff = require('./netsniff.js'),
    spawn    = require('child_process').spawn,
    execFile = require('child_process').execFile;


module.exports = function()
{
    function generateHAR(url)
    {
    }

    return {
        generateHAR: generateHAR
    };
}();