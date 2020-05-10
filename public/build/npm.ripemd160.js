(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.ripemd160"],{

/***/ "../node_modules/ripemd160/index.js":
/*!******************************************!*\
  !*** ../node_modules/ripemd160/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar Buffer = __webpack_require__(/*! buffer */ \"../node_modules/buffer/index.js\").Buffer\nvar inherits = __webpack_require__(/*! inherits */ \"../node_modules/inherits/inherits_browser.js\")\nvar HashBase = __webpack_require__(/*! hash-base */ \"../node_modules/hash-base/index.js\")\n\nvar ARRAY16 = new Array(16)\n\nvar zl = [\n  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,\n  7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8,\n  3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12,\n  1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2,\n  4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13\n]\n\nvar zr = [\n  5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12,\n  6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2,\n  15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13,\n  8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14,\n  12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11\n]\n\nvar sl = [\n  11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8,\n  7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12,\n  11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5,\n  11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12,\n  9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6\n]\n\nvar sr = [\n  8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6,\n  9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11,\n  9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5,\n  15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8,\n  8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11\n]\n\nvar hl = [0x00000000, 0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xa953fd4e]\nvar hr = [0x50a28be6, 0x5c4dd124, 0x6d703ef3, 0x7a6d76e9, 0x00000000]\n\nfunction RIPEMD160 () {\n  HashBase.call(this, 64)\n\n  // state\n  this._a = 0x67452301\n  this._b = 0xefcdab89\n  this._c = 0x98badcfe\n  this._d = 0x10325476\n  this._e = 0xc3d2e1f0\n}\n\ninherits(RIPEMD160, HashBase)\n\nRIPEMD160.prototype._update = function () {\n  var words = ARRAY16\n  for (var j = 0; j < 16; ++j) words[j] = this._block.readInt32LE(j * 4)\n\n  var al = this._a | 0\n  var bl = this._b | 0\n  var cl = this._c | 0\n  var dl = this._d | 0\n  var el = this._e | 0\n\n  var ar = this._a | 0\n  var br = this._b | 0\n  var cr = this._c | 0\n  var dr = this._d | 0\n  var er = this._e | 0\n\n  // computation\n  for (var i = 0; i < 80; i += 1) {\n    var tl\n    var tr\n    if (i < 16) {\n      tl = fn1(al, bl, cl, dl, el, words[zl[i]], hl[0], sl[i])\n      tr = fn5(ar, br, cr, dr, er, words[zr[i]], hr[0], sr[i])\n    } else if (i < 32) {\n      tl = fn2(al, bl, cl, dl, el, words[zl[i]], hl[1], sl[i])\n      tr = fn4(ar, br, cr, dr, er, words[zr[i]], hr[1], sr[i])\n    } else if (i < 48) {\n      tl = fn3(al, bl, cl, dl, el, words[zl[i]], hl[2], sl[i])\n      tr = fn3(ar, br, cr, dr, er, words[zr[i]], hr[2], sr[i])\n    } else if (i < 64) {\n      tl = fn4(al, bl, cl, dl, el, words[zl[i]], hl[3], sl[i])\n      tr = fn2(ar, br, cr, dr, er, words[zr[i]], hr[3], sr[i])\n    } else { // if (i<80) {\n      tl = fn5(al, bl, cl, dl, el, words[zl[i]], hl[4], sl[i])\n      tr = fn1(ar, br, cr, dr, er, words[zr[i]], hr[4], sr[i])\n    }\n\n    al = el\n    el = dl\n    dl = rotl(cl, 10)\n    cl = bl\n    bl = tl\n\n    ar = er\n    er = dr\n    dr = rotl(cr, 10)\n    cr = br\n    br = tr\n  }\n\n  // update state\n  var t = (this._b + cl + dr) | 0\n  this._b = (this._c + dl + er) | 0\n  this._c = (this._d + el + ar) | 0\n  this._d = (this._e + al + br) | 0\n  this._e = (this._a + bl + cr) | 0\n  this._a = t\n}\n\nRIPEMD160.prototype._digest = function () {\n  // create padding and handle blocks\n  this._block[this._blockOffset++] = 0x80\n  if (this._blockOffset > 56) {\n    this._block.fill(0, this._blockOffset, 64)\n    this._update()\n    this._blockOffset = 0\n  }\n\n  this._block.fill(0, this._blockOffset, 56)\n  this._block.writeUInt32LE(this._length[0], 56)\n  this._block.writeUInt32LE(this._length[1], 60)\n  this._update()\n\n  // produce result\n  var buffer = Buffer.alloc ? Buffer.alloc(20) : new Buffer(20)\n  buffer.writeInt32LE(this._a, 0)\n  buffer.writeInt32LE(this._b, 4)\n  buffer.writeInt32LE(this._c, 8)\n  buffer.writeInt32LE(this._d, 12)\n  buffer.writeInt32LE(this._e, 16)\n  return buffer\n}\n\nfunction rotl (x, n) {\n  return (x << n) | (x >>> (32 - n))\n}\n\nfunction fn1 (a, b, c, d, e, m, k, s) {\n  return (rotl((a + (b ^ c ^ d) + m + k) | 0, s) + e) | 0\n}\n\nfunction fn2 (a, b, c, d, e, m, k, s) {\n  return (rotl((a + ((b & c) | ((~b) & d)) + m + k) | 0, s) + e) | 0\n}\n\nfunction fn3 (a, b, c, d, e, m, k, s) {\n  return (rotl((a + ((b | (~c)) ^ d) + m + k) | 0, s) + e) | 0\n}\n\nfunction fn4 (a, b, c, d, e, m, k, s) {\n  return (rotl((a + ((b & d) | (c & (~d))) + m + k) | 0, s) + e) | 0\n}\n\nfunction fn5 (a, b, c, d, e, m, k, s) {\n  return (rotl((a + (b ^ (c | (~d))) + m + k) | 0, s) + e) | 0\n}\n\nmodule.exports = RIPEMD160\n\n\n//# sourceURL=webpack:///../node_modules/ripemd160/index.js?");

/***/ })

}]);