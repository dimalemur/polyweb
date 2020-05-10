(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.gauge"],{

/***/ "../node_modules/gauge/base-theme.js":
/*!*******************************************!*\
  !*** ../node_modules/gauge/base-theme.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar spin = __webpack_require__(/*! ./spin.js */ \"../node_modules/gauge/spin.js\")\nvar progressBar = __webpack_require__(/*! ./progress-bar.js */ \"../node_modules/gauge/progress-bar.js\")\n\nmodule.exports = {\n  activityIndicator: function (values, theme, width) {\n    if (values.spun == null) return\n    return spin(theme, values.spun)\n  },\n  progressbar: function (values, theme, width) {\n    if (values.completed == null) return\n    return progressBar(theme, width, values.completed)\n  }\n}\n\n\n//# sourceURL=webpack:///../node_modules/gauge/base-theme.js?");

/***/ }),

/***/ "../node_modules/gauge/error.js":
/*!**************************************!*\
  !*** ../node_modules/gauge/error.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar util = __webpack_require__(/*! util */ \"../node_modules/util/util.js\")\n\nvar User = exports.User = function User (msg) {\n  var err = new Error(msg)\n  Error.captureStackTrace(err, User)\n  err.code = 'EGAUGE'\n  return err\n}\n\nexports.MissingTemplateValue = function MissingTemplateValue (item, values) {\n  var err = new User(util.format('Missing template value \"%s\"', item.type))\n  Error.captureStackTrace(err, MissingTemplateValue)\n  err.template = item\n  err.values = values\n  return err\n}\n\nexports.Internal = function Internal (msg) {\n  var err = new Error(msg)\n  Error.captureStackTrace(err, Internal)\n  err.code = 'EGAUGEINTERNAL'\n  return err\n}\n\n\n//# sourceURL=webpack:///../node_modules/gauge/error.js?");

/***/ }),

/***/ "../node_modules/gauge/has-color.js":
/*!******************************************!*\
  !*** ../node_modules/gauge/has-color.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(process) {\n\nmodule.exports = isWin32() || isColorTerm()\n\nfunction isWin32 () {\n  return process.platform === 'win32'\n}\n\nfunction isColorTerm () {\n  var termHasColor = /^screen|^xterm|^vt100|color|ansi|cygwin|linux/i\n  return !!process.env.COLORTERM || termHasColor.test(process.env.TERM)\n}\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../process/browser.js */ \"../node_modules/process/browser.js\")))\n\n//# sourceURL=webpack:///../node_modules/gauge/has-color.js?");

/***/ }),

/***/ "../node_modules/gauge/index.js":
/*!**************************************!*\
  !*** ../node_modules/gauge/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar Plumbing = __webpack_require__(/*! ./plumbing.js */ \"../node_modules/gauge/plumbing.js\")\nvar hasUnicode = __webpack_require__(/*! has-unicode */ \"../node_modules/has-unicode/index.js\")\nvar hasColor = __webpack_require__(/*! ./has-color.js */ \"../node_modules/gauge/has-color.js\")\nvar onExit = __webpack_require__(/*! signal-exit */ \"../node_modules/signal-exit/index.js\")\nvar defaultThemes = __webpack_require__(/*! ./themes */ \"../node_modules/gauge/themes.js\")\nvar setInterval = __webpack_require__(/*! ./set-interval.js */ \"../node_modules/gauge/set-interval.js\")\nvar process = __webpack_require__(/*! ./process.js */ \"../node_modules/gauge/process.js\")\nvar setImmediate = __webpack_require__(/*! ./set-immediate */ \"../node_modules/gauge/set-immediate.js\")\n\nmodule.exports = Gauge\n\nfunction callWith (obj, method) {\n  return function () {\n    return method.call(obj)\n  }\n}\n\nfunction Gauge (arg1, arg2) {\n  var options, writeTo\n  if (arg1 && arg1.write) {\n    writeTo = arg1\n    options = arg2 || {}\n  } else if (arg2 && arg2.write) {\n    writeTo = arg2\n    options = arg1 || {}\n  } else {\n    writeTo = process.stderr\n    options = arg1 || arg2 || {}\n  }\n\n  this._status = {\n    spun: 0,\n    section: '',\n    subsection: ''\n  }\n  this._paused = false // are we paused for back pressure?\n  this._disabled = true // are all progress bar updates disabled?\n  this._showing = false // do we WANT the progress bar on screen\n  this._onScreen = false // IS the progress bar on screen\n  this._needsRedraw = false // should we print something at next tick?\n  this._hideCursor = options.hideCursor == null ? true : options.hideCursor\n  this._fixedFramerate = options.fixedFramerate == null\n    ? !(/^v0\\.8\\./.test(process.version))\n    : options.fixedFramerate\n  this._lastUpdateAt = null\n  this._updateInterval = options.updateInterval == null ? 50 : options.updateInterval\n\n  this._themes = options.themes || defaultThemes\n  this._theme = options.theme\n  var theme = this._computeTheme(options.theme)\n  var template = options.template || [\n    {type: 'progressbar', length: 20},\n    {type: 'activityIndicator', kerning: 1, length: 1},\n    {type: 'section', kerning: 1, default: ''},\n    {type: 'subsection', kerning: 1, default: ''}\n  ]\n  this.setWriteTo(writeTo, options.tty)\n  var PlumbingClass = options.Plumbing || Plumbing\n  this._gauge = new PlumbingClass(theme, template, this.getWidth())\n\n  this._$$doRedraw = callWith(this, this._doRedraw)\n  this._$$handleSizeChange = callWith(this, this._handleSizeChange)\n\n  this._cleanupOnExit = options.cleanupOnExit == null || options.cleanupOnExit\n  this._removeOnExit = null\n\n  if (options.enabled || (options.enabled == null && this._tty && this._tty.isTTY)) {\n    this.enable()\n  } else {\n    this.disable()\n  }\n}\nGauge.prototype = {}\n\nGauge.prototype.isEnabled = function () {\n  return !this._disabled\n}\n\nGauge.prototype.setTemplate = function (template) {\n  this._gauge.setTemplate(template)\n  if (this._showing) this._requestRedraw()\n}\n\nGauge.prototype._computeTheme = function (theme) {\n  if (!theme) theme = {}\n  if (typeof theme === 'string') {\n    theme = this._themes.getTheme(theme)\n  } else if (theme && (Object.keys(theme).length === 0 || theme.hasUnicode != null || theme.hasColor != null)) {\n    var useUnicode = theme.hasUnicode == null ? hasUnicode() : theme.hasUnicode\n    var useColor = theme.hasColor == null ? hasColor : theme.hasColor\n    theme = this._themes.getDefault({hasUnicode: useUnicode, hasColor: useColor, platform: theme.platform})\n  }\n  return theme\n}\n\nGauge.prototype.setThemeset = function (themes) {\n  this._themes = themes\n  this.setTheme(this._theme)\n}\n\nGauge.prototype.setTheme = function (theme) {\n  this._gauge.setTheme(this._computeTheme(theme))\n  if (this._showing) this._requestRedraw()\n  this._theme = theme\n}\n\nGauge.prototype._requestRedraw = function () {\n  this._needsRedraw = true\n  if (!this._fixedFramerate) this._doRedraw()\n}\n\nGauge.prototype.getWidth = function () {\n  return ((this._tty && this._tty.columns) || 80) - 1\n}\n\nGauge.prototype.setWriteTo = function (writeTo, tty) {\n  var enabled = !this._disabled\n  if (enabled) this.disable()\n  this._writeTo = writeTo\n  this._tty = tty ||\n    (writeTo === process.stderr && process.stdout.isTTY && process.stdout) ||\n    (writeTo.isTTY && writeTo) ||\n    this._tty\n  if (this._gauge) this._gauge.setWidth(this.getWidth())\n  if (enabled) this.enable()\n}\n\nGauge.prototype.enable = function () {\n  if (!this._disabled) return\n  this._disabled = false\n  if (this._tty) this._enableEvents()\n  if (this._showing) this.show()\n}\n\nGauge.prototype.disable = function () {\n  if (this._disabled) return\n  if (this._showing) {\n    this._lastUpdateAt = null\n    this._showing = false\n    this._doRedraw()\n    this._showing = true\n  }\n  this._disabled = true\n  if (this._tty) this._disableEvents()\n}\n\nGauge.prototype._enableEvents = function () {\n  if (this._cleanupOnExit) {\n    this._removeOnExit = onExit(callWith(this, this.disable))\n  }\n  this._tty.on('resize', this._$$handleSizeChange)\n  if (this._fixedFramerate) {\n    this.redrawTracker = setInterval(this._$$doRedraw, this._updateInterval)\n    if (this.redrawTracker.unref) this.redrawTracker.unref()\n  }\n}\n\nGauge.prototype._disableEvents = function () {\n  this._tty.removeListener('resize', this._$$handleSizeChange)\n  if (this._fixedFramerate) clearInterval(this.redrawTracker)\n  if (this._removeOnExit) this._removeOnExit()\n}\n\nGauge.prototype.hide = function (cb) {\n  if (this._disabled) return cb && process.nextTick(cb)\n  if (!this._showing) return cb && process.nextTick(cb)\n  this._showing = false\n  this._doRedraw()\n  cb && setImmediate(cb)\n}\n\nGauge.prototype.show = function (section, completed) {\n  this._showing = true\n  if (typeof section === 'string') {\n    this._status.section = section\n  } else if (typeof section === 'object') {\n    var sectionKeys = Object.keys(section)\n    for (var ii = 0; ii < sectionKeys.length; ++ii) {\n      var key = sectionKeys[ii]\n      this._status[key] = section[key]\n    }\n  }\n  if (completed != null) this._status.completed = completed\n  if (this._disabled) return\n  this._requestRedraw()\n}\n\nGauge.prototype.pulse = function (subsection) {\n  this._status.subsection = subsection || ''\n  this._status.spun ++\n  if (this._disabled) return\n  if (!this._showing) return\n  this._requestRedraw()\n}\n\nGauge.prototype._handleSizeChange = function () {\n  this._gauge.setWidth(this._tty.columns - 1)\n  this._requestRedraw()\n}\n\nGauge.prototype._doRedraw = function () {\n  if (this._disabled || this._paused) return\n  if (!this._fixedFramerate) {\n    var now = Date.now()\n    if (this._lastUpdateAt && now - this._lastUpdateAt < this._updateInterval) return\n    this._lastUpdateAt = now\n  }\n  if (!this._showing && this._onScreen) {\n    this._onScreen = false\n    var result = this._gauge.hide()\n    if (this._hideCursor) {\n      result += this._gauge.showCursor()\n    }\n    return this._writeTo.write(result)\n  }\n  if (!this._showing && !this._onScreen) return\n  if (this._showing && !this._onScreen) {\n    this._onScreen = true\n    this._needsRedraw = true\n    if (this._hideCursor) {\n      this._writeTo.write(this._gauge.hideCursor())\n    }\n  }\n  if (!this._needsRedraw) return\n  if (!this._writeTo.write(this._gauge.show(this._status))) {\n    this._paused = true\n    this._writeTo.on('drain', callWith(this, function () {\n      this._paused = false\n      this._doRedraw()\n    }))\n  }\n}\n\n\n//# sourceURL=webpack:///../node_modules/gauge/index.js?");

/***/ }),

/***/ "../node_modules/gauge/node_modules/is-fullwidth-code-point/index.js":
/*!***************************************************************************!*\
  !*** ../node_modules/gauge/node_modules/is-fullwidth-code-point/index.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar numberIsNan = __webpack_require__(/*! number-is-nan */ \"../node_modules/number-is-nan/index.js\");\n\nmodule.exports = function (x) {\n\tif (numberIsNan(x)) {\n\t\treturn false;\n\t}\n\n\t// https://github.com/nodejs/io.js/blob/cff7300a578be1b10001f2d967aaedc88aee6402/lib/readline.js#L1369\n\n\t// code points are derived from:\n\t// http://www.unix.org/Public/UNIDATA/EastAsianWidth.txt\n\tif (x >= 0x1100 && (\n\t\tx <= 0x115f ||  // Hangul Jamo\n\t\t0x2329 === x || // LEFT-POINTING ANGLE BRACKET\n\t\t0x232a === x || // RIGHT-POINTING ANGLE BRACKET\n\t\t// CJK Radicals Supplement .. Enclosed CJK Letters and Months\n\t\t(0x2e80 <= x && x <= 0x3247 && x !== 0x303f) ||\n\t\t// Enclosed CJK Letters and Months .. CJK Unified Ideographs Extension A\n\t\t0x3250 <= x && x <= 0x4dbf ||\n\t\t// CJK Unified Ideographs .. Yi Radicals\n\t\t0x4e00 <= x && x <= 0xa4c6 ||\n\t\t// Hangul Jamo Extended-A\n\t\t0xa960 <= x && x <= 0xa97c ||\n\t\t// Hangul Syllables\n\t\t0xac00 <= x && x <= 0xd7a3 ||\n\t\t// CJK Compatibility Ideographs\n\t\t0xf900 <= x && x <= 0xfaff ||\n\t\t// Vertical Forms\n\t\t0xfe10 <= x && x <= 0xfe19 ||\n\t\t// CJK Compatibility Forms .. Small Form Variants\n\t\t0xfe30 <= x && x <= 0xfe6b ||\n\t\t// Halfwidth and Fullwidth Forms\n\t\t0xff01 <= x && x <= 0xff60 ||\n\t\t0xffe0 <= x && x <= 0xffe6 ||\n\t\t// Kana Supplement\n\t\t0x1b000 <= x && x <= 0x1b001 ||\n\t\t// Enclosed Ideographic Supplement\n\t\t0x1f200 <= x && x <= 0x1f251 ||\n\t\t// CJK Unified Ideographs Extension B .. Tertiary Ideographic Plane\n\t\t0x20000 <= x && x <= 0x3fffd)) {\n\t\treturn true;\n\t}\n\n\treturn false;\n}\n\n\n//# sourceURL=webpack:///../node_modules/gauge/node_modules/is-fullwidth-code-point/index.js?");

/***/ }),

/***/ "../node_modules/gauge/node_modules/string-width/index.js":
/*!****************************************************************!*\
  !*** ../node_modules/gauge/node_modules/string-width/index.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar stripAnsi = __webpack_require__(/*! strip-ansi */ \"../node_modules/strip-ansi/index.js\");\nvar codePointAt = __webpack_require__(/*! code-point-at */ \"../node_modules/code-point-at/index.js\");\nvar isFullwidthCodePoint = __webpack_require__(/*! is-fullwidth-code-point */ \"../node_modules/gauge/node_modules/is-fullwidth-code-point/index.js\");\n\n// https://github.com/nodejs/io.js/blob/cff7300a578be1b10001f2d967aaedc88aee6402/lib/readline.js#L1345\nmodule.exports = function (str) {\n\tif (typeof str !== 'string' || str.length === 0) {\n\t\treturn 0;\n\t}\n\n\tvar width = 0;\n\n\tstr = stripAnsi(str);\n\n\tfor (var i = 0; i < str.length; i++) {\n\t\tvar code = codePointAt(str, i);\n\n\t\t// ignore control characters\n\t\tif (code <= 0x1f || (code >= 0x7f && code <= 0x9f)) {\n\t\t\tcontinue;\n\t\t}\n\n\t\t// surrogates\n\t\tif (code >= 0x10000) {\n\t\t\ti++;\n\t\t}\n\n\t\tif (isFullwidthCodePoint(code)) {\n\t\t\twidth += 2;\n\t\t} else {\n\t\t\twidth++;\n\t\t}\n\t}\n\n\treturn width;\n};\n\n\n//# sourceURL=webpack:///../node_modules/gauge/node_modules/string-width/index.js?");

/***/ }),

/***/ "../node_modules/gauge/plumbing.js":
/*!*****************************************!*\
  !*** ../node_modules/gauge/plumbing.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar consoleControl = __webpack_require__(/*! console-control-strings */ \"../node_modules/console-control-strings/index.js\")\nvar renderTemplate = __webpack_require__(/*! ./render-template.js */ \"../node_modules/gauge/render-template.js\")\nvar validate = __webpack_require__(/*! aproba */ \"../node_modules/aproba/index.js\")\n\nvar Plumbing = module.exports = function (theme, template, width) {\n  if (!width) width = 80\n  validate('OAN', [theme, template, width])\n  this.showing = false\n  this.theme = theme\n  this.width = width\n  this.template = template\n}\nPlumbing.prototype = {}\n\nPlumbing.prototype.setTheme = function (theme) {\n  validate('O', [theme])\n  this.theme = theme\n}\n\nPlumbing.prototype.setTemplate = function (template) {\n  validate('A', [template])\n  this.template = template\n}\n\nPlumbing.prototype.setWidth = function (width) {\n  validate('N', [width])\n  this.width = width\n}\n\nPlumbing.prototype.hide = function () {\n  return consoleControl.gotoSOL() + consoleControl.eraseLine()\n}\n\nPlumbing.prototype.hideCursor = consoleControl.hideCursor\n\nPlumbing.prototype.showCursor = consoleControl.showCursor\n\nPlumbing.prototype.show = function (status) {\n  var values = Object.create(this.theme)\n  for (var key in status) {\n    values[key] = status[key]\n  }\n\n  return renderTemplate(this.width, this.template, values).trim() +\n         consoleControl.color('reset') +\n         consoleControl.eraseLine() + consoleControl.gotoSOL()\n}\n\n\n//# sourceURL=webpack:///../node_modules/gauge/plumbing.js?");

/***/ }),

/***/ "../node_modules/gauge/process.js":
/*!****************************************!*\
  !*** ../node_modules/gauge/process.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(process) {\n// this exists so we can replace it during testing\nmodule.exports = process\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../process/browser.js */ \"../node_modules/process/browser.js\")))\n\n//# sourceURL=webpack:///../node_modules/gauge/process.js?");

/***/ }),

/***/ "../node_modules/gauge/progress-bar.js":
/*!*********************************************!*\
  !*** ../node_modules/gauge/progress-bar.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar validate = __webpack_require__(/*! aproba */ \"../node_modules/aproba/index.js\")\nvar renderTemplate = __webpack_require__(/*! ./render-template.js */ \"../node_modules/gauge/render-template.js\")\nvar wideTruncate = __webpack_require__(/*! ./wide-truncate */ \"../node_modules/gauge/wide-truncate.js\")\nvar stringWidth = __webpack_require__(/*! string-width */ \"../node_modules/gauge/node_modules/string-width/index.js\")\n\nmodule.exports = function (theme, width, completed) {\n  validate('ONN', [theme, width, completed])\n  if (completed < 0) completed = 0\n  if (completed > 1) completed = 1\n  if (width <= 0) return ''\n  var sofar = Math.round(width * completed)\n  var rest = width - sofar\n  var template = [\n    {type: 'complete', value: repeat(theme.complete, sofar), length: sofar},\n    {type: 'remaining', value: repeat(theme.remaining, rest), length: rest}\n  ]\n  return renderTemplate(width, template, theme)\n}\n\n// lodash's way of repeating\nfunction repeat (string, width) {\n  var result = ''\n  var n = width\n  do {\n    if (n % 2) {\n      result += string\n    }\n    n = Math.floor(n / 2)\n    /*eslint no-self-assign: 0*/\n    string += string\n  } while (n && stringWidth(result) < width)\n\n  return wideTruncate(result, width)\n}\n\n\n//# sourceURL=webpack:///../node_modules/gauge/progress-bar.js?");

/***/ }),

/***/ "../node_modules/gauge/render-template.js":
/*!************************************************!*\
  !*** ../node_modules/gauge/render-template.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar align = __webpack_require__(/*! wide-align */ \"../node_modules/wide-align/align.js\")\nvar validate = __webpack_require__(/*! aproba */ \"../node_modules/aproba/index.js\")\nvar objectAssign = __webpack_require__(/*! object-assign */ \"../node_modules/object-assign/index.js\")\nvar wideTruncate = __webpack_require__(/*! ./wide-truncate */ \"../node_modules/gauge/wide-truncate.js\")\nvar error = __webpack_require__(/*! ./error */ \"../node_modules/gauge/error.js\")\nvar TemplateItem = __webpack_require__(/*! ./template-item */ \"../node_modules/gauge/template-item.js\")\n\nfunction renderValueWithValues (values) {\n  return function (item) {\n    return renderValue(item, values)\n  }\n}\n\nvar renderTemplate = module.exports = function (width, template, values) {\n  var items = prepareItems(width, template, values)\n  var rendered = items.map(renderValueWithValues(values)).join('')\n  return align.left(wideTruncate(rendered, width), width)\n}\n\nfunction preType (item) {\n  var cappedTypeName = item.type[0].toUpperCase() + item.type.slice(1)\n  return 'pre' + cappedTypeName\n}\n\nfunction postType (item) {\n  var cappedTypeName = item.type[0].toUpperCase() + item.type.slice(1)\n  return 'post' + cappedTypeName\n}\n\nfunction hasPreOrPost (item, values) {\n  if (!item.type) return\n  return values[preType(item)] || values[postType(item)]\n}\n\nfunction generatePreAndPost (baseItem, parentValues) {\n  var item = objectAssign({}, baseItem)\n  var values = Object.create(parentValues)\n  var template = []\n  var pre = preType(item)\n  var post = postType(item)\n  if (values[pre]) {\n    template.push({value: values[pre]})\n    values[pre] = null\n  }\n  item.minLength = null\n  item.length = null\n  item.maxLength = null\n  template.push(item)\n  values[item.type] = values[item.type]\n  if (values[post]) {\n    template.push({value: values[post]})\n    values[post] = null\n  }\n  return function ($1, $2, length) {\n    return renderTemplate(length, template, values)\n  }\n}\n\nfunction prepareItems (width, template, values) {\n  function cloneAndObjectify (item, index, arr) {\n    var cloned = new TemplateItem(item, width)\n    var type = cloned.type\n    if (cloned.value == null) {\n      if (!(type in values)) {\n        if (cloned.default == null) {\n          throw new error.MissingTemplateValue(cloned, values)\n        } else {\n          cloned.value = cloned.default\n        }\n      } else {\n        cloned.value = values[type]\n      }\n    }\n    if (cloned.value == null || cloned.value === '') return null\n    cloned.index = index\n    cloned.first = index === 0\n    cloned.last = index === arr.length - 1\n    if (hasPreOrPost(cloned, values)) cloned.value = generatePreAndPost(cloned, values)\n    return cloned\n  }\n\n  var output = template.map(cloneAndObjectify).filter(function (item) { return item != null })\n\n  var outputLength = 0\n  var remainingSpace = width\n  var variableCount = output.length\n\n  function consumeSpace (length) {\n    if (length > remainingSpace) length = remainingSpace\n    outputLength += length\n    remainingSpace -= length\n  }\n\n  function finishSizing (item, length) {\n    if (item.finished) throw new error.Internal('Tried to finish template item that was already finished')\n    if (length === Infinity) throw new error.Internal('Length of template item cannot be infinity')\n    if (length != null) item.length = length\n    item.minLength = null\n    item.maxLength = null\n    --variableCount\n    item.finished = true\n    if (item.length == null) item.length = item.getBaseLength()\n    if (item.length == null) throw new error.Internal('Finished template items must have a length')\n    consumeSpace(item.getLength())\n  }\n\n  output.forEach(function (item) {\n    if (!item.kerning) return\n    var prevPadRight = item.first ? 0 : output[item.index - 1].padRight\n    if (!item.first && prevPadRight < item.kerning) item.padLeft = item.kerning - prevPadRight\n    if (!item.last) item.padRight = item.kerning\n  })\n\n  // Finish any that have a fixed (literal or intuited) length\n  output.forEach(function (item) {\n    if (item.getBaseLength() == null) return\n    finishSizing(item)\n  })\n\n  var resized = 0\n  var resizing\n  var hunkSize\n  do {\n    resizing = false\n    hunkSize = Math.round(remainingSpace / variableCount)\n    output.forEach(function (item) {\n      if (item.finished) return\n      if (!item.maxLength) return\n      if (item.getMaxLength() < hunkSize) {\n        finishSizing(item, item.maxLength)\n        resizing = true\n      }\n    })\n  } while (resizing && resized++ < output.length)\n  if (resizing) throw new error.Internal('Resize loop iterated too many times while determining maxLength')\n\n  resized = 0\n  do {\n    resizing = false\n    hunkSize = Math.round(remainingSpace / variableCount)\n    output.forEach(function (item) {\n      if (item.finished) return\n      if (!item.minLength) return\n      if (item.getMinLength() >= hunkSize) {\n        finishSizing(item, item.minLength)\n        resizing = true\n      }\n    })\n  } while (resizing && resized++ < output.length)\n  if (resizing) throw new error.Internal('Resize loop iterated too many times while determining minLength')\n\n  hunkSize = Math.round(remainingSpace / variableCount)\n  output.forEach(function (item) {\n    if (item.finished) return\n    finishSizing(item, hunkSize)\n  })\n\n  return output\n}\n\nfunction renderFunction (item, values, length) {\n  validate('OON', arguments)\n  if (item.type) {\n    return item.value(values, values[item.type + 'Theme'] || {}, length)\n  } else {\n    return item.value(values, {}, length)\n  }\n}\n\nfunction renderValue (item, values) {\n  var length = item.getBaseLength()\n  var value = typeof item.value === 'function' ? renderFunction(item, values, length) : item.value\n  if (value == null || value === '') return ''\n  var alignWith = align[item.align] || align.left\n  var leftPadding = item.padLeft ? align.left('', item.padLeft) : ''\n  var rightPadding = item.padRight ? align.right('', item.padRight) : ''\n  var truncated = wideTruncate(String(value), length)\n  var aligned = alignWith(truncated, length)\n  return leftPadding + aligned + rightPadding\n}\n\n\n//# sourceURL=webpack:///../node_modules/gauge/render-template.js?");

/***/ }),

/***/ "../node_modules/gauge/set-immediate.js":
/*!**********************************************!*\
  !*** ../node_modules/gauge/set-immediate.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(setImmediate) {\nvar process = __webpack_require__(/*! ./process */ \"../node_modules/gauge/process.js\")\ntry {\n  module.exports = setImmediate\n} catch (ex) {\n  module.exports = process.nextTick\n}\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../timers-browserify/main.js */ \"../node_modules/timers-browserify/main.js\").setImmediate))\n\n//# sourceURL=webpack:///../node_modules/gauge/set-immediate.js?");

/***/ }),

/***/ "../node_modules/gauge/set-interval.js":
/*!*********************************************!*\
  !*** ../node_modules/gauge/set-interval.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n// this exists so we can replace it during testing\nmodule.exports = setInterval\n\n\n//# sourceURL=webpack:///../node_modules/gauge/set-interval.js?");

/***/ }),

/***/ "../node_modules/gauge/spin.js":
/*!*************************************!*\
  !*** ../node_modules/gauge/spin.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function spin (spinstr, spun) {\n  return spinstr[spun % spinstr.length]\n}\n\n\n//# sourceURL=webpack:///../node_modules/gauge/spin.js?");

/***/ }),

/***/ "../node_modules/gauge/template-item.js":
/*!**********************************************!*\
  !*** ../node_modules/gauge/template-item.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar stringWidth = __webpack_require__(/*! string-width */ \"../node_modules/gauge/node_modules/string-width/index.js\")\n\nmodule.exports = TemplateItem\n\nfunction isPercent (num) {\n  if (typeof num !== 'string') return false\n  return num.slice(-1) === '%'\n}\n\nfunction percent (num) {\n  return Number(num.slice(0, -1)) / 100\n}\n\nfunction TemplateItem (values, outputLength) {\n  this.overallOutputLength = outputLength\n  this.finished = false\n  this.type = null\n  this.value = null\n  this.length = null\n  this.maxLength = null\n  this.minLength = null\n  this.kerning = null\n  this.align = 'left'\n  this.padLeft = 0\n  this.padRight = 0\n  this.index = null\n  this.first = null\n  this.last = null\n  if (typeof values === 'string') {\n    this.value = values\n  } else {\n    for (var prop in values) this[prop] = values[prop]\n  }\n  // Realize percents\n  if (isPercent(this.length)) {\n    this.length = Math.round(this.overallOutputLength * percent(this.length))\n  }\n  if (isPercent(this.minLength)) {\n    this.minLength = Math.round(this.overallOutputLength * percent(this.minLength))\n  }\n  if (isPercent(this.maxLength)) {\n    this.maxLength = Math.round(this.overallOutputLength * percent(this.maxLength))\n  }\n  return this\n}\n\nTemplateItem.prototype = {}\n\nTemplateItem.prototype.getBaseLength = function () {\n  var length = this.length\n  if (length == null && typeof this.value === 'string' && this.maxLength == null && this.minLength == null) {\n    length = stringWidth(this.value)\n  }\n  return length\n}\n\nTemplateItem.prototype.getLength = function () {\n  var length = this.getBaseLength()\n  if (length == null) return null\n  return length + this.padLeft + this.padRight\n}\n\nTemplateItem.prototype.getMaxLength = function () {\n  if (this.maxLength == null) return null\n  return this.maxLength + this.padLeft + this.padRight\n}\n\nTemplateItem.prototype.getMinLength = function () {\n  if (this.minLength == null) return null\n  return this.minLength + this.padLeft + this.padRight\n}\n\n\n\n//# sourceURL=webpack:///../node_modules/gauge/template-item.js?");

/***/ }),

/***/ "../node_modules/gauge/theme-set.js":
/*!******************************************!*\
  !*** ../node_modules/gauge/theme-set.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(process) {\nvar objectAssign = __webpack_require__(/*! object-assign */ \"../node_modules/object-assign/index.js\")\n\nmodule.exports = function () {\n  return ThemeSetProto.newThemeSet()\n}\n\nvar ThemeSetProto = {}\n\nThemeSetProto.baseTheme = __webpack_require__(/*! ./base-theme.js */ \"../node_modules/gauge/base-theme.js\")\n\nThemeSetProto.newTheme = function (parent, theme) {\n  if (!theme) {\n    theme = parent\n    parent = this.baseTheme\n  }\n  return objectAssign({}, parent, theme)\n}\n\nThemeSetProto.getThemeNames = function () {\n  return Object.keys(this.themes)\n}\n\nThemeSetProto.addTheme = function (name, parent, theme) {\n  this.themes[name] = this.newTheme(parent, theme)\n}\n\nThemeSetProto.addToAllThemes = function (theme) {\n  var themes = this.themes\n  Object.keys(themes).forEach(function (name) {\n    objectAssign(themes[name], theme)\n  })\n  objectAssign(this.baseTheme, theme)\n}\n\nThemeSetProto.getTheme = function (name) {\n  if (!this.themes[name]) throw this.newMissingThemeError(name)\n  return this.themes[name]\n}\n\nThemeSetProto.setDefault = function (opts, name) {\n  if (name == null) {\n    name = opts\n    opts = {}\n  }\n  var platform = opts.platform == null ? 'fallback' : opts.platform\n  var hasUnicode = !!opts.hasUnicode\n  var hasColor = !!opts.hasColor\n  if (!this.defaults[platform]) this.defaults[platform] = {true: {}, false: {}}\n  this.defaults[platform][hasUnicode][hasColor] = name\n}\n\nThemeSetProto.getDefault = function (opts) {\n  if (!opts) opts = {}\n  var platformName = opts.platform || process.platform\n  var platform = this.defaults[platformName] || this.defaults.fallback\n  var hasUnicode = !!opts.hasUnicode\n  var hasColor = !!opts.hasColor\n  if (!platform) throw this.newMissingDefaultThemeError(platformName, hasUnicode, hasColor)\n  if (!platform[hasUnicode][hasColor]) {\n    if (hasUnicode && hasColor && platform[!hasUnicode][hasColor]) {\n      hasUnicode = false\n    } else if (hasUnicode && hasColor && platform[hasUnicode][!hasColor]) {\n      hasColor = false\n    } else if (hasUnicode && hasColor && platform[!hasUnicode][!hasColor]) {\n      hasUnicode = false\n      hasColor = false\n    } else if (hasUnicode && !hasColor && platform[!hasUnicode][hasColor]) {\n      hasUnicode = false\n    } else if (!hasUnicode && hasColor && platform[hasUnicode][!hasColor]) {\n      hasColor = false\n    } else if (platform === this.defaults.fallback) {\n      throw this.newMissingDefaultThemeError(platformName, hasUnicode, hasColor)\n    }\n  }\n  if (platform[hasUnicode][hasColor]) {\n    return this.getTheme(platform[hasUnicode][hasColor])\n  } else {\n    return this.getDefault(objectAssign({}, opts, {platform: 'fallback'}))\n  }\n}\n\nThemeSetProto.newMissingThemeError = function newMissingThemeError (name) {\n  var err = new Error('Could not find a gauge theme named \"' + name + '\"')\n  Error.captureStackTrace.call(err, newMissingThemeError)\n  err.theme = name\n  err.code = 'EMISSINGTHEME'\n  return err\n}\n\nThemeSetProto.newMissingDefaultThemeError = function newMissingDefaultThemeError (platformName, hasUnicode, hasColor) {\n  var err = new Error(\n    'Could not find a gauge theme for your platform/unicode/color use combo:\\n' +\n    '    platform = ' + platformName + '\\n' +\n    '    hasUnicode = ' + hasUnicode + '\\n' +\n    '    hasColor = ' + hasColor)\n  Error.captureStackTrace.call(err, newMissingDefaultThemeError)\n  err.platform = platformName\n  err.hasUnicode = hasUnicode\n  err.hasColor = hasColor\n  err.code = 'EMISSINGTHEME'\n  return err\n}\n\nThemeSetProto.newThemeSet = function () {\n  var themeset = function (opts) {\n    return themeset.getDefault(opts)\n  }\n  return objectAssign(themeset, ThemeSetProto, {\n    themes: objectAssign({}, this.themes),\n    baseTheme: objectAssign({}, this.baseTheme),\n    defaults: JSON.parse(JSON.stringify(this.defaults || {}))\n  })\n}\n\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../process/browser.js */ \"../node_modules/process/browser.js\")))\n\n//# sourceURL=webpack:///../node_modules/gauge/theme-set.js?");

/***/ }),

/***/ "../node_modules/gauge/themes.js":
/*!***************************************!*\
  !*** ../node_modules/gauge/themes.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar consoleControl = __webpack_require__(/*! console-control-strings */ \"../node_modules/console-control-strings/index.js\")\nvar ThemeSet = __webpack_require__(/*! ./theme-set.js */ \"../node_modules/gauge/theme-set.js\")\n\nvar themes = module.exports = new ThemeSet()\n\nthemes.addTheme('ASCII', {\n  preProgressbar: '[',\n  postProgressbar: ']',\n  progressbarTheme: {\n    complete: '#',\n    remaining: '.'\n  },\n  activityIndicatorTheme: '-\\\\|/',\n  preSubsection: '>'\n})\n\nthemes.addTheme('colorASCII', themes.getTheme('ASCII'), {\n  progressbarTheme: {\n    preComplete: consoleControl.color('inverse'),\n    complete: ' ',\n    postComplete: consoleControl.color('stopInverse'),\n    preRemaining: consoleControl.color('brightBlack'),\n    remaining: '.',\n    postRemaining: consoleControl.color('reset')\n  }\n})\n\nthemes.addTheme('brailleSpinner', {\n  preProgressbar: '⸨',\n  postProgressbar: '⸩',\n  progressbarTheme: {\n    complete: '░',\n    remaining: '⠂'\n  },\n  activityIndicatorTheme: '⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏',\n  preSubsection: '>'\n})\n\nthemes.addTheme('colorBrailleSpinner', themes.getTheme('brailleSpinner'), {\n  progressbarTheme: {\n    preComplete: consoleControl.color('inverse'),\n    complete: ' ',\n    postComplete: consoleControl.color('stopInverse'),\n    preRemaining: consoleControl.color('brightBlack'),\n    remaining: '░',\n    postRemaining: consoleControl.color('reset')\n  }\n})\n\nthemes.setDefault({}, 'ASCII')\nthemes.setDefault({hasColor: true}, 'colorASCII')\nthemes.setDefault({platform: 'darwin', hasUnicode: true}, 'brailleSpinner')\nthemes.setDefault({platform: 'darwin', hasUnicode: true, hasColor: true}, 'colorBrailleSpinner')\n\n\n//# sourceURL=webpack:///../node_modules/gauge/themes.js?");

/***/ }),

/***/ "../node_modules/gauge/wide-truncate.js":
/*!**********************************************!*\
  !*** ../node_modules/gauge/wide-truncate.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar stringWidth = __webpack_require__(/*! string-width */ \"../node_modules/gauge/node_modules/string-width/index.js\")\nvar stripAnsi = __webpack_require__(/*! strip-ansi */ \"../node_modules/strip-ansi/index.js\")\n\nmodule.exports = wideTruncate\n\nfunction wideTruncate (str, target) {\n  if (stringWidth(str) === 0) return str\n  if (target <= 0) return ''\n  if (stringWidth(str) <= target) return str\n\n  // We compute the number of bytes of ansi sequences here and add\n  // that to our initial truncation to ensure that we don't slice one\n  // that we want to keep in half.\n  var noAnsi = stripAnsi(str)\n  var ansiSize = str.length + noAnsi.length\n  var truncated = str.slice(0, target + ansiSize)\n\n  // we have to shrink the result to account for our ansi sequence buffer\n  // (if an ansi sequence was truncated) and double width characters.\n  while (stringWidth(truncated) > target) {\n    truncated = truncated.slice(0, -1)\n  }\n  return truncated\n}\n\n\n//# sourceURL=webpack:///../node_modules/gauge/wide-truncate.js?");

/***/ })

}]);