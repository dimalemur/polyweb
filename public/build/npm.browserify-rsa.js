(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.browserify-rsa"],{

/***/ "../node_modules/browserify-rsa/index.js":
/*!***********************************************!*\
  !*** ../node_modules/browserify-rsa/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(Buffer) {var bn = __webpack_require__(/*! bn.js */ \"../node_modules/bn.js/lib/bn.js\");\nvar randomBytes = __webpack_require__(/*! randombytes */ \"../node_modules/randombytes/browser.js\");\nmodule.exports = crt;\nfunction blind(priv) {\n  var r = getr(priv);\n  var blinder = r.toRed(bn.mont(priv.modulus))\n  .redPow(new bn(priv.publicExponent)).fromRed();\n  return {\n    blinder: blinder,\n    unblinder:r.invm(priv.modulus)\n  };\n}\nfunction crt(msg, priv) {\n  var blinds = blind(priv);\n  var len = priv.modulus.byteLength();\n  var mod = bn.mont(priv.modulus);\n  var blinded = new bn(msg).mul(blinds.blinder).umod(priv.modulus);\n  var c1 = blinded.toRed(bn.mont(priv.prime1));\n  var c2 = blinded.toRed(bn.mont(priv.prime2));\n  var qinv = priv.coefficient;\n  var p = priv.prime1;\n  var q = priv.prime2;\n  var m1 = c1.redPow(priv.exponent1);\n  var m2 = c2.redPow(priv.exponent2);\n  m1 = m1.fromRed();\n  m2 = m2.fromRed();\n  var h = m1.isub(m2).imul(qinv).umod(p);\n  h.imul(q);\n  m2.iadd(h);\n  return new Buffer(m2.imul(blinds.unblinder).umod(priv.modulus).toArray(false, len));\n}\ncrt.getr = getr;\nfunction getr(priv) {\n  var len = priv.modulus.byteLength();\n  var r = new bn(randomBytes(len));\n  while (r.cmp(priv.modulus) >=  0 || !r.umod(priv.prime1) || !r.umod(priv.prime2)) {\n    r = new bn(randomBytes(len));\n  }\n  return r;\n}\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../buffer/index.js */ \"../node_modules/buffer/index.js\").Buffer))\n\n//# sourceURL=webpack:///../node_modules/browserify-rsa/index.js?");

/***/ })

}]);