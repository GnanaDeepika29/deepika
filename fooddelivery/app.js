// Sample restaurant menus with images for each item
const restaurants = {
    restaurant1: {
        name: 'The Burger House',
        menu: [
            { item: 'Classic Burger', price: 10, img: 'classic_burger.jpg' },
            { item: 'Cheese Burger', price: 12, img: 'cheese_burger.jpg' },
            { item: 'Veggie Burger', price: 8, img: 'veggie_burger.jpg' },
            { item: 'Double Patty Burger', price: 15, img: 'double_patty.jpg' }
        ]
    },
    restaurant2: {
        name: 'Pizza Palace',
        menu: [
            { item: 'Margherita', price: 9, img: 'margherita.jpg' },
            { item: 'Pepperoni', price: 11, img: 'pepperoni.jpg' },
            { item: 'BBQ Chicken', price: 13, img: 'bbq_chicken.jpg' },
            { item: 'Veggie Supreme', price: 10, img: 'veggie_supreme.jpg' }
        ]
    },
    restaurant3: {
        name: 'Sushi World',
        menu: [
            { item: 'California Roll', price: 8, img: 'california_roll.jpg' },
            { item: 'Spicy Tuna Roll', price: 10, img: 'spicy_tuna.jpg' },
            { item: 'Dragon Roll', price: 12, img: 'dragon_roll.jpg' },
            { item: 'Salmon Nigiri', price: 14, img: 'salmon_nigiri.jpg' }
        ]
    },
    restaurant4: {
        name: 'Pasta Paradise',
        menu: [
            { item: 'Spaghetti Bolognese', price: 11, img: 'spaghetti_bolognese.jpg' },
            { item: 'Fettuccine Alfredo', price: 12, img: 'fettuccine_alfredo.jpg' },
            { item: 'Penne Arrabbiata', price: 9, img: 'penne_arrabbiata.jpg' },
            { item: 'Pesto Pasta', price: 10, img: 'pesto_pasta.jpg' }
        ]
    },
    restaurant5: {
        name: 'Indian Delight',
        menu: [
            { item: 'Chicken Tikka Masala', price: 14, img: 'chicken_tikka.jpg' },
            { item: 'Paneer Butter Masala', price: 12, img: 'paneer_butter.jpg' },
            { item: 'Lamb Vindaloo', price: 15, img: 'lamb_vindaloo.jpg' },
            { item: 'Vegetable Korma', price: 10, img: 'vegetable_korma.jpg' }
        ]
    }
};

let cart = [];
let totalAmount = 0;
let discount = 0;
let orderPlaced = false;

// Open Restaurant Menu
function openRestaurant(restaurantId) {
    const restaurant = restaurants[restaurantId];
    document.getElementById('restaurantName').innerText = restaurant.name;
    document.getElementById('menuItems').innerHTML = restaurant.menu.map(
        item => `
            <div class="menu-item">
                <img src="${item.img}" alt="${item.item}" class="menu-item-img">
                <p>${item.item} - $${item.price}</p>
                <button onclick="addToCart('${item.item}', ${item.price})">Add</button>
            </div>`
    ).join('');
    document.getElementById('menuModal').style.display = 'flex';
}

function addToCart(item, price) {
    cart.push({ item, price });
    totalAmount += price;
    alert(`${item} added to cart!`);
}
function removeFromCart(item) {
    const index = cart.findIndex(cartItem => cartItem.item === item);
    if (index > -1) {
        totalAmount -= cart[index].price;
        cart.splice(index, 1);
        updateCartDisplay();
        showNotification(`${item} removed from cart.`);
    }
}

function updateCartDisplay() {
    document.getElementById('cartItems').innerHTML = cart.map(
        item => `<p>${item.item} - $${item.price} <button onclick="removeFromCart('${item.item}')">Remove</button></p>`
    ).join('');
    document.getElementById('totalAmount').innerText = `Total: $${totalAmount.toFixed(2)}`;
}

function showCart() {
    updateCartDisplay();
    document.getElementById('cartModal').style.display = 'flex';
}

function applyCoupon() {
    const code = document.getElementById('couponCode').value;
    if (code === "FOODIE10") {
        discount = totalAmount * 0.10;
        showNotification(`Coupon Applied! You saved $${discount.toFixed(2)}`);
    } else {
        showNotification("Invalid coupon code");
    }
}

function proceedToCheckout() {
    const finalAmount = totalAmount - discount;
    document.getElementById('checkoutDetails').innerHTML = `
        <p>Total: $${totalAmount.toFixed(2)}</p>
        <p>Discount: $${discount.toFixed(2)}</p>
        <p>Final Amount: $${finalAmount.toFixed(2)}</p>
        <label><input type="radio" name="payment" value="online"> Online Payment</label>
        <label><input type="radio" name="payment" value="cod"> Cash on Delivery</label>
    `;
    closeModal('cartModal');
    document.getElementById('checkoutModal').style.display = 'flex';
}

function confirmOrder() {
    orderPlaced = true;
    showNotification('Order confirmed! Thank you for ordering.');
    cart = [];
    discount = 0;
    totalAmount = 0;
    closeModal('checkoutModal');
    navigateToHome();
    document.getElementById('trackingStatus').innerText = 'Your order is being prepared...';
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.innerText = message;
    notification.style.display = 'block';
    setTimeout(() => notification.style.display = 'none', 4000);
}

function navigateToHome() {
    closeModal('menuModal');
    closeModal('cartModal');
    closeModal('checkoutModal');
}

function showCustomerService() {
    showNotification('Contact us at: support@foodiesexpress.com');
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function cancelOrder() {
    if (orderPlaced) {
        alert('Order cancelled. A refund will be issued shortly.');
        closeModal('trackingModal');
    } else {
        alert('No active order to cancel.');
    }
}
