(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.code-point-at"],{

/***/ "../node_modules/code-point-at/index.js":
/*!**********************************************!*\
  !*** ../node_modules/code-point-at/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* eslint-disable babel/new-cap, xo/throw-new-error */\n\nmodule.exports = function (str, pos) {\n\tif (str === null || str === undefined) {\n\t\tthrow TypeError();\n\t}\n\n\tstr = String(str);\n\n\tvar size = str.length;\n\tvar i = pos ? Number(pos) : 0;\n\n\tif (Number.isNaN(i)) {\n\t\ti = 0;\n\t}\n\n\tif (i < 0 || i >= size) {\n\t\treturn undefined;\n\t}\n\n\tvar first = str.charCodeAt(i);\n\n\tif (first >= 0xD800 && first <= 0xDBFF && size > i + 1) {\n\t\tvar second = str.charCodeAt(i + 1);\n\n\t\tif (second >= 0xDC00 && second <= 0xDFFF) {\n\t\t\treturn ((first - 0xD800) * 0x400) + second - 0xDC00 + 0x10000;\n\t\t}\n\t}\n\n\treturn first;\n};\n\n\n//# sourceURL=webpack:///../node_modules/code-point-at/index.js?");

/***/ })

}]);