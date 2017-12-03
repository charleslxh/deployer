'use strict'

var Promise = require('bluebird');

server('staging', '115.29.172.241', 2022)
  .user('daniujia')
  .identityFile('/Users/Charles/.ssh/id_rsa.pub', '/Users/Charles/.ssh/id_rsa', null)
;

task('ls', function () {
  return run('ls');
});

task('pwd', function() {
  return run('pwd');
});

task('with no promise', function() {
  return run('cd ~ && mkdir -p test')
        .then(() => run('cd test && echo "this the content of test.txt file" > test.txt'))
        .then(() => run('cd test && cat test.txt'))
        .then(() => run('cd test && ls -h'))
        .then(() => run('cd ~ && rm -rf test'));
});
