(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.safe-buffer"],{

/***/ "../node_modules/safe-buffer/index.js":
/*!********************************************!*\
  !*** ../node_modules/safe-buffer/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* eslint-disable node/no-deprecated-api */\nvar buffer = __webpack_require__(/*! buffer */ \"../node_modules/buffer/index.js\")\nvar Buffer = buffer.Buffer\n\n// alternative to using Object.keys for old browsers\nfunction copyProps (src, dst) {\n  for (var key in src) {\n    dst[key] = src[key]\n  }\n}\nif (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {\n  module.exports = buffer\n} else {\n  // Copy properties from require('buffer')\n  copyProps(buffer, exports)\n  exports.Buffer = SafeBuffer\n}\n\nfunction SafeBuffer (arg, encodingOrOffset, length) {\n  return Buffer(arg, encodingOrOffset, length)\n}\n\n// Copy static methods from Buffer\ncopyProps(Buffer, SafeBuffer)\n\nSafeBuffer.from = function (arg, encodingOrOffset, length) {\n  if (typeof arg === 'number') {\n    throw new TypeError('Argument must not be a number')\n  }\n  return Buffer(arg, encodingOrOffset, length)\n}\n\nSafeBuffer.alloc = function (size, fill, encoding) {\n  if (typeof size !== 'number') {\n    throw new TypeError('Argument must be a number')\n  }\n  var buf = Buffer(size)\n  if (fill !== undefined) {\n    if (typeof encoding === 'string') {\n      buf.fill(fill, encoding)\n    } else {\n      buf.fill(fill)\n    }\n  } else {\n    buf.fill(0)\n  }\n  return buf\n}\n\nSafeBuffer.allocUnsafe = function (size) {\n  if (typeof size !== 'number') {\n    throw new TypeError('Argument must be a number')\n  }\n  return Buffer(size)\n}\n\nSafeBuffer.allocUnsafeSlow = function (size) {\n  if (typeof size !== 'number') {\n    throw new TypeError('Argument must be a number')\n  }\n  return buffer.SlowBuffer(size)\n}\n\n\n//# sourceURL=webpack:///../node_modules/safe-buffer/index.js?");

/***/ })

}]);