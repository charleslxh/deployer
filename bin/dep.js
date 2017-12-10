#!/usr/bin/env node

'use strict'

var fs = require('fs');
var os = require('os');
var path = require('path');
var chalk = require('chalk');
var program = require('commander');

var deployer = require('../lib/deployer');
var console = require('../lib/console');
var version = require('../package.json').version;
require('../lib/functions');

try {
  fs.lstatSync(path.resolve(process.cwd(), '.deployer.js'));
} catch (e) {
  console.log(chalk.bgRed.white('You must define a .deployer.js file.'));
  process.exit(0);
}

var taskName,
    options = { stages: ['dev'] };

program
  .version(version)
  .usage('task [options]')
  .arguments('<task>')
  .option('-s, --stages <stages>', 'Specify stages you want to run', function(value) {
    return value.split(',');
  })
  .action(function (task) {
    taskName = task;
  })
  .parse(process.argv);

if (program.stages) {
  options.stages = program.stages
}

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

