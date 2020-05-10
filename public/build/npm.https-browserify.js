(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.https-browserify"],{

/***/ "../node_modules/https-browserify/index.js":
/*!*************************************************!*\
  !*** ../node_modules/https-browserify/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var http = __webpack_require__(/*! http */ \"../node_modules/stream-http/index.js\")\nvar url = __webpack_require__(/*! url */ \"../node_modules/url/url.js\")\n\nvar https = module.exports\n\nfor (var key in http) {\n  if (http.hasOwnProperty(key)) https[key] = http[key]\n}\n\nhttps.request = function (params, cb) {\n  params = validateParams(params)\n  return http.request.call(this, params, cb)\n}\n\nhttps.get = function (params, cb) {\n  params = validateParams(params)\n  return http.get.call(this, params, cb)\n}\n\nfunction validateParams (params) {\n  if (typeof params === 'string') {\n    params = url.parse(params)\n  }\n  if (!params.protocol) {\n    params.protocol = 'https:'\n  }\n  if (params.protocol !== 'https:') {\n    throw new Error('Protocol \"' + params.protocol + '\" not supported. Expected \"https:\"')\n  }\n  return params\n}\n\n\n//# sourceURL=webpack:///../node_modules/https-browserify/index.js?");

/***/ })

}]);