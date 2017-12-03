'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');

var Builder = function () {
  function Builder() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var env = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck3.default)(this, Builder);

    this.config = config;
    this.env = env;
  }

  (0, _createClass3.default)(Builder, [{
    key: 'host',
    value: function host(_host) {
      this.config.host = _host;
      return this;
    }
  }, {
    key: 'port',
    value: function port(_port) {
      this.config.port = _port;
      return this;
    }
  }, {
    key: 'user',
    value: function user(_user) {
      this.config.username = _user;
      return this;
    }
  }, {
    key: 'password',
    value: function password(_password) {
      this.config.password = _password;
      return this;
    }
  }, {
    key: 'stage',
    value: function stage(_stage) {
      this.config.stage = _stage;
      return this;
    }
  }, {
    key: 'env',
    value: function env(name, value) {
      this.env[name] = value;
      return this;
    }
  }, {
    key: 'identityFile',
    value: function identityFile(publicKey, privateKey, passphrase) {
      this.config.publicKey = fs.readFileSync(publicKey);
      this.config.privateKey = fs.readFileSync(privateKey);
      this.config.passphrase = passphrase;
    }
  }]);
  return Builder;
}();

module.exports = Builder;