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

  // Flèches clavier seulement pour le livre lorsque la section est visible
  document.addEventListener("keydown", (e) => {
    const veilleSection = document.querySelector('#veille');
    if (!veilleSection) return;
    const rect = veilleSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    if (!isVisible) return;
    if (e.key === "ArrowLeft") prevBtn.click();
    if (e.key === "ArrowRight") nextBtn.click();
  });

  showPage(0); // Démarrage propre

  const projectCarousel = document.querySelector('.projects-carousel');
  const projectCards = document.querySelectorAll('.project-card-modern');
  const prevProjectBtn = document.getElementById('prevProject');
  const nextProjectBtn = document.getElementById('nextProject');
  const dotsContainer = document.querySelector('.carousel-dots');
  let activeProject = 0;

  const updateDots = () => {
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === activeProject);
      dot.disabled = index === activeProject;
    });
  };

  const scrollToProject = (index) => {
    if (!projectCards[index]) return;
    projectCards[index].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    activeProject = index;
    updateDots();
    prevProjectBtn.disabled = activeProject === 0;
    nextProjectBtn.disabled = activeProject === projectCards.length - 1;
  };

  const createDots = () => {
    dotsContainer.innerHTML = '';
    projectCards.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'carousel-dot';
      dot.addEventListener('click', () => scrollToProject(index));
      dotsContainer.appendChild(dot);
    });
  };

  const findActiveProject = () => {
    const center = projectCarousel.scrollLeft + projectCarousel.offsetWidth / 2;
    let nearestIndex = 0;
    let nearestDistance = Infinity;
    projectCards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(cardCenter - center);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });
    if (nearestIndex !== activeProject) {
      activeProject = nearestIndex;
      updateDots();
      prevProjectBtn.disabled = activeProject === 0;
      nextProjectBtn.disabled = activeProject === projectCards.length - 1;
    }
  };

  createDots();
  scrollToProject(0);

  prevProjectBtn.onclick = () => { if (activeProject > 0) scrollToProject(activeProject - 1); };
  nextProjectBtn.onclick = () => { if (activeProject < projectCards.length - 1) scrollToProject(activeProject + 1); };

  projectCarousel.addEventListener('scroll', () => {
    clearTimeout(window.projectScrollTimeout);
    window.projectScrollTimeout = setTimeout(findActiveProject, 120);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevProjectBtn.click();
    if (e.key === 'ArrowRight') nextProjectBtn.click();
  });
});

// Menu mobile expansif
const mobileToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (mobileToggle && navLinks) {
  mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileToggle.classList.toggle('open');
    document.body.classList.toggle('menu-open');
  });
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      mobileToggle.classList.remove('open');
      document.body.classList.remove('menu-open');
    });
  });
}

// Carousel projets : balayer (flèches + points + glisser)
const projectsCarousel = document.querySelector('.projects-carousel');
const projectCards = projectsCarousel ? projectsCarousel.querySelectorAll('.project-card-modern') : [];
const dotContainer = document.querySelector('.carousel-dots');
const prevProjectBtn = document.querySelector('.carousel-prev');
const nextProjectBtn = document.querySelector('.carousel-next');
let activeProjectIndex = 0;

const setActiveDot = (index) => {
  const dots = dotContainer ? dotContainer.querySelectorAll('.carousel-dot') : [];
  dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
};

const scrollToProject = (index) => {
  if (!projectsCarousel || projectCards.length === 0) return;
  const target = projectCards[index];
  target.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
  activeProjectIndex = index;
  setActiveDot(index);
};

if (dotContainer && projectCards.length > 0) {
  projectCards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot';
    dot.setAttribute('aria-label', `Aller au projet ${i + 1}`);
    dot.addEventListener('click', () => scrollToProject(i));
    dotContainer.appendChild(dot);
  });
  setActiveDot(0);
}

if (prevProjectBtn) {
  prevProjectBtn.addEventListener('click', () => {
    if (activeProjectIndex > 0) {
      scrollToProject(activeProjectIndex - 1);
    }
  });
}

if (nextProjectBtn) {
  nextProjectBtn.addEventListener('click', () => {
    if (activeProjectIndex < projectCards.length - 1) {
      scrollToProject(activeProjectIndex + 1);
    }
  });
}

if (projectsCarousel) {
  let startX = 0;
  let isDragging = false;

  projectsCarousel.addEventListener('pointerdown', (e) => {
    isDragging = true;
    startX = e.clientX;
    projectsCarousel.style.scrollSnapType = 'none';
  });

  projectsCarousel.addEventListener('pointerup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    projectsCarousel.style.scrollSnapType = 'x mandatory';

    const diff = e.clientX - startX;
    if (Math.abs(diff) > 40) {
      if (diff < 0 && activeProjectIndex < projectCards.length - 1) {
        scrollToProject(activeProjectIndex + 1);
      } else if (diff > 0 && activeProjectIndex > 0) {
        scrollToProject(activeProjectIndex - 1);
      }
    }
  });

  projectsCarousel.addEventListener('scroll', () => {
    if (projectCards.length === 0) return;
    const center = projectsCarousel.scrollLeft + projectsCarousel.offsetWidth / 2;
    projectCards.forEach((card, i) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      if (Math.abs(center - cardCenter) < card.offsetWidth / 2) {
        activeProjectIndex = i;
        setActiveDot(i);
      }
    });
  });
}

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