"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var TypeGuard = _createClass(function TypeGuard() {
  _classCallCheck(this, TypeGuard);
});
exports["default"] = TypeGuard;
_defineProperty(TypeGuard, "isNumber", function (value) {
  return typeof value === 'number';
});
_defineProperty(TypeGuard, "isString", function (value) {
  return typeof value === 'string';
});
_defineProperty(TypeGuard, "isBoolean", function (value) {
  return typeof value === 'boolean';
});
_defineProperty(TypeGuard, "isObject", function (value) {
  return _typeof(value) === 'object' && value !== null && !Array.isArray(value);
});
_defineProperty(TypeGuard, "isArray", function (value) {
  return Array.isArray(value);
});
_defineProperty(TypeGuard, "isNull", function (value) {
  return value === null;
});
_defineProperty(TypeGuard, "isCorrectType", function (value, type) {
  if (type !== undefined) {
    var types = {
      'number': function number() {
        return TypeGuard.isNumber(value);
      },
      'string': function string() {
        return TypeGuard.isString(value);
      },
      'boolean': function boolean() {
        return TypeGuard.isBoolean(value);
      },
      'object': function object() {
        return TypeGuard.isObject(value);
      },
      'deepObject': function deepObject() {
        return TypeGuard.isObject(value);
      },
      'array': function array() {
        return TypeGuard.isArray(value);
      },
      'null': function _null() {
        return TypeGuard.isNull(value);
      }
    };
    return types[type]();
  } else {
    return true;
  }
});
;
module.exports = exports.default;