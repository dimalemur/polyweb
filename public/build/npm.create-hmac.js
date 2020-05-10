(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.create-hmac"],{

/***/ "../node_modules/create-hmac/browser.js":
/*!**********************************************!*\
  !*** ../node_modules/create-hmac/browser.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar inherits = __webpack_require__(/*! inherits */ \"../node_modules/inherits/inherits_browser.js\")\nvar Legacy = __webpack_require__(/*! ./legacy */ \"../node_modules/create-hmac/legacy.js\")\nvar Base = __webpack_require__(/*! cipher-base */ \"../node_modules/cipher-base/index.js\")\nvar Buffer = __webpack_require__(/*! safe-buffer */ \"../node_modules/safe-buffer/index.js\").Buffer\nvar md5 = __webpack_require__(/*! create-hash/md5 */ \"../node_modules/create-hash/md5.js\")\nvar RIPEMD160 = __webpack_require__(/*! ripemd160 */ \"../node_modules/ripemd160/index.js\")\n\nvar sha = __webpack_require__(/*! sha.js */ \"../node_modules/sha.js/index.js\")\n\nvar ZEROS = Buffer.alloc(128)\n\nfunction Hmac (alg, key) {\n  Base.call(this, 'digest')\n  if (typeof key === 'string') {\n    key = Buffer.from(key)\n  }\n\n  var blocksize = (alg === 'sha512' || alg === 'sha384') ? 128 : 64\n\n  this._alg = alg\n  this._key = key\n  if (key.length > blocksize) {\n    var hash = alg === 'rmd160' ? new RIPEMD160() : sha(alg)\n    key = hash.update(key).digest()\n  } else if (key.length < blocksize) {\n    key = Buffer.concat([key, ZEROS], blocksize)\n  }\n\n  var ipad = this._ipad = Buffer.allocUnsafe(blocksize)\n  var opad = this._opad = Buffer.allocUnsafe(blocksize)\n\n  for (var i = 0; i < blocksize; i++) {\n    ipad[i] = key[i] ^ 0x36\n    opad[i] = key[i] ^ 0x5C\n  }\n  this._hash = alg === 'rmd160' ? new RIPEMD160() : sha(alg)\n  this._hash.update(ipad)\n}\n\ninherits(Hmac, Base)\n\nHmac.prototype._update = function (data) {\n  this._hash.update(data)\n}\n\nHmac.prototype._final = function () {\n  var h = this._hash.digest()\n  var hash = this._alg === 'rmd160' ? new RIPEMD160() : sha(this._alg)\n  return hash.update(this._opad).update(h).digest()\n}\n\nmodule.exports = function createHmac (alg, key) {\n  alg = alg.toLowerCase()\n  if (alg === 'rmd160' || alg === 'ripemd160') {\n    return new Hmac('rmd160', key)\n  }\n  if (alg === 'md5') {\n    return new Legacy(md5, key)\n  }\n  return new Hmac(alg, key)\n}\n\n\n//# sourceURL=webpack:///../node_modules/create-hmac/browser.js?");

/***/ }),

/***/ "../node_modules/create-hmac/legacy.js":
/*!*********************************************!*\
  !*** ../node_modules/create-hmac/legacy.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar inherits = __webpack_require__(/*! inherits */ \"../node_modules/inherits/inherits_browser.js\")\nvar Buffer = __webpack_require__(/*! safe-buffer */ \"../node_modules/safe-buffer/index.js\").Buffer\n\nvar Base = __webpack_require__(/*! cipher-base */ \"../node_modules/cipher-base/index.js\")\n\nvar ZEROS = Buffer.alloc(128)\nvar blocksize = 64\n\nfunction Hmac (alg, key) {\n  Base.call(this, 'digest')\n  if (typeof key === 'string') {\n    key = Buffer.from(key)\n  }\n\n  this._alg = alg\n  this._key = key\n\n  if (key.length > blocksize) {\n    key = alg(key)\n  } else if (key.length < blocksize) {\n    key = Buffer.concat([key, ZEROS], blocksize)\n  }\n\n  var ipad = this._ipad = Buffer.allocUnsafe(blocksize)\n  var opad = this._opad = Buffer.allocUnsafe(blocksize)\n\n  for (var i = 0; i < blocksize; i++) {\n    ipad[i] = key[i] ^ 0x36\n    opad[i] = key[i] ^ 0x5C\n  }\n\n  this._hash = [ipad]\n}\n\ninherits(Hmac, Base)\n\nHmac.prototype._update = function (data) {\n  this._hash.push(data)\n}\n\nHmac.prototype._final = function () {\n  var h = this._alg(Buffer.concat(this._hash))\n  return this._alg(Buffer.concat([this._opad, h]))\n}\nmodule.exports = Hmac\n\n\n//# sourceURL=webpack:///../node_modules/create-hmac/legacy.js?");

/***/ })

}]);