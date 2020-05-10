(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.os-homedir"],{

/***/ "../node_modules/os-homedir/index.js":
/*!*******************************************!*\
  !*** ../node_modules/os-homedir/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(process) {\nvar os = __webpack_require__(/*! os */ \"../node_modules/os-browserify/browser.js\");\n\nfunction homedir() {\n\tvar env = process.env;\n\tvar home = env.HOME;\n\tvar user = env.LOGNAME || env.USER || env.LNAME || env.USERNAME;\n\n\tif (process.platform === 'win32') {\n\t\treturn env.USERPROFILE || env.HOMEDRIVE + env.HOMEPATH || home || null;\n\t}\n\n\tif (process.platform === 'darwin') {\n\t\treturn home || (user ? '/Users/' + user : null);\n\t}\n\n\tif (process.platform === 'linux') {\n\t\treturn home || (process.getuid() === 0 ? '/root' : (user ? '/home/' + user : null));\n\t}\n\n\treturn home || null;\n}\n\nmodule.exports = typeof os.homedir === 'function' ? os.homedir : homedir;\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../process/browser.js */ \"../node_modules/process/browser.js\")))\n\n//# sourceURL=webpack:///../node_modules/os-homedir/index.js?");

/***/ })

}]);