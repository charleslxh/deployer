'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

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

var Task = require('./index');
var deployer = require('../deployer');

var GroupTask = function (_Task) {
  (0, _inherits3.default)(GroupTask, _Task);

  function GroupTask(name, subTasks) {
    (0, _classCallCheck3.default)(this, GroupTask);

    var _this = (0, _possibleConstructorReturn3.default)(this, (GroupTask.__proto__ || (0, _getPrototypeOf2.default)(GroupTask)).call(this, name));

    _this.subTasks = subTasks;
    return _this;
  }

  (0, _createClass3.default)(GroupTask, [{
    key: 'run',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(options) {
        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, task;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                (0, _get3.default)(GroupTask.prototype.__proto__ || (0, _getPrototypeOf2.default)(GroupTask.prototype), 'run', this).call(this, options);

                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 4;
                _iterator = (0, _getIterator3.default)(this.subTasks);

              case 6:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 15;
                  break;
                }

                task = _step.value;

                if (!(task === null || task === undefined)) {
                  _context.next = 10;
                  break;
                }

                return _context.abrupt('continue', 12);

              case 10:
                _context.next = 12;
                return deployer.run(task.name, options);

              case 12:
                _iteratorNormalCompletion = true;
                _context.next = 6;
                break;

              case 15:
                _context.next = 21;
                break;

              case 17:
                _context.prev = 17;
                _context.t0 = _context['catch'](4);
                _didIteratorError = true;
                _iteratorError = _context.t0;

              case 21:
                _context.prev = 21;
                _context.prev = 22;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 24:
                _context.prev = 24;

                if (!_didIteratorError) {
                  _context.next = 27;
                  break;
                }

                throw _iteratorError;

              case 27:
                return _context.finish(24);

              case 28:
                return _context.finish(21);

              case 29:

                this.done();

              case 30:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[4, 17, 21, 29], [22,, 24, 28]]);
      }));

      function run(_x) {
        return _ref.apply(this, arguments);
      }

      return run;
    }()
  }]);
  return GroupTask;
}(Task);

module.exports = GroupTask;