const restaurants = {
    restaurant1: {
        name: 'The Burger House',
        menu: [
            { item: 'Classic Burger', price: 10 },
            { item: 'Cheese Burger', price: 12 },
            { item: 'Veggie Burger', price: 8 }
        ]
    },
    restaurant2: {
        name: 'Pizza Palace',
        menu: [
            { item: 'Margherita', price: 9 },
            { item: 'Pepperoni', price: 11 },
            { item: 'BBQ Chicken', price: 13 }
        ]
    }
};

let cart = [];
let couponApplied = false;

function openRestaurant(restaurantId) {
    const restaurant = restaurants[restaurantId];
    document.getElementById('restaurantName').innerText = restaurant.name;
    document.getElementById('menuItems').innerHTML = restaurant.menu.map(
        item => `<p>${item.item} - $${item.price} <button onclick="addToCart('${item.item}', ${item.price})">Add</button></p>`
    ).join('');
    document.getElementById('menuModal').style.display = 'flex';
}

function addToCart(item, price) {
    cart.push({ item, price });
    alert(`${item} added to cart!`);
}

function showCart() {
    document.getElementById('cartItems').innerHTML = cart.map(
        item => `<p>${item.item} - $${item.price}</p>`
    ).join('');
    document.getElementById('cartModal').style.display = 'flex';
}

function applyCoupon() {
    const code = document.getElementById('couponCode').value;
    if (code === "DISCOUNT10" && !couponApplied) {
        cart = cart.map(item => ({ ...item, price: item.price * 0.9 }));
        couponApplied = true;
        alert("Coupon applied! 10% off on your order.");
        showCart();
    } else if (couponApplied) {
        alert("Coupon already applied.");
    } else {
        alert("Invalid coupon code.");
    }
}

function proceedToCheckout() {
    const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
    document.getElementById('checkoutDetails').innerHTML = `<p>Total: $${total}</p>`;
    closeModal('cartModal');
    document.getElementById('checkoutModal').style.display = 'flex';
}

function confirmOrder() {
    alert('Order confirmed! Thank you for ordering.');
    showNotification("Order placed successfully!");
    closeModal('checkoutModal');
    cart = [];
    setTimeout(() => {
        document.getElementById('trackingModal').style.display = 'flex';
        document.getElementById('trackingStatus').innerText = 'Preparing your order...';
    }, 2000);
}

function cancelOrder() {
    alert("Order canceled. Refund issued.");
    document.getElementById('trackingStatus').innerText = 'Order canceled';
    closeModal('trackingModal');
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.innerText = message;
    notification.style.display = 'block';
    setTimeout(() => notification.style.display = 'none', 3000);
}

function navigateToHome() {
    closeModal('menuModal');
    closeModal('cartModal');
    closeModal('checkoutModal');
    closeModal('trackingModal');
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function showCustomerService() {
    alert('Contact us at: support@foodiesexpress.com');
}
