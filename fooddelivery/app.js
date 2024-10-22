let orderTotal = 0;

function placeOrder() {
    const restaurant = document.getElementById('restaurant').value;
    const foodItem = document.getElementById('food-item').value;
    const quantity = document.getElementById('quantity').value;
    const address = document.getElementById('address').value;
    const coupon = document.getElementById('coupon').value;

    const prices = {
        'pizza1': 12.99,
        'pizza2': 14.99,
        'burger1': 9.99,
        'sushi1': 8.99,
        'taco1': 5.99,
    };

    if (!address) {
        document.getElementById('order-status').innerText = "Please enter a delivery address.";
        return;
    }

    // Calculate total amount
    orderTotal = prices[foodItem] * quantity;

    // Apply coupon (example: 10% off)
    if (coupon === "SAVE10") {
        orderTotal *= 0.9;
    }

    const orderId = Math.floor(Math.random() * 1000) + 1;
    document.getElementById('order-status').innerText = `Your order has been placed! Order ID: ${orderId}.`;
    document.getElementById('total-amount').innerText = `Total Amount: $${orderTotal.toFixed(2)}`;
    alert(`Thank you for your order! Your total is $${orderTotal.toFixed(2)}. Your order is being processed.`);
}

function cancelOrder() {
    document.getElementById('order-status').innerText = "Your order has been canceled.";
    document.getElementById('total-amount').innerText = "";
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

function goHome() {
    document.getElementById('order-status').innerText = "";
    document.getElementById('total-amount').innerText = "";
    document.getElementById('tracking-status').innerText = "";
    document.getElementById('order-id').value = "";
    document.getElementById('address').value = "";
    document.getElementById('coupon').value = "";
    document.getElementById('quantity').value = 1;
    document.getElementById('restaurant').selectedIndex = 0;
    document.getElementById('food-item').selectedIndex = 0;
}
