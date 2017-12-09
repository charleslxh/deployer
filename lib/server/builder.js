'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var Configuration = require('./configuration');
var Environment = require('./environment');
var utils = require('../utils');

var Builder = function () {
  function Builder() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var env = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck3.default)(this, Builder);

    if (!config instanceof Configuration) {
      config = new Configuration();
    }

    if (!env instanceof Environment) {
      env = new Environment();
    }

    this.config = config;
    this.env = env;
  }

  (0, _createClass3.default)(Builder, [{
    key: 'host',
    value: function host(_host) {
      this.config.set('host', _host);
      return this;
    }
  }, {
    key: 'port',
    value: function port(_port) {
      this.config.set('port', _port);
      return this;
    }
  }, {
    key: 'user',
    value: function user(username) {
      this.config.set('username', username);
      return this;
    }
  }, {
    key: 'password',
    value: function password(_password) {
      this.config.set('password', _password);
      return this;
    }
  }, {
    key: 'stages',
    value: function stages(_stages) {
      if (!utils.isArray(_stages)) {
        _stages = [_stages];
      }

      this.env.set('stages', _stages);
      return this;
    }
  }, {
    key: 'env',
    value: function env(name, value) {
      this.env.set(name, value);
      return this;
    }
  }, {
    key: 'identityFile',
    value: function identityFile(publicKey, privateKey, passphrase) {
      this.config.set('publicKey', fs.readFileSync(publicKey));
      this.config.set('privateKey', fs.readFileSync(privateKey));
      this.config.set('passphrase', passphrase);
      return this;
    }
  }]);
  return Builder;
}();

module.exports = Builder;