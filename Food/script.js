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
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    document.getElementById('cart-count')?.innerText = cart.length;
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function addToCart(item) {
    cart.push(item);
    saveCart();
    alert(`${item.name} added to cart!`);
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

    updateCartCount();
}

// Populate Menu Page (menu.html)
if (document.getElementById('menu-list')) {
    const params = new URLSearchParams(window.location.search);
    const restaurantId = params.get('restaurant');
    const restaurant = restaurants[restaurantId];

    if (restaurant) {
        document.getElementById('restaurant-name').innerText = restaurant.name + " - Menu";
        const menuList = document.getElementById('menu-list');
        menuList.innerHTML = '';

        restaurant.menu.forEach(item => {
            const div = document.createElement('div');
            div.className = 'menu-item';
            div.innerHTML = `
                <h3>${item.name}</h3>
                <p>Price: $${item.price}</p>
                <button onclick='addToCart(${JSON.stringify(item)})'>Add to Cart</button>
            `;
            menuList.appendChild(div);
        });
    } else {
        document.getElementById('menu-list').innerText = "Restaurant not found.";
    }

    updateCartCount();
}

// Populate Cart Page (cart.html)
if (document.getElementById('cart-list')) {
    const cartList = document.getElementById('cart-list');
    const totalPriceElem = document.getElementById('total-price');
    cartList.innerHTML = '';

    if (cart.length === 0) {
        cartList.innerText = "Your cart is empty.";
    } else {
        let total = 0;
        cart.forEach((item, index) => {
            total += item.price;
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <h3>${item.name}</h3>
                <p>Price: $${item.price}</p>
                <button onclick='removeFromCart(${index})'>Remove</button>
            `;
            cartList.appendChild(div);
        });
        totalPriceElem.innerText = total;
    }

    updateCartCount();

    document.getElementById('checkout-btn').addEventListener('click', () => {
        if (cart.length === 0) {
            alert("Your cart is empty.");
        } else {
            alert("Checkout successful!");
            cart = [];
            saveCart();
            cartList.innerHTML = "Your cart is empty.";
            totalPriceElem.innerText = "0";
        }
    });
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    // Reload the cart page to reflect changes
    if (window.location.pathname.endsWith('cart.html')) {
        location.reload();
    }
}