const chalk = require('chalk');
const _ = require('../utils');

const output = function () {
  const messages = Array.prototype.slice.call(arguments);
  messages.push('\n');

  process.stdout.write(messages.join(' '), 'utf8');
};

const errput = function () {
  const messages = Array.prototype.slice.call(arguments);

  messages.push('\n');

  process.stderr.write(messages.join(' '), 'utf8');
};;

exports.printTask = function (taskname, servers) {
  output(`➤ Executing task ${chalk.green(taskname)}`);
  output(`↳ on [${servers.join(', ')}]`);
}

exports.done = function (servers) {
  output(`${chalk.green('•')} done on [${servers.join(', ')}]`);
}

exports.ok = function (duration) {
  output(`${chalk.green('✔')} Ok [${duration}ms]`)
}

exports.stdin = function (str) {
  const lines = str.trim().split('\n');

  lines.forEach((line) => {
    output(chalk.red(`> `) + chalk.gray(line));
  });
}

exports.stdout = function (str) {
  const lines = str.trim().split('\n');

  lines.forEach((line) => {
    output(chalk.gray(`< ${ line }`));
  });
}

exports.stderr = function (str) {
  const lines = str.trim().split('\n');

  lines.forEach((line) => {
    errput(chalk.gray('<') + chalk.red(line));
  });
}

exports.error = function (err) {
  if (err instanceof Error) {
    err = err.stack;
  }

  console.error(chalk.red(err))
}

exports.warning = function (str) {
  if (str instanceof Error) {
    str = str.stack;
  }

  console.warning(chalk.yellow(str))
}

exports.debug = function (str) {
  console.debug(chalk.blue(str))
}

exports.log = console.log;
