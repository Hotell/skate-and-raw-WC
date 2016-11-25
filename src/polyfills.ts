// temporary hack to make skate 4.1 work with TS
import 'tslib';
(window as any).__extends = function(d: any, b: any) {
    console.log('boo')
  Object.setPrototypeOf(d, b);
  var __: any = function() { this.constructor = d; }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};


import 'skatejs-web-components';