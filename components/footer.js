class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const year = new Date().getFullYear();
    this.innerHTML = `
    <footer id="contact">
      <p>&copy; ${year} Basel Elkhalifa</p>
      <div class="footer-links" >
        <a href="mailto:basel.alkhalifa@hotmail.com" aria-label="Email Basel">
          <i class="fa-solid fa-envelope" aria-hidden="true"></i>
        </a>
        <a href="https://www.linkedin.com/in/basel-elkhalifa/" target="__blank" rel="noopener" aria-label="Basel's LinkedIn">
          <i class="fa-brands fa-linkedin" aria-hidden="true"></i>
        </a>
        <a href="https://github.com/beso525" target="__blank" rel="noopener" aria-label="Basel's Github">
          <i class="fa-brands fa-github" aria-hidden="true"></i>
        </a>
      </div>
    </footer>
    `;
  }
}

customElements.define("footer-component", Footer);
