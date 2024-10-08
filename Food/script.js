// Restaurant Ordering System
(function() {
    // Constants
    const CART_KEY = 'cart';
    const ERROR_MESSAGES = {
        invalidItem: "Invalid item data:",
        cartEmpty: "Your cart is empty.",
        restaurantNotFound: "Restaurant not found.",
    };

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
    };

    // Cart Management
    class Cart {
        constructor() {
            this.items = this.loadCart();
            this.updateCartCount();
        }

        loadCart() {
            try {
                const savedCart = localStorage.getItem(CART_KEY);
                return savedCart ? JSON.parse(savedCart) : [];
            } catch (error) {
                console.error("Error loading cart from localStorage:", error);
                return [];
            }
        }

        saveCart() {
            localStorage.setItem(CART_KEY, JSON.stringify(this.items));
            this.updateCartCount();
        }

        updateCartCount() {
            const cartCountElem = document.getElementById('cart-count');
            if (cartCountElem) {
                const totalItems = this.items.reduce((total, item) => total + item.quantity, 0);
                cartCountElem.innerText = totalItems > 0 ? totalItems : "0";
            }
        }

        addItem(item) {
            if (!item || isNaN(item.price) || item.price <= 0) {
                this.logError(ERROR_MESSAGES.invalidItem, item);
                return;
            }

            const existingItem = this.items.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                this.items.push({ ...item, quantity: 1 });
            }
            this.saveCart();
            this.showToast(`${item.name} added to cart!`, 'success');
        }

        removeItem(index) {
            if (index >= 0 && index < this.items.length) {
                if (this.items[index].quantity > 1) {
                    this.items[index].quantity--;
                    this.showToast(`Decreased quantity of ${this.items[index].name}.`, 'info');
                } else {
                    this.showToast(`Removed ${this.items[index].name} from cart.`, 'info');
                    this.items.splice(index, 1);
                }
                this.saveCart();
                return true;
            } else {
                this.logError("Invalid index:", index);
                return false;
            }
        }

        logError(...messages) {
            console.error(...messages);
        }

        showToast(message, type) {
            const toast = document.createElement('div');
            toast.className = `toast ${type}`;
            toast.innerText = message;

            const closeButton = document.createElement('button');
            closeButton.innerText = '×';
            closeButton.className = 'toast-close';
            closeButton.onclick = () => {
                document.body.removeChild(toast);
            };
            toast.appendChild(closeButton);

            document.body.appendChild(toast);
            setTimeout(() => {
                toast.classList.add('show');
            }, 100);

            const duration = type === 'success' ? 3000 : 2000; // Different durations for different types
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => {
                    if (document.body.contains(toast)) {
                        document.body.removeChild(toast);
                    }
                }, 300);
            }, duration);
        }
    }

    // Utility function for currency formatting
    function formatCurrency(amount) {
        return `$${amount.toFixed(2)}`;
    }

    // Utility function to create menu item HTML
    function createMenuItemHTML(item) {
        return `
            <div class="menu-item">
                <h3>${item.name}</h3>
                <p>Price: ${formatCurrency(item.price)}</p>
                <button class="add-to-cart-btn" data-item='${JSON.stringify(item)}' aria-label="Add ${item.name} to cart">Add to Cart</button>
            </div>
        `;
    }

    // Populate Home Page (index.html)
    function populateHomePage() {
        const restaurantList = document.querySelector('.restaurant-list');
        restaurantList.innerHTML = '';

        const fragment = document.createDocumentFragment();

        Object.entries(restaurants).forEach(([id, restaurant]) => {
            const div = document.createElement('div');
            div.className = 'restaurant';
            div.innerHTML = `
                <h3>${restaurant.name}</h3>
                <p>${restaurant.menu.length} items</p>
                <a href="menu.html?restaurant=${id}">View Menu</a>
            `;
            fragment.appendChild(div);
        });

        restaurantList.appendChild(fragment);
    }

    // Populate Menu Page (menu.html)
    function populateMenuPage() {
        const params = new URLSearchParams(window.location.search);
        const restaurantId = params.get('restaurant');
        const restaurant = restaurants[restaurantId];

        if (restaurant) {
            document.getElementById('restaurant-name').innerText = `${restaurant.name} - Menu`;
            const menuList = document.getElementById('menu-list');
            menuList.innerHTML = '';

            const fragment = document.createDocumentFragment();

            restaurant.menu.forEach(item => {
                fragment.append(createMenuItemHTML(item));
            });

            menuList.appendChild(fragment);
        } else {
            document.getElementById('menu-list').innerText = ERROR_MESSAGES.restaurantNotFound;
        }
    }

    // General event listener attachment function with delegation
    function attachEventListeners(selector, event, handler) {
        document.body.addEventListener(event, (e) => {
            if (e.target.matches(selector)) {
                handler(e);
            }
        });
    }

    // Add to Cart Handler
    function addToCartHandler(e) {
        const item = JSON.parse(e.target.getAttribute('data-item'));
        cart.addItem(item);
    }

    // Populate Cart Page (cart.html)
    function populateCartPage() {
        renderCart();

        const checkoutBtn = document.getElementById('checkout-btn');
        checkoutBtn.addEventListener('click', () => {
            if (cart.items.length === 0) {
                alert(ERROR_MESSAGES.cartEmpty);
            } else {
                window.location.href = 'checkout.html';
            }
        });
    }

    // Render the cart
    function renderCart() {
        const cartList = document.getElementById('cart-list');
        const totalPriceElem = document.getElementById('total-price');
        cartList.innerHTML = '';

        if (cart.items.length === 0) {
            cartList.innerText = ERROR_MESSAGES.cartEmpty;
            totalPriceElem.innerText = formatCurrency(0);
        } else {
            let total = 0;
            const fragment = document.createDocumentFragment();

            cart.items.forEach((item, index) => {
                total += item.price * item.quantity;
                const div = document.createElement('div');
                div.className = 'cart-item';
                div.innerHTML = `
                    <h3>${item.name}</h3>
                    <p>Price: ${formatCurrency(item.price)} x ${item.quantity}</p>
                    <button class="remove-btn" data-index="${index}" aria-label="Remove ${item.name} from cart">Remove</button>
                `;
                fragment.appendChild(div);
            });

            cartList.appendChild(fragment);
            totalPriceElem.innerText = formatCurrency(total);
        }

        attachEventListeners('.remove-btn', 'click', removeFromCartHandler);
    }

    // Remove from Cart Handler
    function removeFromCartHandler(e) {
        const index = e.target.getAttribute('data-index');
        if (cart.removeItem(index)) {
            renderCart();
        }
    }

    // Checkout process
    function checkout() {
        document.getElementById('checkout-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const address = document.getElementById('address').value.trim();
            const payment = document.getElementById('payment').value;

            if (!name || !address || !payment) {
                alert("Please fill in all required fields.");
                return;
            }

            // Implement actual payment processing and order submission here
            alert(`Thank you, ${name}! Your order has been placed and will be delivered to ${address}.`);

            // Clear the cart
            cart.items = [];
            cart.saveCart();

            // Redirect to home page
            window.location.href = 'index.html';
        });
    }

    // Initialize functions based on the page
    document.addEventListener("DOMContentLoaded", () => {
        window.cart = new Cart(); // Initialize cart management

        if (document.querySelector('.restaurant-list')) {
            populateHomePage();
        } else if (document.getElementById('menu-list')) {
            populateMenuPage();
        } else if (document.getElementById('cart-list')) {
            populateCartPage();
        } else if (document.getElementById('checkout-form')) {
            checkout();
        }

        // Attach event listeners for adding items to the cart
        attachEventListeners('.add-to-cart-btn', 'click', addToCartHandler);
    });
})();
