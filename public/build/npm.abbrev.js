(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.abbrev"],{

/***/ "../node_modules/abbrev/abbrev.js":
/*!****************************************!*\
  !*** ../node_modules/abbrev/abbrev.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = exports = abbrev.abbrev = abbrev\n\nabbrev.monkeyPatch = monkeyPatch\n\nfunction monkeyPatch () {\n  Object.defineProperty(Array.prototype, 'abbrev', {\n    value: function () { return abbrev(this) },\n    enumerable: false, configurable: true, writable: true\n  })\n\n  Object.defineProperty(Object.prototype, 'abbrev', {\n    value: function () { return abbrev(Object.keys(this)) },\n    enumerable: false, configurable: true, writable: true\n  })\n}\n\nfunction abbrev (list) {\n  if (arguments.length !== 1 || !Array.isArray(list)) {\n    list = Array.prototype.slice.call(arguments, 0)\n  }\n  for (var i = 0, l = list.length, args = [] ; i < l ; i ++) {\n    args[i] = typeof list[i] === \"string\" ? list[i] : String(list[i])\n  }\n\n  // sort them lexicographically, so that they're next to their nearest kin\n  args = args.sort(lexSort)\n\n  // walk through each, seeing how much it has in common with the next and previous\n  var abbrevs = {}\n    , prev = \"\"\n  for (var i = 0, l = args.length ; i < l ; i ++) {\n    var current = args[i]\n      , next = args[i + 1] || \"\"\n      , nextMatches = true\n      , prevMatches = true\n    if (current === next) continue\n    for (var j = 0, cl = current.length ; j < cl ; j ++) {\n      var curChar = current.charAt(j)\n      nextMatches = nextMatches && curChar === next.charAt(j)\n      prevMatches = prevMatches && curChar === prev.charAt(j)\n      if (!nextMatches && !prevMatches) {\n        j ++\n        break\n      }\n    }\n    prev = current\n    if (j === cl) {\n      abbrevs[current] = current\n      continue\n    }\n    for (var a = current.substr(0, j) ; j <= cl ; j ++) {\n      abbrevs[a] = current\n      a += current.charAt(j)\n    }\n  }\n  return abbrevs\n}\n\nfunction lexSort (a, b) {\n  return a === b ? 0 : a > b ? 1 : -1\n}\n\n\n//# sourceURL=webpack:///../node_modules/abbrev/abbrev.js?");

/***/ })

}]);