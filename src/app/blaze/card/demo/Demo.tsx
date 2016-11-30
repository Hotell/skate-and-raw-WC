import { h, Component } from 'skatejs';
import styles from './Demo.scss';
import { Card } from '../Card';

export class Demo extends Component {
  static get is() { return 'demo-bl-card' }

  renderCallback() {
    return [
      <style>{styles}</style>,
      <div>
        <Card>
          <span slot="title">Hello</span>
          <span slot="body">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, reiciendis.</span>
          <span slot="footer">Footer baby</span>
        </Card>
      </div>
    ]
  }
}

customElements.define( Demo.is, Demo );