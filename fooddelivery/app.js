let cart = [];
let totalAmount = 0;
let orderPlaced = false;
let trackingInfo = '';
let couponApplied = false;

const menu = {
    'thoppi-vaipa': [
        { name: 'Dosa', price: 50 },
        { name: 'Idli', price: 30 },
        { name: 'Sambar', price: 40 }
    ],
    'alif': [
        { name: 'Shawarma', price: 120 },
        { name: 'Hummus', price: 80 },
        { name: 'Falafel', price: 70 }
    ],
    'grill-and-shake': [
        { name: 'Grilled Chicken', price: 150 },
        { name: 'Milkshake', price: 70 },
        { name: 'Veggie Burger', price: 100 }
    ]
};

// Offers (for simplicity, using hardcoded values)
const offers = [
    { code: 'SAVE10', discount: 10 },
    { code: 'FREESHIP', discount: 50 }
];

// Main Navigation Functions
function goToRestaurants() {
    toggleVisibility('home', 'restaurant');
    renderRestaurants();
}

function renderRestaurants() {
    const restaurantContainer = document.querySelector('.restaurant-container');
    restaurantContainer.innerHTML = ''; // Clear previous entries
    Object.keys(menu).forEach(restaurant => {
        restaurantContainer.innerHTML += `
            <div class="restaurant" onclick="viewMenu('${restaurant}')">
                <img src="images/${restaurant}.jpg" alt="${restaurant}">
                <h3>${restaurant.replace(/-/g, ' ')}</h3>
                <p>${menu[restaurant][0].name} & More</p>
                <div class="rating" id="rating-${restaurant}"></div>
            </div>`;
    });
}

function viewMenu(restaurant) {
    toggleVisibility('restaurant', 'menu');
    const menuItemsDiv = document.getElementById('menu-items');
    menuItemsDiv.innerHTML = ''; // Clear previous menu items
    menu[restaurant].forEach(item => {
        menuItemsDiv.innerHTML += `
            <div>
                <p>${item.name} - ₹${item.price}</p>
                <button onclick="addToCart('${item.name}', ${item.price})">Add to Cart</button>
            </div>`;
    });
}

// Visibility Toggle Function
function toggleVisibility(hideId, showId) {
    document.getElementById(hideId).classList.add('hide');
    document.getElementById(showId).classList.remove('hide');
}

// Customer Service Functions
function goToCustomerService() {
    toggleVisibility('home', 'customer-service');
}

document.getElementById('support-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from reloading the page
    handleSupportForm();
});

function handleSupportForm() {
    const name = document.getElementById('support-name').value;
    const email = document.getElementById('support-email').value;
    const message = document.getElementById('support-message').value;

    // Simple form validation
    if (name && email && message) {
        showNotification(`Thank you, ${name}! Your message has been sent. We'll get back to you at ${email}.`);
        document.getElementById('support-form').reset(); // Reset the form after submission
        goToHome();
    } else {
        showNotification('Please fill in all the fields.', true);
    }
}

// Cart Management Functions
function addToCart(itemName, itemPrice) {
    cart.push({ name: itemName, price: itemPrice });
    totalAmount += itemPrice;
    showNotification(`${itemName} has been added to your cart.`);
}

function goToCart() {
    toggleVisibility('menu', 'cart');
    renderCart();
}

function renderCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';
    cart.forEach(item => {
        cartItemsDiv.innerHTML += `<p>${item.name} - ₹${item.price}</p>`;
    });
    document.getElementById('total-amount').textContent = `Total Amount: ₹${totalAmount}`;
}

// Payment and Order Functions
function goToPayment() {
    toggleVisibility('cart', 'order-details');
}

function placeOrder(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    document.getElementById('user-name').textContent = name;
    orderPlaced = true;
    showNotification('Your order has been placed successfully!');
    toggleVisibility('order-details', 'thank-you');
    resetApp();
}

function resetApp() {
    cart = [];
    totalAmount = 0;
    couponApplied = false;
    document.getElementById('coupon-message').textContent = ''; // Reset coupon message
    toggleVisibility('thank-you', 'home');
}

// Track Order Functionality
function trackOrder() {
    if (orderPlaced) {
        toggleVisibility('thank-you', 'order-tracking');
        updateTrackingInfo(); // Call to update tracking info
    } else {
        showNotification('No order placed yet.', true);
    }
}

function updateTrackingInfo() {
    // Simulate tracking info
    trackingInfo = "Your order is on the way! Location: Main St, 123. Estimated delivery in 15 mins.";
    document.getElementById('tracking-info').textContent = trackingInfo;
}

function cancelOrder() {
    alert('Order has been canceled.');
    toggleVisibility('order-tracking', 'home');
}

// Coupon Functionality
function applyCoupon() {
    const couponCode = document.getElementById('coupon-code').value;
    const couponMessage = document.getElementById('coupon-message');

    // Check if the coupon is valid
    const offer = offers.find(offer => offer.code === couponCode.toUpperCase());
    if (offer && !couponApplied) {
        const discount = offer.discount;
        totalAmount -= discount; // Apply discount
        couponApplied = true;
        couponMessage.textContent = `Coupon applied! You saved ₹${discount}. Total amount: ₹${totalAmount}`;
    } else if (couponApplied) {
        couponMessage.textContent = "Coupon already applied.";
    } else {
        couponMessage.textContent = "Invalid coupon code.";
    }
}

// Show Notification Function
function showNotification(message, isError = false) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.className = `notification ${isError ? 'error' : ''}`;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// Call this function on page load to initialize the app
goToRestaurants();
