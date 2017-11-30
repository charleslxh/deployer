const chalk = require('chalk');

const output = function () {
  this.messages = Array.prototype.slice.call(arguments);

  messages.push('\n');

  process.stdout.write(messages.join(' '), 'utf8');
};

const errput = function () {
  this.messages = Array.prototype.slice.call(arguments);

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

exports.stdout = function (str) {
  const lines = str.trim().split('\n');

  console.log(chalk.gray('<'));

  lines.forEach((line) => {
    output(chalk.gray(`< ${ line }`));
  });

  output(chalk.gray('<'));
}

exports.stderr = function (str) {
  const lines = str.trim().split('\n');

  output(chalk.gray('<'));

  lines.forEach((line) => {
    errput(chalk.gray('<') + chalk.red(line));
  });

  output(chalk.gray('<'));
}
