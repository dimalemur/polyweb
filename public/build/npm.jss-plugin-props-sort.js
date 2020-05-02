(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.jss-plugin-props-sort"],{

/***/ "../node_modules/jss-plugin-props-sort/dist/jss-plugin-props-sort.esm.js":
/*!*******************************************************************************!*\
  !*** ../node_modules/jss-plugin-props-sort/dist/jss-plugin-props-sort.esm.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/**\n * Sort props by length.\n */\nfunction jssPropsSort() {\n  var sort = function sort(prop0, prop1) {\n    if (prop0.length === prop1.length) {\n      return prop0 > prop1 ? 1 : -1;\n    }\n\n    return prop0.length - prop1.length;\n  };\n\n  return {\n    onProcessStyle: function onProcessStyle(style, rule) {\n      if (rule.type !== 'style') return style;\n      var newStyle = {};\n      var props = Object.keys(style).sort(sort);\n\n      for (var i = 0; i < props.length; i++) {\n        newStyle[props[i]] = style[props[i]];\n      }\n\n      return newStyle;\n    }\n  };\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (jssPropsSort);\n\n\n//# sourceURL=webpack:///../node_modules/jss-plugin-props-sort/dist/jss-plugin-props-sort.esm.js?");

/***/ })

}]);