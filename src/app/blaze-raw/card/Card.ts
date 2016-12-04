import template from './Card.html';
import styles from './Card.scss';
import { interpolateTemplate, attachShadow } from '../utils';

interface CardProps{}

export class Card extends HTMLElement {
  static get is() { return 'blr-card' }

  static get template() { return interpolateTemplate( template, { css: styles } )}

  constructor() {
    super();
    attachShadow( this, Card.template )
  }
}

customElements.define( Card.is, Card );