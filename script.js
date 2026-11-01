// Mobile Menu Button

const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

menuBtn.addEventListener("click", function () {

    navbar.classList.toggle("active");

});

// Fashion Image Slider

const slides = document.querySelectorAll(".slide");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const sliderDots = document.getElementById("sliderDots");

let currentSlide = 0;


// Create Slider Dots

slides.forEach(function (slide, index) {

    const dot = document.createElement("span");

    dot.classList.add("dot");

    if (index === 0) {
        dot.classList.add("active");
    }

    dot.addEventListener("click", function () {
        showSlide(index);
    });

    sliderDots.appendChild(dot);

});

const dots = document.querySelectorAll(".dot");


// Show Slide

function showSlide(index) {

    slides.forEach(function (slide) {
        slide.classList.remove("active");
    });

    dots.forEach(function (dot) {
        dot.classList.remove("active");
    });

    currentSlide = (index + slides.length) % slides.length;

    slides[currentSlide].classList.add("active");

    dots[currentSlide].classList.add("active");

}


// Next Button

nextBtn.addEventListener("click", function () {

    showSlide(currentSlide + 1);

});


// Previous Button

prevBtn.addEventListener("click", function () {

    showSlide(currentSlide - 1);

});


// Automatic Change Every 5 Seconds

setInterval(function () {

    showSlide(currentSlide + 1);

}, 5000);