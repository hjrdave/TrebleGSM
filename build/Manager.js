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
var Manager = _createClass(function Manager(inventory) {
  var _this = this;
  _classCallCheck(this, Manager);
  _defineProperty(this, "get", function (key) {
    if (_this.inventory.has(key)) {
      return _this.inventory.get(key);
    }
    console.error("TrebleGSM: State \"".concat(key, "\" does not exist."));
    return undefined;
  });
  _defineProperty(this, "add", function (key, value) {
    if (!_this.inventory.has(key)) {
      _this.inventory.set(key, value);
    } else {
      console.error("TrebleGSM: A State with key \"".concat(key, "\" already exists."));
    }
  });
  _defineProperty(this, "update", function (key, value) {
    if (_this.inventory.has(key)) {
      _this.inventory.set(key, value);
    } else {
      console.error("TrebleGSM: State with key \"".concat(key, "\" does not exists."));
    }
  });
  _defineProperty(this, "remove", function (key) {
    return _this.inventory["delete"](key);
  });
  _defineProperty(this, "removeAll", function () {
    _this.inventory.clear();
  });
  _defineProperty(this, "getItems", function () {
    return Array.from(_this.inventory);
  });
  _defineProperty(this, "has", function (key) {
    return _this.inventory.has(key);
  });
  _defineProperty(this, "forEach", function (predicateFN) {
    _this.inventory.forEach(predicateFN);
  });
  this.inventory = inventory;
});
exports["default"] = Manager;
;
module.exports = exports.default;