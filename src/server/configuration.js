class Configuration {
  constructor(name, host, port) {
    this.name = name;
    this.host = host;
    this.port = port;
  }

  set(key, value) {
    this[key] = value;
  }
}

module.exports = Configuration;
