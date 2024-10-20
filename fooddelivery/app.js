let cart = [];
let totalAmount = 0;
let menu = {
    'thoppi-vaipa': [
        { name: "Dosa", price: 50, img: "images/dosa.jpg" },
        { name: "Idli", price: 40, img: "images/idli.jpg" },
    ],
    'alif': [
        { name: "Shawarma", price: 100, img: "images/shawarma.jpg" },
        { name: "Mandi", price: 200, img: "images/mandi.jpg" },
    ],
    'grill-and-shake': [
        { name: "Grilled Chicken", price: 150, img: "images/grilled-chicken.jpg" },
        { name: "Milkshake", price: 80, img: "images/milkshake.jpg"},
    ]
};

function goToRestaurants() {
    document.getElementById('home').style.display = 'none';
    document.getElementById('restaurant').style.display = 'block';
}

function viewMenu(restaurant) {
    document.getElementById('restaurant').style.display = 'none';
    document.getElementById('menu').style.display = 'block';
    let menuItems = document.getElementById('menu-items');
    menuItems.innerHTML = '';

    menu[restaurant].forEach((item) => {
        menuItems.innerHTML += `
            <div>
                <img src="${item.img}" alt="${item.name}" style="width:100px;height:100px;">
                <p>${item.name} - ₹${item.price}</p>
                <button onclick="addToCart('${item.name}', ${item.price})">Add to Cart</button>
            </div>
        `;
    });
}

function addToCart(itemName, itemPrice) {
    cart.push({ name: itemName, price: itemPrice });
    totalAmount += itemPrice;
    updateCart();
}

function updateCart() {
    let cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach((item) => {
        cartItems.innerHTML += `<p>${item.name} - ₹${item.price}</p>`;
    });
    document.getElementById('total-amount').textContent = totalAmount;
}

function goToCart() {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('cart').style.display = 'block';
}

function goToPayment() {
    document.getElementById('cart').style.display = 'none';
    document.getElementById('order-details').style.display = 'block';
}

function nextStep(step) {
    document.getElementById(`step-${step}`).style.display = 'none';
    document.getElementById(`step-${step + 1}`).style.display = 'block';
}

document.getElementById('order-form').addEventListener('submit', function(e) {
    e.preventDefault();
    let name = document.getElementById('name').value;
    document.getElementById('user-name').textContent = name;

    document.getElementById('order-details').style.display = 'none';
    document.getElementById('thank-you').style.display = 'block';

    cart = [];
    totalAmount = 0;
    document.getElementById('cart-items').innerHTML = '';
    document.getElementById('total-amount').textContent = 0;
});

let cart = [];
let totalAmount = 0;
const menu = {
    'thoppi-vaipa': [
        { name: 'Dosa', price: 50 },
        { name: 'Idli', price: 30 }
    ],
    'alif': [
        { name: 'Shawarma', price: 120 },
        { name: 'Hummus', price: 80 }
    ],
    'grill-and-shake': [
        { name: 'Grilled Chicken', price: 150 },
        { name: 'Milkshake', price: 70 }
    ]
};

function goToRestaurants() {
    document.getElementById('home').style.display = 'none';
    document.getElementById('restaurant').style.display = 'block';
}

function goToHome() {
    resetApp();
    document.getElementById('home').style.display = 'block';
}

function viewMenu(restaurant) {
    document.getElementById('restaurant').style.display = 'none';
    document.getElementById('menu').style.display = 'block';
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

function addToCart(itemName, itemPrice) {
    cart.push({ name: itemName, price: itemPrice });
    totalAmount += itemPrice;
    alert(`${itemName} has been added to your cart.`);
}

function goToCart() {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('cart').style.display = 'block';
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';
    cart.forEach(item => {
        cartItemsDiv.innerHTML += `<p>${item.name} - ₹${item.price}</p>`;
    });
    document.getElementById('total-amount').textContent = totalAmount;
}

function goToMenu() {
    document.getElementById('cart').style.display = 'none';
    document.getElementById('menu').style.display = 'block';
}

function goToPayment() {
    document.getElementById('cart').style.display = 'none';
    document.getElementById('order-details').style.display = 'block';
}

function nextStep(step) {
    document.getElementById(`step-${step}`).style.display = 'none';
    document.getElementById(`step-${step + 1}`).style.display = 'block';
}

function placeOrder(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    document.getElementById('user-name').textContent = name;
    alert(`Order placed by ${name}!`);
    resetApp();
    document.getElementById('thank-you').style.display = 'block';
}

function resetApp() {
    document.getElementById('home').style.display = 'none';
    document.getElementById('restaurant').style.display = 'none';
    document.getElementById('menu').style.display = 'none';
    document.getElementById('cart').style.display = 'none';
    document.getElementById('order-details').style.display = 'none';
    document.getElementById('thank-you').style.display = 'none';
    cart = [];
    totalAmount = 0;
}

document.getElementById('order-form').addEventListener('submit', placeOrder);

// Star Rating System
document.querySelectorAll('.restaurant').forEach(restaurant => {
    const restaurantId = restaurant.querySelector('h3').textContent.toLowerCase().replace(/ /g, '-');
    const ratingDiv = document.getElementById(`rating-${restaurantId}`);
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('span');
        star.className = 'star';
        star.innerHTML = '&#9733;'; // Unicode star character
        star.onclick = () => rateRestaurant(restaurantId, i);
        ratingDiv.appendChild(star);
    }
});

function rateRestaurant(restaurantId, rating) {
    alert(`You rated ${restaurantId.replace(/-/g, ' ')} with ${rating} stars!`);
}
