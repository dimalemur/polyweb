(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.wide-align"],{

/***/ "../node_modules/wide-align/align.js":
/*!*******************************************!*\
  !*** ../node_modules/wide-align/align.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar stringWidth = __webpack_require__(/*! string-width */ \"../node_modules/wide-align/node_modules/string-width/index.js\")\n\nexports.center = alignCenter\nexports.left = alignLeft\nexports.right = alignRight\n\n// lodash's way of generating pad characters.\n\nfunction createPadding (width) {\n  var result = ''\n  var string = ' '\n  var n = width\n  do {\n    if (n % 2) {\n      result += string;\n    }\n    n = Math.floor(n / 2);\n    string += string;\n  } while (n);\n\n  return result;\n}\n\nfunction alignLeft (str, width) {\n  var trimmed = str.trimRight()\n  if (trimmed.length === 0 && str.length >= width) return str\n  var padding = ''\n  var strWidth = stringWidth(trimmed)\n\n  if (strWidth < width) {\n    padding = createPadding(width - strWidth)\n  }\n\n  return trimmed + padding\n}\n\nfunction alignRight (str, width) {\n  var trimmed = str.trimLeft()\n  if (trimmed.length === 0 && str.length >= width) return str\n  var padding = ''\n  var strWidth = stringWidth(trimmed)\n\n  if (strWidth < width) {\n    padding = createPadding(width - strWidth)\n  }\n\n  return padding + trimmed\n}\n\nfunction alignCenter (str, width) {\n  var trimmed = str.trim()\n  if (trimmed.length === 0 && str.length >= width) return str\n  var padLeft = ''\n  var padRight = ''\n  var strWidth = stringWidth(trimmed)\n\n  if (strWidth < width) {\n    var padLeftBy = parseInt((width - strWidth) / 2, 10) \n    padLeft = createPadding(padLeftBy)\n    padRight = createPadding(width - (strWidth + padLeftBy))\n  }\n\n  return padLeft + trimmed + padRight\n}\n\n\n//# sourceURL=webpack:///../node_modules/wide-align/align.js?");

/***/ }),

/***/ "../node_modules/wide-align/node_modules/ansi-regex/index.js":
/*!*******************************************************************!*\
  !*** ../node_modules/wide-align/node_modules/ansi-regex/index.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = () => {\n\tconst pattern = [\n\t\t'[\\\\u001B\\\\u009B][[\\\\]()#;?]*(?:(?:(?:[a-zA-Z\\\\d]*(?:;[a-zA-Z\\\\d]*)*)?\\\\u0007)',\n\t\t'(?:(?:\\\\d{1,4}(?:;\\\\d{0,4})*)?[\\\\dA-PRZcf-ntqry=><~]))'\n\t].join('|');\n\n\treturn new RegExp(pattern, 'g');\n};\n\n\n//# sourceURL=webpack:///../node_modules/wide-align/node_modules/ansi-regex/index.js?");

/***/ }),

/***/ "../node_modules/wide-align/node_modules/string-width/index.js":
/*!*********************************************************************!*\
  !*** ../node_modules/wide-align/node_modules/string-width/index.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nconst stripAnsi = __webpack_require__(/*! strip-ansi */ \"../node_modules/wide-align/node_modules/strip-ansi/index.js\");\nconst isFullwidthCodePoint = __webpack_require__(/*! is-fullwidth-code-point */ \"../node_modules/is-fullwidth-code-point/index.js\");\n\nmodule.exports = str => {\n\tif (typeof str !== 'string' || str.length === 0) {\n\t\treturn 0;\n\t}\n\n\tstr = stripAnsi(str);\n\n\tlet width = 0;\n\n\tfor (let i = 0; i < str.length; i++) {\n\t\tconst code = str.codePointAt(i);\n\n\t\t// Ignore control characters\n\t\tif (code <= 0x1F || (code >= 0x7F && code <= 0x9F)) {\n\t\t\tcontinue;\n\t\t}\n\n\t\t// Ignore combining characters\n\t\tif (code >= 0x300 && code <= 0x36F) {\n\t\t\tcontinue;\n\t\t}\n\n\t\t// Surrogates\n\t\tif (code > 0xFFFF) {\n\t\t\ti++;\n\t\t}\n\n\t\twidth += isFullwidthCodePoint(code) ? 2 : 1;\n\t}\n\n\treturn width;\n};\n\n\n//# sourceURL=webpack:///../node_modules/wide-align/node_modules/string-width/index.js?");

/***/ }),

/***/ "../node_modules/wide-align/node_modules/strip-ansi/index.js":
/*!*******************************************************************!*\
  !*** ../node_modules/wide-align/node_modules/strip-ansi/index.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nconst ansiRegex = __webpack_require__(/*! ansi-regex */ \"../node_modules/wide-align/node_modules/ansi-regex/index.js\");\n\nmodule.exports = input => typeof input === 'string' ? input.replace(ansiRegex(), '') : input;\n\n\n//# sourceURL=webpack:///../node_modules/wide-align/node_modules/strip-ansi/index.js?");

/***/ })

}]);