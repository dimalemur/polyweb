(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.has-unicode"],{

/***/ "../node_modules/has-unicode/index.js":
/*!********************************************!*\
  !*** ../node_modules/has-unicode/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(process) {\nvar os = __webpack_require__(/*! os */ \"../node_modules/os-browserify/browser.js\")\n\nvar hasUnicode = module.exports = function () {\n  // Recent Win32 platforms (>XP) CAN support unicode in the console but\n  // don't have to, and in non-english locales often use traditional local\n  // code pages. There's no way, short of windows system calls or execing\n  // the chcp command line program to figure this out. As such, we default\n  // this to false and encourage your users to override it via config if\n  // appropriate.\n  if (os.type() == \"Windows_NT\") { return false }\n\n  var isUTF8 = /UTF-?8$/i\n  var ctype = process.env.LC_ALL || process.env.LC_CTYPE || process.env.LANG\n  return isUTF8.test(ctype)\n}\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../process/browser.js */ \"../node_modules/process/browser.js\")))\n\n//# sourceURL=webpack:///../node_modules/has-unicode/index.js?");

/***/ })

}]);