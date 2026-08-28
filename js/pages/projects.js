/* /js/pages/projects.js
 * Add a new card by adding one object to PROJECTS below.
 */

const PROJECTS = [
  {
    title: "Pairadoxle",
    frontTitle: "Pairadoxle: A self-sustaining Daily Game",
    tagline: "A daily logic game generated from the date instead of a hand-written puzzle list.",
    description:
      "Each date seeds a deterministic puzzle. The generator searches for a valid X/Y solution, then reveals only enough cells to leave exactly one possible answer. The result is a fresh daily board that can keep producing puzzles without needing a manually maintained puzzle database.",
    image: "../assets/pictures/projects/pairadoxle.png",
    imageAlt: "Pairadoxle daily puzzle game interface",
    projectUrl: "/projects/pairadoxle/",
    githubUrl: "https://github.com/CookieTheDevil/pairadoxle",
    tech: ["HTML/CSS", "Vanilla JavaScript", "GitHub Pages", "Cloudflare D1"],
    tilt: "-0.8deg",
  },
  {
    title: "Chameleon",
    frontTitle: "Chameleon with a server-hosted backend",
    tagline: "A browser version of the social deduction game, with shared state handled on the server.",
    description:
      "A multiplayer Chameleon implementation built around a server-hosted backend rather than keeping the whole round in one browser. The interface handles categories, secret roles and round progression while the backend keeps the shared game state consistent for everyone playing.",
    image: "../assets/pictures/projects/chameleon.png",
    imageAlt: "Chameleon game interface showing a technology category grid",
    projectUrl: "/projects/chameleon/",
    githubUrl: "https://github.com/CookieTheDevil/chameleon",
    tech: ["HTML/CSS", "JavaScript", "Server-hosted backend"],
    tilt: "0.5deg",
  },
  {
    title: "CSS Named Colors",
    frontTitle: "CSS Named Colors",
    tagline: "A visual reference for the wonderfully specific names built into CSS.",
    description:
      "A compact color browser for exploring CSS named colors by sight instead of memorizing keywords. It puts the color and its name side by side, making it quick to scan for a useful shade — or just appreciate that names like papayawhip and darkkhaki are part of the platform.",
    image: "../assets/pictures/projects/css-named-colors.png",
    imageAlt: "Grid of CSS named color swatches and their names",
    projectUrl: "/projects/colors/",
    githubUrl: "https://github.com/CookieTheDevil/colors",
    tech: ["HTML", "CSS", "JavaScript"],
    tilt: "-0.35deg",
  },
];

const githubIcon = `
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M12 .7A11.3 11.3 0 0 0 8.4 22.8c.6.1.8-.3.8-.6v-2.2c-3.4.7-4.1-1.4-4.1-1.4-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.4 3.6 1.1.1-.8.4-1.4.8-1.7-2.7-.3-5.6-1.4-5.6-6A4.7 4.7 0 0 1 5.8 7.3a4.4 4.4 0 0 1 .1-3.4s1-.3 3.5 1.3a12 12 0 0 1 6.3 0c2.4-1.6 3.5-1.3 3.5-1.3a4.4 4.4 0 0 1 .1 3.4 4.7 4.7 0 0 1 1.3 3.3c0 4.7-2.9 5.7-5.6 6 .4.4.8 1.1.8 2.2v3.3c0 .4.2.7.8.6A11.3 11.3 0 0 0 12 .7Z"/>
  </svg>
`;

function createProjectCard(project, index) {
  const card = document.createElement("article");
  card.className = "project-card";
  card.style.setProperty("--tilt", project.tilt ?? "0deg");

  const techItems = project.tech.map((item) => `<li>${item}</li>`).join("");

  const githubBadge = project.githubUrl
    ? `<span class="project-open-source" title="Source available on GitHub">${githubIcon}</span>`
    : "";

  const githubAction = project.githubUrl
    ? `
      <a
        class="project-action"
        href="${project.githubUrl}"
        target="_blank"
        rel="noopener noreferrer"
      >
        ${githubIcon}
        GitHub
      </a>
    `
    : "";

  const frontId = `project-front-${index}`;
  const backId = `project-back-${index}`;

  card.innerHTML = `
    <div class="project-card-inner">
      <button
        class="project-card-face project-card-front"
        id="${frontId}"
        type="button"
        aria-label="Show details for ${project.title}"
        aria-controls="${backId}"
        aria-expanded="false"
      >
        <span class="project-image-wrap">
          <img class="project-image" src="${project.image}" alt="${project.imageAlt}">
          ${githubBadge}
        </span>

        <span class="project-front-copy">
          <span class="project-front-title">${project.frontTitle}</span>
          <span class="project-front-hint">click for details ↻</span>
        </span>
      </button>

      <div
        class="project-card-face project-card-back"
        id="${backId}"
        aria-hidden="true"
      >
        <button
          class="project-flip-back"
          type="button"
          aria-label="Show ${project.title} preview"
          title="Flip back"
        >
          ↺
        </button>

        <div class="project-back-heading">
          <h2 class="project-back-title">${project.title}</h2>
          <p class="project-tagline">${project.tagline}</p>
        </div>

        <p class="project-description">${project.description}</p>

        <p class="project-tech-title">Technology used</p>
        <ul class="project-tech-list">${techItems}</ul>

        <div class="project-actions">
          <a class="project-action" href="${project.projectUrl}">
            Open project ↗
          </a>
          ${githubAction}
        </div>
      </div>
    </div>
  `;

  const front = card.querySelector(".project-card-front");
  const back = card.querySelector(".project-card-back");
  const flipBack = card.querySelector(".project-flip-back");

  function setFlipped(flipped) {
    card.classList.toggle("is-flipped", flipped);
    front.setAttribute("aria-expanded", String(flipped));
    front.setAttribute("aria-hidden", String(flipped));
    back.setAttribute("aria-hidden", String(!flipped));

    if (flipped) {
      window.setTimeout(() => flipBack.focus(), 250);
    } else {
      window.setTimeout(() => front.focus(), 250);
    }
  }

  front.addEventListener("click", () => setFlipped(true));
  flipBack.addEventListener("click", () => setFlipped(false));

  back.addEventListener("click", (event) => {
    // Clicking an empty part of the back flips it over again;
    // links and the explicit back button keep their normal behaviour.
    if (!event.target.closest("a, button")) {
      setFlipped(false);
    }
  });

  card.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && card.classList.contains("is-flipped")) {
      setFlipped(false);
    }
  });

  return card;
}

const projectsGrid = document.querySelector("#projects-grid");

PROJECTS.forEach((project, index) => {
  projectsGrid.append(createProjectCard(project, index));
});
