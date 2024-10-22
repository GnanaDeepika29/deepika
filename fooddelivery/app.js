let currentOrderId = null;

function showSection(sectionId) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('hidden');
        if (section.id === sectionId) {
            section.classList.remove('hidden');
        }
    });
}

function placeOrder() {
    const restaurant = document.getElementById('restaurant').value;
    const foodItem = document.getElementById('food-item').value;
    const quantity = document.getElementById('quantity').value;
    const address = document.getElementById('address').value;
    const coupon = document.getElementById('coupon').value;

    if (!address) {
        document.getElementById('order-status').innerText = "Please enter a delivery address.";
        return;
    }

    const totalPrice = calculateTotal(foodItem, quantity);
    currentOrderId = Math.floor(Math.random() * 1000) + 1; // Simulating order ID
    document.getElementById('order-status').innerText = `Your order has been placed! Order ID: ${currentOrderId}. Total Amount: $${totalPrice}.`;

    // Display notification
    alert("Thank you for your order! A confirmation email will be sent shortly.");
}

function cancelOrder() {
    if (currentOrderId) {
        document.getElementById('order-status').innerText = `Order ID: ${currentOrderId} has been canceled.`;
        currentOrderId = null;
    } else {
        document.getElementById('order-status').innerText = "No active order to cancel.";
    }
}

function calculateTotal(foodItem, quantity) {
    const prices = {
        pizza1: 12.99,
        pizza2: 14.99,
        burger1: 9.99,
        sushi1: 8.99,
    };
    return (prices[foodItem] || 0) * quantity;
}

function trackOrder() {
    const orderId = document.getElementById('order-id').value;

    if (!orderId) {
        document.getElementById('tracking-status').innerText = "Please enter a valid order ID.";
        return;
    }

    // Simulate tracking status
    document.getElementById('tracking-status').innerText = `Order #${orderId} is out for delivery.`;
}
