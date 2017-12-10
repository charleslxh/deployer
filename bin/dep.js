#!/usr/bin/env node

'use strict'

var fs = require('fs');
var os = require('os');
var path = require('path');
var chalk = require('chalk');

var deployer = require('../lib/deployer');
var console = require('../lib/console');
require('../lib/functions');

try {
  fs.lstatSync(path.resolve(process.cwd(), '.deployer.js'));
} catch (e) {
  console.log(chalk.bgRed.white('You must define a .deployer.js file.'));
  process.exit(0);
}

var options = { stages: ['dev'] };
var lang = process.argv.shift();
var command = process.argv.shift();
var taskName = process.argv.shift();
process.argv.forEach(function(argv) {
  var flags = argv.split('=', 2);
  if (flags.length < 2) return;

  var key = flags[0].substr(2);
  var values = flags[1].split(',');
  options[key] = values;
});

var deployerFile = require(path.resolve(process.cwd(), '.deployer.js'));

deployer.run(taskName, options)
.then(() => {
  console.info('Deployed Successfully!');
  deployer.end();
})
.catch((e) => {
  console.error(e)
  deployer.end();
});

