const Task = require('./task');

Object.keys(console).forEach((property) => {
  if (Object.prototype.toString.call(console[property]) === '[object Function]') {
    global[property] = console[property];
  }
});

var task1 = new Task('task1', function() {
  require('./console').stdout(JSON.stringify(this, null, 4));
})
.desc('Run task1')
.onlyForStages('staging', 'prod')
.onlyForServers('staging1', 'staging2', 'prod1', 'prod2');

task1.run();
