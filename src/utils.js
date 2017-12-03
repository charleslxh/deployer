const _ = module.exports;

[
  'Object', 'Function', 'Array',
  'Number', 'String', 'Boolean',
  'Symbol'
].forEach((key) => {
  _[`is${ key }`] = function (arg) {
    return Object.prototype.toString.call(arg) === `[object ${ key }]`;
  }
});
