'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

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

var _ = require('./utils');
var deployer = require('./deployer');

global.server = function (name, host) {
  var port = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 22;

  var config = new Configuration(name, host, port);
  var env = new Environment();

  var server = new Server(config, env);
  deployer.addServer(name, server);

  return new Builder(config, env);
};

global.serverList = function (name, host) {
  // TODO

  var port = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 22;
};

global.run = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(command) {
    var name;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = _regenerator2.default.keys(deployer.servers);

          case 1:
            if ((_context.t1 = _context.t0()).done) {
              _context.next = 9;
              break;
            }

            name = _context.t1.value;
            _context.t2 = deployer.servers[name];

            if (!_context.t2) {
              _context.next = 7;
              break;
            }

            _context.next = 7;
            return deployer.servers[name].runSync(command);

          case 7:
            _context.next = 1;
            break;

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x3) {
    return _ref.apply(this, arguments);
  };
}();

global.runLocal = function (argument) {
  // TODO
};

global.task = function (name, body) {
  if (_.isFunction(body)) {
    var task = new SingleTask(name, body);
    deployer.addTask(name, task);
  } else if (_.isArray(body)) {
    var subTasks = body.map(function (_name) {
      return deployer.getTask(_name);
    });
    var _task = new GroupTask(name, subTasks);
    deployer.addTask(name, _task);
  } else {
    throw new TypeError('Expect 2nd argument is a function or array, but got ' + Object.prototype.toString.call(body));
  }
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