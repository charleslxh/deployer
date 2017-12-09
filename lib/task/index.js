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

var Task = function () {
  function Task(name) {
    (0, _classCallCheck3.default)(this, Task);

    this.name = name;
    this.description = '';
    this._stages = null;
    this._servers = null;
  }

  (0, _createClass3.default)(Task, [{
    key: 'desc',
    value: function desc(_desc) {
      this.description = _desc;
      return this;
    }
  }, {
    key: 'onlyForStages',
    value: function onlyForStages() {
      this.stages = Array.prototype.slice.call(arguments);
      return this;
    }
  }, {
    key: 'onlyForServers',
    value: function onlyForServers() {
      this.servers = Array.prototype.slice.call(arguments);
      return this;
    }
  }, {
    key: 'run',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function run() {
        return _ref.apply(this, arguments);
      }

      return run;
    }()
  }, {
    key: 'servers',
    get: function get() {
      if (this._servers === null) {
        return [];
      }

      return this._servers;
    }
  }, {
    key: 'stages',
    get: function get() {
      if (this._stages === null) {
        return [];
      }

      return this._stages;
    }
  }]);
  return Task;
}();

module.exports = Task;