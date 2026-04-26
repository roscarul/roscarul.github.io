function setLang(lang) {
  localStorage.setItem("lang", lang);

  document.querySelectorAll("[data-es]").forEach(el => {
    const text = el.getAttribute(`data-${lang}`);
    if (text) el.textContent = text;
  });

  document.querySelectorAll(".lang-switch .btn").forEach(btn => {
    btn.classList.remove("active");
  });

  document.querySelector(`.lang-switch .btn[onclick="setLang('${lang}')"]`)
    ?.classList.add("active");
}

window.onload = () => {
  const lang = localStorage.getItem("lang") || "es";
  setLang(lang);
};

function applyLang(lang) {
  document.querySelectorAll("[data-es]").forEach(el => {
    const text = el.getAttribute("data-" + lang);
    if (text) el.textContent = text;
  });
}

// Al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  // 1. Intentar recuperar idioma guardado
  let lang = localStorage.getItem("lang");

  // 2. Si no hay, usar español por defecto
  if (!lang) {
    lang = "es";
  }

  // 3. Aplicar idioma
  applyLang(lang);
});

window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  const scrollY = window.scrollY;
  if (header) {
    header.style.transform = `translateY(${scrollY * 0.35}px)`;
    header.style.opacity = Math.max(0, 1 - scrollY / 340);
  }
});

function scrollCarousel(direction) {
  const carousel = document.getElementById("carousel");
  const scrollAmount = 320;

  carousel.scrollBy({
    left: direction * scrollAmount,
    behavior: "smooth"
  });
}

function openLightbox(src) {
  const lightbox = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");

  img.src = src;
  lightbox.style.display = "flex";
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

// ─── SKILLS MARQUEE ──────────────────────────────────────────────────────────
// Clones items so only one set is ever visible at a time.
// The clone fills the gap after the originals scroll off, creating a seamless
// loop without any visible repetition inside the viewport.
(function initMarquee() {
  const track = document.getElementById('marquee-track');
  if (!track) return;

  const wrapper = track.closest('.skills-marquee-wrapper');
  const originals = Array.from(track.children);

  function setup() {
    // Remove any previous clones
    track.querySelectorAll('.marquee-clone').forEach(el => el.remove());

    // Measure the total width of one set of originals (items + gaps)
    const style   = getComputedStyle(track);
    const gap     = parseFloat(style.gap) || 80;
    let setWidth  = 0;
    originals.forEach(item => { setWidth += item.offsetWidth; });
    setWidth += gap * originals.length; // gap after every item incl. last

    const viewWidth = wrapper.offsetWidth;

    // We need at least enough clones to fill the viewport after the originals
    // scroll off. One clone-set is always sufficient because setWidth >= items
    // and we never want more than one set visible.
    const clone = document.createDocumentFragment();
    originals.forEach(item => {
      const c = item.cloneNode(true);
      c.classList.add('marquee-clone');
      clone.appendChild(c);
    });
    track.appendChild(clone);

    // Tell the keyframe exactly how far to shift (one full original set)
    track.style.setProperty('--marquee-shift', `-${setWidth}px`);

    // Re-trigger animation cleanly
    track.classList.remove('animating');
    void track.offsetWidth; // force reflow
    track.classList.add('animating');
  }

  // Run on load and on resize
  window.addEventListener('load', setup);
  window.addEventListener('resize', setup);
  setup();
})();