// js to create a darkmode/light mode toggle button
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const menuLinks = document.querySelector(".menu-links");

  menuToggle.addEventListener("click", () => {
    menuLinks.classList.toggle("active");

    const isExpanded =
      menuToggle.getAttribute("aria-expanded") === "true" || false;
    menuToggle.setAttribute("aria-expanded", !isExpanded);
  });

  const toggle = document.getElementById("moon");
  const root = document.documentElement;

  const savedTheme = localStorage.getItem("theme") || "dark";
  root.setAttribute("data-theme", savedTheme);

  toggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });

  const container = document.getElementById("project-container");
  const url = "./data/projects.json";

  async function createCards(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(response.status);
      }

      const data = await response.json();

      data.forEach((project) => {
        const card = document.createElement("div");
        card.classList.add("project-card");
        card.dataset.project = project.id;

        card.innerHTML = `
        <h3 class="title">${project.title}</h3>
        <p class="description">${project.overview}</p>
        <div class="skill-tech">
        ${project.tech
          .map(
            (tech) =>
              `<img src="${tech.icon}" alt="${tech.name}" title="${tech.name}" />`
          )
          .join("")}
      </div>
    `;

        card.addEventListener("click", (e) => {
          if (e.target.tagName === "A") return;
          window.location.href = `project.html?id=${project.id}`;
        });
        container.append(card);
      });
    } catch (err) {
      console.error("Error loading projects: ", err);
    }
  }

  if (container) {
    createCards(url);
  }
});
