class Environment {
  constructor() {

  }

  set(key, value) {
    this[key] = value;
  }
}

module.exports = Environment;
