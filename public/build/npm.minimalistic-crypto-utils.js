(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.minimalistic-crypto-utils"],{

/***/ "../node_modules/minimalistic-crypto-utils/lib/utils.js":
/*!**************************************************************!*\
  !*** ../node_modules/minimalistic-crypto-utils/lib/utils.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = exports;\n\nfunction toArray(msg, enc) {\n  if (Array.isArray(msg))\n    return msg.slice();\n  if (!msg)\n    return [];\n  var res = [];\n  if (typeof msg !== 'string') {\n    for (var i = 0; i < msg.length; i++)\n      res[i] = msg[i] | 0;\n    return res;\n  }\n  if (enc === 'hex') {\n    msg = msg.replace(/[^a-z0-9]+/ig, '');\n    if (msg.length % 2 !== 0)\n      msg = '0' + msg;\n    for (var i = 0; i < msg.length; i += 2)\n      res.push(parseInt(msg[i] + msg[i + 1], 16));\n  } else {\n    for (var i = 0; i < msg.length; i++) {\n      var c = msg.charCodeAt(i);\n      var hi = c >> 8;\n      var lo = c & 0xff;\n      if (hi)\n        res.push(hi, lo);\n      else\n        res.push(lo);\n    }\n  }\n  return res;\n}\nutils.toArray = toArray;\n\nfunction zero2(word) {\n  if (word.length === 1)\n    return '0' + word;\n  else\n    return word;\n}\nutils.zero2 = zero2;\n\nfunction toHex(msg) {\n  var res = '';\n  for (var i = 0; i < msg.length; i++)\n    res += zero2(msg[i].toString(16));\n  return res;\n}\nutils.toHex = toHex;\n\nutils.encode = function encode(arr, enc) {\n  if (enc === 'hex')\n    return toHex(arr);\n  else\n    return arr;\n};\n\n\n//# sourceURL=webpack:///../node_modules/minimalistic-crypto-utils/lib/utils.js?");

/***/ })

}]);