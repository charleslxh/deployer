'use strict';

var _ = module.exports;

['Object', 'Function', 'Array', 'Number', 'String', 'Boolean', 'Symbol'].forEach(function (key) {
  _['is' + key] = function (arg) {
    return Object.prototype.toString.call(arg) === '[object ' + key + ']';
  };
});