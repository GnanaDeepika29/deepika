let cart = [];
let totalAmount = 0;
let orderPlaced = false;
let couponApplied = false;

const menu = {
    'thoppi-vappa': [
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
    const address = document.getElementById('address').value;
    
    document.getElementById('user-name').textContent = name;
    document.getElementById('delivery-address').textContent = address;

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

// Show Notification Function
function showNotification(message, isError = false) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.className = `notification ${isError ? 'error' : ''}`;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// Initial Call to Load Restaurants
goToRestaurants();
