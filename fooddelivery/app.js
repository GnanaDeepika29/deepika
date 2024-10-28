// Sample restaurant menus with more variety
const restaurants = {
    restaurant1: {
        name: 'The Burger House',
        menu: [
            { item: 'Classic Burger', price: 10 },
            { item: 'Cheese Burger', price: 12 },
            { item: 'Veggie Burger', price: 8 },
            { item: 'Double Patty Burger', price: 15 }
        ]
    },
    restaurant2: {
        name: 'Pizza Palace',
        menu: [
            { item: 'Margherita', price: 9 },
            { item: 'Pepperoni', price: 11 },
            { item: 'BBQ Chicken', price: 13 },
            { item: 'Veggie Supreme', price: 10 }
        ]
    },
    restaurant3: {
        name: 'Sushi World',
        menu: [
            { item: 'California Roll', price: 8 },
            { item: 'Spicy Tuna Roll', price: 10 },
            { item: 'Dragon Roll', price: 12 },
            { item: 'Salmon Nigiri', price: 14 }
        ]
    },
    restaurant4: {
        name: 'Pasta Paradise',
        menu: [
            { item: 'Spaghetti Bolognese', price: 11 },
            { item: 'Fettuccine Alfredo', price: 12 },
            { item: 'Penne Arrabbiata', price: 9 },
            { item: 'Pesto Pasta', price: 10 }
        ]
    },
    restaurant5: {
        name: 'Indian Delight',
        menu: [
            { item: 'Chicken Tikka Masala', price: 14 },
            { item: 'Paneer Butter Masala', price: 12 },
            { item: 'Lamb Vindaloo', price: 15 },
            { item: 'Vegetable Korma', price: 10 }
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
        item => `<p>${item.item} - $${item.price} <button onclick="addToCart('${item.item}', ${item.price})">Add</button></p>`
    ).join('');
    document.getElementById('menuModal').style.display = 'flex';
}

function addToCart(item, price) {
    cart.push({ item, price });
    totalAmount += price;
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
    if (code === "FOODIE10") {
        discount = totalAmount * 0.10;
        alert(`Coupon Applied! You saved $${discount.toFixed(2)}`);
    } else {
        alert("Invalid coupon code");
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
    alert('Order confirmed! Thank you for ordering.');
    cart = [];
    discount = 0;
    totalAmount = 0;
    closeModal('checkoutModal');
    showNotification("Your order has been placed!");
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
    alert('Contact us at: support@foodiesexpress.com');
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
