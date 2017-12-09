const console = require('../console');

class Task {
  constructor(name) {
    this.name = name;
    this.description = '';
    this._stages = null;
    this._servers = null;
    this._status = 'initialized';
  }

  get servers() {
    return this._servers;
  }

  get stages() {
    return this._stages;
  }

  desc(desc) {
    this.description = desc;
    return this;
  }

  onlyForStages() {
    this._stages = Array.prototype.slice.call(arguments);
    return this;
  }

  onlyForServers() {
    this._servers = Array.prototype.slice.call(arguments);
    return this;
  }

  run(options) {
    this.status = 'running';
    this._startAt = new Date().valueOf();
    console.printTask(this.name, this.servers);
  }

  done() {
    this.status = 'done';
    this._endAt = new Date().valueOf();
    console.done(this.servers);
    console.ok(this._endAt - this._startAt);
  }

  isRunning() {
    return this._status = 'running';
  }
}


module.exports = Task
