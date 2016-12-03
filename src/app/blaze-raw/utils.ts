export function importTemplate( templateString: string, css = '') {
  const wrapper = document.createElement('div');
  // this will parse the string
  wrapper.innerHTML = templateString;

  const template = wrapper.querySelector('template');

  const clone = template.content.cloneNode(true);

  // resolve styling
  const style: HTMLStyleElement = (clone as any).querySelector('style');
  if ( style ) {
    style.appendChild( document.createTextNode( css ) );
  } else {
    console.warn( 'you have not defined <style></style> within your template' )
  }

  wrapper.remove();
  return clone;
}
export function createBindings(instance: HTMLElement,bindings:Object){
  const keys = Object.keys(bindings);
  return keys.reduce( ( newBindings, propName ) => {
    const cssSelector = bindings[ propName ];
    console.log( propName, cssSelector );
    newBindings[ propName ] = instance.shadowRoot.querySelector( cssSelector );
    return newBindings
  }, {} )
}
export function attachShadow(instance: HTMLElement,template='',style=''){
  instance.attachShadow({ mode: 'open' });
  const dom = importTemplate(template,style);
  instance.shadowRoot.appendChild(dom);
}
export function fire( instance: HTMLElement, eventName: string, customPayload: Object ) {
  /* do any other updates we need */
  instance.dispatchEvent(
    new CustomEvent( eventName, { detail: customPayload } )
  );
}