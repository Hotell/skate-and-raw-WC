export function importTemplate( templateString: string) {
  const wrapper = document.createElement('div');
  // this will parse the string
  wrapper.innerHTML = templateString;

  const template = wrapper.querySelector('template');
  ShadyCSS.prepareTemplate(template, template.id);

  const clone = template.content.cloneNode(true);

  wrapper.remove();
  return clone;
}
export function createBindings(instance: HTMLElement,bindings:Object){
  const keys = Object.keys(bindings);
  return keys.reduce( ( newBindings, propName ) => {
    const cssSelector = bindings[ propName ];
    newBindings[ propName ] = instance.shadowRoot.querySelector( cssSelector );
    return newBindings
  }, {} )
}
export function attachShadow(instance: HTMLElement,template=''){
  instance.attachShadow({ mode: 'open' });
  const dom = importTemplate(template);
  instance.shadowRoot.appendChild(dom);
  ShadyCSS.applyStyle(instance);
}
export function fire( instance: HTMLElement, eventName: string, customPayload: Object ) {
  /* do any other updates we need */
  instance.dispatchEvent(
    new CustomEvent( eventName, { detail: customPayload } )
  );
}
export function interpolateTemplate(template:string,bindings:Object){
  return template.replace( /\$\{(.+)\}/, ( p1, p2 ) => {
    // console.log('====', arguments, bindings );
    return bindings[ p2 ];
  } )
}