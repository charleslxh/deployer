const _ = module.exports;

[
  'Object', 'Function', 'Array',
  'Number', 'String', 'Boolean',
  'Symbol', 'Map', 'WeakMap',
  'RegExp', 'Set', 'WeakSet'
].forEach((key) => {
  _[`is${ key }`] = function (arg) {
    return Object.prototype.toString.call(arg) === `[object ${ key }]`;
  }
});

_.exists = function (that, it) {
  let result = false;
  switch (Object.prototype.toString.call(that)) {
    case '[object Array]':
      result = that.indexOf(it) > 0;
      break;
    case '[object Object]':
      result = that[it] !== null && that[it] !== undefined;
      break;
    case '[object String]':
      result = that.includes[it];
      break;
    case '[object Set]':
    case '[object WeakSet]':
    case '[object Map]':
    case '[object WeakMap]':
      result = that.has(it);
      break;
    case '[object Function]':
      result = that.call(null, it);
    default:
      result = false;
  }

  return result;
}

_.arrayColumn = function (array, key, filterEmpty = false) {
  return array.reduce((result, _arr) => {
    if (filterEmpty) {
      (_arr[key] !== null || _arr[key] !== undefined) ? result.push(_arr[key]) : null;
    } else {
      result.push(_arr[key]);
    }
    return result;
  }, []);
}

_.arrayIntersect= function (arr1, arr2) {
  const result = [];

  for (var i = 0; i < arr1.length; i++) {
    let index = arr2.indexOf(arr1[i]);
    if (index > -1) {
      result.push(arr1[i]);
      arr2.splice(i, 1);
    }
  }

  return result;
}

_.isEmpty = function (target) {
  return (target.length !== undefined && target.length === 0) ||
    target === 0 ||
    target === false ||
    (Object.prototype.toString.call(target) === '[object, Object]' && Object.keys(target).length === 0) ||
    (target.size !== undefined && target.size() === 0)
  ;
}
