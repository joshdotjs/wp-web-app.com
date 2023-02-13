const template = document.createElement('template');
template.innerHTML = `
<style>
  .page-banner {
    background-color: #000;
    padding: 80px 0 40px 0;
    position: relative;
  }
  @media (min-width: 530px) {
    .page-banner {
      padding: 130px 0 60px 0;
    }
  }
  .page-banner__content {
    position: relative;
    z-index: 2;
  }
  .page-banner__title {
    font-family: "Roboto Condensed", sans-serif;
    font-weight: 300;
    font-size: 3.6rem;
    margin: 0 0 1rem 0;
    color: white;
  }
  @media (min-width: 530px) {
    .page-banner__title {
      font-size: 5rem;
    }
  }
  .page-banner__bg-image {
    opacity: 0.33;
    background-size: cover;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .page-banner__intro {
    font-weight: 300;
    font-size: 1.2rem;
    line-height: 1.3;
    color: #ededed;
  }
  @media (min-width: 530px) {
    .page-banner__intro {
      font-size: 1.65rem;
    }
  }
  .page-banner__intro p {
    margin: 0;
  }
</style>
<div class="page-banner">
  <div class="page-banner__bg-image" 
    style="background-image: url(/wp-content/themes/j-theme/img/library-hero.jpg)">
  </div>
  <!-- <div class="page-banner__bg-image" 
    style="background-image: url(<?php echo get_theme_file_uri('/img/library-hero.jpg') ?>)">
  </div> -->
  <div class="page-banner__content container">
    <slot name="title"></slot>
    <slot name="text"></slot>
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