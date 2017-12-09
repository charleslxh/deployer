const Task = require('./index');
const deployer = require('../deployer');

class GroupTask extends Task {
  constructor(name, subTasks) {
    super(name);
    this.subTasks = subTasks;
  }

  async run(options) {
    super.run(options);

    for (let task of this.subTasks) {
      if (task === null || task === undefined) continue;
      await deployer.run(task.name, options);
    }

    this.done()
  }
}

module.exports = GroupTask
