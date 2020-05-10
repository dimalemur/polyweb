(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.randombytes"],{

/***/ "../node_modules/randombytes/browser.js":
/*!**********************************************!*\
  !*** ../node_modules/randombytes/browser.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(global, process) {\n\n// limit of Crypto.getRandomValues()\n// https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues\nvar MAX_BYTES = 65536\n\n// Node supports requesting up to this number of bytes\n// https://github.com/nodejs/node/blob/master/lib/internal/crypto/random.js#L48\nvar MAX_UINT32 = 4294967295\n\nfunction oldBrowser () {\n  throw new Error('Secure random number generation is not supported by this browser.\\nUse Chrome, Firefox or Internet Explorer 11')\n}\n\nvar Buffer = __webpack_require__(/*! safe-buffer */ \"../node_modules/safe-buffer/index.js\").Buffer\nvar crypto = global.crypto || global.msCrypto\n\nif (crypto && crypto.getRandomValues) {\n  module.exports = randomBytes\n} else {\n  module.exports = oldBrowser\n}\n\nfunction randomBytes (size, cb) {\n  // phantomjs needs to throw\n  if (size > MAX_UINT32) throw new RangeError('requested too many random bytes')\n\n  var bytes = Buffer.allocUnsafe(size)\n\n  if (size > 0) {  // getRandomValues fails on IE if size == 0\n    if (size > MAX_BYTES) { // this is the max bytes crypto.getRandomValues\n      // can do at once see https://developer.mozilla.org/en-US/docs/Web/API/window.crypto.getRandomValues\n      for (var generated = 0; generated < size; generated += MAX_BYTES) {\n        // buffer.slice automatically checks if the end is past the end of\n        // the buffer so we don't have to here\n        crypto.getRandomValues(bytes.slice(generated, generated + MAX_BYTES))\n      }\n    } else {\n      crypto.getRandomValues(bytes)\n    }\n  }\n\n  if (typeof cb === 'function') {\n    return process.nextTick(function () {\n      cb(null, bytes)\n    })\n  }\n\n  return bytes\n}\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ \"../node_modules/webpack/buildin/global.js\"), __webpack_require__(/*! ./../process/browser.js */ \"../node_modules/process/browser.js\")))\n\n//# sourceURL=webpack:///../node_modules/randombytes/browser.js?");

/***/ })

}]);