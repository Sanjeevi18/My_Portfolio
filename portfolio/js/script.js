window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  preloader.style.opacity = "0";
  preloader.style.visibility = "hidden";

  // Initialize continuous scroll for projects and credentials
  initContinuousScroll();
});

/* --- CONTINUOUS SCROLL FUNCTIONALITY --- */
function initContinuousScroll() {
  // Duplicate content for seamless infinite scroll
  duplicateScrollContent(".parallax-grid");
  duplicateScrollContent(".credentials-track");
  duplicateScrollContent(".marquee-track");
}

function duplicateScrollContent(selector) {
  const container = document.querySelector(selector);
  if (!container) return;

  // Clone all children
  const items = Array.from(container.children);
  items.forEach((item) => {
    const clone = item.cloneNode(true);
    container.appendChild(clone);
  });

  // Double the content again for smoother infinite loop
  const allItems = Array.from(container.children);
  allItems.forEach((item) => {
    const clone = item.cloneNode(true);
    container.appendChild(clone);
  });
}

window.addEventListener("scroll", () => {
  const winScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.querySelector(".scroll-progress").style.width = scrolled + "%";

  // Add navbar scroll effect
  const navbar = document.querySelector(".navbar");
  if (winScroll > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Update navigation highlighting based on scroll position
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  let currentSection = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    if (winScroll >= sectionTop && winScroll < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id");
    }
  });

  // Handle hero section
  if (winScroll < 100) {
    currentSection = "home";
  }

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
});

/* --- THEME SWITCHER --- */
const themeToggle = document.getElementById("theme-toggle");
const html = document.documentElement;
const icon = themeToggle.querySelector("i");

const savedTheme = localStorage.getItem("theme") || "dark";
html.setAttribute("data-theme", savedTheme);
updateIcon(savedTheme);

themeToggle.addEventListener("click", () => {
  const currentTheme = html.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateIcon(newTheme);
});

function updateIcon(theme) {
  if (theme === "light") {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  } else {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  }
}

const dynamicText = document.querySelector(".dynamic-text");
const words = [
  "Full Stack Developer",
  "Mobile App Developer",
  "Web Developer",
  "Flutter Developer",
];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeEffect = () => {
  const currentWord = words[wordIndex];
  const currentChar = currentWord.substring(0, charIndex);
  dynamicText.textContent = currentChar;
  if (!isDeleting && charIndex < currentWord.length) {
    charIndex++;
    setTimeout(typeEffect, 100);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeEffect, 50);
  } else {
    isDeleting = !isDeleting;
    wordIndex = !isDeleting ? (wordIndex + 1) % words.length : wordIndex;
    setTimeout(typeEffect, 1200);
  }
};
typeEffect();

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("toggle");
});
links.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburger.classList.remove("toggle");
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});
document.querySelectorAll(".hidden").forEach((el) => observer.observe(el));

const spotlightCards = document.querySelectorAll(".spotlight");
if (window.matchMedia("(hover: hover)").matches) {
  spotlightCards.forEach((card) => {
    card.onmousemove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    };
  });
}

/* --- CANVAS ANIMATION --- */
const canvas = document.getElementById("tech-canvas");
const ctx = canvas.getContext("2d");
let width, height;
let baseRadius = 160;

function resizeCanvas() {
  const wrapper = document.querySelector(".canvas-wrapper");
  if (wrapper) {
    width = wrapper.offsetWidth;
    height = wrapper.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    if (width < 350) {
      baseRadius = 115;
    } else {
      baseRadius = 160;
    }
  }
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

let rotationSpeed = 0.002;
let currentAngle = 0;
let isHovered = false;
const icons = [
  { code: "\uf3b9", color: "#F7DF1E", label: "JS" },
  { code: "\uf41b", color: "#61DBFB", label: "React" },
  { code: "\uf17b", color: "#3DDC84", label: "Android" },
  { code: "\uf121", color: "#ffffff", label: "Code" },
  { code: "\uf4e4", color: "#f89820", label: "Java" },
  { code: "\uf021", color: "#00f2ea", label: "Sync" },
];
class Node {
  constructor(index, total) {
    this.index = index;
    this.total = total;
    this.angle = (index / total) * (Math.PI * 2);
    this.radius = baseRadius;
    this.x = 0;
    this.y = 0;
  }
  update() {
    const centerX = width / 2;
    const centerY = height / 2;
    const targetRadius = isHovered ? baseRadius + 40 : baseRadius;
    this.radius += (targetRadius - this.radius) * 0.1;
    this.angle += isHovered ? rotationSpeed * 4 : rotationSpeed;
    this.x = centerX + Math.cos(this.angle + currentAngle) * this.radius;
    this.y = centerY + Math.sin(this.angle + currentAngle) * this.radius;
  }
  draw() {
    ctx.font = '900 24px "Font Awesome 6 Brands"';
    ctx.fillStyle = icons[this.index].color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowBlur = 15;
    ctx.shadowColor = icons[this.index].color;
    ctx.fillText(icons[this.index].code, this.x, this.y);
    ctx.shadowBlur = 0;
  }
}
const nodes = [];
for (let i = 0; i < icons.length; i++) {
  nodes.push(new Node(i, icons.length));
}
canvas.addEventListener("mouseenter", () => (isHovered = true));
canvas.addEventListener("mouseleave", () => (isHovered = false));
function animateNetwork() {
  ctx.clearRect(0, 0, width, height);
  nodes.forEach((node) => node.update());
  ctx.beginPath();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
  ctx.lineWidth = 1;
  for (let i = 0; i < nodes.length; i++) {
    const nodeA = nodes[i];
    const nodeB = nodes[(i + 1) % nodes.length];
    ctx.beginPath();
    ctx.moveTo(nodeA.x, nodeA.y);
    ctx.lineTo(nodeB.x, nodeB.y);
    ctx.stroke();
  }
  nodes.forEach((node) => node.draw());
  requestAnimationFrame(animateNetwork);
}
document.fonts.ready.then(() => {
  resizeCanvas();
  animateNetwork();
});

/* ==========================================
   EMAILJS MODAL LOGIC
   ========================================== */
(function () {
  emailjs.init(EMAILJS_CONFIG.publicKey);
})();

const modal = document.getElementById("email-modal");
const openBtn = document.getElementById("open-modal-btn");
const closeBtn = document.querySelector(".close-modal");
const emailTriggers = document.querySelectorAll(".email-trigger");

function openModal(e) {
  e.preventDefault();
  modal.classList.add("active");
}

if (openBtn) openBtn.addEventListener("click", openModal);
emailTriggers.forEach((trigger) => {
  trigger.addEventListener("click", openModal);
});

closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");
});
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});

document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const btn = this.querySelector("button");
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';

    emailjs
      .sendForm(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, this)
      .then(
        function () {
          btn.innerHTML = 'Sent Successfully! <i class="fas fa-check"></i>';
          btn.style.background = "var(--success)";
          setTimeout(() => {
            modal.classList.remove("active");
            btn.innerHTML = originalText;
            btn.style.background = "var(--primary)";
            document.getElementById("contact-form").reset();
          }, 2000);
        },
        function (error) {
          btn.innerHTML = "Failed. Try Again.";
          btn.style.background = "var(--secondary)";
          console.error("FAILED...", error);
        }
      );
  });

/* ==========================================
   UNIFIED SCROLL LOGIC (Projects, Tech, Certs)
   ========================================== */
function setupSmoothScroll(selector) {
  const container = document.querySelector(selector);

  if (container) {
    let isDown = false;
    let startX;
    let scrollLeft;
    let autoScrollSpeed = 0.1;
    let isPaused = false;

    // --- Drag Events ---
    container.addEventListener("mousedown", (e) => {
      isDown = true;
      isPaused = true;
      container.style.cursor = "grabbing";
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });

    container.addEventListener("mouseleave", () => {
      isDown = false;
      isPaused = false;
      container.style.cursor = "grab";
    });

    container.addEventListener("mouseup", () => {
      isDown = false;
      isPaused = false;
      container.style.cursor = "grab";
    });

    container.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2; // Speed multiplier for dragging
      container.scrollLeft = scrollLeft - walk;
    });

    // --- Auto Scroll Loop ---
    function autoScroll() {
      // Only scroll if not paused and on a wider screen (desktop)
      if (!isPaused && window.innerWidth > 900) {
        // If we reach the end (or close to it), snap back to 0
        if (
          container.scrollLeft >=
          container.scrollWidth - container.clientWidth - 1
        ) {
          container.scrollLeft = 0;
        } else {
          container.scrollLeft += autoScrollSpeed;
        }
      }
      requestAnimationFrame(autoScroll);
    }

    // Start the loop
    autoScroll();
  }
}

// Initialize all three sections
document.addEventListener("DOMContentLoaded", () => {
  setupSmoothScroll(".desktop-grid-container"); // Projects
  setupSmoothScroll(".credentials-container"); // Credentials
  populateSkills();
  createInfiniteScroll(".parallax-grid");
  createInfiniteScroll(".credentials-track");
  createInfiniteScroll(".marquee-track");

  // Enhanced mobile interactions
  initializeMobileEnhancements();
  initializeProjectCardInteractions();
});

/* ==========================================
   NEW SKILLS GRID LOGIC
   ========================================== */
const skills = [
  { name: "Flutter", icon: "fab fa-android" },
  { name: "Dart", icon: "fas fa-mobile-alt" },
  { name: "React Native", icon: "fab fa-react" },
  { name: "iOS", icon: "fab fa-apple" },
  { name: "GetX", icon: "fas fa-cube" },
  { name: "React JS", icon: "fab fa-react" },
  { name: "JavaScript", icon: "fab fa-js" },
  { name: "HTML5", icon: "fab fa-html5" },
  { name: "CSS3", icon: "fab fa-css3-alt" },
  { name: "Tailwind", icon: "fas fa-wind" },
  { name: "Firebase", icon: "fas fa-fire" },
  { name: "Java", icon: "fab fa-java" },
  { name: "Git", icon: "fab fa-git-alt" },
  { name: "VS Code", icon: "fas fa-code" },
  { name: "Node.js", icon: "fab fa-node" },
  { name: "MongoDB", icon: "fas fa-database" },
  { name: "PHP", icon: "fab fa-php" },
  { name: "MySQL", icon: "fas fa-database" },
];

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

function populateSkills() {
  const track1 = document.getElementById("skills-track-1");
  const track2 = document.getElementById("skills-track-2");
  const track3 = document.getElementById("skills-track-3");

  if (!track1 || !track2 || !track3) return;

  const skills1 = [...skills];
  const skills2 = shuffle([...skills]);
  const skills3 = shuffle([...skills]);

  const allSkills = [
    ...skills1,
    ...skills1,
    ...skills2,
    ...skills2,
    ...skills3,
    ...skills3,
  ];

  const createSkillElement = (skill) =>
    `<div class="skill-item"><i class="${skill.icon}"></i> ${skill.name}</div>`;

  track1.innerHTML = [...skills1, ...skills1].map(createSkillElement).join("");
  track2.innerHTML = [...skills2, ...skills2].map(createSkillElement).join("");
  track3.innerHTML = [...skills3, ...skills3].map(createSkillElement).join("");
}

/* ==========================================
   MOBILE PROJECT SCROLL LOGIC
   ========================================== */
const projectContainer = document.querySelector(".mobile-project-marquee");

if (projectContainer) {
  let isDown = false;
  let startX;
  let scrollLeft;
  let autoScrollSpeed = 0.05; // Adjust speed
  let isPaused = false;

  // --- Drag Functionality ---
  projectContainer.addEventListener("mousedown", (e) => {
    isDown = true;
    isPaused = true; // Pause auto-scroll on interaction
    projectContainer.classList.add("active");
    startX = e.pageX - projectContainer.offsetLeft;
    scrollLeft = projectContainer.scrollLeft;
  });

  projectContainer.addEventListener("mouseleave", () => {
    isDown = false;
    isPaused = false; // Resume auto-scroll
    projectContainer.classList.remove("active");
  });

  projectContainer.addEventListener("mouseup", () => {
    isDown = false;
    isPaused = false;
    projectContainer.classList.remove("active");
  });

  projectContainer.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - projectContainer.offsetLeft;
    const walk = (x - startX) * 2; // Scroll-fast
    projectContainer.scrollLeft = scrollLeft - walk;
  });

  // Touch Events for Mobile
  projectContainer.addEventListener("touchstart", () => {
    isPaused = true;
  });
  projectContainer.addEventListener("touchend", () => {
    setTimeout(() => {
      isPaused = false;
    }, 1000); // Resume after 1s
  });

  // --- Auto Scroll Logic ---
  function autoScrollProjects() {
    if (!isPaused && window.innerWidth <= 900) {
      // If scrolled to the end, reset to 0 (simple loop)
      if (
        projectContainer.scrollLeft >=
        projectContainer.scrollWidth - projectContainer.clientWidth - 1
      ) {
        projectContainer.scrollLeft = 0;
      } else {
        projectContainer.scrollLeft += autoScrollSpeed;
      }
    }
    requestAnimationFrame(autoScrollProjects);
  }

  // Start the loop
  autoScrollProjects();
}

/* ==========================================
   INFINITE SCROLL LOGIC
   ========================================== */
function createInfiniteScroll(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (container) {
    const content = Array.from(container.children);
    content.forEach((item) => {
      container.appendChild(item.cloneNode(true));
    });
  }
}

// Mobile Enhancement Functions
function initializeMobileEnhancements() {
  // Add smooth scrolling for mobile navigation
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerOffset = 80;
        const elementPosition = targetSection.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Close mobile menu if open
        const navLinksContainer = document.querySelector(".nav-links");
        const hamburger = document.querySelector(".hamburger");
        if (navLinksContainer.classList.contains("active")) {
          navLinksContainer.classList.remove("active");
          hamburger.classList.remove("toggle");
        }
      }
    });
  });

  // Enhanced touch scrolling for mobile marquees
  const marqueeContainers = document.querySelectorAll(
    ".mobile-project-marquee"
  );
  marqueeContainers.forEach((container) => {
    let isScrolling = false;

    container.addEventListener("touchstart", () => {
      isScrolling = true;
      container.style.scrollBehavior = "auto";
    });

    container.addEventListener("touchend", () => {
      isScrolling = false;
      setTimeout(() => {
        container.style.scrollBehavior = "smooth";
      }, 100);
    });
  });
}

function initializeProjectCardInteractions() {
  const projectCards = document.querySelectorAll(
    ".mobile-project-card, .parallax-card"
  );

  projectCards.forEach((card) => {
    // Add touch feedback
    card.addEventListener("touchstart", function () {
      this.style.transform = "scale(0.98)";
    });

    card.addEventListener("touchend", function () {
      this.style.transform = "";
    });

    // Enhanced hover effects for desktop
    card.addEventListener("mouseenter", function () {
      const icon = this.querySelector(".card-bg-icon");
      if (icon) {
        icon.style.transform = "rotate(10deg) scale(1.1)";
      }
    });

    card.addEventListener("mouseleave", function () {
      const icon = this.querySelector(".card-bg-icon");
      if (icon) {
        icon.style.transform = "";
      }
    });
  });
}
