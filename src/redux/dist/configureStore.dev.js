"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigureStore = void 0;

var _redux = require("redux");

var _reduser = require("./reduser");

var ConfigureStore = function ConfigureStore() {
  var store = (0, _redux.createStore)(_reduser.Reducer, _reduser.initialState);
  return store;
};

exports.ConfigureStore = ConfigureStore;