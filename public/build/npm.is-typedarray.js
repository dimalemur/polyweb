(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.is-typedarray"],{

/***/ "../node_modules/is-typedarray/index.js":
/*!**********************************************!*\
  !*** ../node_modules/is-typedarray/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports      = isTypedArray\nisTypedArray.strict = isStrictTypedArray\nisTypedArray.loose  = isLooseTypedArray\n\nvar toString = Object.prototype.toString\nvar names = {\n    '[object Int8Array]': true\n  , '[object Int16Array]': true\n  , '[object Int32Array]': true\n  , '[object Uint8Array]': true\n  , '[object Uint8ClampedArray]': true\n  , '[object Uint16Array]': true\n  , '[object Uint32Array]': true\n  , '[object Float32Array]': true\n  , '[object Float64Array]': true\n}\n\nfunction isTypedArray(arr) {\n  return (\n       isStrictTypedArray(arr)\n    || isLooseTypedArray(arr)\n  )\n}\n\nfunction isStrictTypedArray(arr) {\n  return (\n       arr instanceof Int8Array\n    || arr instanceof Int16Array\n    || arr instanceof Int32Array\n    || arr instanceof Uint8Array\n    || arr instanceof Uint8ClampedArray\n    || arr instanceof Uint16Array\n    || arr instanceof Uint32Array\n    || arr instanceof Float32Array\n    || arr instanceof Float64Array\n  )\n}\n\nfunction isLooseTypedArray(arr) {\n  return names[toString.call(arr)]\n}\n\n\n//# sourceURL=webpack:///../node_modules/is-typedarray/index.js?");

/***/ })

}]);