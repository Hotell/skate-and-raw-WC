declare module '*';
// extend Window
declare interface Window {
  customElements: CustomElementRegistry,
  MaterialTooltip: MaterialDesignLite.MaterialTooltip
  MaterialCheckbox: MaterialDesignLite.MaterialCheckbox
}

declare class CustomElementRegistry {
  define( tagName: string, definition: {prototype: any} ): void

  get( tagName: string ): HTMLElement | void

  whenDefined( tagName: string ): Promise<void>
}

declare interface HTMLElement {
  // custom elements API
  connectedCallback()
  disconnectedCallback()
  attributeChangedCallback( name?: string, oldValue?: any, newValue?: any ): void
  // shadow DOM API
  shadowRoot: HTMLElement,
  attachShadow( { mode:string } ): HTMLElement,
  assignedNodes( { flatten }?:{flatten?: boolean} ): NodeList,
  assignedSlot: string|void,
}

declare interface HTMLElementStatic {
  observedAttributes: string[]|void
}



// SKate

declare module 'skatejs-web-components';
