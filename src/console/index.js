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
  output(`╭─ Executing task ${chalk.green(taskname)}`);
  output(`╰─➤ on [${servers && servers.join(', ')}]`);
}

exports.done = function (servers) {
  output(`${chalk.green('•')} done`);
}

exports.ok = function (duration) {
  output(`${chalk.green('✔')} Ok [${ duration }ms]`)
}

exports.stdin = function (flag, message) {
  const lines = message.trim().split('\n');

  lines.forEach((line) => {
    output(chalk.red(`    > `) + chalk.gray(line));
  });
}

exports.stdout = function (flag, message) {
  const lines = message.trim().split('\n');

  lines.forEach((line) => {
    output(chalk.gray(`    < ${ line }`));
  });
}

exports.stderr = function (flag, message) {
  const lines = message.trim().split('\n');

  lines.forEach((line) => {
    errput(chalk.gray(`    < `) + chalk.red(line));
  });
}

exports.error = function (err) {
  if (err instanceof Error) {
    err = err.stack;
  }

  console.log(chalk.red(err))
}

exports.warning = function (str) {
  if (str instanceof Error) {
    str = str.stack;
  }

  process.stdout.write(chalk.yellow(str))
}

exports.debug = function (str) {
  process.stdout.write(chalk.blue(str))
}

exports.info = function (str) {
  process.stdout.write(chalk.green(str))
}

exports.log = console.log;
