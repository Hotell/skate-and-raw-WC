import { h, Component } from 'skatejs';
import styles from './Demo.scss';
import { Tooltip } from '../Tooltip';

export class Demo extends Component {
  static get is() { return 'demo-bl-tooltip' }

  renderCallback() {
    return [
      <style>{styles}</style>,
      <div>
        <Tooltip label="this is label of tooltip">Tooltip default</Tooltip><br />
        <Tooltip label="this is label of tooltip" type="top">Tooltip top</Tooltip><br />
        <Tooltip label="this is label of tooltip" type="left">Tooltip left</Tooltip><br />
        <Tooltip label="this is label of tooltip" type="bottom">Tooltip bottom</Tooltip>
      </div>
    ]
  }
}

customElements.define( Demo.is, Demo );