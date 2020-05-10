(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.browserify-zlib"],{

/***/ "../node_modules/browserify-zlib/lib/binding.js":
/*!******************************************************!*\
  !*** ../node_modules/browserify-zlib/lib/binding.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(Buffer, process) {\n/* eslint camelcase: \"off\" */\n\nvar assert = __webpack_require__(/*! assert */ \"../node_modules/assert/assert.js\");\n\nvar Zstream = __webpack_require__(/*! pako/lib/zlib/zstream */ \"../node_modules/pako/lib/zlib/zstream.js\");\nvar zlib_deflate = __webpack_require__(/*! pako/lib/zlib/deflate.js */ \"../node_modules/pako/lib/zlib/deflate.js\");\nvar zlib_inflate = __webpack_require__(/*! pako/lib/zlib/inflate.js */ \"../node_modules/pako/lib/zlib/inflate.js\");\nvar constants = __webpack_require__(/*! pako/lib/zlib/constants */ \"../node_modules/pako/lib/zlib/constants.js\");\n\nfor (var key in constants) {\n  exports[key] = constants[key];\n}\n\n// zlib modes\nexports.NONE = 0;\nexports.DEFLATE = 1;\nexports.INFLATE = 2;\nexports.GZIP = 3;\nexports.GUNZIP = 4;\nexports.DEFLATERAW = 5;\nexports.INFLATERAW = 6;\nexports.UNZIP = 7;\n\nvar GZIP_HEADER_ID1 = 0x1f;\nvar GZIP_HEADER_ID2 = 0x8b;\n\n/**\n * Emulate Node's zlib C++ layer for use by the JS layer in index.js\n */\nfunction Zlib(mode) {\n  if (typeof mode !== 'number' || mode < exports.DEFLATE || mode > exports.UNZIP) {\n    throw new TypeError('Bad argument');\n  }\n\n  this.dictionary = null;\n  this.err = 0;\n  this.flush = 0;\n  this.init_done = false;\n  this.level = 0;\n  this.memLevel = 0;\n  this.mode = mode;\n  this.strategy = 0;\n  this.windowBits = 0;\n  this.write_in_progress = false;\n  this.pending_close = false;\n  this.gzip_id_bytes_read = 0;\n}\n\nZlib.prototype.close = function () {\n  if (this.write_in_progress) {\n    this.pending_close = true;\n    return;\n  }\n\n  this.pending_close = false;\n\n  assert(this.init_done, 'close before init');\n  assert(this.mode <= exports.UNZIP);\n\n  if (this.mode === exports.DEFLATE || this.mode === exports.GZIP || this.mode === exports.DEFLATERAW) {\n    zlib_deflate.deflateEnd(this.strm);\n  } else if (this.mode === exports.INFLATE || this.mode === exports.GUNZIP || this.mode === exports.INFLATERAW || this.mode === exports.UNZIP) {\n    zlib_inflate.inflateEnd(this.strm);\n  }\n\n  this.mode = exports.NONE;\n\n  this.dictionary = null;\n};\n\nZlib.prototype.write = function (flush, input, in_off, in_len, out, out_off, out_len) {\n  return this._write(true, flush, input, in_off, in_len, out, out_off, out_len);\n};\n\nZlib.prototype.writeSync = function (flush, input, in_off, in_len, out, out_off, out_len) {\n  return this._write(false, flush, input, in_off, in_len, out, out_off, out_len);\n};\n\nZlib.prototype._write = function (async, flush, input, in_off, in_len, out, out_off, out_len) {\n  assert.equal(arguments.length, 8);\n\n  assert(this.init_done, 'write before init');\n  assert(this.mode !== exports.NONE, 'already finalized');\n  assert.equal(false, this.write_in_progress, 'write already in progress');\n  assert.equal(false, this.pending_close, 'close is pending');\n\n  this.write_in_progress = true;\n\n  assert.equal(false, flush === undefined, 'must provide flush value');\n\n  this.write_in_progress = true;\n\n  if (flush !== exports.Z_NO_FLUSH && flush !== exports.Z_PARTIAL_FLUSH && flush !== exports.Z_SYNC_FLUSH && flush !== exports.Z_FULL_FLUSH && flush !== exports.Z_FINISH && flush !== exports.Z_BLOCK) {\n    throw new Error('Invalid flush value');\n  }\n\n  if (input == null) {\n    input = Buffer.alloc(0);\n    in_len = 0;\n    in_off = 0;\n  }\n\n  this.strm.avail_in = in_len;\n  this.strm.input = input;\n  this.strm.next_in = in_off;\n  this.strm.avail_out = out_len;\n  this.strm.output = out;\n  this.strm.next_out = out_off;\n  this.flush = flush;\n\n  if (!async) {\n    // sync version\n    this._process();\n\n    if (this._checkError()) {\n      return this._afterSync();\n    }\n    return;\n  }\n\n  // async version\n  var self = this;\n  process.nextTick(function () {\n    self._process();\n    self._after();\n  });\n\n  return this;\n};\n\nZlib.prototype._afterSync = function () {\n  var avail_out = this.strm.avail_out;\n  var avail_in = this.strm.avail_in;\n\n  this.write_in_progress = false;\n\n  return [avail_in, avail_out];\n};\n\nZlib.prototype._process = function () {\n  var next_expected_header_byte = null;\n\n  // If the avail_out is left at 0, then it means that it ran out\n  // of room.  If there was avail_out left over, then it means\n  // that all of the input was consumed.\n  switch (this.mode) {\n    case exports.DEFLATE:\n    case exports.GZIP:\n    case exports.DEFLATERAW:\n      this.err = zlib_deflate.deflate(this.strm, this.flush);\n      break;\n    case exports.UNZIP:\n      if (this.strm.avail_in > 0) {\n        next_expected_header_byte = this.strm.next_in;\n      }\n\n      switch (this.gzip_id_bytes_read) {\n        case 0:\n          if (next_expected_header_byte === null) {\n            break;\n          }\n\n          if (this.strm.input[next_expected_header_byte] === GZIP_HEADER_ID1) {\n            this.gzip_id_bytes_read = 1;\n            next_expected_header_byte++;\n\n            if (this.strm.avail_in === 1) {\n              // The only available byte was already read.\n              break;\n            }\n          } else {\n            this.mode = exports.INFLATE;\n            break;\n          }\n\n        // fallthrough\n        case 1:\n          if (next_expected_header_byte === null) {\n            break;\n          }\n\n          if (this.strm.input[next_expected_header_byte] === GZIP_HEADER_ID2) {\n            this.gzip_id_bytes_read = 2;\n            this.mode = exports.GUNZIP;\n          } else {\n            // There is no actual difference between INFLATE and INFLATERAW\n            // (after initialization).\n            this.mode = exports.INFLATE;\n          }\n\n          break;\n        default:\n          throw new Error('invalid number of gzip magic number bytes read');\n      }\n\n    // fallthrough\n    case exports.INFLATE:\n    case exports.GUNZIP:\n    case exports.INFLATERAW:\n      this.err = zlib_inflate.inflate(this.strm, this.flush\n\n      // If data was encoded with dictionary\n      );if (this.err === exports.Z_NEED_DICT && this.dictionary) {\n        // Load it\n        this.err = zlib_inflate.inflateSetDictionary(this.strm, this.dictionary);\n        if (this.err === exports.Z_OK) {\n          // And try to decode again\n          this.err = zlib_inflate.inflate(this.strm, this.flush);\n        } else if (this.err === exports.Z_DATA_ERROR) {\n          // Both inflateSetDictionary() and inflate() return Z_DATA_ERROR.\n          // Make it possible for After() to tell a bad dictionary from bad\n          // input.\n          this.err = exports.Z_NEED_DICT;\n        }\n      }\n      while (this.strm.avail_in > 0 && this.mode === exports.GUNZIP && this.err === exports.Z_STREAM_END && this.strm.next_in[0] !== 0x00) {\n        // Bytes remain in input buffer. Perhaps this is another compressed\n        // member in the same archive, or just trailing garbage.\n        // Trailing zero bytes are okay, though, since they are frequently\n        // used for padding.\n\n        this.reset();\n        this.err = zlib_inflate.inflate(this.strm, this.flush);\n      }\n      break;\n    default:\n      throw new Error('Unknown mode ' + this.mode);\n  }\n};\n\nZlib.prototype._checkError = function () {\n  // Acceptable error states depend on the type of zlib stream.\n  switch (this.err) {\n    case exports.Z_OK:\n    case exports.Z_BUF_ERROR:\n      if (this.strm.avail_out !== 0 && this.flush === exports.Z_FINISH) {\n        this._error('unexpected end of file');\n        return false;\n      }\n      break;\n    case exports.Z_STREAM_END:\n      // normal statuses, not fatal\n      break;\n    case exports.Z_NEED_DICT:\n      if (this.dictionary == null) {\n        this._error('Missing dictionary');\n      } else {\n        this._error('Bad dictionary');\n      }\n      return false;\n    default:\n      // something else.\n      this._error('Zlib error');\n      return false;\n  }\n\n  return true;\n};\n\nZlib.prototype._after = function () {\n  if (!this._checkError()) {\n    return;\n  }\n\n  var avail_out = this.strm.avail_out;\n  var avail_in = this.strm.avail_in;\n\n  this.write_in_progress = false;\n\n  // call the write() cb\n  this.callback(avail_in, avail_out);\n\n  if (this.pending_close) {\n    this.close();\n  }\n};\n\nZlib.prototype._error = function (message) {\n  if (this.strm.msg) {\n    message = this.strm.msg;\n  }\n  this.onerror(message, this.err\n\n  // no hope of rescue.\n  );this.write_in_progress = false;\n  if (this.pending_close) {\n    this.close();\n  }\n};\n\nZlib.prototype.init = function (windowBits, level, memLevel, strategy, dictionary) {\n  assert(arguments.length === 4 || arguments.length === 5, 'init(windowBits, level, memLevel, strategy, [dictionary])');\n\n  assert(windowBits >= 8 && windowBits <= 15, 'invalid windowBits');\n  assert(level >= -1 && level <= 9, 'invalid compression level');\n\n  assert(memLevel >= 1 && memLevel <= 9, 'invalid memlevel');\n\n  assert(strategy === exports.Z_FILTERED || strategy === exports.Z_HUFFMAN_ONLY || strategy === exports.Z_RLE || strategy === exports.Z_FIXED || strategy === exports.Z_DEFAULT_STRATEGY, 'invalid strategy');\n\n  this._init(level, windowBits, memLevel, strategy, dictionary);\n  this._setDictionary();\n};\n\nZlib.prototype.params = function () {\n  throw new Error('deflateParams Not supported');\n};\n\nZlib.prototype.reset = function () {\n  this._reset();\n  this._setDictionary();\n};\n\nZlib.prototype._init = function (level, windowBits, memLevel, strategy, dictionary) {\n  this.level = level;\n  this.windowBits = windowBits;\n  this.memLevel = memLevel;\n  this.strategy = strategy;\n\n  this.flush = exports.Z_NO_FLUSH;\n\n  this.err = exports.Z_OK;\n\n  if (this.mode === exports.GZIP || this.mode === exports.GUNZIP) {\n    this.windowBits += 16;\n  }\n\n  if (this.mode === exports.UNZIP) {\n    this.windowBits += 32;\n  }\n\n  if (this.mode === exports.DEFLATERAW || this.mode === exports.INFLATERAW) {\n    this.windowBits = -1 * this.windowBits;\n  }\n\n  this.strm = new Zstream();\n\n  switch (this.mode) {\n    case exports.DEFLATE:\n    case exports.GZIP:\n    case exports.DEFLATERAW:\n      this.err = zlib_deflate.deflateInit2(this.strm, this.level, exports.Z_DEFLATED, this.windowBits, this.memLevel, this.strategy);\n      break;\n    case exports.INFLATE:\n    case exports.GUNZIP:\n    case exports.INFLATERAW:\n    case exports.UNZIP:\n      this.err = zlib_inflate.inflateInit2(this.strm, this.windowBits);\n      break;\n    default:\n      throw new Error('Unknown mode ' + this.mode);\n  }\n\n  if (this.err !== exports.Z_OK) {\n    this._error('Init error');\n  }\n\n  this.dictionary = dictionary;\n\n  this.write_in_progress = false;\n  this.init_done = true;\n};\n\nZlib.prototype._setDictionary = function () {\n  if (this.dictionary == null) {\n    return;\n  }\n\n  this.err = exports.Z_OK;\n\n  switch (this.mode) {\n    case exports.DEFLATE:\n    case exports.DEFLATERAW:\n      this.err = zlib_deflate.deflateSetDictionary(this.strm, this.dictionary);\n      break;\n    default:\n      break;\n  }\n\n  if (this.err !== exports.Z_OK) {\n    this._error('Failed to set dictionary');\n  }\n};\n\nZlib.prototype._reset = function () {\n  this.err = exports.Z_OK;\n\n  switch (this.mode) {\n    case exports.DEFLATE:\n    case exports.DEFLATERAW:\n    case exports.GZIP:\n      this.err = zlib_deflate.deflateReset(this.strm);\n      break;\n    case exports.INFLATE:\n    case exports.INFLATERAW:\n    case exports.GUNZIP:\n      this.err = zlib_inflate.inflateReset(this.strm);\n      break;\n    default:\n      break;\n  }\n\n  if (this.err !== exports.Z_OK) {\n    this._error('Failed to reset stream');\n  }\n};\n\nexports.Zlib = Zlib;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../buffer/index.js */ \"../node_modules/buffer/index.js\").Buffer, __webpack_require__(/*! ./../../process/browser.js */ \"../node_modules/process/browser.js\")))\n\n//# sourceURL=webpack:///../node_modules/browserify-zlib/lib/binding.js?");

/***/ }),

/***/ "../node_modules/browserify-zlib/lib/index.js":
/*!****************************************************!*\
  !*** ../node_modules/browserify-zlib/lib/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(process) {\n\nvar Buffer = __webpack_require__(/*! buffer */ \"../node_modules/buffer/index.js\").Buffer;\nvar Transform = __webpack_require__(/*! stream */ \"../node_modules/stream-browserify/index.js\").Transform;\nvar binding = __webpack_require__(/*! ./binding */ \"../node_modules/browserify-zlib/lib/binding.js\");\nvar util = __webpack_require__(/*! util */ \"../node_modules/util/util.js\");\nvar assert = __webpack_require__(/*! assert */ \"../node_modules/assert/assert.js\").ok;\nvar kMaxLength = __webpack_require__(/*! buffer */ \"../node_modules/buffer/index.js\").kMaxLength;\nvar kRangeErrorMessage = 'Cannot create final Buffer. It would be larger ' + 'than 0x' + kMaxLength.toString(16) + ' bytes';\n\n// zlib doesn't provide these, so kludge them in following the same\n// const naming scheme zlib uses.\nbinding.Z_MIN_WINDOWBITS = 8;\nbinding.Z_MAX_WINDOWBITS = 15;\nbinding.Z_DEFAULT_WINDOWBITS = 15;\n\n// fewer than 64 bytes per chunk is stupid.\n// technically it could work with as few as 8, but even 64 bytes\n// is absurdly low.  Usually a MB or more is best.\nbinding.Z_MIN_CHUNK = 64;\nbinding.Z_MAX_CHUNK = Infinity;\nbinding.Z_DEFAULT_CHUNK = 16 * 1024;\n\nbinding.Z_MIN_MEMLEVEL = 1;\nbinding.Z_MAX_MEMLEVEL = 9;\nbinding.Z_DEFAULT_MEMLEVEL = 8;\n\nbinding.Z_MIN_LEVEL = -1;\nbinding.Z_MAX_LEVEL = 9;\nbinding.Z_DEFAULT_LEVEL = binding.Z_DEFAULT_COMPRESSION;\n\n// expose all the zlib constants\nvar bkeys = Object.keys(binding);\nfor (var bk = 0; bk < bkeys.length; bk++) {\n  var bkey = bkeys[bk];\n  if (bkey.match(/^Z/)) {\n    Object.defineProperty(exports, bkey, {\n      enumerable: true, value: binding[bkey], writable: false\n    });\n  }\n}\n\n// translation table for return codes.\nvar codes = {\n  Z_OK: binding.Z_OK,\n  Z_STREAM_END: binding.Z_STREAM_END,\n  Z_NEED_DICT: binding.Z_NEED_DICT,\n  Z_ERRNO: binding.Z_ERRNO,\n  Z_STREAM_ERROR: binding.Z_STREAM_ERROR,\n  Z_DATA_ERROR: binding.Z_DATA_ERROR,\n  Z_MEM_ERROR: binding.Z_MEM_ERROR,\n  Z_BUF_ERROR: binding.Z_BUF_ERROR,\n  Z_VERSION_ERROR: binding.Z_VERSION_ERROR\n};\n\nvar ckeys = Object.keys(codes);\nfor (var ck = 0; ck < ckeys.length; ck++) {\n  var ckey = ckeys[ck];\n  codes[codes[ckey]] = ckey;\n}\n\nObject.defineProperty(exports, 'codes', {\n  enumerable: true, value: Object.freeze(codes), writable: false\n});\n\nexports.Deflate = Deflate;\nexports.Inflate = Inflate;\nexports.Gzip = Gzip;\nexports.Gunzip = Gunzip;\nexports.DeflateRaw = DeflateRaw;\nexports.InflateRaw = InflateRaw;\nexports.Unzip = Unzip;\n\nexports.createDeflate = function (o) {\n  return new Deflate(o);\n};\n\nexports.createInflate = function (o) {\n  return new Inflate(o);\n};\n\nexports.createDeflateRaw = function (o) {\n  return new DeflateRaw(o);\n};\n\nexports.createInflateRaw = function (o) {\n  return new InflateRaw(o);\n};\n\nexports.createGzip = function (o) {\n  return new Gzip(o);\n};\n\nexports.createGunzip = function (o) {\n  return new Gunzip(o);\n};\n\nexports.createUnzip = function (o) {\n  return new Unzip(o);\n};\n\n// Convenience methods.\n// compress/decompress a string or buffer in one step.\nexports.deflate = function (buffer, opts, callback) {\n  if (typeof opts === 'function') {\n    callback = opts;\n    opts = {};\n  }\n  return zlibBuffer(new Deflate(opts), buffer, callback);\n};\n\nexports.deflateSync = function (buffer, opts) {\n  return zlibBufferSync(new Deflate(opts), buffer);\n};\n\nexports.gzip = function (buffer, opts, callback) {\n  if (typeof opts === 'function') {\n    callback = opts;\n    opts = {};\n  }\n  return zlibBuffer(new Gzip(opts), buffer, callback);\n};\n\nexports.gzipSync = function (buffer, opts) {\n  return zlibBufferSync(new Gzip(opts), buffer);\n};\n\nexports.deflateRaw = function (buffer, opts, callback) {\n  if (typeof opts === 'function') {\n    callback = opts;\n    opts = {};\n  }\n  return zlibBuffer(new DeflateRaw(opts), buffer, callback);\n};\n\nexports.deflateRawSync = function (buffer, opts) {\n  return zlibBufferSync(new DeflateRaw(opts), buffer);\n};\n\nexports.unzip = function (buffer, opts, callback) {\n  if (typeof opts === 'function') {\n    callback = opts;\n    opts = {};\n  }\n  return zlibBuffer(new Unzip(opts), buffer, callback);\n};\n\nexports.unzipSync = function (buffer, opts) {\n  return zlibBufferSync(new Unzip(opts), buffer);\n};\n\nexports.inflate = function (buffer, opts, callback) {\n  if (typeof opts === 'function') {\n    callback = opts;\n    opts = {};\n  }\n  return zlibBuffer(new Inflate(opts), buffer, callback);\n};\n\nexports.inflateSync = function (buffer, opts) {\n  return zlibBufferSync(new Inflate(opts), buffer);\n};\n\nexports.gunzip = function (buffer, opts, callback) {\n  if (typeof opts === 'function') {\n    callback = opts;\n    opts = {};\n  }\n  return zlibBuffer(new Gunzip(opts), buffer, callback);\n};\n\nexports.gunzipSync = function (buffer, opts) {\n  return zlibBufferSync(new Gunzip(opts), buffer);\n};\n\nexports.inflateRaw = function (buffer, opts, callback) {\n  if (typeof opts === 'function') {\n    callback = opts;\n    opts = {};\n  }\n  return zlibBuffer(new InflateRaw(opts), buffer, callback);\n};\n\nexports.inflateRawSync = function (buffer, opts) {\n  return zlibBufferSync(new InflateRaw(opts), buffer);\n};\n\nfunction zlibBuffer(engine, buffer, callback) {\n  var buffers = [];\n  var nread = 0;\n\n  engine.on('error', onError);\n  engine.on('end', onEnd);\n\n  engine.end(buffer);\n  flow();\n\n  function flow() {\n    var chunk;\n    while (null !== (chunk = engine.read())) {\n      buffers.push(chunk);\n      nread += chunk.length;\n    }\n    engine.once('readable', flow);\n  }\n\n  function onError(err) {\n    engine.removeListener('end', onEnd);\n    engine.removeListener('readable', flow);\n    callback(err);\n  }\n\n  function onEnd() {\n    var buf;\n    var err = null;\n\n    if (nread >= kMaxLength) {\n      err = new RangeError(kRangeErrorMessage);\n    } else {\n      buf = Buffer.concat(buffers, nread);\n    }\n\n    buffers = [];\n    engine.close();\n    callback(err, buf);\n  }\n}\n\nfunction zlibBufferSync(engine, buffer) {\n  if (typeof buffer === 'string') buffer = Buffer.from(buffer);\n\n  if (!Buffer.isBuffer(buffer)) throw new TypeError('Not a string or buffer');\n\n  var flushFlag = engine._finishFlushFlag;\n\n  return engine._processChunk(buffer, flushFlag);\n}\n\n// generic zlib\n// minimal 2-byte header\nfunction Deflate(opts) {\n  if (!(this instanceof Deflate)) return new Deflate(opts);\n  Zlib.call(this, opts, binding.DEFLATE);\n}\n\nfunction Inflate(opts) {\n  if (!(this instanceof Inflate)) return new Inflate(opts);\n  Zlib.call(this, opts, binding.INFLATE);\n}\n\n// gzip - bigger header, same deflate compression\nfunction Gzip(opts) {\n  if (!(this instanceof Gzip)) return new Gzip(opts);\n  Zlib.call(this, opts, binding.GZIP);\n}\n\nfunction Gunzip(opts) {\n  if (!(this instanceof Gunzip)) return new Gunzip(opts);\n  Zlib.call(this, opts, binding.GUNZIP);\n}\n\n// raw - no header\nfunction DeflateRaw(opts) {\n  if (!(this instanceof DeflateRaw)) return new DeflateRaw(opts);\n  Zlib.call(this, opts, binding.DEFLATERAW);\n}\n\nfunction InflateRaw(opts) {\n  if (!(this instanceof InflateRaw)) return new InflateRaw(opts);\n  Zlib.call(this, opts, binding.INFLATERAW);\n}\n\n// auto-detect header.\nfunction Unzip(opts) {\n  if (!(this instanceof Unzip)) return new Unzip(opts);\n  Zlib.call(this, opts, binding.UNZIP);\n}\n\nfunction isValidFlushFlag(flag) {\n  return flag === binding.Z_NO_FLUSH || flag === binding.Z_PARTIAL_FLUSH || flag === binding.Z_SYNC_FLUSH || flag === binding.Z_FULL_FLUSH || flag === binding.Z_FINISH || flag === binding.Z_BLOCK;\n}\n\n// the Zlib class they all inherit from\n// This thing manages the queue of requests, and returns\n// true or false if there is anything in the queue when\n// you call the .write() method.\n\nfunction Zlib(opts, mode) {\n  var _this = this;\n\n  this._opts = opts = opts || {};\n  this._chunkSize = opts.chunkSize || exports.Z_DEFAULT_CHUNK;\n\n  Transform.call(this, opts);\n\n  if (opts.flush && !isValidFlushFlag(opts.flush)) {\n    throw new Error('Invalid flush flag: ' + opts.flush);\n  }\n  if (opts.finishFlush && !isValidFlushFlag(opts.finishFlush)) {\n    throw new Error('Invalid flush flag: ' + opts.finishFlush);\n  }\n\n  this._flushFlag = opts.flush || binding.Z_NO_FLUSH;\n  this._finishFlushFlag = typeof opts.finishFlush !== 'undefined' ? opts.finishFlush : binding.Z_FINISH;\n\n  if (opts.chunkSize) {\n    if (opts.chunkSize < exports.Z_MIN_CHUNK || opts.chunkSize > exports.Z_MAX_CHUNK) {\n      throw new Error('Invalid chunk size: ' + opts.chunkSize);\n    }\n  }\n\n  if (opts.windowBits) {\n    if (opts.windowBits < exports.Z_MIN_WINDOWBITS || opts.windowBits > exports.Z_MAX_WINDOWBITS) {\n      throw new Error('Invalid windowBits: ' + opts.windowBits);\n    }\n  }\n\n  if (opts.level) {\n    if (opts.level < exports.Z_MIN_LEVEL || opts.level > exports.Z_MAX_LEVEL) {\n      throw new Error('Invalid compression level: ' + opts.level);\n    }\n  }\n\n  if (opts.memLevel) {\n    if (opts.memLevel < exports.Z_MIN_MEMLEVEL || opts.memLevel > exports.Z_MAX_MEMLEVEL) {\n      throw new Error('Invalid memLevel: ' + opts.memLevel);\n    }\n  }\n\n  if (opts.strategy) {\n    if (opts.strategy != exports.Z_FILTERED && opts.strategy != exports.Z_HUFFMAN_ONLY && opts.strategy != exports.Z_RLE && opts.strategy != exports.Z_FIXED && opts.strategy != exports.Z_DEFAULT_STRATEGY) {\n      throw new Error('Invalid strategy: ' + opts.strategy);\n    }\n  }\n\n  if (opts.dictionary) {\n    if (!Buffer.isBuffer(opts.dictionary)) {\n      throw new Error('Invalid dictionary: it should be a Buffer instance');\n    }\n  }\n\n  this._handle = new binding.Zlib(mode);\n\n  var self = this;\n  this._hadError = false;\n  this._handle.onerror = function (message, errno) {\n    // there is no way to cleanly recover.\n    // continuing only obscures problems.\n    _close(self);\n    self._hadError = true;\n\n    var error = new Error(message);\n    error.errno = errno;\n    error.code = exports.codes[errno];\n    self.emit('error', error);\n  };\n\n  var level = exports.Z_DEFAULT_COMPRESSION;\n  if (typeof opts.level === 'number') level = opts.level;\n\n  var strategy = exports.Z_DEFAULT_STRATEGY;\n  if (typeof opts.strategy === 'number') strategy = opts.strategy;\n\n  this._handle.init(opts.windowBits || exports.Z_DEFAULT_WINDOWBITS, level, opts.memLevel || exports.Z_DEFAULT_MEMLEVEL, strategy, opts.dictionary);\n\n  this._buffer = Buffer.allocUnsafe(this._chunkSize);\n  this._offset = 0;\n  this._level = level;\n  this._strategy = strategy;\n\n  this.once('end', this.close);\n\n  Object.defineProperty(this, '_closed', {\n    get: function () {\n      return !_this._handle;\n    },\n    configurable: true,\n    enumerable: true\n  });\n}\n\nutil.inherits(Zlib, Transform);\n\nZlib.prototype.params = function (level, strategy, callback) {\n  if (level < exports.Z_MIN_LEVEL || level > exports.Z_MAX_LEVEL) {\n    throw new RangeError('Invalid compression level: ' + level);\n  }\n  if (strategy != exports.Z_FILTERED && strategy != exports.Z_HUFFMAN_ONLY && strategy != exports.Z_RLE && strategy != exports.Z_FIXED && strategy != exports.Z_DEFAULT_STRATEGY) {\n    throw new TypeError('Invalid strategy: ' + strategy);\n  }\n\n  if (this._level !== level || this._strategy !== strategy) {\n    var self = this;\n    this.flush(binding.Z_SYNC_FLUSH, function () {\n      assert(self._handle, 'zlib binding closed');\n      self._handle.params(level, strategy);\n      if (!self._hadError) {\n        self._level = level;\n        self._strategy = strategy;\n        if (callback) callback();\n      }\n    });\n  } else {\n    process.nextTick(callback);\n  }\n};\n\nZlib.prototype.reset = function () {\n  assert(this._handle, 'zlib binding closed');\n  return this._handle.reset();\n};\n\n// This is the _flush function called by the transform class,\n// internally, when the last chunk has been written.\nZlib.prototype._flush = function (callback) {\n  this._transform(Buffer.alloc(0), '', callback);\n};\n\nZlib.prototype.flush = function (kind, callback) {\n  var _this2 = this;\n\n  var ws = this._writableState;\n\n  if (typeof kind === 'function' || kind === undefined && !callback) {\n    callback = kind;\n    kind = binding.Z_FULL_FLUSH;\n  }\n\n  if (ws.ended) {\n    if (callback) process.nextTick(callback);\n  } else if (ws.ending) {\n    if (callback) this.once('end', callback);\n  } else if (ws.needDrain) {\n    if (callback) {\n      this.once('drain', function () {\n        return _this2.flush(kind, callback);\n      });\n    }\n  } else {\n    this._flushFlag = kind;\n    this.write(Buffer.alloc(0), '', callback);\n  }\n};\n\nZlib.prototype.close = function (callback) {\n  _close(this, callback);\n  process.nextTick(emitCloseNT, this);\n};\n\nfunction _close(engine, callback) {\n  if (callback) process.nextTick(callback);\n\n  // Caller may invoke .close after a zlib error (which will null _handle).\n  if (!engine._handle) return;\n\n  engine._handle.close();\n  engine._handle = null;\n}\n\nfunction emitCloseNT(self) {\n  self.emit('close');\n}\n\nZlib.prototype._transform = function (chunk, encoding, cb) {\n  var flushFlag;\n  var ws = this._writableState;\n  var ending = ws.ending || ws.ended;\n  var last = ending && (!chunk || ws.length === chunk.length);\n\n  if (chunk !== null && !Buffer.isBuffer(chunk)) return cb(new Error('invalid input'));\n\n  if (!this._handle) return cb(new Error('zlib binding closed'));\n\n  // If it's the last chunk, or a final flush, we use the Z_FINISH flush flag\n  // (or whatever flag was provided using opts.finishFlush).\n  // If it's explicitly flushing at some other time, then we use\n  // Z_FULL_FLUSH. Otherwise, use Z_NO_FLUSH for maximum compression\n  // goodness.\n  if (last) flushFlag = this._finishFlushFlag;else {\n    flushFlag = this._flushFlag;\n    // once we've flushed the last of the queue, stop flushing and\n    // go back to the normal behavior.\n    if (chunk.length >= ws.length) {\n      this._flushFlag = this._opts.flush || binding.Z_NO_FLUSH;\n    }\n  }\n\n  this._processChunk(chunk, flushFlag, cb);\n};\n\nZlib.prototype._processChunk = function (chunk, flushFlag, cb) {\n  var availInBefore = chunk && chunk.length;\n  var availOutBefore = this._chunkSize - this._offset;\n  var inOff = 0;\n\n  var self = this;\n\n  var async = typeof cb === 'function';\n\n  if (!async) {\n    var buffers = [];\n    var nread = 0;\n\n    var error;\n    this.on('error', function (er) {\n      error = er;\n    });\n\n    assert(this._handle, 'zlib binding closed');\n    do {\n      var res = this._handle.writeSync(flushFlag, chunk, // in\n      inOff, // in_off\n      availInBefore, // in_len\n      this._buffer, // out\n      this._offset, //out_off\n      availOutBefore); // out_len\n    } while (!this._hadError && callback(res[0], res[1]));\n\n    if (this._hadError) {\n      throw error;\n    }\n\n    if (nread >= kMaxLength) {\n      _close(this);\n      throw new RangeError(kRangeErrorMessage);\n    }\n\n    var buf = Buffer.concat(buffers, nread);\n    _close(this);\n\n    return buf;\n  }\n\n  assert(this._handle, 'zlib binding closed');\n  var req = this._handle.write(flushFlag, chunk, // in\n  inOff, // in_off\n  availInBefore, // in_len\n  this._buffer, // out\n  this._offset, //out_off\n  availOutBefore); // out_len\n\n  req.buffer = chunk;\n  req.callback = callback;\n\n  function callback(availInAfter, availOutAfter) {\n    // When the callback is used in an async write, the callback's\n    // context is the `req` object that was created. The req object\n    // is === this._handle, and that's why it's important to null\n    // out the values after they are done being used. `this._handle`\n    // can stay in memory longer than the callback and buffer are needed.\n    if (this) {\n      this.buffer = null;\n      this.callback = null;\n    }\n\n    if (self._hadError) return;\n\n    var have = availOutBefore - availOutAfter;\n    assert(have >= 0, 'have should not go down');\n\n    if (have > 0) {\n      var out = self._buffer.slice(self._offset, self._offset + have);\n      self._offset += have;\n      // serve some output to the consumer.\n      if (async) {\n        self.push(out);\n      } else {\n        buffers.push(out);\n        nread += out.length;\n      }\n    }\n\n    // exhausted the output buffer, or used all the input create a new one.\n    if (availOutAfter === 0 || self._offset >= self._chunkSize) {\n      availOutBefore = self._chunkSize;\n      self._offset = 0;\n      self._buffer = Buffer.allocUnsafe(self._chunkSize);\n    }\n\n    if (availOutAfter === 0) {\n      // Not actually done.  Need to reprocess.\n      // Also, update the availInBefore to the availInAfter value,\n      // so that if we have to hit it a third (fourth, etc.) time,\n      // it'll have the correct byte counts.\n      inOff += availInBefore - availInAfter;\n      availInBefore = availInAfter;\n\n      if (!async) return true;\n\n      var newReq = self._handle.write(flushFlag, chunk, inOff, availInBefore, self._buffer, self._offset, self._chunkSize);\n      newReq.callback = callback; // this same function\n      newReq.buffer = chunk;\n      return;\n    }\n\n    if (!async) return false;\n\n    // finished with the chunk.\n    cb();\n  }\n};\n\nutil.inherits(Deflate, Zlib);\nutil.inherits(Inflate, Zlib);\nutil.inherits(Gzip, Zlib);\nutil.inherits(Gunzip, Zlib);\nutil.inherits(DeflateRaw, Zlib);\nutil.inherits(InflateRaw, Zlib);\nutil.inherits(Unzip, Zlib);\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ \"../node_modules/process/browser.js\")))\n\n//# sourceURL=webpack:///../node_modules/browserify-zlib/lib/index.js?");

/***/ })

}]);