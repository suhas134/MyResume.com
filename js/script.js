// Minimal, dependency-free script
document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      navMenu.classList.toggle('active');
    });

    // close when clicking a link
    navMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { navMenu.classList.remove('active'); });
    });

    // close when clicking outside
    document.addEventListener('click', function (evt) {
      if (!evt.target.closest('.navbar-container')) navMenu.classList.remove('active');
    });
  }

  // set active nav link
  (function setActiveNavLink() {
    const current = (window.location.pathname.split('/').pop() || 'index.html');
    document.querySelectorAll('.nav-menu a').forEach(function (link) {
      const href = (link.getAttribute('href') || '').split('/').pop() || 'index.html';
      if (href === current) link.classList.add('active'); else link.classList.remove('active');
    });
  })();

  // Contact form - simple validation & simulated submit
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = (form.querySelector('#name') || {}).value || '';
      const email = (form.querySelector('#email') || {}).value || '';
      const message = (form.querySelector('#message') || {}).value || '';
      if (!name.trim() || !email.trim() || !message.trim()) { alert('Please fill in all fields'); return; }
      if (!isValidEmail(email)) { alert('Please enter a valid email address'); return; }
      const btn = form.querySelector('button[type="submit"]') || form.querySelector('button');
      if (btn) { btn.disabled = true; btn.textContent = 'Sending...'; }
      setTimeout(function () {
        const success = document.getElementById('successMessage');
        if (success) { success.style.display = 'block'; }
        form.reset();
        if (btn) { btn.disabled = false; btn.textContent = 'Send Message'; }
        setTimeout(function () { if (success) success.style.display = 'none'; }, 4000);
      }, 900);
    });
  }

  // print resume
  const printBtn = document.getElementById('printBtn');
  if (printBtn) printBtn.addEventListener('click', function () { window.print(); });
});

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
