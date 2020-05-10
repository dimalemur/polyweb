(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.to-arraybuffer"],{

/***/ "../node_modules/to-arraybuffer/index.js":
/*!***********************************************!*\
  !*** ../node_modules/to-arraybuffer/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Buffer = __webpack_require__(/*! buffer */ \"../node_modules/buffer/index.js\").Buffer\n\nmodule.exports = function (buf) {\n\t// If the buffer is backed by a Uint8Array, a faster version will work\n\tif (buf instanceof Uint8Array) {\n\t\t// If the buffer isn't a subarray, return the underlying ArrayBuffer\n\t\tif (buf.byteOffset === 0 && buf.byteLength === buf.buffer.byteLength) {\n\t\t\treturn buf.buffer\n\t\t} else if (typeof buf.buffer.slice === 'function') {\n\t\t\t// Otherwise we need to get a proper copy\n\t\t\treturn buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength)\n\t\t}\n\t}\n\n\tif (Buffer.isBuffer(buf)) {\n\t\t// This is the slow version that will work with any Buffer\n\t\t// implementation (even in old browsers)\n\t\tvar arrayCopy = new Uint8Array(buf.length)\n\t\tvar len = buf.length\n\t\tfor (var i = 0; i < len; i++) {\n\t\t\tarrayCopy[i] = buf[i]\n\t\t}\n\t\treturn arrayCopy.buffer\n\t} else {\n\t\tthrow new Error('Argument must be a Buffer')\n\t}\n}\n\n\n//# sourceURL=webpack:///../node_modules/to-arraybuffer/index.js?");

/***/ })

}]);