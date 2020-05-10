(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.pbkdf2"],{

/***/ "../node_modules/pbkdf2/browser.js":
/*!*****************************************!*\
  !*** ../node_modules/pbkdf2/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports.pbkdf2 = __webpack_require__(/*! ./lib/async */ \"../node_modules/pbkdf2/lib/async.js\")\nexports.pbkdf2Sync = __webpack_require__(/*! ./lib/sync */ \"../node_modules/pbkdf2/lib/sync-browser.js\")\n\n\n//# sourceURL=webpack:///../node_modules/pbkdf2/browser.js?");

/***/ }),

/***/ "../node_modules/pbkdf2/lib/async.js":
/*!*******************************************!*\
  !*** ../node_modules/pbkdf2/lib/async.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(global, process) {var checkParameters = __webpack_require__(/*! ./precondition */ \"../node_modules/pbkdf2/lib/precondition.js\")\nvar defaultEncoding = __webpack_require__(/*! ./default-encoding */ \"../node_modules/pbkdf2/lib/default-encoding.js\")\nvar sync = __webpack_require__(/*! ./sync */ \"../node_modules/pbkdf2/lib/sync-browser.js\")\nvar Buffer = __webpack_require__(/*! safe-buffer */ \"../node_modules/safe-buffer/index.js\").Buffer\n\nvar ZERO_BUF\nvar subtle = global.crypto && global.crypto.subtle\nvar toBrowser = {\n  'sha': 'SHA-1',\n  'sha-1': 'SHA-1',\n  'sha1': 'SHA-1',\n  'sha256': 'SHA-256',\n  'sha-256': 'SHA-256',\n  'sha384': 'SHA-384',\n  'sha-384': 'SHA-384',\n  'sha-512': 'SHA-512',\n  'sha512': 'SHA-512'\n}\nvar checks = []\nfunction checkNative (algo) {\n  if (global.process && !global.process.browser) {\n    return Promise.resolve(false)\n  }\n  if (!subtle || !subtle.importKey || !subtle.deriveBits) {\n    return Promise.resolve(false)\n  }\n  if (checks[algo] !== undefined) {\n    return checks[algo]\n  }\n  ZERO_BUF = ZERO_BUF || Buffer.alloc(8)\n  var prom = browserPbkdf2(ZERO_BUF, ZERO_BUF, 10, 128, algo)\n    .then(function () {\n      return true\n    }).catch(function () {\n      return false\n    })\n  checks[algo] = prom\n  return prom\n}\n\nfunction browserPbkdf2 (password, salt, iterations, length, algo) {\n  return subtle.importKey(\n    'raw', password, {name: 'PBKDF2'}, false, ['deriveBits']\n  ).then(function (key) {\n    return subtle.deriveBits({\n      name: 'PBKDF2',\n      salt: salt,\n      iterations: iterations,\n      hash: {\n        name: algo\n      }\n    }, key, length << 3)\n  }).then(function (res) {\n    return Buffer.from(res)\n  })\n}\n\nfunction resolvePromise (promise, callback) {\n  promise.then(function (out) {\n    process.nextTick(function () {\n      callback(null, out)\n    })\n  }, function (e) {\n    process.nextTick(function () {\n      callback(e)\n    })\n  })\n}\nmodule.exports = function (password, salt, iterations, keylen, digest, callback) {\n  if (typeof digest === 'function') {\n    callback = digest\n    digest = undefined\n  }\n\n  digest = digest || 'sha1'\n  var algo = toBrowser[digest.toLowerCase()]\n\n  if (!algo || typeof global.Promise !== 'function') {\n    return process.nextTick(function () {\n      var out\n      try {\n        out = sync(password, salt, iterations, keylen, digest)\n      } catch (e) {\n        return callback(e)\n      }\n      callback(null, out)\n    })\n  }\n\n  checkParameters(password, salt, iterations, keylen)\n  if (typeof callback !== 'function') throw new Error('No callback provided to pbkdf2')\n  if (!Buffer.isBuffer(password)) password = Buffer.from(password, defaultEncoding)\n  if (!Buffer.isBuffer(salt)) salt = Buffer.from(salt, defaultEncoding)\n\n  resolvePromise(checkNative(algo).then(function (resp) {\n    if (resp) return browserPbkdf2(password, salt, iterations, keylen, algo)\n\n    return sync(password, salt, iterations, keylen, digest)\n  }), callback)\n}\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ \"../node_modules/webpack/buildin/global.js\"), __webpack_require__(/*! ./../../process/browser.js */ \"../node_modules/process/browser.js\")))\n\n//# sourceURL=webpack:///../node_modules/pbkdf2/lib/async.js?");

/***/ }),

/***/ "../node_modules/pbkdf2/lib/default-encoding.js":
/*!******************************************************!*\
  !*** ../node_modules/pbkdf2/lib/default-encoding.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(process) {var defaultEncoding\n/* istanbul ignore next */\nif (process.browser) {\n  defaultEncoding = 'utf-8'\n} else {\n  var pVersionMajor = parseInt(process.version.split('.')[0].slice(1), 10)\n\n  defaultEncoding = pVersionMajor >= 6 ? 'utf-8' : 'binary'\n}\nmodule.exports = defaultEncoding\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ \"../node_modules/process/browser.js\")))\n\n//# sourceURL=webpack:///../node_modules/pbkdf2/lib/default-encoding.js?");

/***/ }),

/***/ "../node_modules/pbkdf2/lib/precondition.js":
/*!**************************************************!*\
  !*** ../node_modules/pbkdf2/lib/precondition.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(Buffer) {var MAX_ALLOC = Math.pow(2, 30) - 1 // default in iojs\n\nfunction checkBuffer (buf, name) {\n  if (typeof buf !== 'string' && !Buffer.isBuffer(buf)) {\n    throw new TypeError(name + ' must be a buffer or string')\n  }\n}\n\nmodule.exports = function (password, salt, iterations, keylen) {\n  checkBuffer(password, 'Password')\n  checkBuffer(salt, 'Salt')\n\n  if (typeof iterations !== 'number') {\n    throw new TypeError('Iterations not a number')\n  }\n\n  if (iterations < 0) {\n    throw new TypeError('Bad iterations')\n  }\n\n  if (typeof keylen !== 'number') {\n    throw new TypeError('Key length not a number')\n  }\n\n  if (keylen < 0 || keylen > MAX_ALLOC || keylen !== keylen) { /* eslint no-self-compare: 0 */\n    throw new TypeError('Bad key length')\n  }\n}\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../buffer/index.js */ \"../node_modules/buffer/index.js\").Buffer))\n\n//# sourceURL=webpack:///../node_modules/pbkdf2/lib/precondition.js?");

/***/ }),

/***/ "../node_modules/pbkdf2/lib/sync-browser.js":
/*!**************************************************!*\
  !*** ../node_modules/pbkdf2/lib/sync-browser.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var md5 = __webpack_require__(/*! create-hash/md5 */ \"../node_modules/create-hash/md5.js\")\nvar RIPEMD160 = __webpack_require__(/*! ripemd160 */ \"../node_modules/ripemd160/index.js\")\nvar sha = __webpack_require__(/*! sha.js */ \"../node_modules/sha.js/index.js\")\n\nvar checkParameters = __webpack_require__(/*! ./precondition */ \"../node_modules/pbkdf2/lib/precondition.js\")\nvar defaultEncoding = __webpack_require__(/*! ./default-encoding */ \"../node_modules/pbkdf2/lib/default-encoding.js\")\nvar Buffer = __webpack_require__(/*! safe-buffer */ \"../node_modules/safe-buffer/index.js\").Buffer\nvar ZEROS = Buffer.alloc(128)\nvar sizes = {\n  md5: 16,\n  sha1: 20,\n  sha224: 28,\n  sha256: 32,\n  sha384: 48,\n  sha512: 64,\n  rmd160: 20,\n  ripemd160: 20\n}\n\nfunction Hmac (alg, key, saltLen) {\n  var hash = getDigest(alg)\n  var blocksize = (alg === 'sha512' || alg === 'sha384') ? 128 : 64\n\n  if (key.length > blocksize) {\n    key = hash(key)\n  } else if (key.length < blocksize) {\n    key = Buffer.concat([key, ZEROS], blocksize)\n  }\n\n  var ipad = Buffer.allocUnsafe(blocksize + sizes[alg])\n  var opad = Buffer.allocUnsafe(blocksize + sizes[alg])\n  for (var i = 0; i < blocksize; i++) {\n    ipad[i] = key[i] ^ 0x36\n    opad[i] = key[i] ^ 0x5C\n  }\n\n  var ipad1 = Buffer.allocUnsafe(blocksize + saltLen + 4)\n  ipad.copy(ipad1, 0, 0, blocksize)\n  this.ipad1 = ipad1\n  this.ipad2 = ipad\n  this.opad = opad\n  this.alg = alg\n  this.blocksize = blocksize\n  this.hash = hash\n  this.size = sizes[alg]\n}\n\nHmac.prototype.run = function (data, ipad) {\n  data.copy(ipad, this.blocksize)\n  var h = this.hash(ipad)\n  h.copy(this.opad, this.blocksize)\n  return this.hash(this.opad)\n}\n\nfunction getDigest (alg) {\n  function shaFunc (data) {\n    return sha(alg).update(data).digest()\n  }\n  function rmd160Func (data) {\n    return new RIPEMD160().update(data).digest()\n  }\n\n  if (alg === 'rmd160' || alg === 'ripemd160') return rmd160Func\n  if (alg === 'md5') return md5\n  return shaFunc\n}\n\nfunction pbkdf2 (password, salt, iterations, keylen, digest) {\n  checkParameters(password, salt, iterations, keylen)\n\n  if (!Buffer.isBuffer(password)) password = Buffer.from(password, defaultEncoding)\n  if (!Buffer.isBuffer(salt)) salt = Buffer.from(salt, defaultEncoding)\n\n  digest = digest || 'sha1'\n\n  var hmac = new Hmac(digest, password, salt.length)\n\n  var DK = Buffer.allocUnsafe(keylen)\n  var block1 = Buffer.allocUnsafe(salt.length + 4)\n  salt.copy(block1, 0, 0, salt.length)\n\n  var destPos = 0\n  var hLen = sizes[digest]\n  var l = Math.ceil(keylen / hLen)\n\n  for (var i = 1; i <= l; i++) {\n    block1.writeUInt32BE(i, salt.length)\n\n    var T = hmac.run(block1, hmac.ipad1)\n    var U = T\n\n    for (var j = 1; j < iterations; j++) {\n      U = hmac.run(U, hmac.ipad2)\n      for (var k = 0; k < hLen; k++) T[k] ^= U[k]\n    }\n\n    T.copy(DK, destPos)\n    destPos += hLen\n  }\n\n  return DK\n}\n\nmodule.exports = pbkdf2\n\n\n//# sourceURL=webpack:///../node_modules/pbkdf2/lib/sync-browser.js?");

/***/ })

}]);