'use strict';

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
const EMAIL = 'avjazeel2003@gmail.com';
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
let toastTimer;

function toast(message) {
  const element = $('#toast');
  element.textContent = message;
  element.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => element.classList.remove('visible'), 3200);
}

function updateThemeButton() {
  const isDark = document.documentElement.dataset.theme !== 'light';
  const button = $('#theme-toggle');
  button.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} theme`);
  button.setAttribute('title', `Switch to ${isDark ? 'light' : 'dark'} theme`);
  $('use', button).setAttribute('href', isDark ? '#i-sun' : '#i-moon');
  $('meta[name="theme-color"]').setAttribute('content', isDark ? '#0b0a10' : '#f8f7fb');
}

updateThemeButton();
$('#theme-toggle').addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem('jazeel-theme', next); } catch (_) {}
  updateThemeButton();
});

const menuToggle = $('#mobile-menu-toggle');
function closeMobileMenu() {
  $('#mobile-nav').hidden = true;
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
  $('use', menuToggle).setAttribute('href', '#i-menu');
}
menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  $('#mobile-nav').hidden = expanded;
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  menuToggle.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  $('use', menuToggle).setAttribute('href', expanded ? '#i-menu' : '#i-close');
});
$$('#mobile-nav a').forEach(link => link.addEventListener('click', closeMobileMenu));
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMobileMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeMobileMenu();
});

if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        $$('.nav-link').forEach(link => {
          const active = link.getAttribute('href') === '#' + entry.target.id;
          link.classList.toggle('active', active);
          if (active) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      }
    });
  }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
  $$('main > section[id]').forEach(section => sectionObserver.observe(section));
}

$$('.filter').forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    $$('.filter').forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    let visible = 0;
    $$('.project-card').forEach(card => {
      const shown = filter === 'all' || card.dataset.category === filter;
      card.hidden = !shown;
      if (shown) visible += 1;
    });
    $('#project-count').textContent = `${visible} PROJECT${visible === 1 ? '' : 'S'}`;
  });
});

const projects = {
  perception: {
    category: '01 / AI & 3D PERCEPTION · IIIT DHARWAD',
    title: 'Camera–LiDAR Perception',
    intro: 'An ongoing AI/ML project exploring how camera images and LiDAR point clouds can work together in a 3D perception application.',
    tags: ['Python', 'Computer vision', 'Point clouds', 'Calibration'],
    sections: [
      { title: 'THE IDEA', text: 'Connect visual information with spatial information to build a useful view of the world. The project brings together Camera–LiDAR calibration, point-cloud processing, computer vision, and real-time visualization.' },
      { title: 'MY WORK', items: ['Working on the camera–LiDAR integration and calibration pipeline.', 'Processing point-cloud data and exploring visual alignment.', 'Developing and validating the 3D perception workflow as part of the project internship.'] },
      { title: 'CURRENT STATUS', text: 'Research in progress. Calibration, validation, and refinement are part of the ongoing work.' }
    ],
    links: [{ label: 'Explore the repository', url: 'https://github.com/jezzyll/lidar-camera-calibration' }]
  },
  s3guard: {
    category: '02 / CLOUD SECURITY · FULL-STACK PROJECT',
    title: 'S3Guard',
    intro: 'An AWS S3 bucket security analyzer built with Python, FastAPI, and Boto3 — making security findings easier to understand and act on.',
    tags: ['Python', 'FastAPI', 'AWS S3', 'Boto3', 'SMTP'],
    sections: [
      { title: 'THE IDEA', text: 'Bring S3 security analysis, actionable reporting, and remediation into a single workflow.' },
      { title: 'KEY FEATURES', items: ['AWS S3 bucket vulnerability detection.', 'Security reports that surface findings for review.', 'Email alerts through SMTP integration.', 'One-click auto-fix functionality.'] },
      { title: 'TECHNICAL FOCUS', text: 'Python backend development, AWS service integration with Boto3, REST APIs with FastAPI, and cloud security concepts.' }
    ],
    links: [{ label: 'Explore the repository', url: 'https://github.com/jezzyll/S3-Guard' }]
  },
  connext: {
    category: '03 / MOBILE · PATIENT COMMUNITY',
    title: 'Connext',
    intro: 'A full-stack patient community app designed to help people connect through a dedicated community experience.',
    tags: ['Flutter', 'Python', 'FastAPI', 'REST APIs'],
    sections: [
      { title: 'THE IDEA', text: 'Create a patient-focused community application that connects a cross-platform Flutter interface with a FastAPI backend.' },
      { title: 'KEY FEATURES', items: ['User authentication for the app experience.', 'Chat for community communication.', 'A patient verification system.', 'Frontend-to-backend integration through REST APIs.'] },
      { title: 'TECHNICAL FOCUS', text: 'Cross-platform mobile development, backend API integration, authentication, and community-focused interface design.' }
    ],
    links: [{ label: 'Explore the repository', url: 'https://github.com/jezzyll/Connext-App-NEW-' }]
  },
  majlis: {
    category: '04 / MOBILE · CAMPUS MANAGEMENT',
    title: 'MajlisGram',
    intro: 'A Flutter and Firebase college management app bringing campus operations into one connected experience.',
    tags: ['Flutter', 'Firebase', 'Real-time data'],
    sections: [
      { title: 'THE IDEA', text: 'Support everyday college operations with a shared mobile app and real-time data handling.' },
      { title: 'KEY FEATURES', items: ['Student management workflows.', 'Staff management workflows.', 'Canteen operations.', 'Real-time data handling with Firebase.'] },
      { title: 'TECHNICAL FOCUS', text: 'Flutter application development, Firebase integration, and organizing multiple campus workflows within one application.' }
    ],
    links: [{ label: 'Explore the repository', url: 'https://github.com/jezzyll/MajlisGramm-COPY' }]
  },
  suite: {
    category: '05 / MOBILE · STUDENT MANAGEMENT',
    title: 'Student Management Suite',
    intro: 'A pair of Flutter applications focused on organizing student banking and library data.',
    tags: ['Flutter', 'Student data', 'Real-time management'],
    sections: [
      { title: 'SSB BANKING APP', text: 'A student banking application focused on student data management.' },
      { title: 'LIBRARY SYSTEM', text: 'A companion library application for organizing library-related student data.' },
      { title: 'TECHNICAL FOCUS', text: 'Building focused Flutter interfaces for everyday student management needs and real-time data handling.' }
    ],
    links: [
      { label: 'SSB Banking code', url: 'https://github.com/jezzyll/SSB-Banking-App' },
      { label: 'Library system code', url: 'https://github.com/jezzyll/majlis_library' }
    ]
  }
};

function icon(name) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('aria-hidden', 'true');
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttribute('href', `#i-${name}`);
  svg.append(use);
  return svg;
}

function openDialog(dialog) {
  $$('dialog[open]').forEach(other => { if (other !== dialog) other.close(); });
  if (!dialog.open) dialog.showModal();
  document.body.classList.add('dialog-open');
}

$$('dialog').forEach(dialog => {
  dialog.addEventListener('close', () => {
    if (!document.querySelector('dialog[open]')) document.body.classList.remove('dialog-open');
  });
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
});
$$('[data-close]').forEach(button => button.addEventListener('click', () => document.getElementById(button.dataset.close).close()));

function showProject(key) {
  const project = projects[key];
  if (!project) return;
  $('#dialog-category').textContent = project.category;
  $('#dialog-title').textContent = project.title;
  $('#dialog-intro').textContent = project.intro;
  $('#dialog-tags').replaceChildren(...project.tags.map(tag => {
    const span = document.createElement('span'); span.textContent = tag; return span;
  }));
  $('#dialog-details').replaceChildren(...project.sections.map(section => {
    const block = document.createElement('section'); block.className = 'detail-block';
    const heading = document.createElement('h3'); heading.textContent = section.title; block.append(heading);
    if (section.text) { const p = document.createElement('p'); p.textContent = section.text; block.append(p); }
    if (section.items) {
      const list = document.createElement('ul');
      section.items.forEach(text => { const item = document.createElement('li'); item.textContent = text; list.append(item); });
      block.append(list);
    }
    return block;
  }));
  $('#dialog-links').replaceChildren(...project.links.map((link, index) => {
    const a = document.createElement('a');
    a.className = `button ${index === 0 ? 'button-primary' : 'button-ghost'}`;
    a.href = link.url; a.target = '_blank'; a.rel = 'noopener noreferrer';
    a.append(document.createTextNode(link.label), icon('arrow')); return a;
  }));
  openDialog($('#project-dialog'));
  $('#project-dialog').scrollTop = 0;
}
$$('[data-project]').forEach(button => button.addEventListener('click', () => showProject(button.dataset.project)));

async function copyEmail() {
  const button = $('#copy-email');
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(EMAIL);
    } else {
      const field = document.createElement('textarea');
      field.value = EMAIL;
      field.setAttribute('readonly', '');
      field.style.position = 'fixed'; field.style.opacity = '0';
      document.body.append(field); field.select();
      const copied = document.execCommand('copy'); field.remove();
      if (!copied) throw new Error('Clipboard is unavailable');
      button.focus();
    }
    $('span', button).textContent = 'Email copied';
    $('use', button).setAttribute('href', '#i-check');
    toast('Email address copied. Say hello!');
    setTimeout(() => { $('span', button).textContent = 'Copy email'; $('use', button).setAttribute('href', '#i-copy'); }, 3000);
  } catch (_) {
    toast('Copy this address: ' + EMAIL);
  }
}
$('#copy-email').addEventListener('click', copyEmail);

$('#contact-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const name = $('#contact-name').value.trim();
  const email = $('#contact-email').value.trim();
  const message = $('#contact-message').value.trim();
  if (!name || !message) {
    $('#form-status').textContent = 'Please add your name and a message.';
    return;
  }
  const subject = `Portfolio enquiry from ${name}`;
  const body = `Hi Jazeel,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`;
  const draft = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = draft;
  $('#form-status').textContent = 'Your email draft is ready. If your email app did not open, contact me directly at ' + EMAIL + '.';
});
$('#year').textContent = String(new Date().getFullYear());

const commands = [
  { title: 'Selected work', subtitle: 'Explore five coding projects', keywords: 'work projects code github', icon: 'code', href: '#work' },
  { title: 'About Jazeel', subtitle: 'Background, experience, and education', keywords: 'about me education mca internship experience iiit', icon: 'layers', href: '#about' },
  { title: 'Technical toolkit', subtitle: 'Python, Flutter, cloud, and data', keywords: 'skills stack tools python flutter aws cloud data', icon: 'cloud', href: '#stack' },
  { title: 'Get in touch', subtitle: 'Opportunities, projects, and a hello', keywords: 'contact email hire opportunity hybrid bengaluru location', icon: 'mail', href: '#contact' },
  { title: 'View résumé', subtitle: 'Open the original résumé as a PDF', keywords: 'resume cv pdf download', icon: 'down', href: 'assets/Jazeel-AV-Resume.pdf', external: true },
  { title: 'GitHub', subtitle: 'Repositories and experiments', keywords: 'github source code jezzyll', icon: 'github', href: 'https://github.com/jezzyll', external: true }
];
let selectedCommand = 0;
let filteredCommands = commands;

function activateCommand(command) {
  $('#command-dialog').close();
  if (command.external) window.open(command.href, '_blank', 'noopener,noreferrer');
  else {
    const target = document.querySelector(command.href);
    target?.scrollIntoView({ behavior: motionPreference.matches ? 'auto' : 'smooth' });
    history.replaceState(null, '', command.href);
    const heading = $('h2', target);
    if (heading) { heading.setAttribute('tabindex', '-1'); heading.focus({ preventScroll: true }); }
  }
}

function renderCommands() {
  const query = $('#command-search').value.trim().toLowerCase();
  filteredCommands = commands.filter(command => (command.title + ' ' + command.subtitle + ' ' + command.keywords).toLowerCase().includes(query));
  selectedCommand = 0;
  const results = $('#command-results');
  results.replaceChildren(...filteredCommands.map((command, index) => {
    const button = document.createElement('button'); button.className = 'command-option';
    button.type = 'button'; button.classList.toggle('selected', index === 0);
    button.append(icon(command.icon));
    const copy = document.createElement('div');
    const title = document.createElement('strong'); title.textContent = command.title;
    const subtitle = document.createElement('small'); subtitle.textContent = command.subtitle;
    copy.append(title, subtitle); button.append(copy);
    const arrow = document.createElement('span'); arrow.textContent = command.external ? '↗' : '↵'; button.append(arrow);
    button.addEventListener('click', () => activateCommand(command));
    button.addEventListener('mouseenter', () => { selectedCommand = index; markSelectedCommand(); });
    return button;
  }));
  if (!filteredCommands.length) { const empty = document.createElement('p'); empty.className = 'command-empty'; empty.textContent = 'Try “projects”, “skills”, “contact”, or “résumé”.'; results.append(empty); }
}

function markSelectedCommand() {
  $$('.command-option').forEach((button, index) => button.classList.toggle('selected', index === selectedCommand));
  $$('.command-option')[selectedCommand]?.scrollIntoView({ block: 'nearest' });
}

function openCommands() {
  $('#command-search').value = '';
  renderCommands();
  openDialog($('#command-dialog'));
  $('#command-search').focus();
}
$('#command-launcher').addEventListener('click', openCommands);
$('#command-search').addEventListener('input', renderCommands);
$('#command-search').addEventListener('keydown', event => {
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault();
    if (!filteredCommands.length) return;
    selectedCommand = (selectedCommand + (event.key === 'ArrowDown' ? 1 : -1) + filteredCommands.length) % filteredCommands.length;
    markSelectedCommand();
  }
  if (event.key === 'Enter') {
    event.preventDefault();
    if (filteredCommands[selectedCommand]) activateCommand(filteredCommands[selectedCommand]);
  }
});
document.addEventListener('keydown', event => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    if ($('#command-dialog').open) $('#command-dialog').close();
    else openCommands();
  }
});

const heroArt = $('#hero-art');
if (window.matchMedia('(pointer: fine)').matches) {
  heroArt.addEventListener('pointermove', event => {
    if (motionPreference.matches) return;
    const rect = heroArt.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - .5) * 8;
    const y = ((event.clientY - rect.top) / rect.height - .5) * -5;
    heroArt.style.setProperty('--art-x', y + 'deg');
    heroArt.style.setProperty('--art-y', x + 'deg');
  });
  heroArt.addEventListener('pointerleave', () => {
    heroArt.style.setProperty('--art-x', '0deg');
    heroArt.style.setProperty('--art-y', '0deg');
  });
}

// A lightweight decorative star field. It pauses outside the hero and honors reduced motion.
const canvas = $('#hero-canvas');
const context = canvas.getContext('2d');
if (context) {
  let width = 0, height = 0, stars = [], frame = 0, visible = true, previousTime = 0;
  function sizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    width = rect.width; height = rect.height;
    const scale = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * scale; canvas.height = height * scale;
    context.setTransform(scale, 0, 0, scale, 0, 0);
    let seed = 12487;
    const random = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    stars = Array.from({ length: width < 600 ? 32 : 64 }, () => ({ x: random() * width, y: random() * height, size: random() * 1 + .25, phase: random() * Math.PI * 2 }));
    draw(0);
  }
  function draw(time) {
    context.clearRect(0, 0, width, height);
    const dark = document.documentElement.dataset.theme !== 'light';
    stars.forEach(star => {
      const alpha = motionPreference.matches ? .2 : .12 + .14 * (Math.sin(time * .00045 + star.phase) + 1) / 2;
      context.fillStyle = dark ? `rgba(191,159,255,${alpha})` : `rgba(103,64,166,${alpha})`;
      context.beginPath(); context.arc(star.x, star.y, star.size, 0, Math.PI * 2); context.fill();
    });
  }
  function loop(time) {
    if (!visible || document.hidden || motionPreference.matches) { frame = 0; return; }
    if (time - previousTime > 45) { draw(time); previousTime = time; }
    frame = requestAnimationFrame(loop);
  }
  function resume() {
    if (motionPreference.matches) draw(0);
    else if (visible && !document.hidden && !frame) frame = requestAnimationFrame(loop);
  }
  sizeCanvas();
  window.addEventListener('resize', sizeCanvas, { passive: true });
  document.addEventListener('visibilitychange', resume);
  motionPreference.addEventListener('change', resume);
  $('#theme-toggle').addEventListener('click', () => draw(0));
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => { visible = entries[0].isIntersecting; resume(); }, { threshold: 0 }).observe($('#home'));
  }
  resume();
}
