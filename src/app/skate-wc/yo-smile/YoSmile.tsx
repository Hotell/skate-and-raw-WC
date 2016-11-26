import { Component, h, define } from 'skatejs';

// NOTE: This api doesn't work
class XCounter extends Component {

  static get is(){ return 'x-counter' }
  renderCallback(){
    return (<div>Hello</div>)
  }
}
// NOTE: This registration will throw
window.customElements.define( XCounter.is, XCounter );

define('x-hello', {
  props: {
    name: { attribute: true }
  },
  render (elem) {
    return <div>Hello, {elem.name}</div>
  }
});