class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <header>
      <h1>Basel Elkhalifa</a></h1>
      <nav>
      <button class="menu-toggle" aria-label="Open Menu">☰</button> 
        <ul class="menu-links">
          <li><a href="/Basel/#about" class="dest">About</a></li>
          <li><a href="/Basel/#projects" class="dest">Projects</a></li>
          <li><a href="/Basel/#skills" class="dest">Skills</a></li>
          <li><a href="/Basel/#contact" class="dest">Contact</a></li>
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
