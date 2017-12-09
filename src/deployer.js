const Server = require('./server');
const Task = require('./task');
const console = require('./console');
const utils = require('./utils');

/**
* Deployer main class
*
**/
class Deployer {
  constructor() {
    this.servers = new Map();
    this.tasks = new Map();
    this.context = new Map();
  }

  getTask(name) {
    return this.tasks.get(name);
  }

  getServer(name) {
    return this.servers.get(name);
  }

  addServer(name, server) {
    if (!server instanceof Server) {
      return;
    }

    this.servers.set(name, server);
  }

  addTask(name, task) {
    if (!task instanceof Task) {
      return;
    }

    this.tasks.set(name, task);
  }

  async run(taskName, options) {
    if (!this.tasks.has(taskName)) {
      throw new Error(`Task {${ taskName }} never be defined.`);
    }

    const currentTask = this.getTask(taskName);

    if (currentTask.stages !== null) {
      let intersection = utils.arrayIntersect(currentTask.stages, options.stages);
      if (utils.isEmpty(intersection)) {
        return;
      }
    }

    const currentServers = this.getServersOfTask(taskName);

    this.context.set('currentTask', currentTask);
    this.context.set('currentServers', currentServers);

    currentTask._servers = utils.arrayColumn(currentServers, 'name', true);
    await currentTask.run(options);

    this.context.delete('currentTask');
    this.context.delete('currentServers');
  }

  end() {
    for(let [name, server] of this.servers) {
      server.close();
    }

    process.exit(0);
  }

  getServersOfTask(taskName) {
    const task = this.getTask(taskName);

    if (!task) {
      return [];
    }

    let allowedServers = task.servers;
    const allowedStages = task.stages;

    if (allowedServers === null) {
      allowedServers = this.servers;
    } else {
      allowedServers = allowedServers.reduce((map, _name) => {
        let _server = this.getServer(_name);
        if (_server) map.set(_name, _server);
        return map;
      }, new Map());
    }

    const results = [];
    for (let [name, server] of allowedServers) {
      if (allowedStages === null) {
        results.push(server);
        continue;
      }

      let intersection = utils.arrayIntersect(allowedStages, server.env.stages);
      if (!utils.isEmpty(intersection)) {
        results.push(server);
      }
    }

    return results;
  }

  getCurrentTask() {
    return this.context.get('currentTask');
  }

  getCurrentSevrers() {
    return this.context.get('currentServers');
  }
}

module.exports = new Deployer();
