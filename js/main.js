
document.addEventListener("DOMContentLoaded", function() {

    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector("nav");

    if(hamburger && navMenu){
        hamburger.addEventListener("click", function(){
            navMenu.classList.toggle("active");
        });
    }

});