class Task {
  constructor(name) {
    this.name = name;
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

  async run() {}
}


module.exports = Task
