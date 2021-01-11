import React from 'react';

var index = (function (_a) {
  var _b = _a.width,
      width = _b === void 0 ? '10px' : _b;
  return React.createElement("button", {
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

export { index$1 as Alert, index as Button };
