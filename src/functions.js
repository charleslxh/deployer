const console = require('./console');
const Task = require('./task');
const Server = require('./server');
const Builder = require('./server/builder');
const Environment = require('./server/environment');
const Configuration = require('./server/configuration');

const _ = require('./utils');
const deployer = require('./deployer');

global.server = function (name, host, port = 22) {
  let config = new Configuration(name, host, port);
  let env = new Environment();

  let server = new Server(config, env)
  deployer.addServer(name, server);

  return new Builder(config, env);
}

global.serverList = function (name, host, port = 22) {
  // TODO
}

global.run = async function (command) {
  for(let name in deployer.servers) {
    deployer.servers[name] && await deployer.servers[name].runSync(command);
  }
}

global.runLocal = function (argument) {
  // TODO
}

global.task = function (name, body) {
  if (_.isFunction(body)) {
    let task = new Task(name, body)
    deployer.addTask(name, task);
  }
}

global.env = function (name, value) {
  // TODO
}

global.set = function (name, value) {
  // TODO
}

global.cd = function (path) {
  // TODO
}

global.before = function (it, that) {
  // TODO
}

global.after = function (it, that) {
  // TODO
}

global.upload = function (it, that) {
  // TODO
}

global.download = function (it, that) {
  // TODO
}

global.ask = function (message, def = false) {
  // TODO
}

global.confirm = function (message, def = false) {
  // TODO
}
