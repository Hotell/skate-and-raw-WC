const template = `
  <div>
        <blr-button
          disabled
          type="brand"
        >Click me</blr-button>
        <blr-button
          type="brand"
        >Click me</blr-button>
      </div>
`

class Demo extends HTMLElement {
  static get is() { return 'demo-blr-buttons'}
  constructor(){
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = template;
  }
}

customElements.define( Demo.is, Demo );