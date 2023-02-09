"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Store = _interopRequireDefault(require("./Store"));
var _Module = _interopRequireDefault(require("./Module"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var TrebleGSM;
(function (_TrebleGSM) {
  var Store = _createClass(function Store() {
    var _this = this;
    _classCallCheck(this, Store);
    _defineProperty(this, "getItems", function () {
      return _this.store.getItems();
    });
    _defineProperty(this, "addItem", function (item) {
      _this.store["new"](item);
    });
    _defineProperty(this, "setState", function (key, value) {
      _this.store.set(key, value);
    });
    _defineProperty(this, "getState", function (key) {
      var _this$store$get;
      return (_this$store$get = _this.store.get(key)) === null || _this$store$get === void 0 ? void 0 : _this$store$get.state;
    });
    _defineProperty(this, "onDispatch", function (callbackfn) {
      _this.store.onDispatch(callbackfn);
    });
    _defineProperty(this, "use", function (module) {
      _this.store.newModule(module);
    });
    this.store = new _Store["default"]();
  });
  _defineProperty(Store, "newModule", function (moduleData) {
    var newModule = new _Module["default"](moduleData);
    return newModule;
  });
  _TrebleGSM.Store = Store;
  ;
  ;
  ;
})(TrebleGSM || (TrebleGSM = {}));
var _default = TrebleGSM;
exports["default"] = _default;
module.exports = exports.default;