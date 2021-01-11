"use strict";
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

Object.defineProperty(exports, "alert", {
  enumerable: true,
  get: function get() {
    return _alert["default"];
  }
});

Object.defineProperty(exports, "button", {
  enumerable: true,
  get: function get() {
    return _button["default"];
  }
});
var _alert = _interopRequireDefault(require("./alert"));var _button = _interopRequireDefault(require("./button"));
var ENV = process.env.NODE_ENV;

if (ENV !== 'production' && ENV !== 'test' && typeof console !== 'undefined' && console.warn && typeof window !== 'undefined') {
  console.warn('You are using a whole package, ' + 'please use https://www.npmjs.com/package/babel-plugin-import to reduce app bundle size.');
}
