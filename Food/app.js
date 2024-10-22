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
    document.getElementById('home').classList.add('hide');
    document.getElementById('restaurant').classList.remove('hide');
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
    document.getElementById('restaurant').classList.add('hide');
    document.getElementById('menu').classList.remove('hide');
    const menuItemsDiv = document.getElementById('menu-items');
    menuItemsDiv.innerHTML = ''; // Clear previous menu items
    menu[restaurant].forEach(item => {
        menuItemsDiv.innerHTML += `
            <div>
                <p>${item.name} - ¹${item.price}</p>
                <button onclick="addToCart('${item.name}', ${item.price})">Add to Cart</button>
            </div>`;
    });
}

function goToCustomerService() {
    document.getElementById('home').classList.add('hide');
    document.getElementById('customer-service').classList.remove('hide');
}

document.getElementById('support-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from reloading the page
    
    const name = document.getElementById('support-name').value;
    const email = document.getElementById('support-email').value;
    const message = document.getElementById('support-message').value;

    // Simple form validation (could be enhanced for better validation)
    if (name && email && message) {
        alert(`Thank you, ${name}! Your message has been sent. We'll get back to you at ${email}.`);
        document.getElementById('support-form').reset(); // Reset the form after submission
        goToHome();
    } else {
        alert('Please fill in all the fields.');
    }
});

function addToCart(itemName, itemPrice) {
    cart.push({ name: itemName, price: itemPrice });
    totalAmount += itemPrice;
    alert(`${itemName} has been added to your cart.`);
}

function goToCart() {
    document.getElementById('menu').classList.add('hide');
    document.getElementById('cart').classList.remove('hide');
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';
    cart.forEach(item => {
        cartItemsDiv.innerHTML += `<p>${item.name} - ¹${item.price}</p>`;
    });
    document.getElementById('total-amount').textContent = totalAmount;
}

function goToPayment() {
    document.getElementById('cart').classList.add('hide');
    document.getElementById('order-details').classList.remove('hide');
}

function placeOrder(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    document.getElementById('user-name').textContent = name;
    orderPlaced = true;
    document.getElementById('thank-you').classList.remove('hide');
    document.getElementById('order-details').classList.add('hide');
    resetApp();
}

function resetApp() {
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('hide');
    });
    document.getElementById('home').classList.remove('hide');
    cart = [];
    totalAmount = 0;
}

function trackOrder() {
    if (orderPlaced) {
        document.getElementById('thank-you').classList.add('hide');
        document.getElementById('order-tracking').classList.remove('hide');
    } else {
        alert('No order placed yet.');
    }
}

function cancelOrder() {
    alert('Order has been canceled.');
    document.getElementById('order-tracking').classList.add('hide');
    goToHome();
}
