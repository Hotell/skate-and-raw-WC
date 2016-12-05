import { Modal } from '../Modal';

class Demo extends HTMLElement {
  static get is() { return 'demo-blr-modal' }
  static get template(){
    return (`
      <blr-button id="modal-toggle" type="info">Open Modal</blr-button>
      <blr-modal>
        <span slot="title">Modal heading</span>
        <span>
          This is the modal body
          <input type="text"/>
        </span>
        <span slot="footer">
          <blr-button id="modal-close" type="brand">Close</blr-button>
        </span>
      </blr-modal>
    `)
  }

  private isModalOpen = false;
  private bindings: {
    modalToggleBtn:HTMLButtonElement,
    modalCloseBtn:HTMLButtonElement,
    modalRef: Modal,
  } = {
    modalToggleBtn: null,
    modalCloseBtn: null,
    modalRef: null
  };

  constructor() {
    super();
    this.attachShadow( { mode: 'open' } );
    this.shadowRoot.innerHTML = Demo.template;

    this.bindings.modalToggleBtn = this.shadowRoot.querySelector('#modal-toggle') as HTMLButtonElement;
    this.bindings.modalCloseBtn = this.shadowRoot.querySelector('#modal-close') as HTMLButtonElement
    this.bindings.modalRef = this.shadowRoot.querySelector('blr-modal') as Modal;

    this.bindings.modalToggleBtn.addEventListener('click',this.toggleModal.bind(this));
    this.bindings.modalCloseBtn.addEventListener('click',this.toggleModal.bind(this));
    this.bindings.modalRef.addEventListener(Modal.events.modalClose, this.toggleModal.bind(this));
  }
  toggleModal(){
    console.log( 'toggleModal' );
    this.isModalOpen = !this.isModalOpen;
    this.render();
  }
  connectedCallback(){
    this.render();
  }

  private render(){
    this.bindings.modalRef.isOpen = this.isModalOpen;
  }
}

customElements.define( Demo.is, Demo );