(() => {


  const template = document.createElement('template');
  template.innerHTML = `
    <style>
    /* * {
      color: red;
    } */
    </style>

    <h1>
      WEB COMPONENT
    </h1>
  `;

  class WebComp2 extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open'})
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
    
    connectedCallback() {
      const elem = this.shadowRoot.querySelector('#web-comp');
    }
    
    disconnectedCallback() {
      const elem = this.shadowRoot.querySelector('#web-comp')
    }
  }

  window.customElements.define('wc-navlinks', WebComp2);

})();