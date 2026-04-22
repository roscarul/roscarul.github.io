function setLang(lang) {
  // Guardar preferencia
  localStorage.setItem("lang", lang);

  // Aplicar idioma
  applyLang(lang);
}

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