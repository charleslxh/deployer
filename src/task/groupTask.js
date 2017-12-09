const Task = require('./index');

class GroupTask extends Task {
  constructor(name, subTasks) {
    super(name);
    this.subTasks = subTasks;
  }

  async run() {
    for (let task of this.subTasks) {
      if (task === null || task === undefined) continue;
      await task.run();
    }
  }
}

module.exports = GroupTask
