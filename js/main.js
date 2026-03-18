
document.addEventListener("DOMContentLoaded", function() {

    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector("nav");

    if(hamburger && navMenu){
        hamburger.addEventListener("click", function(){
            navMenu.classList.toggle("active");
        });
    }

});

window.addEventListener("load", function(){

const tooltip = document.getElementById("waTooltip");

if(!tooltip) return;

// muncul setelah 4 detik
setTimeout(function(){
tooltip.classList.add("show");
},4000);

// hilang lagi setelah 10 detik
setTimeout(function(){
tooltip.classList.remove("show");
},30000);

});



document.addEventListener("DOMContentLoaded", function () {

  const slider = document.getElementById("reviewSlider");

  if (slider) {
    const cards = slider.children;
    const dotsContainer = document.getElementById("dots");

    let index = 0;

    for (let i = 0; i < cards.length; i++) {
      const dot = document.createElement("span");
      if (i === 0) dot.classList.add("active");
      dotsContainer.appendChild(dot);
    }

    const dots = dotsContainer.children;

    function showSlide(i) {
  slider.scrollTo({
    left: cards[i].offsetLeft - 20,
    behavior: "smooth"
  });

  // dots
  for (let d of dots) d.classList.remove("active");
  dots[i].classList.add("active");

  // active card effect
  cards[0].classList.add("active");
  for (let c of cards) c.classList.remove("active");
  cards[i].classList.add("active");
}

    setInterval(() => {
      index = (index + 1) % cards.length;
      showSlide(index);
    }, 4000);
  }

});