document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     NAV MENU
  ========================= */
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");
  const overlay = document.getElementById("overlay");
  const closeMenu = document.getElementById("closeMenu");
  const menuLinks = document.querySelectorAll("#navMenu a");

  if (hamburger && navMenu && overlay) {

    // OPEN MENU
    hamburger.addEventListener("click", () => {
      navMenu.classList.add("active");
      overlay.classList.add("active");
    });

    // CLOSE FUNCTION
    function closeNav() {
      navMenu.classList.remove("active");
      overlay.classList.remove("active");
    }

    // CLOSE EVENTS
    overlay.addEventListener("click", closeNav);

    if (closeMenu) {
      closeMenu.addEventListener("click", closeNav);
    }

    // CLOSE WHEN CLICK LINK
    menuLinks.forEach(link => {
      link.addEventListener("click", closeNav);
    });
  }

  /* =========================
     REVIEW SLIDER
  ========================= */
  const slider = document.getElementById("reviewSlider");

  if (slider) {
    const cards = slider.children;
    const dotsContainer = document.getElementById("dots");

    let index = 0;

    if (dotsContainer) {
      for (let i = 0; i < cards.length; i++) {
        const dot = document.createElement("span");
        if (i === 0) dot.classList.add("active");
        dotsContainer.appendChild(dot);
      }
    }

    const dots = dotsContainer ? dotsContainer.children : [];

    function showSlide(i) {
      slider.scrollTo({
        left: cards[i].offsetLeft - 20,
        behavior: "smooth"
      });

      // update dots
      for (let d of dots) d.classList.remove("active");
      if (dots[i]) dots[i].classList.add("active");

      // update active card
      for (let c of cards) c.classList.remove("active");
      cards[i].classList.add("active");
    }

    // AUTO SLIDE
    setInterval(() => {
      index = (index + 1) % cards.length;
      showSlide(index);
    }, 4000);
  }

});


/* =========================
   FLOATING WHATSAPP TOOLTIP
========================= */
window.addEventListener("load", function () {

  const tooltip = document.getElementById("waTooltip");

  if (!tooltip) return;

  setTimeout(() => {
    tooltip.classList.add("show");
  }, 4000);

  setTimeout(() => {
    tooltip.classList.remove("show");
  }, 30000);

});