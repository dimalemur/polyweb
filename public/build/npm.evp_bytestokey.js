(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.evp_bytestokey"],{

/***/ "../node_modules/evp_bytestokey/index.js":
/*!***********************************************!*\
  !*** ../node_modules/evp_bytestokey/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Buffer = __webpack_require__(/*! safe-buffer */ \"../node_modules/safe-buffer/index.js\").Buffer\nvar MD5 = __webpack_require__(/*! md5.js */ \"../node_modules/md5.js/index.js\")\n\n/* eslint-disable camelcase */\nfunction EVP_BytesToKey (password, salt, keyBits, ivLen) {\n  if (!Buffer.isBuffer(password)) password = Buffer.from(password, 'binary')\n  if (salt) {\n    if (!Buffer.isBuffer(salt)) salt = Buffer.from(salt, 'binary')\n    if (salt.length !== 8) throw new RangeError('salt should be Buffer with 8 byte length')\n  }\n\n  var keyLen = keyBits / 8\n  var key = Buffer.alloc(keyLen)\n  var iv = Buffer.alloc(ivLen || 0)\n  var tmp = Buffer.alloc(0)\n\n  while (keyLen > 0 || ivLen > 0) {\n    var hash = new MD5()\n    hash.update(tmp)\n    hash.update(password)\n    if (salt) hash.update(salt)\n    tmp = hash.digest()\n\n    var used = 0\n\n    if (keyLen > 0) {\n      var keyStart = key.length - keyLen\n      used = Math.min(keyLen, tmp.length)\n      tmp.copy(key, keyStart, 0, used)\n      keyLen -= used\n    }\n\n    if (used < tmp.length && ivLen > 0) {\n      var ivStart = iv.length - ivLen\n      var length = Math.min(ivLen, tmp.length - used)\n      tmp.copy(iv, ivStart, used, used + length)\n      ivLen -= length\n    }\n  }\n\n  tmp.fill(0)\n  return { key: key, iv: iv }\n}\n\nmodule.exports = EVP_BytesToKey\n\n\n//# sourceURL=webpack:///../node_modules/evp_bytestokey/index.js?");

/***/ })

}]);