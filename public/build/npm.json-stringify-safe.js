(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.json-stringify-safe"],{

/***/ "../node_modules/json-stringify-safe/stringify.js":
/*!********************************************************!*\
  !*** ../node_modules/json-stringify-safe/stringify.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("exports = module.exports = stringify\nexports.getSerialize = serializer\n\nfunction stringify(obj, replacer, spaces, cycleReplacer) {\n  return JSON.stringify(obj, serializer(replacer, cycleReplacer), spaces)\n}\n\nfunction serializer(replacer, cycleReplacer) {\n  var stack = [], keys = []\n\n  if (cycleReplacer == null) cycleReplacer = function(key, value) {\n    if (stack[0] === value) return \"[Circular ~]\"\n    return \"[Circular ~.\" + keys.slice(0, stack.indexOf(value)).join(\".\") + \"]\"\n  }\n\n  return function(key, value) {\n    if (stack.length > 0) {\n      var thisPos = stack.indexOf(this)\n      ~thisPos ? stack.splice(thisPos + 1) : stack.push(this)\n      ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key)\n      if (~stack.indexOf(value)) value = cycleReplacer.call(this, key, value)\n    }\n    else stack.push(value)\n\n    return replacer == null ? value : replacer.call(this, key, value)\n  }\n}\n\n\n//# sourceURL=webpack:///../node_modules/json-stringify-safe/stringify.js?");

/***/ })

}]);