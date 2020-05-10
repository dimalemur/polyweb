(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.isstream"],{

/***/ "../node_modules/isstream/isstream.js":
/*!********************************************!*\
  !*** ../node_modules/isstream/isstream.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var stream = __webpack_require__(/*! stream */ \"../node_modules/stream-browserify/index.js\")\n\n\nfunction isStream (obj) {\n  return obj instanceof stream.Stream\n}\n\n\nfunction isReadable (obj) {\n  return isStream(obj) && typeof obj._read == 'function' && typeof obj._readableState == 'object'\n}\n\n\nfunction isWritable (obj) {\n  return isStream(obj) && typeof obj._write == 'function' && typeof obj._writableState == 'object'\n}\n\n\nfunction isDuplex (obj) {\n  return isReadable(obj) && isWritable(obj)\n}\n\n\nmodule.exports            = isStream\nmodule.exports.isReadable = isReadable\nmodule.exports.isWritable = isWritable\nmodule.exports.isDuplex   = isDuplex\n\n\n//# sourceURL=webpack:///../node_modules/isstream/isstream.js?");

/***/ })

}]);