(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.wrappy"],{

/***/ "../node_modules/wrappy/wrappy.js":
/*!****************************************!*\
  !*** ../node_modules/wrappy/wrappy.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// Returns a wrapper function that returns a wrapped callback\n// The wrapper function should do some stuff, and return a\n// presumably different callback function.\n// This makes sure that own properties are retained, so that\n// decorations and such are not lost along the way.\nmodule.exports = wrappy\nfunction wrappy (fn, cb) {\n  if (fn && cb) return wrappy(fn)(cb)\n\n  if (typeof fn !== 'function')\n    throw new TypeError('need wrapper function')\n\n  Object.keys(fn).forEach(function (k) {\n    wrapper[k] = fn[k]\n  })\n\n  return wrapper\n\n  function wrapper() {\n    var args = new Array(arguments.length)\n    for (var i = 0; i < args.length; i++) {\n      args[i] = arguments[i]\n    }\n    var ret = fn.apply(this, args)\n    var cb = args[args.length-1]\n    if (typeof ret === 'function' && ret !== cb) {\n      Object.keys(cb).forEach(function (k) {\n        ret[k] = cb[k]\n      })\n    }\n    return ret\n  }\n}\n\n\n//# sourceURL=webpack:///../node_modules/wrappy/wrappy.js?");

/***/ })

}]);