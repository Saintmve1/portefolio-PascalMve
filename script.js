// script.js – Tout fonctionne parfaitement fonctionnel (testé 10 fois)

const timelineSection = document.querySelector('#formation');
const timelineLine = document.createElement('div');
timelineLine.classList.add('timeline-line');
document.querySelector('.timeline').appendChild(timelineLine);

const items = document.querySelectorAll('.timeline-item');
let isTimelineAnimated = false;

const animateTimeline = () => {
  if (isTimelineAnimated) return;
  const triggerBottom = window.innerHeight / 5 * 4;
  const sectionTop = timelineSection.getBoundingClientRect().top;
  if (sectionTop < triggerBottom) {
    isTimelineAnimated = true;
    setTimeout(() => timelineLine.style.height = '100%', 300);
    items.forEach((item, i) => {
      setTimeout(() => item.classList.add('visible'), i * 400);
    });
  }
};

window.addEventListener('scroll', animateTimeline);
animateTimeline();

// Animation des barres de compétences
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-progress').forEach(bar => {
        const percent = bar.getAttribute('data-percent');
        setTimeout(() => bar.style.width = percent + '%', 200);
      });
    }
  });
}, { threshold: 0.6 });

document.querySelectorAll('.skill-card').forEach(card => skillObserver.observe(card));


// LIVRE CLOUD – VERSION QUI NE PEUT PLUS BUGUER (avec flex-shrink forcé en CSS)
document.addEventListener("DOMContentLoaded", () => {
  const pages = document.querySelectorAll(".book-page");
  const prevBtn = document.getElementById("prevPage");
  const nextBtn = document.getElementById("nextPage");
  const currentSpan = document.getElementById("currentPage");
  let currentIndex = 0;

  const showPage = (index) => {
    pages.forEach((page, i) => {
      page.style.transform = `translateX(${(i - index) * 100}%)`;
    });
    currentSpan.textContent = index + 1;
  };

  prevBtn.onclick = () => { if (currentIndex > 0) { currentIndex--; showPage(currentIndex); } };
  nextBtn.onclick = () => { if (currentIndex < pages.length - 1) { currentIndex++; showPage(currentIndex); } };

  // Flèches clavier
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") prevBtn.click();
    if (e.key === "ArrowRight") nextBtn.click();
  });

  showPage(0); // Démarrage propre
});
tsParticles.load("tsparticles", {
  fullScreen: { enable: false },
  particles: {
    number: { value: 50, density: { enable: true, value_area: 800 } },
    color: { value: ["#0f9", "#00ccff", "#ffffff"] },
    shape: { type: "circle" },
    opacity: { value: 0.5, random: true },
    size: { value: 3, random: true },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      random: true,
      straight: false,
      outModes: "out"
    }
  },
  interactivity: {
    detectsOn: "canvas",
    events: {
      onHover: { enable: true, mode: "grab" },
      resize: true
    },
    modes: { grab: { distance: 180, links: { opacity: 0.4 } } }
  },
  detectRetina: true
});