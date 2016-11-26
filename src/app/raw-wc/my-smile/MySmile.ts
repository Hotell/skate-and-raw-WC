import template from './MySmile.html';

export class MySmile extends HTMLElement {
  private smileContainer: HTMLElement;
  static get is() { return 'my-smile' }

  static get observedAttributes() {
    return ['smile'];
  }

  private _smile = '';
  get smile() {
    return this._smile;
  }

  set smile( val: string ) {
    this._smile = val;
    this.setAttribute('smile',val);
  }

  constructor() {
    super();
    // Attach a shadow root to the element.
    const shadowRoot = this.attachShadow({mode: 'open'});
    const instance = importTemplate(template);
    shadowRoot.appendChild(instance);
    this.smileContainer = shadowRoot.querySelector('b');
  }

  connectedCallback() {
    console.log( 'hello from connected' );
    console.log(this.shadowRoot);
    console.log( this.smileContainer );
    this.render();
  }

  disconnectedCallback() {
    console.log( 'hello from disconnect' );
  }

  attributeChangedCallback( attrName: string, oldVal: any, newVal: any ) {
    console.log( arguments );
    if(attrName === 'smile'){
      this.smile = newVal;
      this.render();
    }
  }

  private render(){
    this.smileContainer.innerHTML = this.smile;
  }

}

customElements.define( MySmile.is, MySmile );


function importTemplate(templateString:string){
  const wrapper = document.createElement('div');
  wrapper.innerHTML = templateString;
  const template = wrapper.querySelector('template');
  const clone = template.content.cloneNode(true);
  return clone;
}