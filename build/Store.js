"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Dispatcher = _interopRequireDefault(require("./Dispatcher"));
var _Inventory = _interopRequireDefault(require("./Inventory"));
var _Manager = _interopRequireDefault(require("./Manager"));
var _Middleware = _interopRequireDefault(require("./Middleware"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Store = _createClass(function Store() {
  var _this = this;
  _classCallCheck(this, Store);
  _defineProperty(this, "newModule", function (module) {
    var name = module.getName();
    if (!_this.moduleManager.has(name)) {
      _this.moduleManager.add(name, module.getData());
    } else {
      console.error("TrebleGSM: Module \"".concat(name, "\" is already being used by Store instance."));
    }
  });
  _defineProperty(this, "getModule", function (name) {
    if (_this.moduleManager.has(name)) {
      return _this.moduleManager.get(name);
    } else {
      console.error("TrebleGSM: Module \"".concat(name, "\" does not exist."));
      return undefined;
    }
  });
  _defineProperty(this, "getItems", function () {
    return _this.stateManager.getItems().map(function (item) {
      return {
        key: item[0],
        state: item[1],
        type: _this.typeManager.get(item[0]),
        features: _this.featureManager.get(item[0])
      };
    });
  });
  _defineProperty(this, "new", function (_ref) {
    var key = _ref.key,
      state = _ref.state,
      type = _ref.type,
      features = _ref.features;
    var middleware = new _Middleware["default"]({
      key: key
    });
    if (middleware.doesTypePass(state, type)) {
      _this.stateManager.add(key, state);
      _this.typeManager.add(key, type);
      _this.featureManager.add(key, features);
    } else {
      console.error("TrebleGSM: Initial State \"".concat(key, "\" must be of type \"").concat(type, "\"."));
    }
  });
  _defineProperty(this, "get", function (key) {
    if (_this.stateManager.has(key)) {
      var type = _this.typeManager.get(key);
      var state = _this.stateManager.get(key);
      var features = _this.featureManager.get(key);
      var storeItem = {
        type: type,
        key: key,
        state: state,
        features: features
      };
      return storeItem;
    } else {
      return undefined;
    }
  });
  _defineProperty(this, "set", function (key, state) {
    if (_this.stateManager.has(key)) {
      var _this$get;
      var middleware = new _Middleware["default"]({
        key: key,
        type: _this.typeManager.get(key),
        currentState: (_this$get = _this.get(key)) === null || _this$get === void 0 ? void 0 : _this$get.state,
        dispatchState: state,
        state: state,
        features: _this.featureManager.get(key),
        modules: _this.moduleManager.getItems()
      });
      if (middleware.runPipeline().doesPass) {
        _this.dispatcher.dispatch(middleware.getDispatchItem());
        _this.stateManager.update(middleware.getKey(), middleware.getState());
      }
    } else {
      console.error("TrebleGSM: State \"".concat(key, "\" does not exist."));
    }
  });
  _defineProperty(this, "onDispatch", function (callbackfn) {
    _this.stateManager.forEach(function (value, key) {
      return _this.dispatcher.stopListening(key);
    });
    _this.stateManager.forEach(function (value, key) {
      return _this.dispatcher.listen(key, callbackfn);
    });
  });
  this.stateManager = new _Manager["default"](new _Inventory["default"]());
  this.typeManager = new _Manager["default"](new _Inventory["default"]());
  this.featureManager = new _Manager["default"](new _Inventory["default"]());
  this.moduleManager = new _Manager["default"](new _Inventory["default"]());
  this.dispatcher = new _Dispatcher["default"]();
});
exports["default"] = Store;
;
module.exports = exports.default;