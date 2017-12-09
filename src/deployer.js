const Server = require('./server');
const Task = require('./task');
const console = require('./console');

/**
* Deployer main class
*
**/
class Deployer {
  constructor() {
    this.servers = {};
    this.tasks = {};
  }

  addServer(name, server) {
    if (!server instanceof Server) {
      return;
    }

    this.servers[name] = server;
  }

  addTask(name, task) {
    if (!task instanceof Task) {
      return;
    }

    this.tasks[name] = task;
  }

  async run(taskName, options) {
    if (!this.tasks[taskName]) {
      throw new Error(`Task {${ taskName }} never be defined.`);
    }

    await this.tasks[taskName].run(options);
  }

  end() {
    for(let name in this.servers) {
      this.servers[name] && this.servers[name].close();
    }

    process.exit(0);
  }

  getTask(name) {
    return this.tasks[name];
  }

  getServer(name) {
    return this.servers[name];
  }

  getSevrers(taskname) {
    if (!this.tasks[taskname]) {
      return [];
    }

    let allowedServers = this.tasks[taskname].servers;
    const allowedStages = this.tasks[taskname].stages;

    if (allowedServers === null) {
      allowedServers = this.servers;
    }

    return allowedServers.reduce((server) => allowedStages.indexOf(server.config.stage) > 0);
  }
}

module.exports = new Deployer();
