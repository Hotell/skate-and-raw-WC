import './style.css';
import './app/raw-wc';
import './app/skate-wc';
import './app/ui-fabric';
import './app/blaze';

const mountPoint = document.getElementById('app');
const App = () => (`
   <section>
    <h1>WC components catalogue</h1>
    <fieldset>
      <legend><h2>Blaze</h2></legend>
      <demo-bl-buttons></demo-bl-buttons>
      <demo-bl-toggle></demo-bl-toggle>
      <demo-bl-modal></demo-bl-modal>       
    </fieldset>
    
    <fieldset>
      <legend><h2>UI Fabric</h2></legend>
      <section>
          <span class="ms-font-su ms-fontColor-themePrimary">Big blue text</span>
      </section>
      <section>
          <demo-buttons></demo-buttons>
      </section>
    </fieldset>        
    
    <fieldset>
        <legend><h4>Raw WC</h4></legend>
        
        <my-smile tabindex="1" smile=":)">
          <p>This will be projected to default slot</p>
          <p slot="description">this is desc...</p>
        </my-smile>
    </fieldset>
    
    <fieldset>
      <legend><h4>SkateJS WC</h4></legend>
      <x-counter></x-counter>
      <my-counter></my-counter>
      <x-hello name="fofof"></x-hello>
    </fieldset>
  </section>
`);

render(App, mountPoint);


function render(rootElement: Function, where: HTMLElement) {
  mountPoint.innerHTML = App();
}