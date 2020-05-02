(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.dom-helpers"],{

/***/ "../node_modules/dom-helpers/esm/addClass.js":
/*!***************************************************!*\
  !*** ../node_modules/dom-helpers/esm/addClass.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return addClass; });\n/* harmony import */ var _hasClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hasClass */ \"../node_modules/dom-helpers/esm/hasClass.js\");\n\nfunction addClass(element, className) {\n  if (element.classList) element.classList.add(className);else if (!Object(_hasClass__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(element, className)) if (typeof element.className === 'string') element.className = element.className + \" \" + className;else element.setAttribute('class', (element.className && element.className.baseVal || '') + \" \" + className);\n}\n\n//# sourceURL=webpack:///../node_modules/dom-helpers/esm/addClass.js?");

/***/ }),

/***/ "../node_modules/dom-helpers/esm/hasClass.js":
/*!***************************************************!*\
  !*** ../node_modules/dom-helpers/esm/hasClass.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return hasClass; });\nfunction hasClass(element, className) {\n  if (element.classList) return !!className && element.classList.contains(className);\n  return (\" \" + (element.className.baseVal || element.className) + \" \").indexOf(\" \" + className + \" \") !== -1;\n}\n\n//# sourceURL=webpack:///../node_modules/dom-helpers/esm/hasClass.js?");

/***/ }),

/***/ "../node_modules/dom-helpers/esm/removeClass.js":
/*!******************************************************!*\
  !*** ../node_modules/dom-helpers/esm/removeClass.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return removeClass; });\nfunction replaceClassName(origClass, classToRemove) {\n  return origClass.replace(new RegExp(\"(^|\\\\s)\" + classToRemove + \"(?:\\\\s|$)\", 'g'), '$1').replace(/\\s+/g, ' ').replace(/^\\s*|\\s*$/g, '');\n}\n\nfunction removeClass(element, className) {\n  if (element.classList) {\n    element.classList.remove(className);\n  } else if (typeof element.className === 'string') {\n    ;\n    element.className = replaceClassName(element.className, className);\n  } else {\n    element.setAttribute('class', replaceClassName(element.className && element.className.baseVal || '', className));\n  }\n}\n\n//# sourceURL=webpack:///../node_modules/dom-helpers/esm/removeClass.js?");

/***/ })

}]);