// Mobile Menu Button

const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

if (menuBtn && navbar) {

    menuBtn.addEventListener("click", function () {

        navbar.classList.toggle("active");

    });

}


// Fashion Image Slider

const slides = document.querySelectorAll(".slide");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const sliderDots = document.getElementById("sliderDots");

let currentSlide = 0;

let dots = [];


// Create Slider Dots

if (slides.length > 0 && sliderDots) {

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

    dots = sliderDots.querySelectorAll(".dot");

}


// Show Slide

function showSlide(index) {

    if (slides.length === 0) {
        return;
    }

    slides.forEach(function (slide) {

        slide.classList.remove("active");

    });

    dots.forEach(function (dot) {

        dot.classList.remove("active");

    });

    currentSlide = (index + slides.length) % slides.length;

    slides[currentSlide].classList.add("active");

    if (dots[currentSlide]) {

        dots[currentSlide].classList.add("active");

    }

}


// Next Button

if (nextBtn) {

    nextBtn.addEventListener("click", function () {

        showSlide(currentSlide + 1);

    });

}


// Previous Button

if (prevBtn) {

    prevBtn.addEventListener("click", function () {

        showSlide(currentSlide - 1);

    });

}


// Automatic Slider

if (slides.length > 0) {

    setInterval(function () {

        showSlide(currentSlide + 1);

    }, 5000);

}


// Collections Dropdown Menu

const collectionBtn = document.getElementById("collectionBtn");

const dropdownMenu = document.getElementById("dropdownMenu");

if (collectionBtn && dropdownMenu) {

    collectionBtn.addEventListener("click", function (event) {

        event.preventDefault();

        dropdownMenu.classList.toggle("active");

    });


    document.addEventListener("click", function (event) {

        if (!event.target.closest(".dropdown")) {

            dropdownMenu.classList.remove("active");

        }

    });

}


// Newsletter Subscription

const newsletterForm = document.getElementById("newsletterForm");

if (newsletterForm) {

    newsletterForm.addEventListener("submit", function (event) {

        event.preventDefault();

        alert("Thank you for subscribing to Velora Fashion!");

        newsletterForm.reset();

    });

}


// Contact Form

const contactForm = document.querySelector(".contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        alert("Thank you for contacting Velora Fashion!");

        contactForm.reset();

    });

}


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

if (
    productModal &&
    closeModal &&
    mainProductImage &&
    thumbnailContainer &&
    modalProductName &&
    modalProductPrice &&
    modalProductDescription
) {

    productButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const productCard = button.closest(".product-card");

            const productName = productCard.querySelector("h3").textContent;

            const productPrice = productCard.querySelector(".product-info p").textContent;

            const productDescription = button.dataset.description;

            const images = button.dataset.images.split(",").map(function (image) {

                return image.trim();

            });


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

}


// Add To Bag

const addToBag = document.getElementById("addToBag");

const productSize = document.getElementById("productSize");

if (addToBag && productSize) {

    addToBag.addEventListener("click", function () {

        if (productSize.value === "") {

            alert("Please select your dress size!");

            return;

        }

        alert("Product added to bag successfully!");

    });

}