(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.is-fullwidth-code-point"],{

/***/ "../node_modules/is-fullwidth-code-point/index.js":
/*!********************************************************!*\
  !*** ../node_modules/is-fullwidth-code-point/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/* eslint-disable yoda */\nmodule.exports = x => {\n\tif (Number.isNaN(x)) {\n\t\treturn false;\n\t}\n\n\t// code points are derived from:\n\t// http://www.unix.org/Public/UNIDATA/EastAsianWidth.txt\n\tif (\n\t\tx >= 0x1100 && (\n\t\t\tx <= 0x115f ||  // Hangul Jamo\n\t\t\tx === 0x2329 || // LEFT-POINTING ANGLE BRACKET\n\t\t\tx === 0x232a || // RIGHT-POINTING ANGLE BRACKET\n\t\t\t// CJK Radicals Supplement .. Enclosed CJK Letters and Months\n\t\t\t(0x2e80 <= x && x <= 0x3247 && x !== 0x303f) ||\n\t\t\t// Enclosed CJK Letters and Months .. CJK Unified Ideographs Extension A\n\t\t\t(0x3250 <= x && x <= 0x4dbf) ||\n\t\t\t// CJK Unified Ideographs .. Yi Radicals\n\t\t\t(0x4e00 <= x && x <= 0xa4c6) ||\n\t\t\t// Hangul Jamo Extended-A\n\t\t\t(0xa960 <= x && x <= 0xa97c) ||\n\t\t\t// Hangul Syllables\n\t\t\t(0xac00 <= x && x <= 0xd7a3) ||\n\t\t\t// CJK Compatibility Ideographs\n\t\t\t(0xf900 <= x && x <= 0xfaff) ||\n\t\t\t// Vertical Forms\n\t\t\t(0xfe10 <= x && x <= 0xfe19) ||\n\t\t\t// CJK Compatibility Forms .. Small Form Variants\n\t\t\t(0xfe30 <= x && x <= 0xfe6b) ||\n\t\t\t// Halfwidth and Fullwidth Forms\n\t\t\t(0xff01 <= x && x <= 0xff60) ||\n\t\t\t(0xffe0 <= x && x <= 0xffe6) ||\n\t\t\t// Kana Supplement\n\t\t\t(0x1b000 <= x && x <= 0x1b001) ||\n\t\t\t// Enclosed Ideographic Supplement\n\t\t\t(0x1f200 <= x && x <= 0x1f251) ||\n\t\t\t// CJK Unified Ideographs Extension B .. Tertiary Ideographic Plane\n\t\t\t(0x20000 <= x && x <= 0x3fffd)\n\t\t)\n\t) {\n\t\treturn true;\n\t}\n\n\treturn false;\n};\n\n\n//# sourceURL=webpack:///../node_modules/is-fullwidth-code-point/index.js?");

/***/ })

}]);