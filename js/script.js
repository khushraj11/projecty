document.getElementById('year').textContent = new Date().getFullYear();

/* Mobile menu */
const menuToggle = document.getElementById('menuToggle');
const navLinksWrap = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => navLinksWrap.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinksWrap.classList.remove('open'));
});

/* Split hero heading into animated letters */
const heroName = document.getElementById('heroName');
const letters = heroName.textContent.split('');
heroName.textContent = '';
letters.forEach((ch, i) => {
  const span = document.createElement('span');
  span.className = 'char';
  span.textContent = ch === ' ' ? '\u00A0' : ch;
  span.style.animationDelay = `${0.15 + i * 0.035}s`;
  heroName.appendChild(span);
});

/* Scroll-reveal sections */
const sections = document.querySelectorAll('.section');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal-active');
      sectionObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
sections.forEach(s => sectionObserver.observe(s));

/* Stagger grid children */
document.querySelectorAll('.projects-grid, .skills-grid, .cert-grid').forEach(grid => {
  Array.from(grid.children).forEach((child, i) => {
    child.style.transitionDelay = `${i * 0.06}s`;
  });
});

/* Scroll progress bar */
const progressBar = document.getElementById('progressBar');
window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  progressBar.style.width = scrolled + '%';
});

/* Navbar shadow + scrollspy */
const navbar = document.querySelector('.navbar');
const navLinkEls = document.querySelectorAll('.nav-link');
const trackedSections = document.querySelectorAll('section[id], header[id]');

window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 40 ? '0 4px 24px rgba(0,0,0,0.35)' : 'none';

  let current = '';
  trackedSections.forEach(sec => {
    const top = sec.offsetTop - 140;
    if (window.scrollY >= top) current = sec.id;
  });
  navLinkEls.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
});

/* Custom cursor (desktop only) */
if (window.matchMedia('(hover: hover)').matches) {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .tilt-card').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
  });

  /* Magnetic buttons */
  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0,0)';
    });
  });

  /* 3D tilt on cards */
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y - rect.height / 2) / rect.height) * -8;
      const rotateY = ((x - rect.width / 2) / rect.width) * 8;
      card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(600px) rotateX(0) rotateY(0) translateY(0)';
    });
  });
}

/* Mini avatar on scroll + hero photo shrink */
const navAvatar = document.getElementById('navAvatar');
const heroPhotoWrap = document.querySelector('.hero-photo-wrap');
const heroEl = document.querySelector('.hero');

window.addEventListener('scroll', () => {
  if (!heroEl) return;
  const threshold = heroEl.offsetHeight * 0.55;
  if (window.scrollY > threshold) {
    navAvatar.classList.add('show');
    if (heroPhotoWrap) heroPhotoWrap.classList.add('shrink');
  } else {
    navAvatar.classList.remove('show');
    if (heroPhotoWrap) heroPhotoWrap.classList.remove('shrink');
  }
});

/* Journey line - fill progress + active dot + click to scroll */
const journeyFill = document.getElementById('journeyFill');
const journeyDots = document.querySelectorAll('.journey-dot');

window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  if (journeyFill) journeyFill.style.height = scrolled + '%';

  let current = '';
  trackedSections.forEach(sec => {
    const top = sec.offsetTop - 140;
    if (window.scrollY >= top) current = sec.id;
  });
  journeyDots.forEach(dot => {
    dot.classList.toggle('active', dot.dataset.target === `#${current}`);
  });
});

journeyDots.forEach(dot => {
  dot.addEventListener('click', () => {
    const target = document.querySelector(dot.dataset.target);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});
