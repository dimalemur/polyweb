(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.os-tmpdir"],{

/***/ "../node_modules/os-tmpdir/index.js":
/*!******************************************!*\
  !*** ../node_modules/os-tmpdir/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(process) {\nvar isWindows = process.platform === 'win32';\nvar trailingSlashRe = isWindows ? /[^:]\\\\$/ : /.\\/$/;\n\n// https://github.com/nodejs/node/blob/3e7a14381497a3b73dda68d05b5130563cdab420/lib/os.js#L25-L43\nmodule.exports = function () {\n\tvar path;\n\n\tif (isWindows) {\n\t\tpath = process.env.TEMP ||\n\t\t\tprocess.env.TMP ||\n\t\t\t(process.env.SystemRoot || process.env.windir) + '\\\\temp';\n\t} else {\n\t\tpath = process.env.TMPDIR ||\n\t\t\tprocess.env.TMP ||\n\t\t\tprocess.env.TEMP ||\n\t\t\t'/tmp';\n\t}\n\n\tif (trailingSlashRe.test(path)) {\n\t\tpath = path.slice(0, -1);\n\t}\n\n\treturn path;\n};\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../process/browser.js */ \"../node_modules/process/browser.js\")))\n\n//# sourceURL=webpack:///../node_modules/os-tmpdir/index.js?");

/***/ })

}]);