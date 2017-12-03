const console = require('../console');

class Task {
  constructor(name, callback) {
    this.name = name;
    this.callback = callback;
    this.description = '';
    this._stages = null;
    this._servers = null;
  }

  get servers() {
    if (this._servers === null) {
      return [];
    }

    return this._servers;
  }

  get stages() {
    if (this._stages === null) {
      return [];
    }

    return this._stages;
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
