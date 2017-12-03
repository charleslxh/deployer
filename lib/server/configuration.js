"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Configuration = function () {
  function Configuration(name, host, port) {
    (0, _classCallCheck3.default)(this, Configuration);

    this.name = name;
    this.host = host;
    this.port = port;
  }

  (0, _createClass3.default)(Configuration, [{
    key: "set",
    value: function set(key, value) {
      this[key] = value;
    }
  }]);
  return Configuration;
}();

module.exports = Configuration;