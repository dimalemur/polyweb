(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.create-hash"],{

/***/ "../node_modules/create-hash/browser.js":
/*!**********************************************!*\
  !*** ../node_modules/create-hash/browser.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar inherits = __webpack_require__(/*! inherits */ \"../node_modules/inherits/inherits_browser.js\")\nvar MD5 = __webpack_require__(/*! md5.js */ \"../node_modules/md5.js/index.js\")\nvar RIPEMD160 = __webpack_require__(/*! ripemd160 */ \"../node_modules/ripemd160/index.js\")\nvar sha = __webpack_require__(/*! sha.js */ \"../node_modules/sha.js/index.js\")\nvar Base = __webpack_require__(/*! cipher-base */ \"../node_modules/cipher-base/index.js\")\n\nfunction Hash (hash) {\n  Base.call(this, 'digest')\n\n  this._hash = hash\n}\n\ninherits(Hash, Base)\n\nHash.prototype._update = function (data) {\n  this._hash.update(data)\n}\n\nHash.prototype._final = function () {\n  return this._hash.digest()\n}\n\nmodule.exports = function createHash (alg) {\n  alg = alg.toLowerCase()\n  if (alg === 'md5') return new MD5()\n  if (alg === 'rmd160' || alg === 'ripemd160') return new RIPEMD160()\n\n  return new Hash(sha(alg))\n}\n\n\n//# sourceURL=webpack:///../node_modules/create-hash/browser.js?");

/***/ }),

/***/ "../node_modules/create-hash/md5.js":
/*!******************************************!*\
  !*** ../node_modules/create-hash/md5.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var MD5 = __webpack_require__(/*! md5.js */ \"../node_modules/md5.js/index.js\")\n\nmodule.exports = function (buffer) {\n  return new MD5().update(buffer).digest()\n}\n\n\n//# sourceURL=webpack:///../node_modules/create-hash/md5.js?");

/***/ })

}]);