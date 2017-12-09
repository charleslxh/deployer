'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var console = require('../console');

var Task = function () {
  function Task(name) {
    (0, _classCallCheck3.default)(this, Task);

    this.name = name;
    this.description = '';
    this._stages = null;
    this._servers = null;
    this._status = 'initialized';
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
      this._stages = Array.prototype.slice.call(arguments);
      return this;
    }
  }, {
    key: 'onlyForServers',
    value: function onlyForServers() {
      this._servers = Array.prototype.slice.call(arguments);
      return this;
    }
  }, {
    key: 'run',
    value: function run(options) {
      this.status = 'running';
      this._startAt = new Date().valueOf();
      console.printTask(this.name, this.servers);
    }
  }, {
    key: 'done',
    value: function done() {
      this.status = 'done';
      this._endAt = new Date().valueOf();
      console.done(this.servers);
      console.ok(this._endAt - this._startAt);
    }
  }, {
    key: 'isRunning',
    value: function isRunning() {
      return this._status = 'running';
    }
  }, {
    key: 'servers',
    get: function get() {
      return this._servers;
    }
  }, {
    key: 'stages',
    get: function get() {
      return this._stages;
    }
  }]);
  return Task;
}();

module.exports = Task;