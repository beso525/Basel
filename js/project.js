// dynamically fill the project page
const urlParams = new URLSearchParams(window.location.search);
const projId = urlParams.get("id");
const url = "./data/projects.json";

function statusLabel(status) {
  return status === "in-progress" ? "In Progress" : "Shipped";
}

async function loadProject(id) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const projects = await response.json();
    const project = projects.find((p) => p.id === id);

    if (!project) {
      showNotFound();
      return;
    }

    createPage(project);
  } catch (err) {
    console.error(err);
    showNotFound();
  }
}

function showNotFound() {
  const content = document.getElementById("project-content");
  const notFound = document.getElementById("project-not-found");
  if (content) content.hidden = true;
  if (notFound) notFound.hidden = false;
}

function createPage(project) {
  document.getElementById("nav-title").textContent = `${project.title} - Basel Elkhalifa`;
  document.getElementById("project-title").textContent = project.title;
  document.getElementById("project-image").src = project.pic;
  document.getElementById("project-image").alt = project.title;
  document.getElementById("project-desc").textContent = project.description;

  const meta = document.getElementById("project-meta");
  const metaBits = [];
  if (project.year) metaBits.push(`<span>${project.year}</span>`);
  if (project.status) {
    metaBits.push(
      `<span class="status-tag${project.status === "in-progress" ? " in-progress" : ""}">${statusLabel(project.status)}</span>`
    );
  }
  meta.innerHTML = metaBits.join("");

  const features = document.getElementById("project-features");
  (project.features || []).forEach((f) => {
    const li = document.createElement("li");
    li.textContent = f;
    features.appendChild(li);
  });

  const challengesSection = document.getElementById("project-challenges").closest("section");
  const challenges = document.getElementById("project-challenges");
  if (project.challenges && project.challenges.length) {
    project.challenges.forEach((c) => {
      const li = document.createElement('li');
      li.textContent = c;
      challenges.appendChild(li);      
    });
  } else if (challengesSection) {
    challengesSection.hidden = true;
  }

  const techContainer = document.getElementById("project-tech");
  (project.tech || []).forEach((t) => {
    const img = document.createElement("img");
    img.src = t.icon;
    img.alt = t.name;
    techContainer.appendChild(img);
  });

  const github = document.getElementById("github-link");
  if (project.github){
    github.href = project.github;
  } else {
    github.style.display = "none";
  } 

  const live = document.getElementById("demo-link");
  if (project.live) {
    live.href = project.live;
  } else {
    live.style.display = "none";
  }

  document.getElementById("project-content").hidden = false;
}

loadProject(projId);
