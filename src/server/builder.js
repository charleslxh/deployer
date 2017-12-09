const fs = require('fs');
const Configuration = require('./configuration');
const Environment = require('./environment');
const utils = require('../utils');

class Builder {
  constructor(config = {}, env = {}) {
    if (!config instanceof Configuration) {
      config = new Configuration();
    }

    if (!env instanceof Environment) {
      env = new Environment();
    }

    this.config = config;
    this.env = env;
  }

  host(host) {
    this.config.set('host', host);
    return this;
  }

  port(port) {
    this.config.set('port', port);
    return this;
  }

  user(username) {
    this.config.set('username', username);
    return this;
  }

  password(password) {
    this.config.set('password', password);
    return this;
  }

  stages(stages) {
    if (!utils.isArray(stages)) {
      stages = [stages];
    }

    this.env.set('stages', stages);
    return this;
  }

  env(name, value) {
    this.env.set(name, value);
    return this;
  }

  identityFile(publicKey, privateKey, passphrase) {
    this.config.set('publicKey', fs.readFileSync(publicKey));
    this.config.set('privateKey', fs.readFileSync(privateKey));
    this.config.set('passphrase', passphrase);
    return this;
  }
}

module.exports = Builder;
