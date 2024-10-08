// Sample Data
const restaurants = {
    1: {
        name: "Pizza Palace",
        menu: [
            { id: 101, name: "Margherita Pizza", price: 12 },
            { id: 102, name: "Pepperoni Pizza", price: 15 },
            { id: 103, name: "BBQ Chicken Pizza", price: 18 }
        ]
    },
    2: {
        name: "Sushi World",
        menu: [
            { id: 201, name: "California Roll", price: 10 },
            { id: 202, name: "Spicy Tuna Roll", price: 12 },
            { id: 203, name: "Salmon Sashimi", price: 15 }
        ]
    }
    // Add more restaurants and menus as needed
};

// Cart Management
let cart = [];

function loadCart() {
    try {
        cart = JSON.parse(localStorage.getItem('cart')) || [];
    } catch (error) {
        console.error("Error loading cart from localStorage:", error);
        cart = [];
    }
}

function updateCartCount() {
    const cartCountElem = document.getElementById('cart-count');
    if (cartCountElem) {
        cartCountElem.innerText = cart.length;
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function addToCart(item) {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    saveCart();
    showToast(`${item.name} added to cart!`);
}

function removeFromCart(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1);
    }
    saveCart();
    renderCart();
}

function showToast(message) {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = message;
    document.body.appendChild(toast);

    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Populate Home Page (index.html)
if (document.querySelector('.restaurant-list')) {
    const restaurantList = document.querySelector('.restaurant-list');
    restaurantList.innerHTML = '';

    for (let id in restaurants) {
        const restaurant = restaurants[id];
        const div = document.createElement('div');
        div.className = 'restaurant';
        div.innerHTML = `
            <h3>${restaurant.name}</h3>
            <p>${restaurant.menu.length} items</p>
            <a href="menu.html?restaurant=${id}">View Menu</a>
        `;
        restaurantList.appendChild(div);
    }

    loadCart();
    updateCartCount();
}

// Populate Menu Page (menu.html)
if (document.getElementById('menu-list')) {
    const params = new URLSearchParams(window.location.search);
    const restaurantId = params.get('restaurant');
    const restaurant = restaurants[restaurantId];

    if (restaurant) {
        document.getElementById('restaurant-name').innerText = `${restaurant.name} - Menu`;
        const menuList = document.getElementById('menu-list');
        menuList.innerHTML = '';

        restaurant.menu.forEach(item => {
            const div = document.createElement('div');
            div.className = 'menu-item';
            div.innerHTML = `
                <h3>${item.name}</h3>
                <p>Price: $${item.price}</p>
                <button class="add-to-cart-btn" data-item='${JSON.stringify(item)}'>Add to Cart</button>
            `;
            menuList.appendChild(div);
        });

        attachAddToCartEventListeners();
    } else {
        document.getElementById('menu-list').innerText = "Restaurant not found.";
    }

    loadCart();
    updateCartCount();
}

function attachAddToCartEventListeners() {
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const item = JSON.parse(e.target.getAttribute('data-item'));
            addToCart(item);
        });
    });
}

// Populate Cart Page (cart.html)
if (document.getElementById('cart-list')) {
    loadCart();
    renderCart();

    document.getElementById('checkout-btn').addEventListener('click', () => {
        if (cart.length === 0) {
            alert("Your cart is empty.");
        } else {
            // Redirect to checkout page
            window.location.href = 'checkout.html';
        }
    });
}

if (document.getElementById('checkout-form')) {
    document.getElementById('checkout-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const address = document.getElementById('address').value.trim();
        const payment = document.getElementById('payment').value;

        if (name === "" || address === "") {
            alert("Please fill in all required fields.");
            return;
        }

        // Implement actual payment processing and order submission here

        alert(`Thank you, ${name}! Your order has been placed and will be delivered to ${address}.`);

        // Clear the cart
        cart = [];
        saveCart();

        // Redirect to home page
        window.location.href = 'index.html';
    });
}

function renderCart() {
    const cartList = document.getElementById('cart-list');
    const totalPriceElem = document.getElementById('total-price');
    cartList.innerHTML = '';

    if (cart.length === 0) {
        cartList.innerText = "Your cart is empty.";
    } else {
        let total = 0;
        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <h3>${item.name}</h3>
                <p>Price: $${item.price} x ${item.quantity}</p>
                <button class="remove-btn" data-index="${index}">Remove</button>
            `;
            cartList.appendChild(div);
        });
        totalPriceElem.innerText = total.toFixed(2);
    }

    updateCartCount();
    attachRemoveEventListeners();
}

function attachRemoveEventListeners() {
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            removeFromCart(index);
        });
    });
}
