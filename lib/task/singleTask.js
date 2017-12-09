'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var console = require('../console');
var Task = require('./index');

var SingleTask = function (_Task) {
  (0, _inherits3.default)(SingleTask, _Task);

  function SingleTask(name, callback) {
    (0, _classCallCheck3.default)(this, SingleTask);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SingleTask.__proto__ || (0, _getPrototypeOf2.default)(SingleTask)).call(this, name));

    _this.callback = callback;
    return _this;
  }

  (0, _createClass3.default)(SingleTask, [{
    key: 'run',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(options) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                (0, _get3.default)(SingleTask.prototype.__proto__ || (0, _getPrototypeOf2.default)(SingleTask.prototype), 'run', this).call(this, options);
                _context.next = 3;
                return this.callback.apply(this);

              case 3:
                this.done();

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function run(_x) {
        return _ref.apply(this, arguments);
      }

      return run;
    }()
  }]);
  return SingleTask;
}(Task);

module.exports = SingleTask;