import { h, Component, prop } from 'skatejs';
import styles from './Button.scss';
import { css } from '../utils/css';
import { getId } from '../utils/object';

export interface IButtonProps extends JSX.HTMLProps<HTMLButtonElement | HTMLAnchorElement | any> {
  /**
   * If provided, this component will be rendered as an anchor.
   * @default ElementType.anchor
   */
  href?: string;

  /**
   * The type of button to render.
   * @defaultvalue ButtonType.normal
   */
  // buttonType?: ButtonType;
  buttonType?: ButtonTypeLiteral;

  /**
   * The button icon shown in command or hero type.
   */
  icon?: string;

  /**
   * Description of the action this button takes.
   * Only used for compound buttons
   */
  description?: string;

  /**
   * Whether the button is disabled
   */
  disabled?: boolean;

  /**
   * The aria label of the button for the benefit of screen readers.
   */
  ariaLabel?: string;

  /**
   * Detailed description of the button for the benefit of screen readers.
   *
   * Besides the compound button, other button types will need more information provided to screen reader.
   */
  ariaDescription?: string;
}
export enum ElementType {
  /** <button> element. */
  button,
    /** <a> element. */
  anchor
}

type ButtonTypess = {
  normal?: 'normal',
  primary?: 'primary',
  hero?: 'hero',
  compound?: 'compound',
  command?: 'command',
  icon?: 'icon'
};
const ButtonTypes: ButtonTypess = {
  normal: 'normal',
  primary: 'primary',
  hero: 'hero',
  compound: 'compound',
  command: 'command',
  icon: 'icon'
};
export type ButtonTypeLiteral = 'normal' | 'primary' | 'hero' | 'compound' | 'command' | 'icon';
export enum ButtonType {
  normal,
  primary,
  hero,
  compound,
  command,
  icon
}

export interface IButtonState {
  labelId?: string;
  descriptionId?: string;
  ariaDescriptionId?: string;
}

export class Button extends Component<IButtonProps> {
  static get is() { return 'uif-button'}
  static get props(){
    return {
      buttonType: prop.string({
        attribute: true,
        default: ButtonTypes.normal,
      }),
      href: prop.string({ attribute: true } ),
      icon: prop.string({ attribute: true } ),
      description: prop.string({ attribute: true } ),
      disabled: prop.boolean({ attribute: true } ),
      class: prop.string({ attribute: true } ),
      ariaLabel: prop.string({ attribute: true } ),
      ariaDescription: prop.string({ attribute: true } ),
    }
  }

  href?: string;
  buttonType?: string;
  icon?: string;
  description?: string;
  disabled?: boolean;
  className: string;
  onClick?: any;
  ariaLabel?: string;
  ariaDescription?: string;

  state = {
    labelId: getId('Button'),
    descriptionId: getId('Button'),
    ariaDescriptionId: getId('Button')
  };

  private _buttonElement: HTMLButtonElement;

  renderCallback() {
    let { labelId, descriptionId, ariaDescriptionId } = this.state;
    const {
      buttonType, children, icon, description, ariaLabel, ariaDescription, href, disabled, onClick=()=>{}
    } = this;
    const renderAsAnchor: boolean = !!href;
    const tag = renderAsAnchor ? 'a' : 'button';
    const className = css((this.className), 'ms-Button', {
      'ms-Button--primary': buttonType === ButtonTypes.primary,
      'ms-Button--hero': buttonType === ButtonTypes.hero,
      'ms-Button--compound': buttonType === ButtonTypes.compound,
      'ms-Button--command': buttonType === ButtonTypes.command,
      'ms-Button--icon': buttonType === ButtonTypes.icon,
      'disabled': (renderAsAnchor && disabled) // add disable styling if it is an anchor
      // if not utilize default button disabled behavior.
    });

    const iconSpan = icon && (buttonType === ButtonTypes.command || buttonType === ButtonTypes.hero || buttonType === ButtonTypes.icon)
      ? <span class='ms-Button-icon'><i class={ `ms-Icon ms-Icon--${icon}` }></i></span>
      : null;

    // ms-Button-description is only shown when the button type is compound.
    // In other cases it will not be displayed.
    const descriptionSpan = description
      ? <span class='ms-Button-description' id={ descriptionId }>{ description }</span>
      : null;

    // If ariaDescription is given, descriptionId will be assigned to ariaDescriptionSpan,
    // otherwise it will be assigned to descriptionSpan.
    const ariaDescriptionSpan = ariaDescription
      ? <span class='ms-u-screenReaderOnly' id={ ariaDescriptionId }>{ ariaDescription }</span>
      : null;

    // Check for ariaDescription, description or aria-describedby in the native props to determine source of aria-describedby
    // otherwise default to null.
    let ariaDescribedBy;

    if (ariaDescription) {
      ariaDescribedBy = ariaDescriptionId;
    } else if (description) {
      ariaDescribedBy = descriptionId;
    } else if (this['aria-describedby']) {
      ariaDescribedBy = this['aria-describedby'];
    } else {
      ariaDescribedBy = null;
    }

    return [
      <style>{styles}</style>,
      <button
        ref={(c:HTMLButtonElement) => this._buttonElement = c}
        href={href}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabel ? null : labelId}
        aria-describedby={ariaDescribedBy}
        onClick={onClick}
        disabled={disabled}
        class={className}
        >
        {iconSpan}
        <span class='ms-Button-label' id={ labelId } >
          <slot>Default Slot</slot>
        </span>
        {descriptionSpan}
        {ariaDescriptionSpan}
      </button>
    ]
  }
}

customElements.define( Button.is, Button );

