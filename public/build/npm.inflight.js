(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.inflight"],{

/***/ "../node_modules/inflight/inflight.js":
/*!********************************************!*\
  !*** ../node_modules/inflight/inflight.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(process) {var wrappy = __webpack_require__(/*! wrappy */ \"../node_modules/wrappy/wrappy.js\")\nvar reqs = Object.create(null)\nvar once = __webpack_require__(/*! once */ \"../node_modules/once/once.js\")\n\nmodule.exports = wrappy(inflight)\n\nfunction inflight (key, cb) {\n  if (reqs[key]) {\n    reqs[key].push(cb)\n    return null\n  } else {\n    reqs[key] = [cb]\n    return makeres(key)\n  }\n}\n\nfunction makeres (key) {\n  return once(function RES () {\n    var cbs = reqs[key]\n    var len = cbs.length\n    var args = slice(arguments)\n\n    // XXX It's somewhat ambiguous whether a new callback added in this\n    // pass should be queued for later execution if something in the\n    // list of callbacks throws, or if it should just be discarded.\n    // However, it's such an edge case that it hardly matters, and either\n    // choice is likely as surprising as the other.\n    // As it happens, we do go ahead and schedule it for later execution.\n    try {\n      for (var i = 0; i < len; i++) {\n        cbs[i].apply(null, args)\n      }\n    } finally {\n      if (cbs.length > len) {\n        // added more in the interim.\n        // de-zalgo, just in case, but don't call again.\n        cbs.splice(0, len)\n        process.nextTick(function () {\n          RES.apply(null, args)\n        })\n      } else {\n        delete reqs[key]\n      }\n    }\n  })\n}\n\nfunction slice (args) {\n  var length = args.length\n  var array = []\n\n  for (var i = 0; i < length; i++) array[i] = args[i]\n  return array\n}\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../process/browser.js */ \"../node_modules/process/browser.js\")))\n\n//# sourceURL=webpack:///../node_modules/inflight/inflight.js?");

/***/ })

}]);