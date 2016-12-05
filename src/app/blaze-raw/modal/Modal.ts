import template from './Modal.html';
import styles from './Modal.scss';
import { interpolateTemplate, attachShadow, fire, createBindings } from '../utils';


interface ModalProps {
  isOpen?: boolean,
  onModalClose?: Function,
}

class Modal extends HTMLElement{
  static get is() { return 'blr-modal' }
  static get template() { return interpolateTemplate(template, {css: styles}) }
  static get observedAttributes() {
    return ['is-open'];
  }
  private bindings: {closeButton: HTMLButtonElement, modalWrapper: HTMLDivElement, overlay: HTMLDivElement} = {
    closeButton: null,
    modalWrapper: null,
    overlay: null,
  }

  private _isOpen = false;
  get isOpen(){ return this._isOpen }
  set isOpen(value:boolean){
    this._isOpen = value;
    if(value === true ){
      this.setAttribute('is-open','');
    }
    if(value === false){
      this.removeAttribute('is-open')
    }
    this.render();
  }
  constructor() {
    super();
    attachShadow(this, Modal.template)
    this.bindings = createBindings( this, {
      closeButton: '#close-btn',
      modalWrapper: '#modal',
      overlay: '#overlay'
    } ) as any;
    this.bindings.closeButton.addEventListener('click',this.handleModalClose.bind(this));
    this.bindings.modalWrapper.addEventListener('keydown',this.handleEsc.bind(this));
  }
  connectedCallback(){
    this.render();
  }
  attributeChangedCallback(attrName: string, oldVal: any, newVal: any) {
    if (attrName === 'is-open') {
      const isOpen = this.hasAttribute(attrName);
      if (this[attrName] !== isOpen) {
        this.isOpen = isOpen;
      }
    }
  }

  private handleEsc(evt: KeyboardEvent) {
    if (evt.which === 27) {
      this.handleModalClose()
    }
  }
  private handleModalClose() {
    this.isOpen = !this.isOpen;
    this.render();
    fire(this, 'modalClose')
  }
  private render(){
    this.toggleModalVisibility()
    if ( this.isOpen ) {
      this.bindings.modalWrapper.focus();
    }
  }
  private toggleModalVisibility(){
    const isHidden = !this.isOpen;
    this.bindings.overlay.hidden = isHidden;
    this.bindings.modalWrapper.hidden = isHidden;
  }
}

customElements.define(Modal.is,Modal);