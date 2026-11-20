// DAILY DASHBOARD RESET

let currentDate = new Date();

let todayDate =
    currentDate.getFullYear() + "-" +
    String(currentDate.getMonth() + 1).padStart(2, "0") + "-" +
    String(currentDate.getDate()).padStart(2, "0");

let savedDate = localStorage.getItem("veloraOrdersDate");

if (savedDate !== todayDate) {

    localStorage.setItem("veloraOrders", JSON.stringify([]));

    localStorage.setItem("veloraOrdersDate", todayDate);

}

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
            priceText.replace("Rs.", "").replace(/,/g, "").trim()
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



// ===============================
// CUSTOMER CHECKOUT
// ===============================


const checkoutBtn = document.getElementById("checkoutBtn");
const checkoutDetails = document.getElementById("checkoutDetails");
const checkoutForm = document.getElementById("checkoutForm");
const cartSummary = document.querySelector(".cart-summary");

if (checkoutBtn && checkoutDetails && cartSummary && cartItems) {

    checkoutBtn.addEventListener("click", function (event) {

        event.preventDefault();

        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        cartItems.style.display = "none";
        cartSummary.style.display = "none";
        checkoutDetails.style.display = "block";

    });

}

// ===============================
// PLACE ORDER
// ===============================

if (checkoutForm) {

    checkoutForm.addEventListener("submit", function (event) {

        event.preventDefault();

        let customerName = document.getElementById("customerName").value;
        let customerPhone = document.getElementById("customerPhone").value;
        let customerEmail = document.getElementById("customerEmail").value;
        let customerAddress = document.getElementById("customerAddress").value;

        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        let subtotal = 0;

        cart.forEach(function (item) {
            subtotal += Number(item.price) * Number(item.quantity);
        });

        let deliveryFee = 350;

        let order = {
            orderId: "VF" + Date.now(),
            customerName: customerName,
            customerPhone: customerPhone,
            customerEmail: customerEmail,
            customerAddress: customerAddress,
            date: new Date().toLocaleString(),
            items: [...cart],
            subtotal: subtotal,
            deliveryFee: deliveryFee,
            total: subtotal + deliveryFee,
            status: "Pending"
        };

        // SAVE ORDER

        let orders = JSON.parse(localStorage.getItem("veloraOrders")) || [];

        orders.push(order);

        localStorage.setItem("veloraOrders", JSON.stringify(orders));


        // DISPLAY CUSTOMER DETAILS

        const confirmationCustomer = document.getElementById("confirmationCustomer");
        const confirmationProducts = document.getElementById("confirmationProducts");
        const confirmationTotal = document.getElementById("confirmationTotal");
        const confirmationModal = document.getElementById("confirmationModal");

        if (!confirmationCustomer || !confirmationProducts ||
            !confirmationTotal || !confirmationModal) {

            alert("Order confirmation form is missing!");

            return;
        }

        confirmationCustomer.innerHTML = `
    <p><strong>Name:</strong> ${order.customerName}</p>
    <p><strong>Phone:</strong> ${order.customerPhone}</p>
    <p><strong>Email:</strong> ${order.customerEmail}</p>
    <p><strong>Address:</strong> ${order.customerAddress}</p>
    <p><strong>Order ID:</strong> ${order.orderId}</p>
    <p><strong>Date:</strong> ${order.date}</p>
`;


        // DISPLAY ORDERED PRODUCTS

        confirmationProducts.innerHTML = "";

        order.items.forEach(function (item) {

            confirmationProducts.innerHTML += `
        <div class="detail-product">

            <img src="${item.image}" alt="${item.name}">

            <div>
                <h4>${item.name}</h4>
                <p>Size: ${item.size}</p>
                <p>Quantity: ${item.quantity}</p>
                <p>Price: Rs. ${Number(item.price).toLocaleString("en-US")}</p>
            </div>

        </div>
    `;

        });


        // DISPLAY TOTAL

        confirmationTotal.innerHTML = `
    <p>Subtotal: Rs. ${Number(order.subtotal).toLocaleString("en-US")}</p>
    <p>Delivery Fee: Rs. ${Number(order.deliveryFee).toLocaleString("en-US")}</p>
    <h3>Total: Rs. ${Number(order.total).toLocaleString("en-US")}</h3>
    <p><strong>Status:</strong> ${order.status}</p>
`;

        // CLEAR CART

        cart = [];

        saveCart();

        hideCart();


        // SHOW ORDER DETAILS FORM

        document.getElementById("confirmationModal").classList.add("active");

    });

}
// ===============================
// POS DASHBOARD - DAILY DATA
// ===============================

const recentOrders = document.getElementById("recentOrders");

if (recentOrders) {

    let orders = JSON.parse(localStorage.getItem("veloraOrders")) || [];

    function displayOrders() {

        recentOrders.innerHTML = "";

        if (orders.length === 0) {

            recentOrders.innerHTML = `
                <tr>
                    <td colspan="5">No orders today</td>
                </tr>
            `;

        } else {

            orders.slice().reverse().slice(0, 5).forEach(function (order) {

                let index = orders.indexOf(order);

                recentOrders.innerHTML += `
                    <tr class="clickable-order" data-index="${index}">
                        <td>${order.orderId}</td>
                        <td>${order.customerName}</td>
                        <td>${order.date}</td>
                        <td>Rs. ${Number(order.total).toLocaleString("en-US")}.00</td>
                        <td>${order.status}</td>
                    </tr>
                `;

            });

        }

        // Total Orders

        document.getElementById("totalOrders").textContent = orders.length;

        // Total Sales

        let sales = 0;

        orders.forEach(function (order) {

            if (order.status !== "Cancelled") {
                sales += Number(order.total) || 0;
            }

        });

        document.getElementById("totalSales").textContent =
            "Rs. " + sales.toLocaleString("en-US") + ".00";

        // Total Customers

        let customers = [];

        orders.forEach(function (order) {

            if (order.customerPhone &&
                !customers.includes(order.customerPhone)) {

                customers.push(order.customerPhone);

            }

        });

        document.getElementById("totalCustomers").textContent = customers.length;

    }

    displayOrders();


    // OPEN ORDER DETAILS

    const orderModal = document.getElementById("orderModal");
    const closeOrderModal = document.getElementById("closeOrderModal");

    let selectedOrderIndex = null;

    if (orderModal && closeOrderModal) {

        recentOrders.addEventListener("click", function (event) {

            const row = event.target.closest(".clickable-order");

            if (!row) return;

            selectedOrderIndex = Number(row.dataset.index);

            const order = orders[selectedOrderIndex];

            document.getElementById("detailOrderId").textContent = order.orderId;
            document.getElementById("detailOrderDate").textContent = order.date;
            document.getElementById("detailCustomerName").textContent = order.customerName;
            document.getElementById("detailCustomerPhone").textContent = order.customerPhone;
            document.getElementById("detailCustomerEmail").textContent = order.customerEmail;
            document.getElementById("detailCustomerAddress").textContent = order.customerAddress;

            document.getElementById("detailSubtotal").textContent =
                "Rs. " + Number(order.subtotal).toLocaleString("en-US");

            document.getElementById("detailDelivery").textContent =
                "Rs. " + Number(order.deliveryFee).toLocaleString("en-US");

            document.getElementById("detailTotal").textContent =
                "Rs. " + Number(order.total).toLocaleString("en-US");

            document.getElementById("detailOrderStatus").value = order.status;

            const detailProducts = document.getElementById("detailProducts");

            detailProducts.innerHTML = "";

            order.items.forEach(function (item) {

                detailProducts.innerHTML += `
                    <div class="detail-product">

                        <img src="${item.image}" alt="${item.name}">

                        <div>
                            <h4>${item.name}</h4>
                            <p>Size: ${item.size}</p>
                            <p>Quantity: ${item.quantity}</p>
                            <p>Price: Rs. ${Number(item.price).toLocaleString("en-US")}</p>
                        </div>

                    </div>
                `;

            });

            orderModal.classList.add("active");

        });


        // CLOSE POPUP

        closeOrderModal.addEventListener("click", function () {

            orderModal.classList.remove("active");

        });


        // UPDATE ORDER STATUS

        document.getElementById("updateOrderStatus").addEventListener("click", function () {

            if (selectedOrderIndex === null) return;

            orders[selectedOrderIndex].status =
                document.getElementById("detailOrderStatus").value;

            localStorage.setItem("veloraOrders", JSON.stringify(orders));

            displayOrders();

            orderModal.classList.remove("active");

            alert("Order status updated successfully!");

        });


        // PRINT ORDER

        document.getElementById("printOrder").addEventListener("click", function () {

            window.print();

        });

    }

}



// CONTINUE SHOPPING BUTTON

const closeConfirmation = document.getElementById("closeConfirmation");

if (closeConfirmation) {

    closeConfirmation.addEventListener("click", function () {

        // Close confirmation form
        document.getElementById("confirmationModal").classList.remove("active");

        // Reset checkout form
        if (checkoutForm) {
            checkoutForm.reset();
        }

        // Show cart items and summary again
        if (cartItems) {
            cartItems.style.display = "block";
        }

        if (cartSummary) {
            cartSummary.style.display = "block";
        }

        // Hide customer details form
        if (checkoutDetails) {
            checkoutDetails.style.display = "none";
        }

        // Go to collections section
        const collections = document.getElementById("collections");

        if (collections) {
            collections.scrollIntoView({
                behavior: "smooth"
            });
        } else {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }

    });

}

// CUSTOMER MANAGEMENT

const customerForm = document.getElementById("customerForm");

const customerTableBody = document.getElementById("customerTableBody");

const customerSubmitBtn = document.getElementById("customerSubmitBtn");

const customerFormTitle = document.getElementById("customerFormTitle");

let customers = JSON.parse(localStorage.getItem("veloraCustomers")) || [];

let editCustomerId = null;


// Save customers

function saveCustomers() {

    localStorage.setItem("veloraCustomers", JSON.stringify(customers));

}


// Display customers

function displayCustomers() {

    customerTableBody.innerHTML = "";

    if (customers.length === 0) {

        customerTableBody.innerHTML = `
            <tr>
                <td colspan="6">No customers available</td>
            </tr>
        `;

        return;
    }

    customers.forEach(function (customer) {

        const row = document.createElement("tr");

        const values = [
            customer.id,
            customer.name,
            customer.phone,
            customer.email,
            customer.address
        ];

        values.forEach(function (value) {

            const cell = document.createElement("td");

            cell.textContent = value;

            row.appendChild(cell);

        });

        const actionCell = document.createElement("td");

        actionCell.innerHTML = `
            <button class="edit-customer"
                onclick="editCustomer(${customer.id})">
                Edit
            </button>

            <button class="delete-customer"
                onclick="deleteCustomer(${customer.id})">
                Delete
            </button>
        `;

        row.appendChild(actionCell);

        customerTableBody.appendChild(row);

    });

}


// Add or Update Customer

customerForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.getElementById("customerName").value.trim();

    const phone = document.getElementById("customerPhone").value.trim();

    const email = document.getElementById("customerEmail").value.trim();

    const address = document.getElementById("customerAddress").value.trim();


    if (editCustomerId === null) {

        const newCustomer = {

            id: Date.now(),
            name: name,
            phone: phone,
            email: email,
            address: address

        };

        customers.push(newCustomer);

        alert("Customer added successfully!");

    } else {

        customers = customers.map(function (customer) {

            if (customer.id === editCustomerId) {

                return {
                    id: customer.id,
                    name: name,
                    phone: phone,
                    email: email,
                    address: address
                };

            }

            return customer;

        });

        alert("Customer updated successfully!");

        editCustomerId = null;

    }

    saveCustomers();

    displayCustomers();

    customerForm.reset();

    customerSubmitBtn.textContent = "Add Customer";

    customerFormTitle.textContent = "Add New Customer";

});


// Edit Customer

function editCustomer(id) {

    const customer = customers.find(function (customer) {

        return customer.id === id;

    });

    if (customer) {

        document.getElementById("customerName").value = customer.name;

        document.getElementById("customerPhone").value = customer.phone;

        document.getElementById("customerEmail").value = customer.email;

        document.getElementById("customerAddress").value = customer.address;

        editCustomerId = id;

        customerSubmitBtn.textContent = "Update Customer";

        customerFormTitle.textContent = "Edit Customer";

        document.getElementById("customerManagement").scrollIntoView({
            behavior: "smooth"
        });

    }

}


// Delete Customer

function deleteCustomer(id) {

    const confirmDelete = confirm("Are you sure you want to delete this customer?");

    if (confirmDelete) {

        customers = customers.filter(function (customer) {

            return customer.id !== id;

        });

        saveCustomers();

        displayCustomers();

        alert("Customer deleted successfully!");

    }

}


// Display saved customers when page loads

if (customerForm && customerTableBody) {

    displayCustomers();

}