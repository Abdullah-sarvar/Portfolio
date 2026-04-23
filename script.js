const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursorTrail');
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  setTimeout(() => {
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
  }, 80);
});

document.addEventListener('mousedown', () => {
  cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
  trail.style.transform = 'translate(-50%, -50%) scale(0.8)';
});
document.addEventListener('mouseup', () => {
  cursor.style.transform = 'translate(-50%, -50%) scale(1)';
  trail.style.transform = 'translate(-50%, -50%) scale(1)';
});


document.querySelectorAll('a, button, .skill-card, .project-card, .stat-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    trail.style.width = '50px';
    trail.style.height = '50px';
    trail.style.borderColor = 'rgba(6,182,212,0.6)';
  });
  el.addEventListener('mouseleave', () => {
    trail.style.width = '34px';
    trail.style.height = '34px';
    trail.style.borderColor = 'rgba(96,165,250,0.5)';
  });
});

const texts = [
  'Software Engineer',
  'Frontend Developer',
  'React Developer',
  'Open to Freelance',
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeEl = document.getElementById('typewriter');

function type() {
  const current = texts[textIndex];
  if (isDeleting) {
    typeEl.innerHTML = current.substring(0, charIndex - 1) + '<span class="typewriter-cursor"></span>';
    charIndex--;
  } else {
    typeEl.innerHTML = current.substring(0, charIndex + 1) + '<span class="typewriter-cursor"></span>';
    charIndex++;
  }

  let speed = isDeleting ? 60 : 110;

  if (!isDeleting && charIndex === current.length) {
    speed = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    speed = 400;
  }

  setTimeout(type, speed);
}

setTimeout(type, 1200);

const reveals = document.querySelectorAll('section:not(.hero), .skill-card, .project-card, .stat-card, .timeline-item, .contact-item');

reveals.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => observer.observe(el));

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (mobileMenu.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

function closeMenu() {
  mobileMenu.classList.remove('open');
  hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
}

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === '#' + current ? 'var(--blue-glow)' : '';
  });
});


function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  btn.innerHTML = '<span>Sending... &nbsp;<i class="fas fa-spinner fa-spin"></i></span>';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = '<span>Send Message &nbsp;<i class="fas fa-paper-plane"></i></span>';
    btn.disabled = false;
    document.getElementById('formSuccess').classList.add('show');
    e.target.reset();
    setTimeout(() => document.getElementById('formSuccess').classList.remove('show'), 4000);
  }, 1500);
}


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});