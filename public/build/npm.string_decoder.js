(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.string_decoder"],{

/***/ "../node_modules/string_decoder/lib/string_decoder.js":
/*!************************************************************!*\
  !*** ../node_modules/string_decoder/lib/string_decoder.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n\n\n/*<replacement>*/\n\nvar Buffer = __webpack_require__(/*! safe-buffer */ \"../node_modules/safe-buffer/index.js\").Buffer;\n/*</replacement>*/\n\nvar isEncoding = Buffer.isEncoding || function (encoding) {\n  encoding = '' + encoding;\n  switch (encoding && encoding.toLowerCase()) {\n    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':\n      return true;\n    default:\n      return false;\n  }\n};\n\nfunction _normalizeEncoding(enc) {\n  if (!enc) return 'utf8';\n  var retried;\n  while (true) {\n    switch (enc) {\n      case 'utf8':\n      case 'utf-8':\n        return 'utf8';\n      case 'ucs2':\n      case 'ucs-2':\n      case 'utf16le':\n      case 'utf-16le':\n        return 'utf16le';\n      case 'latin1':\n      case 'binary':\n        return 'latin1';\n      case 'base64':\n      case 'ascii':\n      case 'hex':\n        return enc;\n      default:\n        if (retried) return; // undefined\n        enc = ('' + enc).toLowerCase();\n        retried = true;\n    }\n  }\n};\n\n// Do not cache `Buffer.isEncoding` when checking encoding names as some\n// modules monkey-patch it to support additional encodings\nfunction normalizeEncoding(enc) {\n  var nenc = _normalizeEncoding(enc);\n  if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);\n  return nenc || enc;\n}\n\n// StringDecoder provides an interface for efficiently splitting a series of\n// buffers into a series of JS strings without breaking apart multi-byte\n// characters.\nexports.StringDecoder = StringDecoder;\nfunction StringDecoder(encoding) {\n  this.encoding = normalizeEncoding(encoding);\n  var nb;\n  switch (this.encoding) {\n    case 'utf16le':\n      this.text = utf16Text;\n      this.end = utf16End;\n      nb = 4;\n      break;\n    case 'utf8':\n      this.fillLast = utf8FillLast;\n      nb = 4;\n      break;\n    case 'base64':\n      this.text = base64Text;\n      this.end = base64End;\n      nb = 3;\n      break;\n    default:\n      this.write = simpleWrite;\n      this.end = simpleEnd;\n      return;\n  }\n  this.lastNeed = 0;\n  this.lastTotal = 0;\n  this.lastChar = Buffer.allocUnsafe(nb);\n}\n\nStringDecoder.prototype.write = function (buf) {\n  if (buf.length === 0) return '';\n  var r;\n  var i;\n  if (this.lastNeed) {\n    r = this.fillLast(buf);\n    if (r === undefined) return '';\n    i = this.lastNeed;\n    this.lastNeed = 0;\n  } else {\n    i = 0;\n  }\n  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);\n  return r || '';\n};\n\nStringDecoder.prototype.end = utf8End;\n\n// Returns only complete characters in a Buffer\nStringDecoder.prototype.text = utf8Text;\n\n// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer\nStringDecoder.prototype.fillLast = function (buf) {\n  if (this.lastNeed <= buf.length) {\n    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);\n    return this.lastChar.toString(this.encoding, 0, this.lastTotal);\n  }\n  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);\n  this.lastNeed -= buf.length;\n};\n\n// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a\n// continuation byte. If an invalid byte is detected, -2 is returned.\nfunction utf8CheckByte(byte) {\n  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;\n  return byte >> 6 === 0x02 ? -1 : -2;\n}\n\n// Checks at most 3 bytes at the end of a Buffer in order to detect an\n// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)\n// needed to complete the UTF-8 character (if applicable) are returned.\nfunction utf8CheckIncomplete(self, buf, i) {\n  var j = buf.length - 1;\n  if (j < i) return 0;\n  var nb = utf8CheckByte(buf[j]);\n  if (nb >= 0) {\n    if (nb > 0) self.lastNeed = nb - 1;\n    return nb;\n  }\n  if (--j < i || nb === -2) return 0;\n  nb = utf8CheckByte(buf[j]);\n  if (nb >= 0) {\n    if (nb > 0) self.lastNeed = nb - 2;\n    return nb;\n  }\n  if (--j < i || nb === -2) return 0;\n  nb = utf8CheckByte(buf[j]);\n  if (nb >= 0) {\n    if (nb > 0) {\n      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;\n    }\n    return nb;\n  }\n  return 0;\n}\n\n// Validates as many continuation bytes for a multi-byte UTF-8 character as\n// needed or are available. If we see a non-continuation byte where we expect\n// one, we \"replace\" the validated continuation bytes we've seen so far with\n// a single UTF-8 replacement character ('\\ufffd'), to match v8's UTF-8 decoding\n// behavior. The continuation byte check is included three times in the case\n// where all of the continuation bytes for a character exist in the same buffer.\n// It is also done this way as a slight performance increase instead of using a\n// loop.\nfunction utf8CheckExtraBytes(self, buf, p) {\n  if ((buf[0] & 0xC0) !== 0x80) {\n    self.lastNeed = 0;\n    return '\\ufffd';\n  }\n  if (self.lastNeed > 1 && buf.length > 1) {\n    if ((buf[1] & 0xC0) !== 0x80) {\n      self.lastNeed = 1;\n      return '\\ufffd';\n    }\n    if (self.lastNeed > 2 && buf.length > 2) {\n      if ((buf[2] & 0xC0) !== 0x80) {\n        self.lastNeed = 2;\n        return '\\ufffd';\n      }\n    }\n  }\n}\n\n// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.\nfunction utf8FillLast(buf) {\n  var p = this.lastTotal - this.lastNeed;\n  var r = utf8CheckExtraBytes(this, buf, p);\n  if (r !== undefined) return r;\n  if (this.lastNeed <= buf.length) {\n    buf.copy(this.lastChar, p, 0, this.lastNeed);\n    return this.lastChar.toString(this.encoding, 0, this.lastTotal);\n  }\n  buf.copy(this.lastChar, p, 0, buf.length);\n  this.lastNeed -= buf.length;\n}\n\n// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a\n// partial character, the character's bytes are buffered until the required\n// number of bytes are available.\nfunction utf8Text(buf, i) {\n  var total = utf8CheckIncomplete(this, buf, i);\n  if (!this.lastNeed) return buf.toString('utf8', i);\n  this.lastTotal = total;\n  var end = buf.length - (total - this.lastNeed);\n  buf.copy(this.lastChar, 0, end);\n  return buf.toString('utf8', i, end);\n}\n\n// For UTF-8, a replacement character is added when ending on a partial\n// character.\nfunction utf8End(buf) {\n  var r = buf && buf.length ? this.write(buf) : '';\n  if (this.lastNeed) return r + '\\ufffd';\n  return r;\n}\n\n// UTF-16LE typically needs two bytes per character, but even if we have an even\n// number of bytes available, we need to check if we end on a leading/high\n// surrogate. In that case, we need to wait for the next two bytes in order to\n// decode the last character properly.\nfunction utf16Text(buf, i) {\n  if ((buf.length - i) % 2 === 0) {\n    var r = buf.toString('utf16le', i);\n    if (r) {\n      var c = r.charCodeAt(r.length - 1);\n      if (c >= 0xD800 && c <= 0xDBFF) {\n        this.lastNeed = 2;\n        this.lastTotal = 4;\n        this.lastChar[0] = buf[buf.length - 2];\n        this.lastChar[1] = buf[buf.length - 1];\n        return r.slice(0, -1);\n      }\n    }\n    return r;\n  }\n  this.lastNeed = 1;\n  this.lastTotal = 2;\n  this.lastChar[0] = buf[buf.length - 1];\n  return buf.toString('utf16le', i, buf.length - 1);\n}\n\n// For UTF-16LE we do not explicitly append special replacement characters if we\n// end on a partial character, we simply let v8 handle that.\nfunction utf16End(buf) {\n  var r = buf && buf.length ? this.write(buf) : '';\n  if (this.lastNeed) {\n    var end = this.lastTotal - this.lastNeed;\n    return r + this.lastChar.toString('utf16le', 0, end);\n  }\n  return r;\n}\n\nfunction base64Text(buf, i) {\n  var n = (buf.length - i) % 3;\n  if (n === 0) return buf.toString('base64', i);\n  this.lastNeed = 3 - n;\n  this.lastTotal = 3;\n  if (n === 1) {\n    this.lastChar[0] = buf[buf.length - 1];\n  } else {\n    this.lastChar[0] = buf[buf.length - 2];\n    this.lastChar[1] = buf[buf.length - 1];\n  }\n  return buf.toString('base64', i, buf.length - n);\n}\n\nfunction base64End(buf) {\n  var r = buf && buf.length ? this.write(buf) : '';\n  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);\n  return r;\n}\n\n// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)\nfunction simpleWrite(buf) {\n  return buf.toString(this.encoding);\n}\n\nfunction simpleEnd(buf) {\n  return buf && buf.length ? this.write(buf) : '';\n}\n\n//# sourceURL=webpack:///../node_modules/string_decoder/lib/string_decoder.js?");

/***/ })

}]);