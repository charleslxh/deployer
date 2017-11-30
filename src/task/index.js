const console = require('../console');

class Task {
  constructor(name, callback) {
    this.name = name;
    this.callback = callback;
    this.description = '';
    this.stages = [];
    this.servers = [];
  }

  desc(desc) {
    this.description = desc;
    return this;
  }

  onlyForStages() {
    this.stages = Array.prototype.slice.call(arguments);
    return this;
  }

  onlyForServers() {
    this.servers = Array.prototype.slice.call(arguments);
    return this;
  }

  async run() {
    console.printTask(this.name, this.servers);

    const startAt = new Date().valueOf();
    await this.callback.apply(this);
    const endAt = new Date().valueOf();

    console.done(this.servers);
    console.ok(endAt - startAt);
  }
}

module.exports = Task;
