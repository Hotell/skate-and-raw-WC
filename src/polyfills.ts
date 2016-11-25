// temporary hack to make skate 4.1 work with TS
import 'tslib';

// Babel implementation of _inherits
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

(window as any).__extends = _inherits;
// (window as any).__extends = function(d: any, b: any) {
  // Object.setPrototypeOf(d, b);
  // var __: any = function() { this.constructor = d; }
  // d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
// };


import 'skatejs-web-components';