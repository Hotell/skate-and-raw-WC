import { h, Component } from 'skatejs';
import { Button } from '../Button';

import styles from './Demo.scss';

export class Demo extends Component<void> {
  static get is() { return 'demo-bl-buttons'}

  renderCallback() {
    return [
      <style></style>,
      <div>
        <Button
          disabled
          type="brand"
        >Click me</Button>
        <Button
          type="brand"
        >Click me</Button>
      </div>
    ]
  }
}


customElements.define( Demo.is, Demo );