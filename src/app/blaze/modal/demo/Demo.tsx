import { h, Component, prop } from 'skatejs';
import { Modal } from '../Modal';
import { Button } from '../../button/Button';

import styles from './Demo.scss';

export class Demo extends Component<void> {
  static get is() { return 'demo-bl-modal' }
  static get props(){
    return {
      isModalOpen: prop.boolean()
    }
  }

  isModalOpen = false;

  toggleModal(){
    console.log( 'toggleModal' );
    this.isModalOpen = !this.isModalOpen
  }
  connectedCallback(){
    super.connectedCallback();
    this.toggleModal = this.toggleModal.bind(this);
  }

  renderCallback() {
    const {isModalOpen} = this;
    return [
      <style>{styles}</style>,
      <Button type="info" onClick={this.toggleModal}>Open Modal</Button>,
      <Modal isOpen={isModalOpen} onModalClose={this.toggleModal}>
        <span slot="title">Modal heading</span>
        <span>
          This is the modal body
          <input type="text"/>
        </span>
        <span slot="footer">
          <Button onClick={this.toggleModal} type="brand">Close</Button>
        </span>
      </Modal>
    ]
  }
}

customElements.define( Demo.is, Demo );