import { attachShadow, createBindings, interpolateTemplate, handleTypeElementClasses, TypeLiteral } from '../utils';
import template from './Button.html';
import styles from './Button.scss';

// public
interface ButtonProps {
  disabled?: boolean,
  type?: TypeLiteral,
}

export class Button extends HTMLElement implements ButtonProps {
  static get is(){ return 'blr-button' }
  static get template(){ return interpolateTemplate( template, { css: styles } ) }
  // Tells the element which attributes to observer for changes
  // This is a feature added by Custom Elements
  static get observedAttributes() {
    return ['type','disabled'];
  }

  private bindings: {button: HTMLButtonElement} = {
    button: null
  };

  private _disabled = false;
  get disabled(){ return this._disabled }
  set disabled( value: boolean ) {
    this._disabled = value;
    if(value === true){
      this.setAttribute( 'disabled', '' );
    }
    if(value === false){
      this.removeAttribute( 'disabled');
    }
    this.render();
  }

  private _type = '' as TypeLiteral;
  get type() { return this._type }
  set type( value: TypeLiteral ) {
    this._type = value;
    // reflect to attribute
    this.setAttribute( 'type', value );
    this.render();
  }
  constructor(){
    super();
    attachShadow( this, Button.template);
    this.bindings = createBindings( this, { button: 'button' } ) as any;
  }

  attributeChangedCallback( attrName: string, oldVal: any, newVal: any ) {
    // Called when an attribute was added, removed, or updated
    if(attrName === 'type'){
      if ( this[ attrName ] !== newVal ) {
        this[ attrName ] = newVal;
      }
    }
    if(attrName === 'disabled'){
      const isDisabled = this.hasAttribute('disabled');
      if ( this[ attrName ] !== isDisabled ) {
        this[ attrName ] = isDisabled;
      }
    }

  }
  connectedCallback(){
    this.render();
  }

  private render(){
    const { type, disabled, bindings } = this;
    const { button } = bindings;
    const className = handleTypeElementClasses('button',type);
    button.className = className;
    button.disabled = disabled;
  }
}

customElements.define( Button.is, Button );