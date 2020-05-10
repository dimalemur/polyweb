(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.buffer-xor"],{

/***/ "../node_modules/buffer-xor/index.js":
/*!*******************************************!*\
  !*** ../node_modules/buffer-xor/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(Buffer) {module.exports = function xor (a, b) {\n  var length = Math.min(a.length, b.length)\n  var buffer = new Buffer(length)\n\n  for (var i = 0; i < length; ++i) {\n    buffer[i] = a[i] ^ b[i]\n  }\n\n  return buffer\n}\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../buffer/index.js */ \"../node_modules/buffer/index.js\").Buffer))\n\n//# sourceURL=webpack:///../node_modules/buffer-xor/index.js?");

/***/ })

}]);