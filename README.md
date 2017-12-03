# Introduction

`deployer` is a deployment tool written in NodeJS with support for popular frameworks out of the box.

## Install 

```bash
$ npm install deployer --save-dev
```

## Examples

create a file `.deployer.js` where you define youe tasks. 

```bash
// in .deployer.js

server('staging', '192.168.1.1', 2022)
    .user('test')
    .identityFile('~/.ssh/id_rsa.pub', '~/.ssh/id_rsa', null)
    ;

task('ls', function() {
    return run('cd ~ && ls');
});

task('pwd', function() {
    return run('cd ~ && mkdir -p test')
        .then(() => run('cd test && echo "this the content of test.txt file" > test.txt'))
        .then(() => run('cd test && cat test.txt'))
        .then(() => run('cd test && ls -h'))
        .then(() => run('cd ~ && rm -rf test'));
});
```

run command:

```bash
$ bin/dep
```

result:

![result](./result.png)
