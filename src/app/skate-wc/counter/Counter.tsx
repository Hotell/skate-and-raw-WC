import { Component, prop, h } from 'skatejs';

const sym = Symbol();
class Counter extends Component {

  count = 0;
  static get is() { return 'my-counter' }
  static get props() {
    return {
      // By declaring the property an attribute, we can now pass an initial value
      // for the count as part of the HTML.
      count: prop.number( { attribute: true })
    };
  }
  connectedCallback() {
    // Ensure we call the parent.
    super.connectedCallback();

    // We use a symbol so we don't pollute the element's namespace.
    this[ sym ] = setInterval(() => ++this.count, 1000 );
  }
  disconnectedCallback() {
    // Ensure we callback the parent.
    super.disconnectedCallback();

    // If we didn't clean up after ourselves, we'd continue to render
    // unnecessarily.
    clearInterval( this[ sym ] );
  }
  renderCallback() {
    // By separating the strings (and not using template literals or string
    // concatenation) it ensures the strings are diffed indepenedently. If
    // you select "Count" with your mouse, it will not deselect whenr endered.
    return <div>Count {this.count}</div>;
  }
}

customElements.define( Counter.is, Counter );