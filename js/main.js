// ===== Cursor Glow Effect =====
const cursorGlow = document.getElementById('cursorGlow');
let mouseX = 0, mouseY = 0;
let glowX = 0, glowY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorGlow?.classList.add('active');
});

document.addEventListener('mouseleave', () => {
  cursorGlow?.classList.remove('active');
});

// Smooth follow animation
function animateGlow() {
  glowX += (mouseX - glowX) * 0.1;
  glowY += (mouseY - glowY) * 0.1;
  
  if (cursorGlow) {
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';
  }
  
  requestAnimationFrame(animateGlow);
}
animateGlow();

// ===== Theme toggle + local storage =====
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const icon = themeToggle?.querySelector('i');

const getPreferredTheme = () => {
  const saved = localStorage.getItem('theme');
  return saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
};

const applyTheme = (theme) => {
  html.setAttribute('data-theme', theme);
  if (icon) {
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
};

const currentTheme = getPreferredTheme();
applyTheme(currentTheme);

themeToggle?.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('theme', next);
});

// ===== Mobile menu toggle =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle?.addEventListener('click', () => {
  navLinks?.classList.toggle('show');
});

// ===== Animate skill bars on scroll =====
const skillItems = document.querySelectorAll('.skill-item[data-animate]');
const observerOptions = { threshold: 0.5 };

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const progress = entry.target.querySelector('.skill-progress');
      if (progress) {
        const targetWidth = progress.style.width;
        progress.style.width = '0%';
        setTimeout(() => {
          progress.style.width = targetWidth;
        }, 50);
      }
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

skillItems.forEach(item => observer.observe(item));

// ===== Portfolio filter + dynamic render =====
const PROJECTS = [
  {
    name: 'Aeris',
    category: 'fullstack',
    tags: ['React', 'Cloudflare Pages', 'D1', 'R2', 'Tailwind CSS'],
    description: 'Full waitlist & community platform with admin panel, feedback board, and signup flow. Full UI/UX ownership — built end-to-end.',
    images: ['assets/aeris-hero.png', 'assets/aeris-admin.png', 'assets/aeris-feedback.png'],
    links: { live: 'https://aeris.gg' },
    featured: true
  },
  {
    name: 'The Alcove',
    category: 'fullstack',
    tags: ['React', 'Cloudflare D1', 'Tailwind CSS', 'Discord API'],
    description: 'Complete brand identity, website, admin panel, and Discord community. Member management, project showcase, and systems administration.',
    images: ['assets/alcove-hero.png', 'assets/alcove-admin.png', 'assets/alcove-discord.png'],
    links: { live: 'https://thealcove.dev' },
    featured: true
  },
  {
    name: 'OverKill',
    category: 'web',
    tags: ['HTML/CSS', 'JavaScript', 'Canvas API'],
    description: 'A browser-based shooter game built with vanilla JavaScript — menus, boss fights, and score tracking.',
    images: ['assets/OverkillMenu.png', 'assets/OverkillBoss.png'],
    links: {
      live: 'https://kaidob312.github.io/OverKill.github.io/',
      source: 'https://github.com/KaidoB312/OverKill.github.io'
    }
  },
  {
    name: 'Tanzimat Reforms Monopoly',
    category: 'web',
    tags: ['HTML/CSS', 'JavaScript'],
    description: 'Interactive educational board game built for a history class project — full Monopoly-style gameplay in the browser.',
    images: ['assets/TanzimatReformsMonopoly.png', 'assets/TanzimatReformsMonopolyBoard.png'],
    links: {
      live: 'https://kaidob312.github.io/tanzimat-game.github.io/',
      source: 'https://github.com/KaidoB312/tanzimat-game.github.io'
    }
  },
  {
    name: 'Admin Dashboard',
    category: 'web',
    tags: ['HTML/CSS', 'JavaScript', 'Chart.js'],
    description: 'Admin dashboard with real-time website management, analytics, and data visualization for client projects.'
  },
  {
    name: 'Custom Websites',
    category: 'web',
    tags: ['HTML/CSS', 'JavaScript', 'Responsive Design'],
    description: 'Custom-built websites for local businesses, optimized for performance, accessibility, and SEO.'
  },
  {
    name: 'Portrait of a Graduate',
    category: 'web',
    tags: ['HTML/CSS', 'JavaScript'],
    description: 'A comprehensive visual platform representing the district\u2019s educational goals and values for Columbia Public Schools.',
    images: ['assets/CPSPOG.png', 'assets/CPSPOG2.png', 'assets/CPSPOG3.png']
  },
  {
    name: 'Portfolio Website',
    category: 'web',
    tags: ['HTML/CSS', 'JavaScript', 'Theme-aware'],
    description: 'This very portfolio \u2014 responsive, dark-mode aware, static, and hand-crafted without frameworks.'
  },
  {
    name: 'Creative Design & Branding',
    category: 'design',
    tags: ['Photoshop', 'Illustrator', 'InDesign'],
    description: 'Logos, brand packages, movie posters, magazine covers, web graphics, and promotional materials for clients and creative projects.'
  },
  {
    name: 'PivotPM',
    category: 'web',
    tags: ['HTML/CSS', 'JavaScript', 'Chart.js'],
    description: 'Project management tool with real-time collaboration features. (coming soon)'
  }
];

const grid = document.getElementById('projectsGrid');
const filterContainer = document.getElementById('filterButtons');

if (grid && filterContainer) {
  const categories = [...new Set(PROJECTS.map(p => p.category))];

  const allBtn = document.createElement('button');
  allBtn.className = 'filter-btn active';
  allBtn.textContent = 'all';
  allBtn.dataset.filter = 'all';
  filterContainer.appendChild(allBtn);

  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn';
    btn.textContent = cat;
    btn.dataset.filter = cat;
    filterContainer.appendChild(btn);
  });

  const renderProjects = (filter = 'all') => {
    const filtered = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === filter);
    grid.innerHTML = filtered.map(proj => {
      let imagesHTML = '';
      if (proj.images && proj.images.length) {
        imagesHTML = `<div class="project-images">` +
          proj.images.map(src => `<img src="${src}" alt="${proj.name}" loading="lazy">`).join('') +
          `</div>`;
      } else if (proj.image) {
        imagesHTML = `<div class="project-images"><img src="${proj.image}" alt="${proj.name}" loading="lazy"></div>`;
      }

      const techBadgesHTML = proj.tags.map(t => `<span class="tech-badge">${t}</span>`).join('');

      let linksHTML = '';
      if (proj.links) {
        const buttons = [];
        if (proj.links.live) {
          buttons.push(`<a href="${proj.links.live}" class="project-link" target="_blank" rel="noopener"><i class="fas fa-external-link-alt"></i> live</a>`);
        }
        if (proj.links.source) {
          buttons.push(`<a href="${proj.links.source}" class="project-link" target="_blank" rel="noopener"><i class="fab fa-github"></i> source</a>`);
        }
        if (buttons.length) {
          linksHTML = `<div class="project-links">${buttons.join('')}</div>`;
        }
      }

      const featuredClass = proj.featured ? ' featured' : '';

      return `
        <div class="project-card${featuredClass}" data-category="${proj.category}">
          ${imagesHTML}
          <span class="project-category">${proj.category}</span>
          <h3>${proj.name}</h3>
          <div class="project-tech">${techBadgesHTML}</div>
          <p>${proj.description}</p>
          ${linksHTML}
        </div>
      `;
    }).join('');
  };

  renderProjects();

  filterContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-btn')) {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      renderProjects(e.target.dataset.filter);
    }
  });
}

// ===== Smooth timeline animation (optional) =====
const timelineItems = document.querySelectorAll('.timeline-item[data-animate]');
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.3 });

timelineItems.forEach(item => {
  item.style.opacity = 0;
  item.style.transform = 'translateY(20px)';
  item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  timelineObserver.observe(item);
});

// ===== Image Lightbox =====
// Create lightbox overlay
const lightboxOverlay = document.createElement('div');
lightboxOverlay.className = 'lightbox-overlay';
document.body.appendChild(lightboxOverlay);

let expandedImg = null;

// Event delegation for project images
document.addEventListener('click', (e) => {
  const img = e.target.closest('.project-images img');
  
  if (img && !img.classList.contains('expanded')) {
    // Expand the image
    expandedImg = img;
    img.classList.add('expanded');
    lightboxOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
});

// Close lightbox on overlay click or escape key
lightboxOverlay.addEventListener('click', closeLightbox);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

function closeLightbox() {
  if (expandedImg) {
    expandedImg.classList.remove('expanded');
    expandedImg = null;
  }
  lightboxOverlay.classList.remove('active');
  document.body.style.overflow = '';
}
