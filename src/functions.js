const console = require('./console');
const SingleTask = require('./task/singleTask');
const GroupTask = require('./task/groupTask');
const Server = require('./server');
const Builder = require('./server/builder');
const Environment = require('./server/environment');
const Configuration = require('./server/configuration');

const utils = require('./utils');
const deployer = require('./deployer');

global.server = function (name, host, port = 22) {
  let config = new Configuration(name, host, port);
  let env = new Environment();

  let server = new Server(name, config, env)
  deployer.addServer(name, server);

  return new Builder(config, env);
}

global.serverList = function (name, host, port = 22) {
  // TODO
}

global.run = async function (command) {
  // const promises = deployer.getSevrers().map((server) => server.runSync(command));
  // return await Promise.all(promises);

  for (let server of deployer.getCurrentSevrers()) {
    await server.runSync(command);
  }
}

global.runLocal = function (argument) {
  // TODO
}

global.task = function (name, body) {
  let task = null;
  if (utils.isFunction(body)) {
    task = new SingleTask(name, body);
    deployer.addTask(name, task);
  } else if (utils.isArray(body)) {
    let subTasks = body.map((_name) => deployer.getTask(_name));
    task = new GroupTask(name, subTasks);
    deployer.addTask(name, task);
  } else {
    throw new TypeError(`Expect 2nd argument is a function or array, but got ${ Object.prototype.toString.call(body) }`);
  }

  return task;
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
