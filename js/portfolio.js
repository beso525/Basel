document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const menuLinks = document.querySelector(".menu-links");

  // phone menu
  if (menuToggle && menuLinks) {
    menuToggle.addEventListener("click", () => {
      menuLinks.classList.toggle("active");
  
      const isExpanded =
        menuToggle.getAttribute("aria-expanded") === "true" || false;
      menuToggle.setAttribute("aria-expanded", !isExpanded);
    });

    menuLinks.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        menuLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // dark/light mode toggle
  const toggle = document.getElementById("moon");
  const root = document.documentElement;
  const savedTheme = localStorage.getItem("theme") || "dark";
  root.setAttribute("data-theme", savedTheme);

  if (toggle) {
    toggle.addEventListener("click", () => {
      const current = root.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    });
  }

  // reveal when scrolling
  const reveal = document.querySelectorAll(".reveal");
  if (reveal.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        (entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }))
      }, {
        threshold: 0.15
      }
    );
    reveal.forEach((el) => observer.observe(el));
  } else {
    reveal.forEach((el) => el.classList.add("is-visible"));
  }  

  // project cards
  const container = document.getElementById("project-container");
  const url = "./data/projects.json";

  function skeletonCard() {
    const card = document.createElement("div");
    card.className = "skeleton-card";
    card.innerHTML = `
      <div class="thumb-sk"></div>
      <div class="line"></div>
      <div class="line short"></div>
    `;
    return card;
  }

  function showSkeleton(count = 3) {
    container.innerHTML = "";
    for (let i = 0; i < count; i++) container.appendChild(skeletonCard());    
  }
  
  function showMessage(text) {
    container.innerHTML= `<p class="state-msg">${text}</p>`
  }

  function statusLabel(status) {
    if (status === "in-progress") return "In progress";
    return "Shipped"
  }

  function renderCards(projects) {
    container.innerHTML = "";

    if (!projects.length) {
      showMessage("Please refresh to view the projects.")
      return;
    }

    projects.forEach((project) => {
      const card = document.createElement("a");
      card.className = "project-card reveal";
      card.href = `project.html?id=${encodeURIComponent(project.id)}`

      const metaBits = [];
      if (project.year) metaBits.push(project.year);
      const statusChip = project.status 
      ? `<span class="status-tag${project.status === "in-progress" ? " in-progress" : ""}">${statusLabel(project.status)}</span>`
      : "";

      card.innerHTML = `
      <img class="thumb" src="${project.pic}" alt="${project.title}" loading="lazy" />
      <div class="card-body">
        <div class="card-meta">
          ${metaBits.map((m) => `<span>${m}</span>`).join("")}
          ${statusChip}
        </div>
        <h3 class="title">${project.title}</h3>
        <p class="description">${project.overview}</p>
        <div class="skill-tech">
          ${project.tech.map((t) => `<img src="${t.icon}" alt="" title="${t.name}" />`)
          .join("")}
        </div>
        <span class="view-link">View project &rarr;</span>
      </div>
      `;
      container.appendChild(card);
    })

    const reveal = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          (entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          }))
        }, {
          threshold: 0.15
        }
      );
      reveal.forEach((el) => observer.observe(el));
    } else {
      reveal.forEach((el) => el.classList.add("is-visible"));
    } 
  }

  async function loadProjects() {
    showSkeleton();
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      renderCards(data);
    } catch (err) {
      console.error("Error loading projects", err);
      showMessage("Couldn't load projects right now. Please try refreshing the page.")
    }
  }

  if (container) {
    loadProjects();
  }
});
