(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.balanced-match"],{

/***/ "../node_modules/balanced-match/index.js":
/*!***********************************************!*\
  !*** ../node_modules/balanced-match/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nmodule.exports = balanced;\nfunction balanced(a, b, str) {\n  if (a instanceof RegExp) a = maybeMatch(a, str);\n  if (b instanceof RegExp) b = maybeMatch(b, str);\n\n  var r = range(a, b, str);\n\n  return r && {\n    start: r[0],\n    end: r[1],\n    pre: str.slice(0, r[0]),\n    body: str.slice(r[0] + a.length, r[1]),\n    post: str.slice(r[1] + b.length)\n  };\n}\n\nfunction maybeMatch(reg, str) {\n  var m = str.match(reg);\n  return m ? m[0] : null;\n}\n\nbalanced.range = range;\nfunction range(a, b, str) {\n  var begs, beg, left, right, result;\n  var ai = str.indexOf(a);\n  var bi = str.indexOf(b, ai + 1);\n  var i = ai;\n\n  if (ai >= 0 && bi > 0) {\n    begs = [];\n    left = str.length;\n\n    while (i >= 0 && !result) {\n      if (i == ai) {\n        begs.push(i);\n        ai = str.indexOf(a, i + 1);\n      } else if (begs.length == 1) {\n        result = [ begs.pop(), bi ];\n      } else {\n        beg = begs.pop();\n        if (beg < left) {\n          left = beg;\n          right = bi;\n        }\n\n        bi = str.indexOf(b, i + 1);\n      }\n\n      i = ai < bi && ai >= 0 ? ai : bi;\n    }\n\n    if (begs.length) {\n      result = [ left, right ];\n    }\n  }\n\n  return result;\n}\n\n\n//# sourceURL=webpack:///../node_modules/balanced-match/index.js?");

/***/ })

}]);