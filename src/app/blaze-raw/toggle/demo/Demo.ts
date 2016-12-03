import styles from './Demo.scss';
import { interpolateTemplate, attachShadow } from '../../utils';
const template = (css) => {
  return `
    <template id="demo-blr-toggle">
       <style>${css}</style>
      <div>
        <blr-toggle checked={true} type="brand">Yo mama</blr-toggle>
        <blr-toggle disabled>Yo mama</Toggle>
      </div>
    </template>
    `
};

const dom = interpolateTemplate( template(styles), { css: styles } );

class Demo extends HTMLElement {
  static get is() { return 'demo-blr-toggle'}

  constructor() {
    super();
    attachShadow(this,dom);
  }
}

customElements.define( Demo.is, Demo );