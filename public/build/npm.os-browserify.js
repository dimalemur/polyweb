(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.os-browserify"],{

/***/ "../node_modules/os-browserify/browser.js":
/*!************************************************!*\
  !*** ../node_modules/os-browserify/browser.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("exports.endianness = function () { return 'LE' };\n\nexports.hostname = function () {\n    if (typeof location !== 'undefined') {\n        return location.hostname\n    }\n    else return '';\n};\n\nexports.loadavg = function () { return [] };\n\nexports.uptime = function () { return 0 };\n\nexports.freemem = function () {\n    return Number.MAX_VALUE;\n};\n\nexports.totalmem = function () {\n    return Number.MAX_VALUE;\n};\n\nexports.cpus = function () { return [] };\n\nexports.type = function () { return 'Browser' };\n\nexports.release = function () {\n    if (typeof navigator !== 'undefined') {\n        return navigator.appVersion;\n    }\n    return '';\n};\n\nexports.networkInterfaces\n= exports.getNetworkInterfaces\n= function () { return {} };\n\nexports.arch = function () { return 'javascript' };\n\nexports.platform = function () { return 'browser' };\n\nexports.tmpdir = exports.tmpDir = function () {\n    return '/tmp';\n};\n\nexports.EOL = '\\n';\n\nexports.homedir = function () {\n\treturn '/'\n};\n\n\n//# sourceURL=webpack:///../node_modules/os-browserify/browser.js?");

/***/ })

}]);