'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EventEmitter = require('events');
var Client = require('ssh2');
var console = require('../console');

var Server = function (_EventEmitter) {
  (0, _inherits3.default)(Server, _EventEmitter);

  function Server() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var env = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck3.default)(this, Server);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Server.__proto__ || (0, _getPrototypeOf2.default)(Server)).call(this));

    _this.config = config;
    _this.env = env;

    _this.pendings = [];

    _this._socket = new Client();
    _this._socket._state = 'initialized';
    return _this;
  }

  (0, _createClass3.default)(Server, [{
    key: '_mergeOptions',
    value: function _mergeOptions() {
      var _this2 = this;

      var options = {
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

      (0, _keys2.default)(options).forEach(function (key) {
        if (_this2.config[key]) {
          options[key] = _this2.config[key];
        }
      });

      return options;
    }
  }, {
    key: '_connect',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var _this3 = this;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(this._socket && this._socket._state === 'ready')) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt('return');

              case 2:
                return _context.abrupt('return', new _promise2.default(function (resolve, reject) {
                  _this3._socket._state = 'connecting';

                  _this3._socket.on('ready', function () {
                    _this3._socket._state = 'ready';
                    resolve();
                  });

                  _this3._socket.on('error', function (err) {
                    _this3._socket._state = 'failed';
                    console.error(err);
                    reject(err);
                  });

                  _this3._socket.on('end', function () {
                    _this3._socket._state = 'closed';
                  });

                  _this3._socket.connect(_this3._mergeOptions());
                }));

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _connect() {
        return _ref.apply(this, arguments);
      }

      return _connect;
    }()
  }, {
    key: '_exec',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(command) {
        var _this4 = this;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(this._socket || this._socket._state !== 'ready')) {
                  _context2.next = 9;
                  break;
                }

                _context2.prev = 1;
                _context2.next = 4;
                return this._connect();

              case 4:
                _context2.next = 9;
                break;

              case 6:
                _context2.prev = 6;
                _context2.t0 = _context2['catch'](1);

                process.exit(0);

              case 9:
                return _context2.abrupt('return', new _promise2.default(function (resolve, reject) {
                  console.stdin(command);
                  _this4._socket.exec(command, function (err, stream) {
                    if (err) return reject(err);

                    stream.on('data', function (data) {
                      console.stdout(data.toString('utf8'));
                    });

                    stream.stderr.on('data', function (data) {
                      console.stderr(data.toString('utf8'));
                      reject(data.toString('utf8'));
                    });

                    stream.on('close', function () {
                      resolve();
                    });
                  });
                }));

              case 10:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 6]]);
      }));

      function _exec(_x3) {
        return _ref2.apply(this, arguments);
      }

      return _exec;
    }()
  }, {
    key: 'run',
    value: function run(command) {
      this.pendings.push(command);
    }
  }, {
    key: 'runSync',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(command) {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._exec(command);

              case 2:
                return _context3.abrupt('return', _context3.sent);

              case 3:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function runSync(_x4) {
        return _ref3.apply(this, arguments);
      }

      return runSync;
    }()
  }, {
    key: 'do',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, command;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context4.prev = 3;
                _iterator = (0, _getIterator3.default)(this.pendings);

              case 5:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context4.next = 12;
                  break;
                }

                command = _step.value;
                _context4.next = 9;
                return this._exec(command);

              case 9:
                _iteratorNormalCompletion = true;
                _context4.next = 5;
                break;

              case 12:
                _context4.next = 18;
                break;

              case 14:
                _context4.prev = 14;
                _context4.t0 = _context4['catch'](3);
                _didIteratorError = true;
                _iteratorError = _context4.t0;

              case 18:
                _context4.prev = 18;
                _context4.prev = 19;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 21:
                _context4.prev = 21;

                if (!_didIteratorError) {
                  _context4.next = 24;
                  break;
                }

                throw _iteratorError;

              case 24:
                return _context4.finish(21);

              case 25:
                return _context4.finish(18);

              case 26:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[3, 14, 18, 26], [19,, 21, 25]]);
      }));

      function _do() {
        return _ref4.apply(this, arguments);
      }

      return _do;
    }()
  }, {
    key: 'close',
    value: function close() {
      this._socket.end();
    }
  }]);
  return Server;
}(EventEmitter);

module.exports = Server;