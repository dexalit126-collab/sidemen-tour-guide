
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

