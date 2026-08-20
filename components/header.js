class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <a class="top-btn" href="#header">↑</a>
    <header id="header">
      <a href="/" class="logo">
        <img src="images/favicon.png" alt="Logo" >
        Basel Elkhalifa
      </a>
      <nav aria-label="Primary">
        <button class="menu-toggle" aria-expanded="false" aria-label="Open Menu">☰</button> 
        <ul class="menu-links">
          <li><a href="#about">About</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#skills-section">Skills</a></li>
          <li><a href="#contact">Contact</a></li>
          <li>
            <button id="theme-toggle" aria-label="Toggle dark or light mode">
              <i class="fa-solid fa-moon" aria-hidden="true" id="moon"></i>
            </button>
          </li>
        </ul>
      </nav>
    </header>
    `;
  }
}

customElements.define("header-component", Header);
