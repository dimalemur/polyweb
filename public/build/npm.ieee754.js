(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.ieee754"],{

/***/ "../node_modules/ieee754/index.js":
/*!****************************************!*\
  !*** ../node_modules/ieee754/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("exports.read = function (buffer, offset, isLE, mLen, nBytes) {\n  var e, m\n  var eLen = (nBytes * 8) - mLen - 1\n  var eMax = (1 << eLen) - 1\n  var eBias = eMax >> 1\n  var nBits = -7\n  var i = isLE ? (nBytes - 1) : 0\n  var d = isLE ? -1 : 1\n  var s = buffer[offset + i]\n\n  i += d\n\n  e = s & ((1 << (-nBits)) - 1)\n  s >>= (-nBits)\n  nBits += eLen\n  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}\n\n  m = e & ((1 << (-nBits)) - 1)\n  e >>= (-nBits)\n  nBits += mLen\n  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}\n\n  if (e === 0) {\n    e = 1 - eBias\n  } else if (e === eMax) {\n    return m ? NaN : ((s ? -1 : 1) * Infinity)\n  } else {\n    m = m + Math.pow(2, mLen)\n    e = e - eBias\n  }\n  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)\n}\n\nexports.write = function (buffer, value, offset, isLE, mLen, nBytes) {\n  var e, m, c\n  var eLen = (nBytes * 8) - mLen - 1\n  var eMax = (1 << eLen) - 1\n  var eBias = eMax >> 1\n  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)\n  var i = isLE ? 0 : (nBytes - 1)\n  var d = isLE ? 1 : -1\n  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0\n\n  value = Math.abs(value)\n\n  if (isNaN(value) || value === Infinity) {\n    m = isNaN(value) ? 1 : 0\n    e = eMax\n  } else {\n    e = Math.floor(Math.log(value) / Math.LN2)\n    if (value * (c = Math.pow(2, -e)) < 1) {\n      e--\n      c *= 2\n    }\n    if (e + eBias >= 1) {\n      value += rt / c\n    } else {\n      value += rt * Math.pow(2, 1 - eBias)\n    }\n    if (value * c >= 2) {\n      e++\n      c /= 2\n    }\n\n    if (e + eBias >= eMax) {\n      m = 0\n      e = eMax\n    } else if (e + eBias >= 1) {\n      m = ((value * c) - 1) * Math.pow(2, mLen)\n      e = e + eBias\n    } else {\n      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)\n      e = 0\n    }\n  }\n\n  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}\n\n  e = (e << mLen) | m\n  eLen += mLen\n  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}\n\n  buffer[offset + i - d] |= s * 128\n}\n\n\n//# sourceURL=webpack:///../node_modules/ieee754/index.js?");

/***/ })

}]);