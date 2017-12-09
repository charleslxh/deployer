'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var console = require('./console');
var SingleTask = require('./task/singleTask');
var GroupTask = require('./task/groupTask');
var Server = require('./server');
var Builder = require('./server/builder');
var Environment = require('./server/environment');
var Configuration = require('./server/configuration');

var utils = require('./utils');
var deployer = require('./deployer');

global.server = function (name, host) {
  var port = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 22;

  var config = new Configuration(name, host, port);
  var env = new Environment();

  var server = new Server(name, config, env);
  deployer.addServer(name, server);

  return new Builder(config, env);
};

global.serverList = function (name, host) {
  // TODO

  var port = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 22;
};

global.run = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(command) {
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, server;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // const promises = deployer.getSevrers().map((server) => server.runSync(command));
            // return await Promise.all(promises);

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 3;
            _iterator = (0, _getIterator3.default)(deployer.getCurrentSevrers());

          case 5:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 12;
              break;
            }

            server = _step.value;
            _context.next = 9;
            return server.runSync(command);

          case 9:
            _iteratorNormalCompletion = true;
            _context.next = 5;
            break;

          case 12:
            _context.next = 18;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context['catch'](3);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 18:
            _context.prev = 18;
            _context.prev = 19;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 21:
            _context.prev = 21;

            if (!_didIteratorError) {
              _context.next = 24;
              break;
            }

            throw _iteratorError;

          case 24:
            return _context.finish(21);

          case 25:
            return _context.finish(18);

          case 26:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[3, 14, 18, 26], [19,, 21, 25]]);
  }));

  return function (_x3) {
    return _ref.apply(this, arguments);
  };
}();

global.runLocal = function (argument) {
  // TODO
};

global.task = function (name, body) {
  var task = null;
  if (utils.isFunction(body)) {
    task = new SingleTask(name, body);
    deployer.addTask(name, task);
  } else if (utils.isArray(body)) {
    var subTasks = body.map(function (_name) {
      return deployer.getTask(_name);
    });
    task = new GroupTask(name, subTasks);
    deployer.addTask(name, task);
  } else {
    throw new TypeError('Expect 2nd argument is a function or array, but got ' + Object.prototype.toString.call(body));
  }

  return task;
};

global.env = function (name, value) {
  // TODO
};

global.set = function (name, value) {
  // TODO
};

global.cd = function (path) {
  // TODO
};

global.before = function (it, that) {
  // TODO
};

global.after = function (it, that) {
  // TODO
};

global.upload = function (it, that) {
  // TODO
};

global.download = function (it, that) {
  // TODO
};

global.ask = function (message) {
  // TODO

  var def = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
};

global.confirm = function (message) {
  // TODO

  var def = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
};