const fs = require('fs');

class Builder {
  constructor(config = {}, env = {}) {
    this.config = config;
    this.env = env;
  }

  host(host) {
    this.config.host = host;
    return this;
  }

  port(port) {
    this.config.port = port;
    return this;
  }

  user(user) {
    this.config.username = user;
    return this;
  }

  password(password) {
    this.config.password = password;
    return this;
  }

  stage(stage) {
    this.config.stage = stage;
    return this;
  }

  env(name, value) {
    this.env[name] = value;
    return this;
  }

  identityFile(publicKey, privateKey, passphrase) {
    this.config.publicKey = fs.readFileSync(publicKey);
    this.config.privateKey = fs.readFileSync(privateKey);
    this.config.passphrase = passphrase;
  }
}

module.exports = Builder;
