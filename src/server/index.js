const EventEmitter = require('events');
const Client = require('ssh2');
const console = require('../console');

class Server extends EventEmitter {
  constructor(config = {}, env = {}) {
    super();

    this.config = config;
    this.env = env;

    this.pendings = [];

    this._socket = new Client();
    this._socket._state = 'initialized';
  }

  _mergeOptions() {
    const options = {
      host: 'localhost',
      port: 22,
      forceIPv4: false,
      forceIPv6: false,
      hostHash: null,
      username: 'root',
      password: null,
      privateKey: '~/.ssh/id_rsa',
      passphrase: null,
      tryKeyboard: false,
      keepaliveInterval: 0,
      keepaliveCountMax: 3,
      readyTimeout: 20 * 1000,
      debug: false
    };

    Object.keys(options).forEach((key) => {
      if (this.config[key]) {
        options[key] = this.config[key]
      }
    });

    return options;
  }

  async _connect() {
    if (this._socket && this._socket._state === 'ready') {
      return;
    }

    return new Promise((resolve, reject) => {
      this._socket._state = 'connecting';

      this._socket.on('ready', () => {
        this._socket._state = 'ready';
        resolve();
      });

      this._socket.on('error', (err) => {
        this._socket._state = 'failed';
        console.error(err);
        reject(err);
      });

      this._socket.on('end', () => {
        this._socket._state = 'closed';
      });

      this._socket.connect(this._mergeOptions());
    })
  }

  async _exec(command) {
    if (this._socket || this._socket._state !== 'ready') {
      try {
        await this._connect()
      } catch (e) {
        process.exit(0);
      }
    }

    return new Promise((resolve, reject) => {
      console.stdin(command)
      this._socket.exec(command, (err, stream) => {
        if (err) return reject(err);

        stream.on('data', (data) => {
          console.stdout(data.toString('utf8'));
        });

        stream.stderr.on('data', (data) => {
          console.stderr(data.toString('utf8'));
          reject(data.toString('utf8'));
        });

        stream.on('close', () => {
          resolve();
        });
      });
    });
  }

  run(command) {
    this.pendings.push(command);
  }

  async runSync(command) {
    return await this._exec(command);
  }

  async do() {
    for(let command of this.pendings) {
      await this._exec(command);
    }
  }

  close() {
    this._socket.end();
  }
}

module.exports = Server;
