import { Component, h, prop, define } from 'skatejs';

// NOTE: This api doesn't work without __extends override
class XCounter extends Component {

  static get is() { return 'x-counter' }
  static get props() {
    return {
      count: prop.number( { attribute: true })
    };
  }

  count = 0;

  renderCallback() {
    return ( <div>Hello {this.count}</div> )
  }
}

customElements.define( XCounter.is, XCounter );

// this works without __extends override
define('x-hello', {
  props: {
    name: { attribute: true }
  },
  render (elem) {
    return <div>Hello, {elem.name}</div>
  }
});