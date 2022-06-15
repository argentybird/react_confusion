"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigureStore = void 0;

var _redux = require("redux");

var _dishes = require("./dishes");

var _comments = require("./comments");

var _promotions = require("./promotions");

var _leaders = require("./leaders");

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var _reduxLogger = _interopRequireDefault(require("redux-logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ConfigureStore = function ConfigureStore() {
  var store = (0, _redux.createStore)((0, _redux.combineReducers)({
    dishes: _dishes.Dishes,
    comments: _comments.Comments,
    promotions: _promotions.Promotions,
    leaders: _leaders.Leaders
  }), (0, _redux.applyMiddleware)(_reduxThunk["default"], _reduxLogger["default"]));
  return store;
};

exports.ConfigureStore = ConfigureStore;