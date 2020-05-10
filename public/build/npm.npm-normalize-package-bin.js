(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.npm-normalize-package-bin"],{

/***/ "../node_modules/npm-normalize-package-bin/index.js":
/*!**********************************************************!*\
  !*** ../node_modules/npm-normalize-package-bin/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// pass in a manifest with a 'bin' field here, and it'll turn it\n// into a properly santized bin object\nconst {join, basename} = __webpack_require__(/*! path */ \"../node_modules/path-browserify/index.js\")\n\nconst normalize = pkg =>\n  !pkg.bin ? removeBin(pkg)\n  : typeof pkg.bin === 'string' ? normalizeString(pkg)\n  : Array.isArray(pkg.bin) ? normalizeArray(pkg)\n  : typeof pkg.bin === 'object' ? normalizeObject(pkg)\n  : removeBin(pkg)\n\nconst normalizeString = pkg => {\n  if (!pkg.name)\n    return removeBin(pkg)\n  pkg.bin = { [pkg.name]: pkg.bin }\n  return normalizeObject(pkg)\n}\n\nconst normalizeArray = pkg => {\n  pkg.bin = pkg.bin.reduce((acc, k) => {\n    acc[basename(k)] = k\n    return acc\n  }, {})\n  return normalizeObject(pkg)\n}\n\nconst removeBin = pkg => {\n  delete pkg.bin\n  return pkg\n}\n\nconst normalizeObject = pkg => {\n  const orig = pkg.bin\n  const clean = {}\n  let hasBins = false\n  Object.keys(orig).forEach(binKey => {\n    const base = join('/', basename(binKey.replace(/\\\\|:/g, '/'))).substr(1)\n\n    if (typeof orig[binKey] !== 'string' || !base)\n      return\n\n    const binTarget = join('/', orig[binKey])\n      .replace(/\\\\/g, '/').substr(1)\n\n    if (!binTarget)\n      return\n\n    clean[base] = binTarget\n    hasBins = true\n  })\n\n  if (hasBins)\n    pkg.bin = clean\n  else\n    delete pkg.bin\n\n  return pkg\n}\n\nmodule.exports = normalize\n\n\n//# sourceURL=webpack:///../node_modules/npm-normalize-package-bin/index.js?");

/***/ })

}]);