class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <a class="top-btn" href="#header">↑</a>
    <header id="header">
      <h1><a href="/Basel" class="dest">Basel Elkhalifa</a></h1>
      <nav>
      <button class="menu-toggle" aria-label="Open Menu">☰</button> 
        <ul class="menu-links">
          <li><a href="#about" class="dest">About</a></li>
          <li><a href="#projects" class="dest">Projects</a></li>
          <li><a href="#skills" class="dest">Skills</a></li>
          <li><a href="#contact" class="dest">Contact</a></li>
          <li>
            <i class="fa-solid fa-moon dest" id="moon"></i>
          </li>
        </ul>
      </nav>
    </header>
    `;
  }
}

customElements.define("header-component", Header);
