(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.hmac-drbg"],{

/***/ "../node_modules/hmac-drbg/lib/hmac-drbg.js":
/*!**************************************************!*\
  !*** ../node_modules/hmac-drbg/lib/hmac-drbg.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar hash = __webpack_require__(/*! hash.js */ \"../node_modules/hash.js/lib/hash.js\");\nvar utils = __webpack_require__(/*! minimalistic-crypto-utils */ \"../node_modules/minimalistic-crypto-utils/lib/utils.js\");\nvar assert = __webpack_require__(/*! minimalistic-assert */ \"../node_modules/minimalistic-assert/index.js\");\n\nfunction HmacDRBG(options) {\n  if (!(this instanceof HmacDRBG))\n    return new HmacDRBG(options);\n  this.hash = options.hash;\n  this.predResist = !!options.predResist;\n\n  this.outLen = this.hash.outSize;\n  this.minEntropy = options.minEntropy || this.hash.hmacStrength;\n\n  this._reseed = null;\n  this.reseedInterval = null;\n  this.K = null;\n  this.V = null;\n\n  var entropy = utils.toArray(options.entropy, options.entropyEnc || 'hex');\n  var nonce = utils.toArray(options.nonce, options.nonceEnc || 'hex');\n  var pers = utils.toArray(options.pers, options.persEnc || 'hex');\n  assert(entropy.length >= (this.minEntropy / 8),\n         'Not enough entropy. Minimum is: ' + this.minEntropy + ' bits');\n  this._init(entropy, nonce, pers);\n}\nmodule.exports = HmacDRBG;\n\nHmacDRBG.prototype._init = function init(entropy, nonce, pers) {\n  var seed = entropy.concat(nonce).concat(pers);\n\n  this.K = new Array(this.outLen / 8);\n  this.V = new Array(this.outLen / 8);\n  for (var i = 0; i < this.V.length; i++) {\n    this.K[i] = 0x00;\n    this.V[i] = 0x01;\n  }\n\n  this._update(seed);\n  this._reseed = 1;\n  this.reseedInterval = 0x1000000000000;  // 2^48\n};\n\nHmacDRBG.prototype._hmac = function hmac() {\n  return new hash.hmac(this.hash, this.K);\n};\n\nHmacDRBG.prototype._update = function update(seed) {\n  var kmac = this._hmac()\n                 .update(this.V)\n                 .update([ 0x00 ]);\n  if (seed)\n    kmac = kmac.update(seed);\n  this.K = kmac.digest();\n  this.V = this._hmac().update(this.V).digest();\n  if (!seed)\n    return;\n\n  this.K = this._hmac()\n               .update(this.V)\n               .update([ 0x01 ])\n               .update(seed)\n               .digest();\n  this.V = this._hmac().update(this.V).digest();\n};\n\nHmacDRBG.prototype.reseed = function reseed(entropy, entropyEnc, add, addEnc) {\n  // Optional entropy enc\n  if (typeof entropyEnc !== 'string') {\n    addEnc = add;\n    add = entropyEnc;\n    entropyEnc = null;\n  }\n\n  entropy = utils.toArray(entropy, entropyEnc);\n  add = utils.toArray(add, addEnc);\n\n  assert(entropy.length >= (this.minEntropy / 8),\n         'Not enough entropy. Minimum is: ' + this.minEntropy + ' bits');\n\n  this._update(entropy.concat(add || []));\n  this._reseed = 1;\n};\n\nHmacDRBG.prototype.generate = function generate(len, enc, add, addEnc) {\n  if (this._reseed > this.reseedInterval)\n    throw new Error('Reseed is required');\n\n  // Optional encoding\n  if (typeof enc !== 'string') {\n    addEnc = add;\n    add = enc;\n    enc = null;\n  }\n\n  // Optional additional data\n  if (add) {\n    add = utils.toArray(add, addEnc || 'hex');\n    this._update(add);\n  }\n\n  var temp = [];\n  while (temp.length < len) {\n    this.V = this._hmac().update(this.V).digest();\n    temp = temp.concat(this.V);\n  }\n\n  var res = temp.slice(0, len);\n  this._update(add);\n  this._reseed++;\n  return utils.encode(res, enc);\n};\n\n\n//# sourceURL=webpack:///../node_modules/hmac-drbg/lib/hmac-drbg.js?");

/***/ })

}]);