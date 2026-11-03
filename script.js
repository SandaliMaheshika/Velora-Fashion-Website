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



// Newsletter Subscription

const newsletterForm = document.getElementById("newsletterForm");

newsletterForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const email = document.getElementById("emailInput").value;

    alert("Thank you for subscribing to Velora Fashion!");

    newsletterForm.reset();

});


// Contact Form

const contactForm = document.querySelector(".contact-form");

contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    alert("Thank you for contacting Velora Fashion!");

    contactForm.reset();

});

// Product Details

const productButtons = document.querySelectorAll(".product-btn");

const productModal = document.getElementById("productModal");

const closeModal = document.getElementById("closeModal");

const mainProductImage = document.getElementById("mainProductImage");

const thumbnailContainer = document.getElementById("thumbnailContainer");

const modalProductName = document.getElementById("modalProductName");

const modalProductPrice = document.getElementById("modalProductPrice");

const modalProductDescription = document.getElementById("modalProductDescription");


// Open Product Details

productButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const productCard = button.closest(".product-card");

        const productName = productCard.querySelector("h3").textContent;

        const productPrice = productCard.querySelector(".product-info p").textContent;

        const productDescription = button.dataset.description;

        const images = button.dataset.images.split(",");


        // Set Product Details

        modalProductName.textContent = productName;

        modalProductPrice.textContent = productPrice;

        modalProductDescription.textContent = productDescription;

        // Main Image

        mainProductImage.src = images[0];


        // Clear Previous Thumbnails

        thumbnailContainer.innerHTML = "";


        // Create Thumbnails

        images.forEach(function (image) {

            const thumbnail = document.createElement("img");

            thumbnail.src = image;

            thumbnail.addEventListener("click", function () {

                mainProductImage.src = image;

            });

            thumbnailContainer.appendChild(thumbnail);

        });


        // Show Modal

        productModal.classList.add("active");

        document.body.style.overflow = "hidden";

    });

});


// Close Modal

closeModal.addEventListener("click", function () {

    productModal.classList.remove("active");

    document.body.style.overflow = "auto";

});


// Close When Clicking Outside

productModal.addEventListener("click", function (event) {

    if (event.target === productModal) {

        productModal.classList.remove("active");

        document.body.style.overflow = "auto";

    }

});


// Add To Bag

const addToBag = document.getElementById("addToBag");

const productSize = document.getElementById("productSize");

addToBag.addEventListener("click", function () {

    if (productSize.value === "") {

        alert("Please select your dress size!");

        return;

    }

    alert("Product added to bag successfully!");

});