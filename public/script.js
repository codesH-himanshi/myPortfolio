function animateSkills() {
    const skillSections = document.querySelectorAll(".skills");
    const triggerPoint = window.innerHeight * 0.8; // 80% viewport height

    skillSections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionBottom = section.getBoundingClientRect().bottom;

        if (sectionTop < triggerPoint && sectionBottom > 100) {
            section.classList.add("active");
            section.classList.remove("hidden");
        } else {
            section.classList.remove("active");
            section.classList.add("hidden");
        }
    });
}

// Run animation on scroll
window.addEventListener("scroll", animateSkills);

// Run once in case it's already in view
animateSkills();


// Sample project data (replace with real data or fetch from API)
const projects = [
  {
    title: "PdfTastic",
    description:
      "This project allows users to upload images, and generate a PDF.",
    technologies: ["HTML", "CSS", "JavaScript"],
    link: "https://codesh-himanshi.github.io/PdfTastic/",
    image: "./images/PicTastic.png", // Add image path
  },
  {
    title: "PDF Extract",
    description:
      "A simple and user-friendly web application to upload and extract pages from a PDF file.",
    technologies: ["HTML", "CSS", "JavaScript"],
    link: "https://pdfextractor-qhsm.onrender.com/",
    image: "./images/PDF-Extract.png",
  },
  {
    title: "TaskPilot",
    description:
      "TaskPilot is a task management app that allows users to create, update, and delete tasks.",
    technologies: ["HTML", "CSS", "JavaScript"],
    link: "https://codesh-himanshi.github.io/project-taskManagementweb/",
    image: "./images/TaskPilot.png",
  },
];

const projectContainer = document.getElementById("project-list");

// Function to generate project cards dynamically
function displayProjects() {
  projectContainer.innerHTML = ""; // Clear previous entries

  projects.forEach((project) => {
    const projectElement = document.createElement("div");
    projectElement.classList.add("project-card", "hidden"); // Add styling class

    projectElement.innerHTML = `
            <img src="${project.image}" alt="${
      project.title
    }" class="project-image">
            <h3>${project.title}</h3>
            <p class="montserrat-regular">${project.description}</p>
            <p><strong>Tech Used:</strong> ${project.technologies.join(
              ", "
            )}</p>
            <a href="${project.link}" target="_blank">VIEW</a>
        `;

    projectContainer.appendChild(projectElement);
  });

  observeProjects();
}

// Function to detect when projects section is in view
function observeProjects() {
    const profilePic = document.getElementById("profile-pic");
    const projectCards = document.querySelectorAll(".project-card");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible"); // Apply animation
            } else {
                entry.target.classList.remove("visible"); // Remove animation when out of view
            }
        });
    }, { threshold: 0.2 });

    observer.observe(profilePic);
    projectCards.forEach(card => observer.observe(card));
}

// Load projects when the page loads
document.addEventListener("DOMContentLoaded", displayProjects);

const projectList = document.querySelector(".project-kl");
let loadedProjects = 0;

function loadNextProject() {
    if (loadedProjects >= projects.length) return;
    
    const project = projects[loadedProjects];
    const projectElement = document.createElement("div");
    projectElement.classList.add("project-container");
    
    projectElement.innerHTML = `
        <div class="project-image">
            <img src="${project.image}" alt="${project.title}">
        </div>
        <div class="project-details">
            <h2>${project.title}</h2>
            <p>${project.description}</p>
            <p><strong>Tech Used:</strong> ${project.technologies}</p>
            <a href="${project.link}" target="_blank" class="project-button">VIEW</a>
        </div>
    `;
    
    projectList.appendChild(projectElement);
    setTimeout(() => projectElement.classList.add("visible"), 100);
    loadedProjects++;
}

function handleScroll() {
    const scrollPosition = window.scrollY + window.innerHeight;
    const triggerPosition = document.body.scrollHeight - 200;
    if (scrollPosition > triggerPosition) {
        loadNextProject();
    }
}

window.addEventListener("scroll", handleScroll);
loadNextProject();