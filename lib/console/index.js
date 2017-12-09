'use strict';

var chalk = require('chalk');
var _ = require('../utils');

var output = function output() {
  var messages = Array.prototype.slice.call(arguments);
  messages.push('\n');

  process.stdout.write(messages.join(' '), 'utf8');
};

var errput = function errput() {
  var messages = Array.prototype.slice.call(arguments);

  messages.push('\n');

  process.stderr.write(messages.join(' '), 'utf8');
};;

exports.printTask = function (taskname, servers) {
  output('\u256D\u2500 Executing task ' + chalk.green(taskname));
  output('\u2570\u2500\u27A4 on [' + (servers && servers.join(', ')) + ']');
};

exports.done = function (servers) {
  output(chalk.green('•') + ' done');
};

exports.ok = function (duration) {
  output(chalk.green('✔') + ' Ok [' + duration + 'ms]');
};

exports.stdin = function (flag, message) {
  var lines = message.trim().split('\n');

  lines.forEach(function (line) {
    output(chalk.red('    > ') + chalk.gray(line));
  });
};

exports.stdout = function (flag, message) {
  var lines = message.trim().split('\n');

  lines.forEach(function (line) {
    output(chalk.gray('    < ' + line));
  });
};

exports.stderr = function (flag, message) {
  var lines = message.trim().split('\n');

  lines.forEach(function (line) {
    errput(chalk.gray('    < ') + chalk.red(line));
  });
};

exports.error = function (err) {
  if (err instanceof Error) {
    err = err.stack;
  }

  console.log(chalk.red(err));
};

exports.warning = function (str) {
  if (str instanceof Error) {
    str = str.stack;
  }

  process.stdout.write(chalk.yellow(str));
};

exports.debug = function (str) {
  process.stdout.write(chalk.blue(str));
};

exports.info = function (str) {
  process.stdout.write(chalk.green(str));
};

exports.log = console.log;