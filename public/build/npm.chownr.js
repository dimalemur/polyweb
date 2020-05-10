(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.chownr"],{

/***/ "../node_modules/chownr/chownr.js":
/*!****************************************!*\
  !*** ../node_modules/chownr/chownr.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(process) {\nconst fs = __webpack_require__(!(function webpackMissingModule() { var e = new Error(\"Cannot find module 'fs'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))\nconst path = __webpack_require__(/*! path */ \"../node_modules/path-browserify/index.js\")\n\n/* istanbul ignore next */\nconst LCHOWN = fs.lchown ? 'lchown' : 'chown'\n/* istanbul ignore next */\nconst LCHOWNSYNC = fs.lchownSync ? 'lchownSync' : 'chownSync'\n\nconst needEISDIRHandled = fs.lchown &&\n  !process.version.match(/v1[1-9]+\\./) &&\n  !process.version.match(/v10\\.[6-9]/)\n\n/* istanbul ignore next */\nconst handleEISDIR =\n  needEISDIRHandled ? (path, uid, gid, cb) => er => {\n    // Node prior to v10 had a very questionable implementation of\n    // fs.lchown, which would always try to call fs.open on a directory\n    // Fall back to fs.chown in those cases.\n    if (!er || er.code !== 'EISDIR')\n      cb(er)\n    else\n      fs.chown(path, uid, gid, cb)\n  }\n  : (_, __, ___, cb) => cb\n\n/* istanbul ignore next */\nconst handleEISDirSync =\n  needEISDIRHandled ? (path, uid, gid) => {\n    try {\n      return fs[LCHOWNSYNC](path, uid, gid)\n    } catch (er) {\n      if (er.code !== 'EISDIR')\n        throw er\n      fs.chownSync(path, uid, gid)\n    }\n  }\n  : (path, uid, gid) => fs[LCHOWNSYNC](path, uid, gid)\n\n// fs.readdir could only accept an options object as of node v6\nconst nodeVersion = process.version\nlet readdir = (path, options, cb) => fs.readdir(path, options, cb)\nlet readdirSync = (path, options) => fs.readdirSync(path, options)\n/* istanbul ignore next */\nif (/^v4\\./.test(nodeVersion))\n  readdir = (path, options, cb) => fs.readdir(path, cb)\n\nconst chownrKid = (p, child, uid, gid, cb) => {\n  if (typeof child === 'string')\n    return fs.lstat(path.resolve(p, child), (er, stats) => {\n      if (er)\n        return cb(er)\n      stats.name = child\n      chownrKid(p, stats, uid, gid, cb)\n    })\n\n  if (child.isDirectory()) {\n    chownr(path.resolve(p, child.name), uid, gid, er => {\n      if (er)\n        return cb(er)\n      const cpath = path.resolve(p, child.name)\n      fs[LCHOWN](cpath, uid, gid, handleEISDIR(cpath, uid, gid, cb))\n    })\n  } else {\n    const cpath = path.resolve(p, child.name)\n    fs[LCHOWN](cpath, uid, gid, handleEISDIR(cpath, uid, gid, cb))\n  }\n}\n\n\nconst chownr = (p, uid, gid, cb) => {\n  readdir(p, { withFileTypes: true }, (er, children) => {\n    // any error other than ENOTDIR or ENOTSUP means it's not readable,\n    // or doesn't exist.  give up.\n    if (er && er.code !== 'ENOTDIR' && er.code !== 'ENOTSUP')\n      return cb(er)\n    if (er || !children.length)\n      return fs[LCHOWN](p, uid, gid, handleEISDIR(p, uid, gid, cb))\n\n    let len = children.length\n    let errState = null\n    const then = er => {\n      if (errState)\n        return\n      if (er)\n        return cb(errState = er)\n      if (-- len === 0)\n        return fs[LCHOWN](p, uid, gid, handleEISDIR(p, uid, gid, cb))\n    }\n\n    children.forEach(child => chownrKid(p, child, uid, gid, then))\n  })\n}\n\nconst chownrKidSync = (p, child, uid, gid) => {\n  if (typeof child === 'string') {\n    const stats = fs.lstatSync(path.resolve(p, child))\n    stats.name = child\n    child = stats\n  }\n\n  if (child.isDirectory())\n    chownrSync(path.resolve(p, child.name), uid, gid)\n\n  handleEISDirSync(path.resolve(p, child.name), uid, gid)\n}\n\nconst chownrSync = (p, uid, gid) => {\n  let children\n  try {\n    children = readdirSync(p, { withFileTypes: true })\n  } catch (er) {\n    if (er && er.code === 'ENOTDIR' && er.code !== 'ENOTSUP')\n      return handleEISDirSync(p, uid, gid)\n    throw er\n  }\n\n  if (children.length)\n    children.forEach(child => chownrKidSync(p, child, uid, gid))\n\n  return handleEISDirSync(p, uid, gid)\n}\n\nmodule.exports = chownr\nchownr.sync = chownrSync\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../process/browser.js */ \"../node_modules/process/browser.js\")))\n\n//# sourceURL=webpack:///../node_modules/chownr/chownr.js?");

/***/ })

}]);