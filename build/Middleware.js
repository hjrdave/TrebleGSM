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
var Middleware = _createClass(function Middleware(_dispatchItem) {
  var _this = this;
  _classCallCheck(this, Middleware);
  _defineProperty(this, "getDispatchItem", function () {
    return _this.dispatchItem;
  });
  _defineProperty(this, "getKey", function () {
    return _this.dispatchItem.key;
  });
  _defineProperty(this, "getState", function () {
    return _this.dispatchItem.state;
  });
  _defineProperty(this, "doesTypePass", function (state, type) {
    return _TypeGaurd["default"].isCorrectType(state, type);
  });
  _defineProperty(this, "doesRenderPass", function (state, state2, type) {
    return _RenderGaurd["default"].stateCanRender(state, state2, type);
  });
  _defineProperty(this, "runPipeline", function () {
    var dispatchItem = _this.dispatchItem;
    var dispatchState = dispatchItem.dispatchState;
    var type = dispatchItem.type;
    var features = dispatchItem.features;
    var doesTypePass = _this.doesTypePass(dispatchState, type);
    var pipelineItem = {
      doesPass: false,
      dispatchItem: _this.dispatchItem
    };
    if (doesTypePass) {
      var doesRenderPass = _this.doesRenderPass(dispatchItem.currentState, dispatchItem.dispatchState, type);
      if (doesRenderPass) {
        var log = features === null || features === void 0 ? void 0 : features.log;
        if (log) {
          log(dispatchItem);
        }
        var didCheckPass = features !== null && features !== void 0 && features.check ? features.check(dispatchItem) : true;
        var process = features === null || features === void 0 ? void 0 : features.process;
        if (didCheckPass) {
          if (process) {
            return {
              doesPass: true,
              dispatchItem: _objectSpread(_objectSpread({}, dispatchItem), {}, {
                processedState: process(dispatchItem)
              })
            };
          }
          return _objectSpread(_objectSpread({}, pipelineItem), {}, {
            doesPass: true
          });
        } else {
          return _objectSpread(_objectSpread({}, pipelineItem), {}, {
            doesPass: false
          });
        }
      } else {
        return pipelineItem;
      }
    } else {
      console.error("TrebleGSM: State \"".concat(dispatchItem.key, "\" must be of type \"").concat(dispatchItem.type, "\"."));
      return pipelineItem;
    }
  });
  this.dispatchItem = _dispatchItem;
});
exports["default"] = Middleware;
;
module.exports = exports.default;