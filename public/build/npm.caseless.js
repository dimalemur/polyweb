(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.caseless"],{

/***/ "../node_modules/caseless/index.js":
/*!*****************************************!*\
  !*** ../node_modules/caseless/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function Caseless (dict) {\n  this.dict = dict || {}\n}\nCaseless.prototype.set = function (name, value, clobber) {\n  if (typeof name === 'object') {\n    for (var i in name) {\n      this.set(i, name[i], value)\n    }\n  } else {\n    if (typeof clobber === 'undefined') clobber = true\n    var has = this.has(name)\n\n    if (!clobber && has) this.dict[has] = this.dict[has] + ',' + value\n    else this.dict[has || name] = value\n    return has\n  }\n}\nCaseless.prototype.has = function (name) {\n  var keys = Object.keys(this.dict)\n    , name = name.toLowerCase()\n    ;\n  for (var i=0;i<keys.length;i++) {\n    if (keys[i].toLowerCase() === name) return keys[i]\n  }\n  return false\n}\nCaseless.prototype.get = function (name) {\n  name = name.toLowerCase()\n  var result, _key\n  var headers = this.dict\n  Object.keys(headers).forEach(function (key) {\n    _key = key.toLowerCase()\n    if (name === _key) result = headers[key]\n  })\n  return result\n}\nCaseless.prototype.swap = function (name) {\n  var has = this.has(name)\n  if (has === name) return\n  if (!has) throw new Error('There is no header than matches \"'+name+'\"')\n  this.dict[name] = this.dict[has]\n  delete this.dict[has]\n}\nCaseless.prototype.del = function (name) {\n  var has = this.has(name)\n  return delete this.dict[has || name]\n}\n\nmodule.exports = function (dict) {return new Caseless(dict)}\nmodule.exports.httpify = function (resp, headers) {\n  var c = new Caseless(headers)\n  resp.setHeader = function (key, value, clobber) {\n    if (typeof value === 'undefined') return\n    return c.set(key, value, clobber)\n  }\n  resp.hasHeader = function (key) {\n    return c.has(key)\n  }\n  resp.getHeader = function (key) {\n    return c.get(key)\n  }\n  resp.removeHeader = function (key) {\n    return c.del(key)\n  }\n  resp.headers = c.dict\n  return c\n}\n\n\n//# sourceURL=webpack:///../node_modules/caseless/index.js?");

/***/ })

}]);