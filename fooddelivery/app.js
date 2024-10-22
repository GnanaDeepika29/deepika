// Food menu items
const foodMenu = {
    pizza: [
        { name: "Margherita Pizza", price: 12.99 },
        { name: "Pepperoni Pizza", price: 14.99 },
        { name: "Veggie Pizza", price: 13.99 },
    ],
    burger: [
        { name: "Classic Burger", price: 9.99 },
        { name: "Cheeseburger", price: 10.99 },
        { name: "Veggie Burger", price: 8.99 },
    ],
    sushi: [
        { name: "California Roll", price: 8.99 },
        { name: "Salmon Nigiri", price: 10.99 },
        { name: "Vegetarian Roll", price: 7.99 },
    ],
};

// Update food items based on selected restaurant
function updateFoodItems() {
    const restaurant = document.getElementById('restaurant').value;
    const foodItemSelect = document.getElementById('food-item');

    foodItemSelect.innerHTML = `<option value="">Select an item</option>`; // Reset options
    foodMenu[restaurant].forEach(item => {
        foodItemSelect.innerHTML += `<option value="${item.name}" data-price="${item.price}">${item.name} - $${item.price.toFixed(2)}</option>`;
    });
}

// Place Order Function
function placeOrder() {
    const restaurant = document.getElementById('restaurant').value;
    const foodItem = document.getElementById('food-item').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    const address = document.getElementById('address').value;
    const coupon = document.getElementById('coupon').value;

    if (!address) {
        document.getElementById('order-status').innerText = "Please enter a delivery address.";
        return;
    }

    let discount = 0;
    if (coupon === "SAVE20") {
        discount = 20;
        document.getElementById('order-status').innerText = `Coupon applied! You get ${discount}% off.`;
    }

    const itemPrice = parseFloat(document.querySelector(`#food-item option:checked`).dataset.price);
    const totalAmount = (itemPrice * quantity) * (1 - discount / 100);

    // Simulate order being placed
    const orderId = Math.floor(Math.random() * 1000) + 1;
    document.getElementById('order-status').innerText += ` Your order has been placed! Order ID: ${orderId}. Estimated delivery: 30-45 minutes.`;
    
    // Display order summary
    document.getElementById('order-summary').innerHTML = `
        <h3>Order Summary:</h3>
        <p>Restaurant: ${restaurant}</p>
        <p>Food Item: ${foodItem}</p>
        <p>Quantity: ${quantity}</p>
        <p>Total Amount: $${totalAmount.toFixed(2)}</p>
    `;

    // Show notification
    showNotification(`Order placed successfully! Order ID: ${orderId}. Total: $${totalAmount.toFixed(2)}.`);
}

// Cancel Order Function
function cancelOrder() {
    const confirmed = confirm("Are you sure you want to cancel the order?");
    if (confirmed) {
        document.getElementById('order-status').innerText = "Your order has been canceled. A refund will be processed shortly.";
        document.getElementById('order-summary').innerHTML = ""; // Clear the order summary
    }
}

// Track Order Function
function trackOrder() {
    const orderId = document.getElementById('order-id').value;

    if (!orderId) {
        document.getElementById('tracking-text').innerText = "Please enter a valid order ID.";
        return;
    }

    document.getElementById('progress').style.width = "80%";
    document.getElementById('tracking-text').innerText = `Order #${orderId} is on its way!`;
}

// Payment Submission
function submitPayment() {
    const paymentMethod = document.getElementById('payment-method').value;

    if (!paymentMethod) {
        alert("Please select a payment method.");
        return;
    }

    alert(`Payment successful with ${paymentMethod}! Thank you for your order!`);
}

// Show Notification Function
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.innerText = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 5000); // Hide notification after 5 seconds
}

// Show Restaurant Details
function showRestaurantDetails(restaurantName, deliveryTime, foodItems) {
    const itemList = foodItems.map(item => `<li>${item}</li>`).join('');
    alert(`Welcome to ${restaurantName}!\nEstimated Delivery: ${deliveryTime}\nMenu:\n${itemList}`);
}

// Smooth Scroll
document.querySelectorAll('.scroll').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Initialize food items on page load
updateFoodItems();
