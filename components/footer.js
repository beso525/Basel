class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <footer id="contact">
      <p>© 2025 Basel Elkhalifa, Halifax, CA</p>
      <div class="footer-links" >
        <a href="mailto:basel.alkhalifa@hotmail.com">
          <i class="fa-solid fa-envelope"></i>
        </a>
        <a href="https://www.linkedin.com/in/basel-elkhalifa/" target="__blank">
          <i class="fa-brands fa-linkedin"></i>
        </a>
        <a href="https://github.com/beso525" target="__blank">
          <i class="fa-brands fa-github"></i>
        </a>
      </div>
    </footer>
    `;
  }
}

customElements.define("footer-component", Footer);
