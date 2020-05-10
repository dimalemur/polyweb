(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.public-encrypt"],{

/***/ "../node_modules/public-encrypt/browser.js":
/*!*************************************************!*\
  !*** ../node_modules/public-encrypt/browser.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports.publicEncrypt = __webpack_require__(/*! ./publicEncrypt */ \"../node_modules/public-encrypt/publicEncrypt.js\")\nexports.privateDecrypt = __webpack_require__(/*! ./privateDecrypt */ \"../node_modules/public-encrypt/privateDecrypt.js\")\n\nexports.privateEncrypt = function privateEncrypt (key, buf) {\n  return exports.publicEncrypt(key, buf, true)\n}\n\nexports.publicDecrypt = function publicDecrypt (key, buf) {\n  return exports.privateDecrypt(key, buf, true)\n}\n\n\n//# sourceURL=webpack:///../node_modules/public-encrypt/browser.js?");

/***/ }),

/***/ "../node_modules/public-encrypt/mgf.js":
/*!*********************************************!*\
  !*** ../node_modules/public-encrypt/mgf.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var createHash = __webpack_require__(/*! create-hash */ \"../node_modules/create-hash/browser.js\")\nvar Buffer = __webpack_require__(/*! safe-buffer */ \"../node_modules/safe-buffer/index.js\").Buffer\n\nmodule.exports = function (seed, len) {\n  var t = Buffer.alloc(0)\n  var i = 0\n  var c\n  while (t.length < len) {\n    c = i2ops(i++)\n    t = Buffer.concat([t, createHash('sha1').update(seed).update(c).digest()])\n  }\n  return t.slice(0, len)\n}\n\nfunction i2ops (c) {\n  var out = Buffer.allocUnsafe(4)\n  out.writeUInt32BE(c, 0)\n  return out\n}\n\n\n//# sourceURL=webpack:///../node_modules/public-encrypt/mgf.js?");

/***/ }),

/***/ "../node_modules/public-encrypt/privateDecrypt.js":
/*!********************************************************!*\
  !*** ../node_modules/public-encrypt/privateDecrypt.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parseKeys = __webpack_require__(/*! parse-asn1 */ \"../node_modules/parse-asn1/index.js\")\nvar mgf = __webpack_require__(/*! ./mgf */ \"../node_modules/public-encrypt/mgf.js\")\nvar xor = __webpack_require__(/*! ./xor */ \"../node_modules/public-encrypt/xor.js\")\nvar BN = __webpack_require__(/*! bn.js */ \"../node_modules/bn.js/lib/bn.js\")\nvar crt = __webpack_require__(/*! browserify-rsa */ \"../node_modules/browserify-rsa/index.js\")\nvar createHash = __webpack_require__(/*! create-hash */ \"../node_modules/create-hash/browser.js\")\nvar withPublic = __webpack_require__(/*! ./withPublic */ \"../node_modules/public-encrypt/withPublic.js\")\nvar Buffer = __webpack_require__(/*! safe-buffer */ \"../node_modules/safe-buffer/index.js\").Buffer\n\nmodule.exports = function privateDecrypt (privateKey, enc, reverse) {\n  var padding\n  if (privateKey.padding) {\n    padding = privateKey.padding\n  } else if (reverse) {\n    padding = 1\n  } else {\n    padding = 4\n  }\n\n  var key = parseKeys(privateKey)\n  var k = key.modulus.byteLength()\n  if (enc.length > k || new BN(enc).cmp(key.modulus) >= 0) {\n    throw new Error('decryption error')\n  }\n  var msg\n  if (reverse) {\n    msg = withPublic(new BN(enc), key)\n  } else {\n    msg = crt(enc, key)\n  }\n  var zBuffer = Buffer.alloc(k - msg.length)\n  msg = Buffer.concat([zBuffer, msg], k)\n  if (padding === 4) {\n    return oaep(key, msg)\n  } else if (padding === 1) {\n    return pkcs1(key, msg, reverse)\n  } else if (padding === 3) {\n    return msg\n  } else {\n    throw new Error('unknown padding')\n  }\n}\n\nfunction oaep (key, msg) {\n  var k = key.modulus.byteLength()\n  var iHash = createHash('sha1').update(Buffer.alloc(0)).digest()\n  var hLen = iHash.length\n  if (msg[0] !== 0) {\n    throw new Error('decryption error')\n  }\n  var maskedSeed = msg.slice(1, hLen + 1)\n  var maskedDb = msg.slice(hLen + 1)\n  var seed = xor(maskedSeed, mgf(maskedDb, hLen))\n  var db = xor(maskedDb, mgf(seed, k - hLen - 1))\n  if (compare(iHash, db.slice(0, hLen))) {\n    throw new Error('decryption error')\n  }\n  var i = hLen\n  while (db[i] === 0) {\n    i++\n  }\n  if (db[i++] !== 1) {\n    throw new Error('decryption error')\n  }\n  return db.slice(i)\n}\n\nfunction pkcs1 (key, msg, reverse) {\n  var p1 = msg.slice(0, 2)\n  var i = 2\n  var status = 0\n  while (msg[i++] !== 0) {\n    if (i >= msg.length) {\n      status++\n      break\n    }\n  }\n  var ps = msg.slice(2, i - 1)\n\n  if ((p1.toString('hex') !== '0002' && !reverse) || (p1.toString('hex') !== '0001' && reverse)) {\n    status++\n  }\n  if (ps.length < 8) {\n    status++\n  }\n  if (status) {\n    throw new Error('decryption error')\n  }\n  return msg.slice(i)\n}\nfunction compare (a, b) {\n  a = Buffer.from(a)\n  b = Buffer.from(b)\n  var dif = 0\n  var len = a.length\n  if (a.length !== b.length) {\n    dif++\n    len = Math.min(a.length, b.length)\n  }\n  var i = -1\n  while (++i < len) {\n    dif += (a[i] ^ b[i])\n  }\n  return dif\n}\n\n\n//# sourceURL=webpack:///../node_modules/public-encrypt/privateDecrypt.js?");

/***/ }),

/***/ "../node_modules/public-encrypt/publicEncrypt.js":
/*!*******************************************************!*\
  !*** ../node_modules/public-encrypt/publicEncrypt.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parseKeys = __webpack_require__(/*! parse-asn1 */ \"../node_modules/parse-asn1/index.js\")\nvar randomBytes = __webpack_require__(/*! randombytes */ \"../node_modules/randombytes/browser.js\")\nvar createHash = __webpack_require__(/*! create-hash */ \"../node_modules/create-hash/browser.js\")\nvar mgf = __webpack_require__(/*! ./mgf */ \"../node_modules/public-encrypt/mgf.js\")\nvar xor = __webpack_require__(/*! ./xor */ \"../node_modules/public-encrypt/xor.js\")\nvar BN = __webpack_require__(/*! bn.js */ \"../node_modules/bn.js/lib/bn.js\")\nvar withPublic = __webpack_require__(/*! ./withPublic */ \"../node_modules/public-encrypt/withPublic.js\")\nvar crt = __webpack_require__(/*! browserify-rsa */ \"../node_modules/browserify-rsa/index.js\")\nvar Buffer = __webpack_require__(/*! safe-buffer */ \"../node_modules/safe-buffer/index.js\").Buffer\n\nmodule.exports = function publicEncrypt (publicKey, msg, reverse) {\n  var padding\n  if (publicKey.padding) {\n    padding = publicKey.padding\n  } else if (reverse) {\n    padding = 1\n  } else {\n    padding = 4\n  }\n  var key = parseKeys(publicKey)\n  var paddedMsg\n  if (padding === 4) {\n    paddedMsg = oaep(key, msg)\n  } else if (padding === 1) {\n    paddedMsg = pkcs1(key, msg, reverse)\n  } else if (padding === 3) {\n    paddedMsg = new BN(msg)\n    if (paddedMsg.cmp(key.modulus) >= 0) {\n      throw new Error('data too long for modulus')\n    }\n  } else {\n    throw new Error('unknown padding')\n  }\n  if (reverse) {\n    return crt(paddedMsg, key)\n  } else {\n    return withPublic(paddedMsg, key)\n  }\n}\n\nfunction oaep (key, msg) {\n  var k = key.modulus.byteLength()\n  var mLen = msg.length\n  var iHash = createHash('sha1').update(Buffer.alloc(0)).digest()\n  var hLen = iHash.length\n  var hLen2 = 2 * hLen\n  if (mLen > k - hLen2 - 2) {\n    throw new Error('message too long')\n  }\n  var ps = Buffer.alloc(k - mLen - hLen2 - 2)\n  var dblen = k - hLen - 1\n  var seed = randomBytes(hLen)\n  var maskedDb = xor(Buffer.concat([iHash, ps, Buffer.alloc(1, 1), msg], dblen), mgf(seed, dblen))\n  var maskedSeed = xor(seed, mgf(maskedDb, hLen))\n  return new BN(Buffer.concat([Buffer.alloc(1), maskedSeed, maskedDb], k))\n}\nfunction pkcs1 (key, msg, reverse) {\n  var mLen = msg.length\n  var k = key.modulus.byteLength()\n  if (mLen > k - 11) {\n    throw new Error('message too long')\n  }\n  var ps\n  if (reverse) {\n    ps = Buffer.alloc(k - mLen - 3, 0xff)\n  } else {\n    ps = nonZero(k - mLen - 3)\n  }\n  return new BN(Buffer.concat([Buffer.from([0, reverse ? 1 : 2]), ps, Buffer.alloc(1), msg], k))\n}\nfunction nonZero (len) {\n  var out = Buffer.allocUnsafe(len)\n  var i = 0\n  var cache = randomBytes(len * 2)\n  var cur = 0\n  var num\n  while (i < len) {\n    if (cur === cache.length) {\n      cache = randomBytes(len * 2)\n      cur = 0\n    }\n    num = cache[cur++]\n    if (num) {\n      out[i++] = num\n    }\n  }\n  return out\n}\n\n\n//# sourceURL=webpack:///../node_modules/public-encrypt/publicEncrypt.js?");

/***/ }),

/***/ "../node_modules/public-encrypt/withPublic.js":
/*!****************************************************!*\
  !*** ../node_modules/public-encrypt/withPublic.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var BN = __webpack_require__(/*! bn.js */ \"../node_modules/bn.js/lib/bn.js\")\nvar Buffer = __webpack_require__(/*! safe-buffer */ \"../node_modules/safe-buffer/index.js\").Buffer\n\nfunction withPublic (paddedMsg, key) {\n  return Buffer.from(paddedMsg\n    .toRed(BN.mont(key.modulus))\n    .redPow(new BN(key.publicExponent))\n    .fromRed()\n    .toArray())\n}\n\nmodule.exports = withPublic\n\n\n//# sourceURL=webpack:///../node_modules/public-encrypt/withPublic.js?");

/***/ }),

/***/ "../node_modules/public-encrypt/xor.js":
/*!*********************************************!*\
  !*** ../node_modules/public-encrypt/xor.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function xor (a, b) {\n  var len = a.length\n  var i = -1\n  while (++i < len) {\n    a[i] ^= b[i]\n  }\n  return a\n}\n\n\n//# sourceURL=webpack:///../node_modules/public-encrypt/xor.js?");

/***/ })

}]);