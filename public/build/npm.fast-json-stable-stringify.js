(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.fast-json-stable-stringify"],{

/***/ "../node_modules/fast-json-stable-stringify/index.js":
/*!***********************************************************!*\
  !*** ../node_modules/fast-json-stable-stringify/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function (data, opts) {\n    if (!opts) opts = {};\n    if (typeof opts === 'function') opts = { cmp: opts };\n    var cycles = (typeof opts.cycles === 'boolean') ? opts.cycles : false;\n\n    var cmp = opts.cmp && (function (f) {\n        return function (node) {\n            return function (a, b) {\n                var aobj = { key: a, value: node[a] };\n                var bobj = { key: b, value: node[b] };\n                return f(aobj, bobj);\n            };\n        };\n    })(opts.cmp);\n\n    var seen = [];\n    return (function stringify (node) {\n        if (node && node.toJSON && typeof node.toJSON === 'function') {\n            node = node.toJSON();\n        }\n\n        if (node === undefined) return;\n        if (typeof node == 'number') return isFinite(node) ? '' + node : 'null';\n        if (typeof node !== 'object') return JSON.stringify(node);\n\n        var i, out;\n        if (Array.isArray(node)) {\n            out = '[';\n            for (i = 0; i < node.length; i++) {\n                if (i) out += ',';\n                out += stringify(node[i]) || 'null';\n            }\n            return out + ']';\n        }\n\n        if (node === null) return 'null';\n\n        if (seen.indexOf(node) !== -1) {\n            if (cycles) return JSON.stringify('__cycle__');\n            throw new TypeError('Converting circular structure to JSON');\n        }\n\n        var seenIndex = seen.push(node) - 1;\n        var keys = Object.keys(node).sort(cmp && cmp(node));\n        out = '';\n        for (i = 0; i < keys.length; i++) {\n            var key = keys[i];\n            var value = stringify(node[key]);\n\n            if (!value) continue;\n            if (out) out += ',';\n            out += JSON.stringify(key) + ':' + value;\n        }\n        seen.splice(seenIndex, 1);\n        return '{' + out + '}';\n    })(data);\n};\n\n\n//# sourceURL=webpack:///../node_modules/fast-json-stable-stringify/index.js?");

/***/ })

}]);