(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.http-signature"],{

/***/ "../node_modules/http-signature/lib/index.js":
/*!***************************************************!*\
  !*** ../node_modules/http-signature/lib/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Copyright 2015 Joyent, Inc.\n\nvar parser = __webpack_require__(/*! ./parser */ \"../node_modules/http-signature/lib/parser.js\");\nvar signer = __webpack_require__(/*! ./signer */ \"../node_modules/http-signature/lib/signer.js\");\nvar verify = __webpack_require__(/*! ./verify */ \"../node_modules/http-signature/lib/verify.js\");\nvar utils = __webpack_require__(/*! ./utils */ \"../node_modules/http-signature/lib/utils.js\");\n\n\n\n///--- API\n\nmodule.exports = {\n\n  parse: parser.parseRequest,\n  parseRequest: parser.parseRequest,\n\n  sign: signer.signRequest,\n  signRequest: signer.signRequest,\n  createSigner: signer.createSigner,\n  isSigner: signer.isSigner,\n\n  sshKeyToPEM: utils.sshKeyToPEM,\n  sshKeyFingerprint: utils.fingerprint,\n  pemToRsaSSHKey: utils.pemToRsaSSHKey,\n\n  verify: verify.verifySignature,\n  verifySignature: verify.verifySignature,\n  verifyHMAC: verify.verifyHMAC\n};\n\n\n//# sourceURL=webpack:///../node_modules/http-signature/lib/index.js?");

/***/ }),

/***/ "../node_modules/http-signature/lib/parser.js":
/*!****************************************************!*\
  !*** ../node_modules/http-signature/lib/parser.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Copyright 2012 Joyent, Inc.  All rights reserved.\n\nvar assert = __webpack_require__(/*! assert-plus */ \"../node_modules/assert-plus/assert.js\");\nvar util = __webpack_require__(/*! util */ \"../node_modules/util/util.js\");\nvar utils = __webpack_require__(/*! ./utils */ \"../node_modules/http-signature/lib/utils.js\");\n\n\n\n///--- Globals\n\nvar HASH_ALGOS = utils.HASH_ALGOS;\nvar PK_ALGOS = utils.PK_ALGOS;\nvar HttpSignatureError = utils.HttpSignatureError;\nvar InvalidAlgorithmError = utils.InvalidAlgorithmError;\nvar validateAlgorithm = utils.validateAlgorithm;\n\nvar State = {\n  New: 0,\n  Params: 1\n};\n\nvar ParamsState = {\n  Name: 0,\n  Quote: 1,\n  Value: 2,\n  Comma: 3\n};\n\n\n///--- Specific Errors\n\n\nfunction ExpiredRequestError(message) {\n  HttpSignatureError.call(this, message, ExpiredRequestError);\n}\nutil.inherits(ExpiredRequestError, HttpSignatureError);\n\n\nfunction InvalidHeaderError(message) {\n  HttpSignatureError.call(this, message, InvalidHeaderError);\n}\nutil.inherits(InvalidHeaderError, HttpSignatureError);\n\n\nfunction InvalidParamsError(message) {\n  HttpSignatureError.call(this, message, InvalidParamsError);\n}\nutil.inherits(InvalidParamsError, HttpSignatureError);\n\n\nfunction MissingHeaderError(message) {\n  HttpSignatureError.call(this, message, MissingHeaderError);\n}\nutil.inherits(MissingHeaderError, HttpSignatureError);\n\nfunction StrictParsingError(message) {\n  HttpSignatureError.call(this, message, StrictParsingError);\n}\nutil.inherits(StrictParsingError, HttpSignatureError);\n\n///--- Exported API\n\nmodule.exports = {\n\n  /**\n   * Parses the 'Authorization' header out of an http.ServerRequest object.\n   *\n   * Note that this API will fully validate the Authorization header, and throw\n   * on any error.  It will not however check the signature, or the keyId format\n   * as those are specific to your environment.  You can use the options object\n   * to pass in extra constraints.\n   *\n   * As a response object you can expect this:\n   *\n   *     {\n   *       \"scheme\": \"Signature\",\n   *       \"params\": {\n   *         \"keyId\": \"foo\",\n   *         \"algorithm\": \"rsa-sha256\",\n   *         \"headers\": [\n   *           \"date\" or \"x-date\",\n   *           \"digest\"\n   *         ],\n   *         \"signature\": \"base64\"\n   *       },\n   *       \"signingString\": \"ready to be passed to crypto.verify()\"\n   *     }\n   *\n   * @param {Object} request an http.ServerRequest.\n   * @param {Object} options an optional options object with:\n   *                   - clockSkew: allowed clock skew in seconds (default 300).\n   *                   - headers: required header names (def: date or x-date)\n   *                   - algorithms: algorithms to support (default: all).\n   *                   - strict: should enforce latest spec parsing\n   *                             (default: false).\n   * @return {Object} parsed out object (see above).\n   * @throws {TypeError} on invalid input.\n   * @throws {InvalidHeaderError} on an invalid Authorization header error.\n   * @throws {InvalidParamsError} if the params in the scheme are invalid.\n   * @throws {MissingHeaderError} if the params indicate a header not present,\n   *                              either in the request headers from the params,\n   *                              or not in the params from a required header\n   *                              in options.\n   * @throws {StrictParsingError} if old attributes are used in strict parsing\n   *                              mode.\n   * @throws {ExpiredRequestError} if the value of date or x-date exceeds skew.\n   */\n  parseRequest: function parseRequest(request, options) {\n    assert.object(request, 'request');\n    assert.object(request.headers, 'request.headers');\n    if (options === undefined) {\n      options = {};\n    }\n    if (options.headers === undefined) {\n      options.headers = [request.headers['x-date'] ? 'x-date' : 'date'];\n    }\n    assert.object(options, 'options');\n    assert.arrayOfString(options.headers, 'options.headers');\n    assert.optionalFinite(options.clockSkew, 'options.clockSkew');\n\n    var authzHeaderName = options.authorizationHeaderName || 'authorization';\n\n    if (!request.headers[authzHeaderName]) {\n      throw new MissingHeaderError('no ' + authzHeaderName + ' header ' +\n                                   'present in the request');\n    }\n\n    options.clockSkew = options.clockSkew || 300;\n\n\n    var i = 0;\n    var state = State.New;\n    var substate = ParamsState.Name;\n    var tmpName = '';\n    var tmpValue = '';\n\n    var parsed = {\n      scheme: '',\n      params: {},\n      signingString: ''\n    };\n\n    var authz = request.headers[authzHeaderName];\n    for (i = 0; i < authz.length; i++) {\n      var c = authz.charAt(i);\n\n      switch (Number(state)) {\n\n      case State.New:\n        if (c !== ' ') parsed.scheme += c;\n        else state = State.Params;\n        break;\n\n      case State.Params:\n        switch (Number(substate)) {\n\n        case ParamsState.Name:\n          var code = c.charCodeAt(0);\n          // restricted name of A-Z / a-z\n          if ((code >= 0x41 && code <= 0x5a) || // A-Z\n              (code >= 0x61 && code <= 0x7a)) { // a-z\n            tmpName += c;\n          } else if (c === '=') {\n            if (tmpName.length === 0)\n              throw new InvalidHeaderError('bad param format');\n            substate = ParamsState.Quote;\n          } else {\n            throw new InvalidHeaderError('bad param format');\n          }\n          break;\n\n        case ParamsState.Quote:\n          if (c === '\"') {\n            tmpValue = '';\n            substate = ParamsState.Value;\n          } else {\n            throw new InvalidHeaderError('bad param format');\n          }\n          break;\n\n        case ParamsState.Value:\n          if (c === '\"') {\n            parsed.params[tmpName] = tmpValue;\n            substate = ParamsState.Comma;\n          } else {\n            tmpValue += c;\n          }\n          break;\n\n        case ParamsState.Comma:\n          if (c === ',') {\n            tmpName = '';\n            substate = ParamsState.Name;\n          } else {\n            throw new InvalidHeaderError('bad param format');\n          }\n          break;\n\n        default:\n          throw new Error('Invalid substate');\n        }\n        break;\n\n      default:\n        throw new Error('Invalid substate');\n      }\n\n    }\n\n    if (!parsed.params.headers || parsed.params.headers === '') {\n      if (request.headers['x-date']) {\n        parsed.params.headers = ['x-date'];\n      } else {\n        parsed.params.headers = ['date'];\n      }\n    } else {\n      parsed.params.headers = parsed.params.headers.split(' ');\n    }\n\n    // Minimally validate the parsed object\n    if (!parsed.scheme || parsed.scheme !== 'Signature')\n      throw new InvalidHeaderError('scheme was not \"Signature\"');\n\n    if (!parsed.params.keyId)\n      throw new InvalidHeaderError('keyId was not specified');\n\n    if (!parsed.params.algorithm)\n      throw new InvalidHeaderError('algorithm was not specified');\n\n    if (!parsed.params.signature)\n      throw new InvalidHeaderError('signature was not specified');\n\n    // Check the algorithm against the official list\n    parsed.params.algorithm = parsed.params.algorithm.toLowerCase();\n    try {\n      validateAlgorithm(parsed.params.algorithm);\n    } catch (e) {\n      if (e instanceof InvalidAlgorithmError)\n        throw (new InvalidParamsError(parsed.params.algorithm + ' is not ' +\n          'supported'));\n      else\n        throw (e);\n    }\n\n    // Build the signingString\n    for (i = 0; i < parsed.params.headers.length; i++) {\n      var h = parsed.params.headers[i].toLowerCase();\n      parsed.params.headers[i] = h;\n\n      if (h === 'request-line') {\n        if (!options.strict) {\n          /*\n           * We allow headers from the older spec drafts if strict parsing isn't\n           * specified in options.\n           */\n          parsed.signingString +=\n            request.method + ' ' + request.url + ' HTTP/' + request.httpVersion;\n        } else {\n          /* Strict parsing doesn't allow older draft headers. */\n          throw (new StrictParsingError('request-line is not a valid header ' +\n            'with strict parsing enabled.'));\n        }\n      } else if (h === '(request-target)') {\n        parsed.signingString +=\n          '(request-target): ' + request.method.toLowerCase() + ' ' +\n          request.url;\n      } else {\n        var value = request.headers[h];\n        if (value === undefined)\n          throw new MissingHeaderError(h + ' was not in the request');\n        parsed.signingString += h + ': ' + value;\n      }\n\n      if ((i + 1) < parsed.params.headers.length)\n        parsed.signingString += '\\n';\n    }\n\n    // Check against the constraints\n    var date;\n    if (request.headers.date || request.headers['x-date']) {\n        if (request.headers['x-date']) {\n          date = new Date(request.headers['x-date']);\n        } else {\n          date = new Date(request.headers.date);\n        }\n      var now = new Date();\n      var skew = Math.abs(now.getTime() - date.getTime());\n\n      if (skew > options.clockSkew * 1000) {\n        throw new ExpiredRequestError('clock skew of ' +\n                                      (skew / 1000) +\n                                      's was greater than ' +\n                                      options.clockSkew + 's');\n      }\n    }\n\n    options.headers.forEach(function (hdr) {\n      // Remember that we already checked any headers in the params\n      // were in the request, so if this passes we're good.\n      if (parsed.params.headers.indexOf(hdr.toLowerCase()) < 0)\n        throw new MissingHeaderError(hdr + ' was not a signed header');\n    });\n\n    if (options.algorithms) {\n      if (options.algorithms.indexOf(parsed.params.algorithm) === -1)\n        throw new InvalidParamsError(parsed.params.algorithm +\n                                     ' is not a supported algorithm');\n    }\n\n    parsed.algorithm = parsed.params.algorithm.toUpperCase();\n    parsed.keyId = parsed.params.keyId;\n    return parsed;\n  }\n\n};\n\n\n//# sourceURL=webpack:///../node_modules/http-signature/lib/parser.js?");

/***/ }),

/***/ "../node_modules/http-signature/lib/signer.js":
/*!****************************************************!*\
  !*** ../node_modules/http-signature/lib/signer.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(Buffer) {// Copyright 2012 Joyent, Inc.  All rights reserved.\n\nvar assert = __webpack_require__(/*! assert-plus */ \"../node_modules/assert-plus/assert.js\");\nvar crypto = __webpack_require__(/*! crypto */ \"../node_modules/crypto-browserify/index.js\");\nvar http = __webpack_require__(/*! http */ \"../node_modules/stream-http/index.js\");\nvar util = __webpack_require__(/*! util */ \"../node_modules/util/util.js\");\nvar sshpk = __webpack_require__(/*! sshpk */ \"../node_modules/sshpk/lib/index.js\");\nvar jsprim = __webpack_require__(/*! jsprim */ \"../node_modules/jsprim/lib/jsprim.js\");\nvar utils = __webpack_require__(/*! ./utils */ \"../node_modules/http-signature/lib/utils.js\");\n\nvar sprintf = __webpack_require__(/*! util */ \"../node_modules/util/util.js\").format;\n\nvar HASH_ALGOS = utils.HASH_ALGOS;\nvar PK_ALGOS = utils.PK_ALGOS;\nvar InvalidAlgorithmError = utils.InvalidAlgorithmError;\nvar HttpSignatureError = utils.HttpSignatureError;\nvar validateAlgorithm = utils.validateAlgorithm;\n\n///--- Globals\n\nvar AUTHZ_FMT =\n  'Signature keyId=\"%s\",algorithm=\"%s\",headers=\"%s\",signature=\"%s\"';\n\n///--- Specific Errors\n\nfunction MissingHeaderError(message) {\n  HttpSignatureError.call(this, message, MissingHeaderError);\n}\nutil.inherits(MissingHeaderError, HttpSignatureError);\n\nfunction StrictParsingError(message) {\n  HttpSignatureError.call(this, message, StrictParsingError);\n}\nutil.inherits(StrictParsingError, HttpSignatureError);\n\n/* See createSigner() */\nfunction RequestSigner(options) {\n  assert.object(options, 'options');\n\n  var alg = [];\n  if (options.algorithm !== undefined) {\n    assert.string(options.algorithm, 'options.algorithm');\n    alg = validateAlgorithm(options.algorithm);\n  }\n  this.rs_alg = alg;\n\n  /*\n   * RequestSigners come in two varieties: ones with an rs_signFunc, and ones\n   * with an rs_signer.\n   *\n   * rs_signFunc-based RequestSigners have to build up their entire signing\n   * string within the rs_lines array and give it to rs_signFunc as a single\n   * concat'd blob. rs_signer-based RequestSigners can add a line at a time to\n   * their signing state by using rs_signer.update(), thus only needing to\n   * buffer the hash function state and one line at a time.\n   */\n  if (options.sign !== undefined) {\n    assert.func(options.sign, 'options.sign');\n    this.rs_signFunc = options.sign;\n\n  } else if (alg[0] === 'hmac' && options.key !== undefined) {\n    assert.string(options.keyId, 'options.keyId');\n    this.rs_keyId = options.keyId;\n\n    if (typeof (options.key) !== 'string' && !Buffer.isBuffer(options.key))\n      throw (new TypeError('options.key for HMAC must be a string or Buffer'));\n\n    /*\n     * Make an rs_signer for HMACs, not a rs_signFunc -- HMACs digest their\n     * data in chunks rather than requiring it all to be given in one go\n     * at the end, so they are more similar to signers than signFuncs.\n     */\n    this.rs_signer = crypto.createHmac(alg[1].toUpperCase(), options.key);\n    this.rs_signer.sign = function () {\n      var digest = this.digest('base64');\n      return ({\n        hashAlgorithm: alg[1],\n        toString: function () { return (digest); }\n      });\n    };\n\n  } else if (options.key !== undefined) {\n    var key = options.key;\n    if (typeof (key) === 'string' || Buffer.isBuffer(key))\n      key = sshpk.parsePrivateKey(key);\n\n    assert.ok(sshpk.PrivateKey.isPrivateKey(key, [1, 2]),\n      'options.key must be a sshpk.PrivateKey');\n    this.rs_key = key;\n\n    assert.string(options.keyId, 'options.keyId');\n    this.rs_keyId = options.keyId;\n\n    if (!PK_ALGOS[key.type]) {\n      throw (new InvalidAlgorithmError(key.type.toUpperCase() + ' type ' +\n        'keys are not supported'));\n    }\n\n    if (alg[0] !== undefined && key.type !== alg[0]) {\n      throw (new InvalidAlgorithmError('options.key must be a ' +\n        alg[0].toUpperCase() + ' key, was given a ' +\n        key.type.toUpperCase() + ' key instead'));\n    }\n\n    this.rs_signer = key.createSign(alg[1]);\n\n  } else {\n    throw (new TypeError('options.sign (func) or options.key is required'));\n  }\n\n  this.rs_headers = [];\n  this.rs_lines = [];\n}\n\n/**\n * Adds a header to be signed, with its value, into this signer.\n *\n * @param {String} header\n * @param {String} value\n * @return {String} value written\n */\nRequestSigner.prototype.writeHeader = function (header, value) {\n  assert.string(header, 'header');\n  header = header.toLowerCase();\n  assert.string(value, 'value');\n\n  this.rs_headers.push(header);\n\n  if (this.rs_signFunc) {\n    this.rs_lines.push(header + ': ' + value);\n\n  } else {\n    var line = header + ': ' + value;\n    if (this.rs_headers.length > 0)\n      line = '\\n' + line;\n    this.rs_signer.update(line);\n  }\n\n  return (value);\n};\n\n/**\n * Adds a default Date header, returning its value.\n *\n * @return {String}\n */\nRequestSigner.prototype.writeDateHeader = function () {\n  return (this.writeHeader('date', jsprim.rfc1123(new Date())));\n};\n\n/**\n * Adds the request target line to be signed.\n *\n * @param {String} method, HTTP method (e.g. 'get', 'post', 'put')\n * @param {String} path\n */\nRequestSigner.prototype.writeTarget = function (method, path) {\n  assert.string(method, 'method');\n  assert.string(path, 'path');\n  method = method.toLowerCase();\n  this.writeHeader('(request-target)', method + ' ' + path);\n};\n\n/**\n * Calculate the value for the Authorization header on this request\n * asynchronously.\n *\n * @param {Func} callback (err, authz)\n */\nRequestSigner.prototype.sign = function (cb) {\n  assert.func(cb, 'callback');\n\n  if (this.rs_headers.length < 1)\n    throw (new Error('At least one header must be signed'));\n\n  var alg, authz;\n  if (this.rs_signFunc) {\n    var data = this.rs_lines.join('\\n');\n    var self = this;\n    this.rs_signFunc(data, function (err, sig) {\n      if (err) {\n        cb(err);\n        return;\n      }\n      try {\n        assert.object(sig, 'signature');\n        assert.string(sig.keyId, 'signature.keyId');\n        assert.string(sig.algorithm, 'signature.algorithm');\n        assert.string(sig.signature, 'signature.signature');\n        alg = validateAlgorithm(sig.algorithm);\n\n        authz = sprintf(AUTHZ_FMT,\n          sig.keyId,\n          sig.algorithm,\n          self.rs_headers.join(' '),\n          sig.signature);\n      } catch (e) {\n        cb(e);\n        return;\n      }\n      cb(null, authz);\n    });\n\n  } else {\n    try {\n      var sigObj = this.rs_signer.sign();\n    } catch (e) {\n      cb(e);\n      return;\n    }\n    alg = (this.rs_alg[0] || this.rs_key.type) + '-' + sigObj.hashAlgorithm;\n    var signature = sigObj.toString();\n    authz = sprintf(AUTHZ_FMT,\n      this.rs_keyId,\n      alg,\n      this.rs_headers.join(' '),\n      signature);\n    cb(null, authz);\n  }\n};\n\n///--- Exported API\n\nmodule.exports = {\n  /**\n   * Identifies whether a given object is a request signer or not.\n   *\n   * @param {Object} object, the object to identify\n   * @returns {Boolean}\n   */\n  isSigner: function (obj) {\n    if (typeof (obj) === 'object' && obj instanceof RequestSigner)\n      return (true);\n    return (false);\n  },\n\n  /**\n   * Creates a request signer, used to asynchronously build a signature\n   * for a request (does not have to be an http.ClientRequest).\n   *\n   * @param {Object} options, either:\n   *                   - {String} keyId\n   *                   - {String|Buffer} key\n   *                   - {String} algorithm (optional, required for HMAC)\n   *                 or:\n   *                   - {Func} sign (data, cb)\n   * @return {RequestSigner}\n   */\n  createSigner: function createSigner(options) {\n    return (new RequestSigner(options));\n  },\n\n  /**\n   * Adds an 'Authorization' header to an http.ClientRequest object.\n   *\n   * Note that this API will add a Date header if it's not already set. Any\n   * other headers in the options.headers array MUST be present, or this\n   * will throw.\n   *\n   * You shouldn't need to check the return type; it's just there if you want\n   * to be pedantic.\n   *\n   * The optional flag indicates whether parsing should use strict enforcement\n   * of the version draft-cavage-http-signatures-04 of the spec or beyond.\n   * The default is to be loose and support\n   * older versions for compatibility.\n   *\n   * @param {Object} request an instance of http.ClientRequest.\n   * @param {Object} options signing parameters object:\n   *                   - {String} keyId required.\n   *                   - {String} key required (either a PEM or HMAC key).\n   *                   - {Array} headers optional; defaults to ['date'].\n   *                   - {String} algorithm optional (unless key is HMAC);\n   *                              default is the same as the sshpk default\n   *                              signing algorithm for the type of key given\n   *                   - {String} httpVersion optional; defaults to '1.1'.\n   *                   - {Boolean} strict optional; defaults to 'false'.\n   * @return {Boolean} true if Authorization (and optionally Date) were added.\n   * @throws {TypeError} on bad parameter types (input).\n   * @throws {InvalidAlgorithmError} if algorithm was bad or incompatible with\n   *                                 the given key.\n   * @throws {sshpk.KeyParseError} if key was bad.\n   * @throws {MissingHeaderError} if a header to be signed was specified but\n   *                              was not present.\n   */\n  signRequest: function signRequest(request, options) {\n    assert.object(request, 'request');\n    assert.object(options, 'options');\n    assert.optionalString(options.algorithm, 'options.algorithm');\n    assert.string(options.keyId, 'options.keyId');\n    assert.optionalArrayOfString(options.headers, 'options.headers');\n    assert.optionalString(options.httpVersion, 'options.httpVersion');\n\n    if (!request.getHeader('Date'))\n      request.setHeader('Date', jsprim.rfc1123(new Date()));\n    if (!options.headers)\n      options.headers = ['date'];\n    if (!options.httpVersion)\n      options.httpVersion = '1.1';\n\n    var alg = [];\n    if (options.algorithm) {\n      options.algorithm = options.algorithm.toLowerCase();\n      alg = validateAlgorithm(options.algorithm);\n    }\n\n    var i;\n    var stringToSign = '';\n    for (i = 0; i < options.headers.length; i++) {\n      if (typeof (options.headers[i]) !== 'string')\n        throw new TypeError('options.headers must be an array of Strings');\n\n      var h = options.headers[i].toLowerCase();\n\n      if (h === 'request-line') {\n        if (!options.strict) {\n          /**\n           * We allow headers from the older spec drafts if strict parsing isn't\n           * specified in options.\n           */\n          stringToSign +=\n            request.method + ' ' + request.path + ' HTTP/' +\n            options.httpVersion;\n        } else {\n          /* Strict parsing doesn't allow older draft headers. */\n          throw (new StrictParsingError('request-line is not a valid header ' +\n            'with strict parsing enabled.'));\n        }\n      } else if (h === '(request-target)') {\n        stringToSign +=\n          '(request-target): ' + request.method.toLowerCase() + ' ' +\n          request.path;\n      } else {\n        var value = request.getHeader(h);\n        if (value === undefined || value === '') {\n          throw new MissingHeaderError(h + ' was not in the request');\n        }\n        stringToSign += h + ': ' + value;\n      }\n\n      if ((i + 1) < options.headers.length)\n        stringToSign += '\\n';\n    }\n\n    /* This is just for unit tests. */\n    if (request.hasOwnProperty('_stringToSign')) {\n      request._stringToSign = stringToSign;\n    }\n\n    var signature;\n    if (alg[0] === 'hmac') {\n      if (typeof (options.key) !== 'string' && !Buffer.isBuffer(options.key))\n        throw (new TypeError('options.key must be a string or Buffer'));\n\n      var hmac = crypto.createHmac(alg[1].toUpperCase(), options.key);\n      hmac.update(stringToSign);\n      signature = hmac.digest('base64');\n\n    } else {\n      var key = options.key;\n      if (typeof (key) === 'string' || Buffer.isBuffer(key))\n        key = sshpk.parsePrivateKey(options.key);\n\n      assert.ok(sshpk.PrivateKey.isPrivateKey(key, [1, 2]),\n        'options.key must be a sshpk.PrivateKey');\n\n      if (!PK_ALGOS[key.type]) {\n        throw (new InvalidAlgorithmError(key.type.toUpperCase() + ' type ' +\n          'keys are not supported'));\n      }\n\n      if (alg[0] !== undefined && key.type !== alg[0]) {\n        throw (new InvalidAlgorithmError('options.key must be a ' +\n          alg[0].toUpperCase() + ' key, was given a ' +\n          key.type.toUpperCase() + ' key instead'));\n      }\n\n      var signer = key.createSign(alg[1]);\n      signer.update(stringToSign);\n      var sigObj = signer.sign();\n      if (!HASH_ALGOS[sigObj.hashAlgorithm]) {\n        throw (new InvalidAlgorithmError(sigObj.hashAlgorithm.toUpperCase() +\n          ' is not a supported hash algorithm'));\n      }\n      options.algorithm = key.type + '-' + sigObj.hashAlgorithm;\n      signature = sigObj.toString();\n      assert.notStrictEqual(signature, '', 'empty signature produced');\n    }\n\n    var authzHeaderName = options.authorizationHeaderName || 'Authorization';\n\n    request.setHeader(authzHeaderName, sprintf(AUTHZ_FMT,\n                                               options.keyId,\n                                               options.algorithm,\n                                               options.headers.join(' '),\n                                               signature));\n\n    return true;\n  }\n\n};\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../buffer/index.js */ \"../node_modules/buffer/index.js\").Buffer))\n\n//# sourceURL=webpack:///../node_modules/http-signature/lib/signer.js?");

/***/ }),

/***/ "../node_modules/http-signature/lib/utils.js":
/*!***************************************************!*\
  !*** ../node_modules/http-signature/lib/utils.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Copyright 2012 Joyent, Inc.  All rights reserved.\n\nvar assert = __webpack_require__(/*! assert-plus */ \"../node_modules/assert-plus/assert.js\");\nvar sshpk = __webpack_require__(/*! sshpk */ \"../node_modules/sshpk/lib/index.js\");\nvar util = __webpack_require__(/*! util */ \"../node_modules/util/util.js\");\n\nvar HASH_ALGOS = {\n  'sha1': true,\n  'sha256': true,\n  'sha512': true\n};\n\nvar PK_ALGOS = {\n  'rsa': true,\n  'dsa': true,\n  'ecdsa': true\n};\n\nfunction HttpSignatureError(message, caller) {\n  if (Error.captureStackTrace)\n    Error.captureStackTrace(this, caller || HttpSignatureError);\n\n  this.message = message;\n  this.name = caller.name;\n}\nutil.inherits(HttpSignatureError, Error);\n\nfunction InvalidAlgorithmError(message) {\n  HttpSignatureError.call(this, message, InvalidAlgorithmError);\n}\nutil.inherits(InvalidAlgorithmError, HttpSignatureError);\n\nfunction validateAlgorithm(algorithm) {\n  var alg = algorithm.toLowerCase().split('-');\n\n  if (alg.length !== 2) {\n    throw (new InvalidAlgorithmError(alg[0].toUpperCase() + ' is not a ' +\n      'valid algorithm'));\n  }\n\n  if (alg[0] !== 'hmac' && !PK_ALGOS[alg[0]]) {\n    throw (new InvalidAlgorithmError(alg[0].toUpperCase() + ' type keys ' +\n      'are not supported'));\n  }\n\n  if (!HASH_ALGOS[alg[1]]) {\n    throw (new InvalidAlgorithmError(alg[1].toUpperCase() + ' is not a ' +\n      'supported hash algorithm'));\n  }\n\n  return (alg);\n}\n\n///--- API\n\nmodule.exports = {\n\n  HASH_ALGOS: HASH_ALGOS,\n  PK_ALGOS: PK_ALGOS,\n\n  HttpSignatureError: HttpSignatureError,\n  InvalidAlgorithmError: InvalidAlgorithmError,\n\n  validateAlgorithm: validateAlgorithm,\n\n  /**\n   * Converts an OpenSSH public key (rsa only) to a PKCS#8 PEM file.\n   *\n   * The intent of this module is to interoperate with OpenSSL only,\n   * specifically the node crypto module's `verify` method.\n   *\n   * @param {String} key an OpenSSH public key.\n   * @return {String} PEM encoded form of the RSA public key.\n   * @throws {TypeError} on bad input.\n   * @throws {Error} on invalid ssh key formatted data.\n   */\n  sshKeyToPEM: function sshKeyToPEM(key) {\n    assert.string(key, 'ssh_key');\n\n    var k = sshpk.parseKey(key, 'ssh');\n    return (k.toString('pem'));\n  },\n\n\n  /**\n   * Generates an OpenSSH fingerprint from an ssh public key.\n   *\n   * @param {String} key an OpenSSH public key.\n   * @return {String} key fingerprint.\n   * @throws {TypeError} on bad input.\n   * @throws {Error} if what you passed doesn't look like an ssh public key.\n   */\n  fingerprint: function fingerprint(key) {\n    assert.string(key, 'ssh_key');\n\n    var k = sshpk.parseKey(key, 'ssh');\n    return (k.fingerprint('md5').toString('hex'));\n  },\n\n  /**\n   * Converts a PKGCS#8 PEM file to an OpenSSH public key (rsa)\n   *\n   * The reverse of the above function.\n   */\n  pemToRsaSSHKey: function pemToRsaSSHKey(pem, comment) {\n    assert.equal('string', typeof (pem), 'typeof pem');\n\n    var k = sshpk.parseKey(pem, 'pem');\n    k.comment = comment;\n    return (k.toString('ssh'));\n  }\n};\n\n\n//# sourceURL=webpack:///../node_modules/http-signature/lib/utils.js?");

/***/ }),

/***/ "../node_modules/http-signature/lib/verify.js":
/*!****************************************************!*\
  !*** ../node_modules/http-signature/lib/verify.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(Buffer) {// Copyright 2015 Joyent, Inc.\n\nvar assert = __webpack_require__(/*! assert-plus */ \"../node_modules/assert-plus/assert.js\");\nvar crypto = __webpack_require__(/*! crypto */ \"../node_modules/crypto-browserify/index.js\");\nvar sshpk = __webpack_require__(/*! sshpk */ \"../node_modules/sshpk/lib/index.js\");\nvar utils = __webpack_require__(/*! ./utils */ \"../node_modules/http-signature/lib/utils.js\");\n\nvar HASH_ALGOS = utils.HASH_ALGOS;\nvar PK_ALGOS = utils.PK_ALGOS;\nvar InvalidAlgorithmError = utils.InvalidAlgorithmError;\nvar HttpSignatureError = utils.HttpSignatureError;\nvar validateAlgorithm = utils.validateAlgorithm;\n\n///--- Exported API\n\nmodule.exports = {\n  /**\n   * Verify RSA/DSA signature against public key.  You are expected to pass in\n   * an object that was returned from `parse()`.\n   *\n   * @param {Object} parsedSignature the object you got from `parse`.\n   * @param {String} pubkey RSA/DSA private key PEM.\n   * @return {Boolean} true if valid, false otherwise.\n   * @throws {TypeError} if you pass in bad arguments.\n   * @throws {InvalidAlgorithmError}\n   */\n  verifySignature: function verifySignature(parsedSignature, pubkey) {\n    assert.object(parsedSignature, 'parsedSignature');\n    if (typeof (pubkey) === 'string' || Buffer.isBuffer(pubkey))\n      pubkey = sshpk.parseKey(pubkey);\n    assert.ok(sshpk.Key.isKey(pubkey, [1, 1]), 'pubkey must be a sshpk.Key');\n\n    var alg = validateAlgorithm(parsedSignature.algorithm);\n    if (alg[0] === 'hmac' || alg[0] !== pubkey.type)\n      return (false);\n\n    var v = pubkey.createVerify(alg[1]);\n    v.update(parsedSignature.signingString);\n    return (v.verify(parsedSignature.params.signature, 'base64'));\n  },\n\n  /**\n   * Verify HMAC against shared secret.  You are expected to pass in an object\n   * that was returned from `parse()`.\n   *\n   * @param {Object} parsedSignature the object you got from `parse`.\n   * @param {String} secret HMAC shared secret.\n   * @return {Boolean} true if valid, false otherwise.\n   * @throws {TypeError} if you pass in bad arguments.\n   * @throws {InvalidAlgorithmError}\n   */\n  verifyHMAC: function verifyHMAC(parsedSignature, secret) {\n    assert.object(parsedSignature, 'parsedHMAC');\n    assert.string(secret, 'secret');\n\n    var alg = validateAlgorithm(parsedSignature.algorithm);\n    if (alg[0] !== 'hmac')\n      return (false);\n\n    var hashAlg = alg[1].toUpperCase();\n\n    var hmac = crypto.createHmac(hashAlg, secret);\n    hmac.update(parsedSignature.signingString);\n\n    /*\n     * Now double-hash to avoid leaking timing information - there's\n     * no easy constant-time compare in JS, so we use this approach\n     * instead. See for more info:\n     * https://www.isecpartners.com/blog/2011/february/double-hmac-\n     * verification.aspx\n     */\n    var h1 = crypto.createHmac(hashAlg, secret);\n    h1.update(hmac.digest());\n    h1 = h1.digest();\n    var h2 = crypto.createHmac(hashAlg, secret);\n    h2.update(new Buffer(parsedSignature.params.signature, 'base64'));\n    h2 = h2.digest();\n\n    /* Node 0.8 returns strings from .digest(). */\n    if (typeof (h1) === 'string')\n      return (h1 === h2);\n    /* And node 0.10 lacks the .equals() method on Buffers. */\n    if (Buffer.isBuffer(h1) && !h1.equals)\n      return (h1.toString('binary') === h2.toString('binary'));\n\n    return (h1.equals(h2));\n  }\n};\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../buffer/index.js */ \"../node_modules/buffer/index.js\").Buffer))\n\n//# sourceURL=webpack:///../node_modules/http-signature/lib/verify.js?");

/***/ })

}]);