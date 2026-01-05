// dynamically fill the project page
const urlParams = new URLSearchParams(window.location.search);
const projId = urlParams.get("id");
const url = "./data/projects.json";

async function loadProject(id) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const projects = await response.json();
    const project = projects.find((p) => p.id === id);

    if (!project) {
      console.error("Project not found");
      return;
    }

    createPage(project);
  } catch (err) {
    console.error(err);
  }
}

function createPage(project) {
  document.getElementById("nav-title").textContent = project.title;
  document.getElementById("project-title").textContent = project.title;
  document.getElementById("project-image").src = project.pic;
  document.getElementById("project-desc").textContent = project.description;

  const features = document.getElementById("project-features");
  project.features.forEach((f) => {
    const li = document.createElement("li");
    li.textContent = f;
    features.appendChild(li);
  });

  document.getElementById("project-challenges").textContent =
    project.challenges;

  const techContainer = document.getElementById("project-tech");
  project.tech.forEach((t) => {
    const img = document.createElement("img");
    img.src = t.icon;
    img.alt = t.name;
    techContainer.appendChild(img);
  });

  const github = document.getElementById("github-link");
  if (project.github) github.href = project.github;
  else github.style.display = "none";

  const live = document.getElementById("demo-link");
  if (project.live) live.href = project.live;
  else github.style.display = "none";
}

loadProject(projId);
