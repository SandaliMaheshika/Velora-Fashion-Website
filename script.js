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

        const priceText = modalProductPrice.textContent;

        console.log("Price Text:", priceText);

        const productPrice = parseFloat(
            priceText.replace(/Rs\.?/i, "").replace(/,/g, "").trim()
        );

        console.log("Converted Price:", productPrice);

        if (isNaN(productPrice) || productPrice <= 0) {

            alert("Product price is not available!");

            return;

        }

        const product = {

            name: modalProductName.textContent,

            price: productPrice,

            image: mainProductImage.src,

            size: productSize.value

        };

        addProduct(product);

        productModal.classList.remove("active");

        document.body.style.overflow = "auto";

        productSize.value = "";

    });

}


// Cart Elements

const cartPanel = document.getElementById("cartPanel");

const cartToggle = document.getElementById("cartToggle");

const closeCart = document.getElementById("closeCart");

const cartOverlay = document.getElementById("cartOverlay");

const cartItems = document.getElementById("cartItems");
// Get Cart Data From Local Storage

let cart = JSON.parse(localStorage.getItem("veloraCart")) || [];

// Remove Invalid Cart Data

cart = cart.filter(function (item) {

    return item &&
        item.name &&
        item.image &&
        item.size &&
        Number(item.price) > 0;

});

// Make Sure Price And Quantity Are Numbers

cart = cart.map(function (item) {

    return {
        ...item,
        price: Number(item.price),
        quantity: Number(item.quantity) || 1
    };

});

// Open Cart

const headerCartBtn = document.getElementById("headerCartBtn");

function showCart() {

    if (cartPanel && cartOverlay) {

        cartPanel.classList.add("active");

        cartOverlay.classList.add("active");

    }

}

if (cartToggle) {

    cartToggle.addEventListener("click", showCart);

}

if (headerCartBtn) {

    headerCartBtn.addEventListener("click", showCart);

}


// Close Cart

function hideCart() {

    cartPanel.classList.remove("active");

    cartOverlay.classList.remove("active");

}


if (closeCart) {

    closeCart.addEventListener("click", hideCart);

}

if (cartOverlay) {

    cartOverlay.addEventListener("click", hideCart);

}


// Save Cart

function saveCart() {

    localStorage.setItem("veloraCart", JSON.stringify(cart));

    displayCart();

}

// Add Product To Cart

function addProduct(product) {

    const existingItem = cart.find(function (item) {

        return item.name === product.name &&
            item.size === product.size;

    });

    if (existingItem) {

        existingItem.quantity++;

    } else {

        product.quantity = 1;

        cart.push(product);

    }

    saveCart();

    if (cartPanel && cartOverlay) {

        cartPanel.classList.add("active");

        cartOverlay.classList.add("active");

    }

}


// Display Cart

function displayCart() {

    if (!cartItems) {
        return;
    }

    cartItems.innerHTML = "";

    let subtotal = 0;
    let totalItems = 0;

    cart.forEach(function (item, index) {

        // Check product price and quantity

        let price = Number(item.price) || 0;
        let quantity = Number(item.quantity) || 1;

        if (price <= 0) {
            return;
        }

        let itemTotal = price * quantity;

        subtotal += itemTotal;
        totalItems += quantity;

        cartItems.innerHTML += `

            <div class="cart-item">

                <img src="${item.image}" alt="${item.name}">

                <div class="cart-item-info">

                    <h4>${item.name}</h4>

                    <p>Size: ${item.size}</p>

                    <p>Rs. ${price.toLocaleString("en-US")}.00</p>

                    <div class="quantity-control">

                        <button onclick="changeQuantity(${index}, -1)">-</button>

                        <span>${quantity}</span>

                        <button onclick="changeQuantity(${index}, 1)">+</button>

                    </div>

                    <button class="remove-item"
                    onclick="removeItem(${index})">

                        Remove

                    </button>

                </div>

            </div>

        `;

    });


    if (totalItems === 0) {

        cartItems.innerHTML =
            '<p class="empty-cart">Your order is empty.</p>';

    }


    let discountAmount = 0;

    let deliveryFee = totalItems > 0 ? 350 : 0;

    let grandTotal = subtotal - discountAmount + deliveryFee;


    document.getElementById("cartCount").textContent = totalItems;

    document.getElementById("subtotal").textContent =
        "Rs. " + subtotal.toLocaleString("en-US") + ".00";

    document.getElementById("discount").textContent =
        "Rs. " + discountAmount.toLocaleString("en-US") + ".00";

    document.getElementById("delivery").textContent =
        "Rs. " + deliveryFee.toLocaleString("en-US") + ".00";

    document.getElementById("grandTotal").textContent =
        "Rs. " + grandTotal.toLocaleString("en-US") + ".00";

}
// Change Quantity

function changeQuantity(index, amount) {

    cart[index].quantity += amount;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }

    saveCart();

}


// Remove Item

function removeItem(index) {

    cart.splice(index, 1);

    saveCart();

}


// Initial Display

displayCart();

