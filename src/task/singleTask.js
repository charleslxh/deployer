const console = require('../console');
const Task = require('./index');

class SingleTask extends Task {
  constructor(name, callback) {
    super(name);
    this.callback = callback;
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

module.exports = SingleTask;
