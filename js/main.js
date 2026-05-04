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
    name: 'Brand Refresh',
    category: 'design',
    tags: ['Illustrator', 'Photoshop'],
    description: 'Complete visual identity overhaul for The Alcove, The Cavern, and more.'
  },
  {
    name: 'Admin Dashboard',
    category: 'web',
    tags: ['HTML/CSS', 'JavaScript', 'Chart.js'],
    description: 'Admin dashboard with real-time website management and analytics.'
  },
  {
    name: 'Custom Websites',
    category: 'web',
    tags: ['HTML/CSS', 'JavaScript', 'Chart.js'],
    description: 'Custom-built websites for local businesses, optimized for performance and SEO.'
  },
  {
    name: 'Portfolio Website',
    category: 'web',
    tags: ['HTML/CSS', 'JavaScript'],
    description: 'This very portfolio – responsive, theme-aware, and static.'
  },
  {
    name: 'Various Logos and Web Graphics',
    category: 'design',
    tags: ['Photoshop', 'Illustrator'],
    description: 'Logos, social media graphics, and promotional materials for various clients.'
  },
  {
        name: 'Web Games',
        category: 'web',
        tags: ['HTML/CSS', 'JavaScript'],
        description: 'Fun, interactive web games built with vanilla JavaScript.'
  },
  {
        name: 'PivotPM',
        category: 'web',
        tags: ['HTML/CSS', 'JavaScript', 'Chart.js'],
        description: 'Project management tool with real-time collaboration features. and more. (coming soon)'
  }
];

const grid = document.getElementById('projectsGrid');
const filterContainer = document.getElementById('filterButtons');

if (grid && filterContainer) {
  // Unique categories
  const categories = [...new Set(PROJECTS.map(p => p.category))];

  // Create filter buttons
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
    grid.innerHTML = filtered.map(proj => `
      <div class="project-card" data-category="${proj.category}">
        <h3>${proj.name}</h3>
        <div class="project-tag">${proj.tags.join(', ')}</div>
        <p>${proj.description}</p>
      </div>
    `).join('');
  };

  // Initial render
  renderProjects();

  // Filter click handler
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