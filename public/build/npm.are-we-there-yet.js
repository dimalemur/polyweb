(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.are-we-there-yet"],{

/***/ "../node_modules/are-we-there-yet/index.js":
/*!*************************************************!*\
  !*** ../node_modules/are-we-there-yet/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nexports.TrackerGroup = __webpack_require__(/*! ./tracker-group.js */ \"../node_modules/are-we-there-yet/tracker-group.js\")\nexports.Tracker = __webpack_require__(/*! ./tracker.js */ \"../node_modules/are-we-there-yet/tracker.js\")\nexports.TrackerStream = __webpack_require__(/*! ./tracker-stream.js */ \"../node_modules/are-we-there-yet/tracker-stream.js\")\n\n\n//# sourceURL=webpack:///../node_modules/are-we-there-yet/index.js?");

/***/ }),

/***/ "../node_modules/are-we-there-yet/tracker-base.js":
/*!********************************************************!*\
  !*** ../node_modules/are-we-there-yet/tracker-base.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar EventEmitter = __webpack_require__(/*! events */ \"../node_modules/events/events.js\").EventEmitter\nvar util = __webpack_require__(/*! util */ \"../node_modules/util/util.js\")\n\nvar trackerId = 0\nvar TrackerBase = module.exports = function (name) {\n  EventEmitter.call(this)\n  this.id = ++trackerId\n  this.name = name\n}\nutil.inherits(TrackerBase, EventEmitter)\n\n\n//# sourceURL=webpack:///../node_modules/are-we-there-yet/tracker-base.js?");

/***/ }),

/***/ "../node_modules/are-we-there-yet/tracker-group.js":
/*!*********************************************************!*\
  !*** ../node_modules/are-we-there-yet/tracker-group.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar util = __webpack_require__(/*! util */ \"../node_modules/util/util.js\")\nvar TrackerBase = __webpack_require__(/*! ./tracker-base.js */ \"../node_modules/are-we-there-yet/tracker-base.js\")\nvar Tracker = __webpack_require__(/*! ./tracker.js */ \"../node_modules/are-we-there-yet/tracker.js\")\nvar TrackerStream = __webpack_require__(/*! ./tracker-stream.js */ \"../node_modules/are-we-there-yet/tracker-stream.js\")\n\nvar TrackerGroup = module.exports = function (name) {\n  TrackerBase.call(this, name)\n  this.parentGroup = null\n  this.trackers = []\n  this.completion = {}\n  this.weight = {}\n  this.totalWeight = 0\n  this.finished = false\n  this.bubbleChange = bubbleChange(this)\n}\nutil.inherits(TrackerGroup, TrackerBase)\n\nfunction bubbleChange (trackerGroup) {\n  return function (name, completed, tracker) {\n    trackerGroup.completion[tracker.id] = completed\n    if (trackerGroup.finished) return\n    trackerGroup.emit('change', name || trackerGroup.name, trackerGroup.completed(), trackerGroup)\n  }\n}\n\nTrackerGroup.prototype.nameInTree = function () {\n  var names = []\n  var from = this\n  while (from) {\n    names.unshift(from.name)\n    from = from.parentGroup\n  }\n  return names.join('/')\n}\n\nTrackerGroup.prototype.addUnit = function (unit, weight) {\n  if (unit.addUnit) {\n    var toTest = this\n    while (toTest) {\n      if (unit === toTest) {\n        throw new Error(\n          'Attempted to add tracker group ' +\n          unit.name + ' to tree that already includes it ' +\n          this.nameInTree(this))\n      }\n      toTest = toTest.parentGroup\n    }\n    unit.parentGroup = this\n  }\n  this.weight[unit.id] = weight || 1\n  this.totalWeight += this.weight[unit.id]\n  this.trackers.push(unit)\n  this.completion[unit.id] = unit.completed()\n  unit.on('change', this.bubbleChange)\n  if (!this.finished) this.emit('change', unit.name, this.completion[unit.id], unit)\n  return unit\n}\n\nTrackerGroup.prototype.completed = function () {\n  if (this.trackers.length === 0) return 0\n  var valPerWeight = 1 / this.totalWeight\n  var completed = 0\n  for (var ii = 0; ii < this.trackers.length; ii++) {\n    var trackerId = this.trackers[ii].id\n    completed += valPerWeight * this.weight[trackerId] * this.completion[trackerId]\n  }\n  return completed\n}\n\nTrackerGroup.prototype.newGroup = function (name, weight) {\n  return this.addUnit(new TrackerGroup(name), weight)\n}\n\nTrackerGroup.prototype.newItem = function (name, todo, weight) {\n  return this.addUnit(new Tracker(name, todo), weight)\n}\n\nTrackerGroup.prototype.newStream = function (name, todo, weight) {\n  return this.addUnit(new TrackerStream(name, todo), weight)\n}\n\nTrackerGroup.prototype.finish = function () {\n  this.finished = true\n  if (!this.trackers.length) this.addUnit(new Tracker(), 1, true)\n  for (var ii = 0; ii < this.trackers.length; ii++) {\n    var tracker = this.trackers[ii]\n    tracker.finish()\n    tracker.removeListener('change', this.bubbleChange)\n  }\n  this.emit('change', this.name, 1, this)\n}\n\nvar buffer = '                                  '\nTrackerGroup.prototype.debug = function (depth) {\n  depth = depth || 0\n  var indent = depth ? buffer.substr(0, depth) : ''\n  var output = indent + (this.name || 'top') + ': ' + this.completed() + '\\n'\n  this.trackers.forEach(function (tracker) {\n    if (tracker instanceof TrackerGroup) {\n      output += tracker.debug(depth + 1)\n    } else {\n      output += indent + ' ' + tracker.name + ': ' + tracker.completed() + '\\n'\n    }\n  })\n  return output\n}\n\n\n//# sourceURL=webpack:///../node_modules/are-we-there-yet/tracker-group.js?");

/***/ }),

/***/ "../node_modules/are-we-there-yet/tracker-stream.js":
/*!**********************************************************!*\
  !*** ../node_modules/are-we-there-yet/tracker-stream.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar util = __webpack_require__(/*! util */ \"../node_modules/util/util.js\")\nvar stream = __webpack_require__(/*! readable-stream */ \"../node_modules/readable-stream/readable-browser.js\")\nvar delegate = __webpack_require__(/*! delegates */ \"../node_modules/delegates/index.js\")\nvar Tracker = __webpack_require__(/*! ./tracker.js */ \"../node_modules/are-we-there-yet/tracker.js\")\n\nvar TrackerStream = module.exports = function (name, size, options) {\n  stream.Transform.call(this, options)\n  this.tracker = new Tracker(name, size)\n  this.name = name\n  this.id = this.tracker.id\n  this.tracker.on('change', delegateChange(this))\n}\nutil.inherits(TrackerStream, stream.Transform)\n\nfunction delegateChange (trackerStream) {\n  return function (name, completion, tracker) {\n    trackerStream.emit('change', name, completion, trackerStream)\n  }\n}\n\nTrackerStream.prototype._transform = function (data, encoding, cb) {\n  this.tracker.completeWork(data.length ? data.length : 1)\n  this.push(data)\n  cb()\n}\n\nTrackerStream.prototype._flush = function (cb) {\n  this.tracker.finish()\n  cb()\n}\n\ndelegate(TrackerStream.prototype, 'tracker')\n  .method('completed')\n  .method('addWork')\n  .method('finish')\n\n\n//# sourceURL=webpack:///../node_modules/are-we-there-yet/tracker-stream.js?");

/***/ }),

/***/ "../node_modules/are-we-there-yet/tracker.js":
/*!***************************************************!*\
  !*** ../node_modules/are-we-there-yet/tracker.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar util = __webpack_require__(/*! util */ \"../node_modules/util/util.js\")\nvar TrackerBase = __webpack_require__(/*! ./tracker-base.js */ \"../node_modules/are-we-there-yet/tracker-base.js\")\n\nvar Tracker = module.exports = function (name, todo) {\n  TrackerBase.call(this, name)\n  this.workDone = 0\n  this.workTodo = todo || 0\n}\nutil.inherits(Tracker, TrackerBase)\n\nTracker.prototype.completed = function () {\n  return this.workTodo === 0 ? 0 : this.workDone / this.workTodo\n}\n\nTracker.prototype.addWork = function (work) {\n  this.workTodo += work\n  this.emit('change', this.name, this.completed(), this)\n}\n\nTracker.prototype.completeWork = function (work) {\n  this.workDone += work\n  if (this.workDone > this.workTodo) this.workDone = this.workTodo\n  this.emit('change', this.name, this.completed(), this)\n}\n\nTracker.prototype.finish = function () {\n  this.workTodo = this.workDone = 1\n  this.emit('change', this.name, 1, this)\n}\n\n\n//# sourceURL=webpack:///../node_modules/are-we-there-yet/tracker.js?");

/***/ })

}]);