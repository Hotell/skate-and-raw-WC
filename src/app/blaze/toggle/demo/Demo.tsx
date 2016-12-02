import { h, Component } from 'skatejs';
import { Toggle } from '../Toggle';

import styles from './Demo.scss';

class Demo extends Component<void> {
  static get is() {return 'demo-bl-toggle'};

  renderCallback() {
    return [
      <style>{styles}</style>,
      <div>
        <Toggle checked={true} type="brand">Yo mama</Toggle>
        <Toggle disabled>Yo mama</Toggle>
      </div>
    ]
  }
}


customElements.define( Demo.is, Demo );
