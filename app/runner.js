var yslow = require('yslow'),
    fs = require('fs'),
    system = require('system');


if (system.args.length === 2) {
    console.log('Please pass in a url');
    return console.log('Usage: runner.js <some URL> [options]');
}

// Get url via system args
var url = system.args[1]; // TODO make this less flakey? We're not doing bash

// Run childProcess - generate har from url


// url = args[0];

// if (typeof url !== 'undefined'){
//     myHAR = sniff.pageHAR(url);
// }

// reporter( yslowjs(myHAR) );


// // console.log(process.execPath);

// require('fs').readFile('example.com.har', function (err, data) {
//     var har = JSON.parse(data),
//         YSLOW = require('yslow').YSLOW,
//         doc = require('jsdom').jsdom(),
//         res = YSLOW.harImporter.run(doc, har, 'ydefault'),
//         content = YSLOW.util.getResults(res.context, 'basic');

//     console.log(content);
// });
