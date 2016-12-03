import { css } from '../../ui-fabric/utils/css';
import { attachShadow, createBindings } from '../utils';

import template from './Button.html';
import style from './Button.scss';

const ButtonTypes = {
  brand: 'brand',
  info: 'info',
  warning: 'warning',
  success: 'success',
  error: 'error'
};

type ButtonType = typeof ButtonTypes;
type ButtonTypeLiteral = keyof ButtonType;

// public
interface ButtonProps {
  disabled?: boolean,
  type?: ButtonTypeLiteral,
}


export class Button extends HTMLElement implements ButtonProps {
  static get is(){ return 'blr-button' }
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

  private _type = '' as ButtonTypeLiteral;
  get type() { return this._type }
  set type( value: ButtonTypeLiteral ) {
    this._type = value;
    // reflect to attribute
    this.setAttribute( 'type', value );
    this.render();
  }
  constructor(){
    super();
    attachShadow( this, template, style );
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
    const className = css(
      'c-button',
      {
        'c-button--brand': type === ButtonTypes.brand,
        'c-button--info': type === ButtonTypes.info,
        'c-button--success': type === ButtonTypes.success,
        'c-button--warning': type === ButtonTypes.warning,
        'c-button--error': type === ButtonTypes.error,
      }
    );
    button.className = className;
    button.disabled = disabled;
  }
}

customElements.define( Button.is, Button );