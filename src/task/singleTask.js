const console = require('../console');
const Task = require('./index');

class SingleTask extends Task {
  constructor(name, callback) {
    super(name);
    this.callback = callback;
  }

  async run(options) {
    super.run(options);
    await this.callback.apply(this);
    this.done()
  }
}

module.exports = SingleTask;
