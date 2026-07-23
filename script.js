emailjs.init("8NGjaninuw213JzCQ");
gsap.registerPlugin(ScrollTrigger);

const heroCanvas = document.getElementById('heroCanvas');
const heroSection = document.querySelector('.hero');

const renderer = new THREE.WebGLRenderer({ canvas: heroCanvas, alpha: true, antialias: true });
renderer.setSize(heroSection.clientWidth, heroSection.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, heroSection.clientWidth / heroSection.clientHeight, 0.1, 100);
camera.position.z = 8;

const shapes = [];
const geometries = [
  new THREE.IcosahedronGeometry(1, 0),
  new THREE.TorusGeometry(0.7, 0.25, 16, 32),
  new THREE.OctahedronGeometry(0.9, 0)
];

for (let i = 0; i < 3; i++) {
  const material = new THREE.MeshStandardMaterial({
    color: i === 0 ? 0x60a5fa : i === 1 ? 0x06b6d4 : 0x818cf8,
    wireframe: true
  });
  const mesh = new THREE.Mesh(geometries[i], material);
  mesh.position.set((i - 1) * 3.2, Math.sin(i) * 1.5, -i * 1.5);
  scene.add(mesh);
  shapes.push(mesh);
}

scene.add(new THREE.AmbientLight(0xffffff, 0.6));
const point = new THREE.PointLight(0xffffff, 1.2);
point.position.set(5, 5, 5);
scene.add(point);

let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

function animateHero() {
  requestAnimationFrame(animateHero);
  shapes.forEach((mesh, i) => {
    mesh.rotation.x += 0.003 + i * 0.001;
    mesh.rotation.y += 0.004 + i * 0.001;
  });
  camera.position.x += (mouseX * 1.2 - camera.position.x) * 0.03;
  camera.position.y += (-mouseY * 1.2 - camera.position.y) * 0.03;
  camera.lookAt(scene.position);
  renderer.render(scene, camera);
}
animateHero();

window.addEventListener('resize', () => {
  renderer.setSize(heroSection.clientWidth, heroSection.clientHeight);
  camera.aspect = heroSection.clientWidth / heroSection.clientHeight;
  camera.updateProjectionMatrix();
});


const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  document.documentElement.setAttribute('data-theme', isLight ? 'dark' : 'light');
});


const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursorTrail');

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
  'Backend Developer',
  'AI Integration Engineer',
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


gsap.from('.hero-badge, .hero-avatar, .hero-name, .hero-typewriter, .hero-desc, .hero-btns, .hero-socials', {
  y: 40,
  opacity: 0,
  duration: 0.9,
  stagger: 0.12,
  ease: 'power3.out',
  delay: 0.2
});

const revealTargets = document.querySelectorAll(
  '.skill-card, .project-card, .stat-card, .timeline-item, .contact-item, .section-label, .section-title'
);

revealTargets.forEach((el) => {
  gsap.from(el, {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
      toggleActions: 'play none none none'
    }
  });
});

gsap.utils.toArray('.about-text').forEach((el) => {
  gsap.from(el, {
    x: -60,
    opacity: 0,
    duration: 1,
    scrollTrigger: { trigger: el, start: 'top 80%' }
  });
});


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

  emailjs.sendForm('service_mw7cxgl', 'template_5pb7mcq', e.target)
    .then(() => {
      btn.innerHTML = '<span>Send Message &nbsp;<i class="fas fa-paper-plane"></i></span>';
      btn.disabled = false;
      document.getElementById('formSuccess').classList.add('show');
      e.target.reset();
      setTimeout(() => document.getElementById('formSuccess').classList.remove('show'), 4000);
    })
    .catch((err) => {
      console.error('EmailJS error:', err);
      btn.innerHTML = '<span>Send Message &nbsp;<i class="fas fa-paper-plane"></i></span>';
      btn.disabled = false;
      alert('Something went wrong. Please try again.');
    });
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