'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Server = require('./server');
var Task = require('./task');
var console = require('./console');

/**
* Deployer main class
*
**/

var Deployer = function () {
  function Deployer() {
    (0, _classCallCheck3.default)(this, Deployer);

    this.servers = {};
    this.tasks = {};
  }

  (0, _createClass3.default)(Deployer, [{
    key: 'addServer',
    value: function addServer(name, server) {
      if (!server instanceof Server) {
        return;
      }

      this.servers[name] = server;
    }
  }, {
    key: 'addTask',
    value: function addTask(name, task) {
      if (!task instanceof Task) {
        return;
      }

      this.tasks[name] = task;
    }
  }, {
    key: 'run',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var name;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.t0 = _regenerator2.default.keys(this.tasks);

              case 2:
                if ((_context.t1 = _context.t0()).done) {
                  _context.next = 10;
                  break;
                }

                name = _context.t1.value;
                _context.t2 = this.tasks[name];

                if (!_context.t2) {
                  _context.next = 8;
                  break;
                }

                _context.next = 8;
                return this.tasks[name].run();

              case 8:
                _context.next = 2;
                break;

              case 10:
                _context.next = 15;
                break;

              case 12:
                _context.prev = 12;
                _context.t3 = _context['catch'](0);

                console.log(_context.t3);

              case 15:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 12]]);
      }));

      function run() {
        return _ref.apply(this, arguments);
      }

      return run;
    }()
  }, {
    key: 'end',
    value: function end() {
      for (var name in this.servers) {
        this.servers[name] && this.servers[name].close();
      }

      process.exit(0);
    }
  }, {
    key: 'getTask',
    value: function getTask(name) {
      return this.tasks[name];
    }
  }, {
    key: 'getServer',
    value: function getServer(name) {
      return this.servers[name];
    }
  }, {
    key: 'getSevrers',
    value: function getSevrers(taskname) {
      if (!this.tasks[taskname]) {
        return [];
      }

      var allowedServers = this.tasks[taskname].servers;
      var allowedStages = this.tasks[taskname].stages;

      if (allowedServers === null) {
        allowedServers = this.servers;
      }

      return allowedServers.reduce(function (server) {
        return allowedStages.indexOf(server.config.stage) > 0;
      });
    }
  }]);
  return Deployer;
}();

module.exports = new Deployer();