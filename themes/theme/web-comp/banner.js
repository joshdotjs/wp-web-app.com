const template = document.createElement('template');
template.innerHTML = `
<style>
  * {
    box-sizing: border-box;
    
  }

  .page-banner {
    position: relative;
    /* width: 100%; */
    height: 200px;
    background-image: url('/wp-content/themes/j-theme/img/library-hero.jpg');
    background-size: cover;
    background-repeat: no-repeat;

    display: flex;
    justify-content: space-evenly;
    align-items: center;
    overflow: hidden;
  }

  .overlay {
    position: absolute;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.7);
  }

  .content {
    position: relative;
    z-index: 1;
    color: white;
    text-align: center;
    /* background: rgba(255, 0, 0, 0.6); */
    width: 80%;
  }

</style>
<div class="page-banner">
  <div class="overlay"></div>

  <div class="content">
    <slot name="title"></slot>
    <slot name="text"></slot>

    <p>
      Reprehenderit proident occaecat id veniam adipisicing fugiat irure dolor aliquip officia exercitation.
    </p>

  </div>
</div>
`;

class WebComp extends HTMLElement {
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

window.customElements.define('wc-banner', WebComp);