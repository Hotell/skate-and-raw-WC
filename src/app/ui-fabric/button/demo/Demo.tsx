import { h, Component, prop } from 'skatejs';
import { Button } from '../Button';

class Demo extends Component {
  static get is() { return 'demo-buttons' }
  static get props(){
    return {
      isDisabled: prop.boolean(),
      default: false
    }
  }

  private isDisabled = false;
  private toggleDisabled(){
    this.isDisabled = !this.isDisabled;
  }
  renderCallback(){
    const {isDisabled} = this;
    return ([
      <style>
      {`
        .showcase-container{}
        .showcase-container uif-button{ margin: 1rem}
      `}
      </style>,
      <div>
        <Button onClick={()=>this.toggleDisabled()}>toggle disabled</Button>
      </div>,
      <div class="showcase-container" style={{display:'flex',flexDirection:'column'}}>
        <Button disabled={ isDisabled } >Create Account</Button>
        <Button buttonType="primary" disabled={ isDisabled }>Create Account</Button>
        <Button
          buttonType="hero"
          icon="Add"
          disabled={ isDisabled }
        >Create Account</Button>
        <Button
          buttonType="compound"
          description='You can create a new account here.'
          disabled={ isDisabled }
        >Create Account</Button>
        <Button
          buttonType="command"
          icon='AddFriend'
          description='Description of the action this button takes'
          disabled={ isDisabled }
        >Create Account</Button>
        <Button
          buttonType="icon"
          icon='Emoji2'
          title='Emoji'
          ariaLabel='Emoji'
          disabled={ isDisabled }
        >Create Account</Button>
        <Button
          data-automation-id='test'
          disabled={ isDisabled }
          buttonType="primary"
          href='http://bing.com'
          target='_blank'
          title='Let us bing!'
          description='Navigate to Bing home page.'>
          Bing
        </Button>
      </div>
    ])
  }
}

customElements.define( Demo.is, Demo );