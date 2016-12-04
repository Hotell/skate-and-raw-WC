import { css } from '../ui-fabric/utils/css';

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
export function fire( instance: HTMLElement, eventName: string, customPayload = {} ) {
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

const Types = {
  brand: 'brand',
  info: 'info',
  warning: 'warning',
  success: 'success',
  error: 'error'
};
export type Type = typeof Types;
export type TypeLiteral = keyof Type;


export function handleTypeElementClasses(baseName:string,type:string): string{
  return css(
    `c-${baseName}`,
    {
      [`c-${baseName}--brand`]: type === Types.brand,
      [`c-${baseName}--info`]: type === Types.info,
      [`c-${baseName}--success`]: type === Types.success,
      [`c-${baseName}--warning`]: type === Types.warning,
      [`c-${baseName}--error`]: type === Types.error,
    }
  );
}