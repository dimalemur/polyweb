(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.value-equal"],{

/***/ "../node_modules/value-equal/esm/value-equal.js":
/*!******************************************************!*\
  !*** ../node_modules/value-equal/esm/value-equal.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction valueOf(obj) {\n  return obj.valueOf ? obj.valueOf() : Object.prototype.valueOf.call(obj);\n}\n\nfunction valueEqual(a, b) {\n  // Test for strict equality first.\n  if (a === b) return true;\n\n  // Otherwise, if either of them == null they are not equal.\n  if (a == null || b == null) return false;\n\n  if (Array.isArray(a)) {\n    return (\n      Array.isArray(b) &&\n      a.length === b.length &&\n      a.every(function(item, index) {\n        return valueEqual(item, b[index]);\n      })\n    );\n  }\n\n  if (typeof a === 'object' || typeof b === 'object') {\n    var aValue = valueOf(a);\n    var bValue = valueOf(b);\n\n    if (aValue !== a || bValue !== b) return valueEqual(aValue, bValue);\n\n    return Object.keys(Object.assign({}, a, b)).every(function(key) {\n      return valueEqual(a[key], b[key]);\n    });\n  }\n\n  return false;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (valueEqual);\n\n\n//# sourceURL=webpack:///../node_modules/value-equal/esm/value-equal.js?");

/***/ })

}]);