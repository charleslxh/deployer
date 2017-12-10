'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Server = require('./server');
var Task = require('./task');
var console = require('./console');
var utils = require('./utils');

/**
* Deployer main class
*
**/

var Deployer = function () {
  function Deployer() {
    (0, _classCallCheck3.default)(this, Deployer);

    this.servers = new _map2.default();
    this.tasks = new _map2.default();
    this.context = new _map2.default();
  }

  (0, _createClass3.default)(Deployer, [{
    key: 'getTask',
    value: function getTask(name) {
      return this.tasks.get(name);
    }
  }, {
    key: 'getServer',
    value: function getServer(name) {
      return this.servers.get(name);
    }
  }, {
    key: 'addServer',
    value: function addServer(name, server) {
      if (!server instanceof Server) {
        return;
      }

      this.servers.set(name, server);
    }
  }, {
    key: 'addTask',
    value: function addTask(name, task) {
      if (!task instanceof Task) {
        return;
      }

      this.tasks.set(name, task);
    }
  }, {
    key: 'run',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(taskName, options) {
        var currentTask, intersection, currentServers;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.tasks.has(taskName)) {
                  _context.next = 2;
                  break;
                }

                throw new Error('Task {' + taskName + '} never be defined.');

              case 2:
                currentTask = this.getTask(taskName);

                if (!(currentTask.stages !== null)) {
                  _context.next = 7;
                  break;
                }

                intersection = utils.arrayIntersect(currentTask.stages, options.stages);

                if (!utils.isEmpty(intersection)) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt('return');

              case 7:
                currentServers = this.getServersOfTask(taskName);


                this.context.set('currentTask', currentTask);
                this.context.set('currentServers', currentServers);

                currentTask._servers = utils.arrayColumn(currentServers, 'name', true);
                _context.next = 13;
                return currentTask.run(options);

              case 13:

                this.context.delete('currentTask');
                this.context.delete('currentServers');

              case 15:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function run(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return run;
    }()
  }, {
    key: 'end',
    value: function end() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(this.servers), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _ref2 = _step.value;

          var _ref3 = (0, _slicedToArray3.default)(_ref2, 2);

          var name = _ref3[0];
          var server = _ref3[1];

          server.close();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      process.exit(0);
    }
  }, {
    key: 'getServersOfTask',
    value: function getServersOfTask(taskName) {
      var _this = this;

      var task = this.getTask(taskName);

      if (!task) {
        return [];
      }

      var allowedServers = task.servers;
      var allowedStages = task.stages;

      if (allowedServers === null) {
        allowedServers = this.servers;
      } else {
        allowedServers = allowedServers.reduce(function (map, _name) {
          var _server = _this.getServer(_name);
          if (_server) map.set(_name, _server);
          return map;
        }, new _map2.default());
      }

      var results = [];
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = (0, _getIterator3.default)(allowedServers), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _ref4 = _step2.value;

          var _ref5 = (0, _slicedToArray3.default)(_ref4, 2);

          var name = _ref5[0];
          var server = _ref5[1];

          if (allowedStages === null) {
            results.push(server);
            continue;
          }

          var intersection = utils.arrayIntersect(allowedStages, server.env.stages);
          if (!utils.isEmpty(intersection)) {
            results.push(server);
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return results;
    }
  }, {
    key: 'getCurrentTask',
    value: function getCurrentTask() {
      return this.context.get('currentTask');
    }
  }, {
    key: 'getCurrentSevrers',
    value: function getCurrentSevrers() {
      return this.context.get('currentServers');
    }
  }]);
  return Deployer;
}();

module.exports = new Deployer();