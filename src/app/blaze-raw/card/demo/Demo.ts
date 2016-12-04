import styles from './Demo.scss';

const template = () => {
  return (`
      <style>:host{padding:1rem}</style>
      <div>
        <blr-card>
          <span slot="title">Card Title</span>
          <span slot="body">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, reiciendis.</span>
          <span slot="footer">Footer baby</span>
        </blr-card>
      </div>
`)
};

export class Demo extends HTMLElement {
  static get is() { return 'demo-blr-card' }

  static get template() { return template() }

  constructor() {
    super();
    this.attachShadow( { mode: 'open' } );
    this.shadowRoot.innerHTML = Demo.template;
  }
}

customElements.define( Demo.is, Demo );