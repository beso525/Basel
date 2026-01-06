class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <header>
      <h1>Basel Elkhalifa</a></h1>
      <nav>
        <ul>
          <li><a href="/index.html#about" class="dest">About</a></li>
          <li><a href="/index.html#projects" class="dest">Projects</a></li>
          <li><a href="/index.html#skills" class="dest">Skills</a></li>
          <li><a href="/index.html#contact" class="dest">Contact</a></li>
          <li>
            <i class="fa-solid fa-moon" id="moon"></i>
          </li>
        </ul>
      </nav>
    </header>
    `;
  }
}

customElements.define("header-component", Header);
