'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var index = (function (_a) {
  var _b = _a.width,
      width = _b === void 0 ? '10px' : _b;
  return React__default['default'].createElement("button", {
    type: "button",
    className: "button",
    style: {
      width: width
    }
  }, "test");
});

var index$1 = (function () {
  alert('message');
});

exports.Alert = index$1;
exports.Button = index;
