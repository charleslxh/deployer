# Introduction

`deployer` is a deployment tool written in NodeJS with support for popular frameworks out of the box.

## Install 

```bash
$ npm install deployer --save-dev
```

## Examples

create a file `.deployer.js` where you define youe tasks. 

```js
// in .deployer.js

'use strict'

server('s1', '47.94.96.87', 22)
  .user('charles')
  .identityFile('/Users/Charles/.ssh/id_rsa.pub', '/Users/Charles/.ssh/id_rsa', null)
  .stages(['dev'])
;

server('s2', '115.29.172.241', 2022)
  .user('daniujia')
  .identityFile('/Users/Charles/.ssh/id_rsa.pub', '/Users/Charles/.ssh/id_rsa', null)
  .stages(['staging'])
;

task('only run on s1', function () {
  return run('ls');
})
.onlyForServers('s1');

task('only run on s2', function() {
  return run('pwd');
})
.onlyForServers('s2');

task('only run on dev', function() {
  return run('cd ~ && mkdir -p test')
        .then(() => run('cd test && echo "this the content of test.txt file" > test.txt'))
        .then(() => run('cd test && cat test.txt'))
        .then(() => run('cd test && ls -h'))
        .then(() => run('cd ~ && rm -rf test'));
})
.onlyForStages('dev');

task('only run on staging', function() {
  return run('cd ~ && mkdir -p test')
        .then(() => run('cd test && echo "this the content of test.txt file" > test.txt'))
        .then(() => run('cd test && cat test.txt'))
        .then(() => run('cd test && ls -h'))
        .then(() => run('cd ~ && rm -rf test'));
})
.onlyForStages('staging');

task('group:tasks', [
  'only run on s1',
  'only run on s2',
  'only run on dev',
  'only run on staging'
]);
```

run command:

```bash
$ bin/dep group:tasks --stages=staging
```

result:

![result](./result.png)
