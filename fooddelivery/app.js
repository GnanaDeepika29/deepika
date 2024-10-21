let cart = [];
let totalAmount = 0;
let orderPlaced = false;
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

function goToRestaurants() {
    document.getElementById('home').style.display = 'none';
    document.getElementById('restaurant').style.display = 'block';
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
    orderPlaced = true;
    document.getElementById('thank-you').style.display = 'block';
    document.getElementById('order-details').style.display = 'none';
    resetApp();
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

function trackOrder() {
    if (orderPlaced) {
        document.getElementById('thank-you').style.display = 'none';
        document.getElementById('order-tracking').style.display = 'block';
    } else {
        alert('No order placed yet.');
    }
}

function cancelOrder() {
    alert('Order has been canceled.');
    document.getElementById('order-tracking').style.display = 'none';
    goToHome();
}
