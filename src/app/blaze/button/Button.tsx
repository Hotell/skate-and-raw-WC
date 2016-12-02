import { h, Component, prop } from 'skatejs';
import styles from './Button.scss';
import { css } from '../../ui-fabric/utils/css';

const ButtonTypes = {
  brand: 'brand',
  info: 'info',
  warning: 'warning',
  success: 'success',
  error: 'error'
};

type ButtonType = typeof ButtonTypes;


// public
interface ButtonProps extends JSX.HTMLProps<HTMLButtonElement | HTMLAnchorElement | any> {
  disabled?: boolean,
  type?: keyof ButtonType,
}

export class Button extends Component<ButtonProps> {
  static get is(){ return 'bl-button' }
  static get props() {
    return {
      disabled: prop.boolean( {
        attribute: true
      } ),
      type: prop.string({
        attribute: true
      })
    }
  }

  disabled: boolean;
  type = '';

  renderCallback() {
    const {type} = this;
    const className = css(
      'c-button',
      {
        'c-button--brand': type === ButtonTypes.brand,
        'c-button--info': type === ButtonTypes.info,
        'c-button--success': type === ButtonTypes.success,
        'c-button--warning': type === ButtonTypes.warning,
        'c-button--error': type === ButtonTypes.error,
      }
    );
    return [
      <style>{styles}</style>,
      <button
        className={className}
        disabled={this.disabled}
      >
        <slot/>
      </button>,
      <pre>type: {type}</pre>,
    ]
  }
}

customElements.define( Button.is, Button );