import template from './Toggle.html';
import styles from './Toggle.scss';
import { interpolateTemplate, attachShadow, createBindings, handleTypeElementClasses } from '../utils';


export interface ToggleProps {
  disabled?: boolean,
  checked?: boolean,
  type?: string,
}

export class Toggle extends HTMLElement implements ToggleProps {
  static get is() { return 'blr-toggle' }
  static get template(){ return interpolateTemplate( template, { css: styles } ) }
  static get observedAttributes() {
    return ['type','disabled','checked'];
  }

  private bindings: {input: HTMLInputElement, label: HTMLLabelElement} = {
    input: null,
    label: null,
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

  private _checked = false;
  get checked(){ return this._checked }
  set checked( value: boolean ) {
    this._checked = value;
    if(value === true){
      this.setAttribute( 'checked', '' );
    }
    if(value === false){
      this.removeAttribute( 'checked');
    }
    this.render();
  }

  private _type = '';
  get type() { return this._type }
  set type( value: string ) {
    this._type = value;
    // reflect to attribute
    this.setAttribute( 'type', value );
    this.render();
  }

  constructor(){
    super();
    attachShadow(this,Toggle.template);
    this.bindings = createBindings( this, { input: 'input', label: 'label' } ) as any;
    this.bindings.input.addEventListener('change',this.handleChecked.bind(this));
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
    if(attrName === 'checked'){
      const isChecked = this.hasAttribute('checked');
      if ( this[ attrName ] !== isChecked ) {
        this[ attrName ] = isChecked;
      }
    }

  }

  connectedCallback(){
    this.render();
  }

  disconnectedCallback(){
    this.bindings.input.removeEventListener('change',this.handleChecked);
  }

  private handleChecked( e: Event ) {
    this.checked = !this._checked;
  }

  private render(){
    const { type, disabled, checked, bindings } = this;
    const { input, label } = bindings;
    const className = handleTypeElementClasses('toggle',type);
    label.className = className;
    input.disabled = disabled;
    input.checked = checked;
  }
}

customElements.define( Toggle.is, Toggle );