"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _TypeGaurd = _interopRequireDefault(require("./TypeGaurd"));
var _RenderGaurd = _interopRequireDefault(require("./RenderGaurd"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
;
var Middleware = _createClass(function Middleware(dispatchItem, setState) {
  var _this = this;
  _classCallCheck(this, Middleware);
  _defineProperty(this, "getDispatchItem", function () {
    return _this.dispatchItem;
  });
  _defineProperty(this, "getKey", function () {
    return _this.dispatchItem.key;
  });
  _defineProperty(this, "getNextState", function () {
    return _this.dispatchItem.nextState;
  });
  _defineProperty(this, "doesTypePass", function (state, type) {
    return _TypeGaurd["default"].isCorrectType(state, type);
  });
  _defineProperty(this, "doesRenderPass", function (state, state2, type) {
    return _RenderGaurd["default"].stateCanRender(state, state2, type);
  });
  _defineProperty(this, "runPipeline", function () {
    var _features$onRun;
    var _this$dispatchItem = _this.dispatchItem,
      dispatchState = _this$dispatchItem.dispatchState,
      type = _this$dispatchItem.type,
      features = _this$dispatchItem.features,
      currentState = _this$dispatchItem.currentState,
      key = _this$dispatchItem.key;
    var result = {
      doesPass: true,
      didNotPassReason: undefined,
      dispatchItem: _this.dispatchItem,
      setState: _this.setStoreState
    };
    if (!_this.doesTypePass(dispatchState, type)) {
      console.error("TrebleGSM: State \"".concat(key, "\" must be of type \"").concat(type, "\"."));
      return result;
    }
    if (!_this.doesRenderPass(currentState, dispatchState, type)) {
      return result;
    }
    features === null || features === void 0 ? void 0 : (_features$onRun = features.onRun) === null || _features$onRun === void 0 ? void 0 : _features$onRun.call(features, _this.dispatchItem);
    if (!(features !== null && features !== void 0 && features.onCheck) || features.onCheck(_this.dispatchItem)) {
      var newState = features !== null && features !== void 0 && features.onProcess ? _objectSpread(_objectSpread({}, _this.dispatchItem), {}, {
        state: features.onProcess(_this.dispatchItem)
      }) : _this.dispatchItem;
      return {
        doesPass: true,
        dispatchedItem: newState
      };
    } else {
      return result;
    }
  });
  this.dispatchItem = dispatchItem;
  this.setStoreState = setState;
});
exports["default"] = Middleware;
;
module.exports = exports.default;