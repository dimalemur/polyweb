(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.brorand"],{

/***/ "../node_modules/brorand/index.js":
/*!****************************************!*\
  !*** ../node_modules/brorand/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var r;\n\nmodule.exports = function rand(len) {\n  if (!r)\n    r = new Rand(null);\n\n  return r.generate(len);\n};\n\nfunction Rand(rand) {\n  this.rand = rand;\n}\nmodule.exports.Rand = Rand;\n\nRand.prototype.generate = function generate(len) {\n  return this._rand(len);\n};\n\n// Emulate crypto API using randy\nRand.prototype._rand = function _rand(n) {\n  if (this.rand.getBytes)\n    return this.rand.getBytes(n);\n\n  var res = new Uint8Array(n);\n  for (var i = 0; i < res.length; i++)\n    res[i] = this.rand.getByte();\n  return res;\n};\n\nif (typeof self === 'object') {\n  if (self.crypto && self.crypto.getRandomValues) {\n    // Modern browsers\n    Rand.prototype._rand = function _rand(n) {\n      var arr = new Uint8Array(n);\n      self.crypto.getRandomValues(arr);\n      return arr;\n    };\n  } else if (self.msCrypto && self.msCrypto.getRandomValues) {\n    // IE\n    Rand.prototype._rand = function _rand(n) {\n      var arr = new Uint8Array(n);\n      self.msCrypto.getRandomValues(arr);\n      return arr;\n    };\n\n  // Safari's WebWorkers do not have `crypto`\n  } else if (typeof window === 'object') {\n    // Old junk\n    Rand.prototype._rand = function() {\n      throw new Error('Not implemented yet');\n    };\n  }\n} else {\n  // Node.js or Web worker with no crypto support\n  try {\n    var crypto = __webpack_require__(/*! crypto */ 7);\n    if (typeof crypto.randomBytes !== 'function')\n      throw new Error('Not supported');\n\n    Rand.prototype._rand = function _rand(n) {\n      return crypto.randomBytes(n);\n    };\n  } catch (e) {\n  }\n}\n\n\n//# sourceURL=webpack:///../node_modules/brorand/index.js?");

/***/ })

}]);