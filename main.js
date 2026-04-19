// ================================
// HAMBURGER / MOBILE NAV
// ================================
const hamburger = document.querySelector(".hamburger");
const mobileNav = document.querySelector(".mobile-nav");
const header    = document.querySelector(".header");
 
if (hamburger && mobileNav) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobileNav.classList.toggle("active");
  });
 
  document.querySelectorAll(".mobile-nav #nava, .mobile-cta").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      mobileNav.classList.remove("active");
    });
  });
 
  document.addEventListener("click", (e) => {
    if (
      mobileNav.classList.contains("active") &&
      !mobileNav.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      hamburger.classList.remove("active");
      mobileNav.classList.remove("active");
    }
  });
}
 
// ================================
// STICKY NAVBAR + ACTIVE SECTIONS
// ================================
if (header) {
  window.addEventListener("scroll", () => {
    header.classList.toggle("sticky", window.scrollY > 100);
 
    document.querySelectorAll("section").forEach(sec => {
      const top    = window.scrollY;
      const offset = sec.offsetTop - 150;
      const height = sec.offsetHeight;
      const id     = sec.getAttribute("id");
 
      if (top >= offset && top < offset + height) {
        document.querySelectorAll("header nav a").forEach(link => link.classList.remove("active"));
        const activeLink = document.querySelector("header nav a[href*=" + id + "]");
        if (activeLink) activeLink.classList.add("active");
      }
    });
  });
}
 
// ================================
// TYPED.JS
// ================================
if (document.querySelector(".multiple-text1") && typeof Typed !== "undefined") {
  new Typed(".multiple-text1", {
    strings: [
"End clinic chaos",
"Scale your clinic",
"More patients",
"Systemize everything",
    ],
    typeSpeed: 40,
    backSpeed: 70,
    backDelay: 2000,
    loop: true,
  });
}
 
// ================================
// CONTACT FORM — Web3Forms
// ================================
const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');
const formError   = document.getElementById('formError');
 
if (contactForm && submitBtn) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();
 
    const btnText = submitBtn.querySelector('span');
 
    btnText.textContent           = 'Sending...';
    submitBtn.disabled            = true;
    formSuccess.style.display     = 'none';
    formError.style.display       = 'none';
 
    const formData = new FormData(contactForm);
 
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
 
      const data = await response.json();
 
      if (data.success) {
        btnText.textContent            = '✓ Sent!';
        submitBtn.style.background     = '#00b894';
        formSuccess.style.display      = 'block';
        contactForm.reset();
 
        setTimeout(() => {
          btnText.textContent        = 'Send Message';
          submitBtn.style.background = '';
          submitBtn.disabled         = false;
          formSuccess.style.display  = 'none';
        }, 4000);
 
      } else {
        throw new Error('Failed');
      }
 
    } catch (err) {
      btnText.textContent        = '✗ Failed';
      submitBtn.style.background = '#e74c3c';
      formError.style.display    = 'block';
 
      setTimeout(() => {
        btnText.textContent        = 'Send Message';
        submitBtn.style.background = '';
        submitBtn.disabled         = false;
      }, 3000);
    }
  });
}
 
// ================================
// MEETING MODAL
// ================================
const modal    = document.getElementById('meetingModal');
const closeBtn = document.getElementById('closeModal');
const openBtns = [
  ...document.querySelectorAll('[id="openModal"]'),
  document.getElementById('openModalMobile')
];
if (modal && closeBtn) {
  let modalLoaded = false;
 
  openBtns.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
 
        modalLoaded = false;
        const modalBody    = document.querySelector('.meeting-modal-body');
        const modalSuccess = document.getElementById('modalSuccess');
        if (modalBody)    modalBody.style.display = '';
        if (modalSuccess) modalSuccess.classList.remove('active');
      });
    }
  });
 
  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  });
 
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
 
  const iframe = document.querySelector('.meeting-modal-frame iframe');
  if (iframe) {
    iframe.addEventListener('load', () => {
      if (modalLoaded) {
        const modalBody    = document.querySelector('.meeting-modal-body');
        const modalSuccess = document.getElementById('modalSuccess');
        if (modalBody)    modalBody.style.display = 'none';
        if (modalSuccess) modalSuccess.classList.add('active');
      }
      modalLoaded = true;
    });
  }
}
 
// ================================
// MOBILE TOC (Article Pages)
// ================================
const tocToggle  = document.getElementById('tocToggle');
const tocDrawer  = document.getElementById('tocDrawer');
const tocOverlay = document.getElementById('tocOverlay');
 
let tocOpen = false;
 
// Exposed globally so inline onclick="closeToc()" in HTML works
window.closeToc = function () {
  tocOpen = false;
  if (tocDrawer)  tocDrawer.classList.remove('open');
  if (tocOverlay) tocOverlay.classList.remove('open');
  if (tocToggle)  tocToggle.innerHTML = '<i class="bi bi-list"></i> Contents';
};
 
if (tocToggle && tocDrawer && tocOverlay) {
  tocToggle.addEventListener('click', () => {
    tocOpen = !tocOpen;
    tocDrawer.classList.toggle('open', tocOpen);
    tocOverlay.classList.toggle('open', tocOpen);
    tocToggle.innerHTML = tocOpen
      ? '<i class="bi bi-x-lg"></i> Close'
      : '<i class="bi bi-list"></i> Contents';
  });
 
  tocOverlay.addEventListener('click', window.closeToc);
}
 
// ================================
// ACTIVE TOC HIGHLIGHT ON SCROLL
// ================================
const tocLinks = document.querySelectorAll('.article-sidebar .toc-list a');
 
if (tocLinks.length > 0) {
  const headings = [];
 
  tocLinks.forEach(a => {
    const id = a.getAttribute('href');
    if (id && id.startsWith('#')) {
      const el = document.getElementById(id.slice(1));
      if (el) headings.push({ el, a });
    }
  });
 
  window.addEventListener('scroll', () => {
    if (headings.length === 0) return;
 
    let current = headings[0];
    headings.forEach(h => {
      if (window.scrollY >= h.el.offsetTop - 110) current = h;
    });
 
    tocLinks.forEach(a => a.classList.remove('toc-active'));
    if (current) current.a.classList.add('toc-active');
  }, { passive: true });
}