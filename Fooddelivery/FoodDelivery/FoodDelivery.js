let cart = {};
let totalPrice = 0;

// Sample menus for each restaurant
const menus = {
    "Pizza Place": [
        { name: "Margherita Pizza", price: 120, img: "images/pizza1.jpg" },
        { name: "Pepperoni Pizza", price: 150, img: "images/pizza2.jpg" },
        { name: "Vegetable Pizza", price: 100, img: "images/pizza3.jpg" }
    ],
    "Burger Joint": [
        { name: "Cheeseburger", price: 100, img: "images/burger1.jpg" },
        { name: "Veggie Burger", price: 80, img: "images/burger2.jpg" },
        { name: "Bacon Burger", price: 120, img: "images/burger3.jpg" }
    ],
    "Pasta House": [
        { name: "Spaghetti Bolognese", price: 140, img: "images/pasta1.jpg" },
        { name: "Penne Alfredo", price: 120, img: "images/pasta2.jpg" },
        { name: "Fettuccine Carbonara", price: 130, img: "images/pasta3.jpg" }
    ]
};

function loadMenu() {
    const restaurant = document.getElementById('restaurantSelect').value;
    const menuDiv = document.getElementById('menu');
    menuDiv.innerHTML = '';

    if (restaurant) {
        menus[restaurant].forEach(item => {
            const menuItemDiv = document.createElement('div');
            menuItemDiv.className = 'menu-item';
            menuItemDiv.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>₹${item.price}</p>
                <button onclick="addToCart('${item.name}', ${item.price})">Add to Cart</button>
            `;
            menuDiv.appendChild(menuItemDiv);
        });
    }
}

function addToCart(dishName, price) {
    if (cart[dishName]) {
        cart[dishName].quantity++;
    } else {
        cart[dishName] = { price, quantity: 1 };
    }
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    totalPrice = 0;

    for (let dishName in cart) {
        const item = cart[dishName];
        const li = document.createElement('li');
        li.textContent = ${dishName} - ${item.quantity} x ₹${item.price};
        cartItems.appendChild(li);
        totalPrice += item.price * item.quantity;
    }

    document.getElementById('totalPrice').textContent = totalPrice;
}

function checkout() {
    if (Object.keys(cart).length > 0) {
        // Hide the cart and show order confirmation
        document.getElementById('cart').style.display = 'none';
        document.getElementById('orderConfirmation').style.display = 'block';
    } else {
        alert('Your cart is empty!');
    }
}

function confirmOrder() {
    alert('Your order has been confirmed!');
    // Reset the cart and go back to initial state
    cart = {};
    updateCart();
    document.getElementById('cart').style.display = 'block';
    document.getElementById('orderConfirmation').style.display = 'none';
}