// Place Order Function
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

    let discount = 0;
    if (coupon === "SAVE20") {
        discount = 20;
        document.getElementById('order-status').innerText = `Coupon applied! You get ${discount}% off.`;
    }

    // Simulate order being placed
    const orderId = Math.floor(Math.random() * 1000) + 1;
    document.getElementById('order-status').innerText += ` Your order has been placed! Order ID: ${orderId}. Estimated delivery: 30-45 minutes.`;
}

// Cancel Order Function
function cancelOrder() {
    const confirmed = confirm("Are you sure you want to cancel the order?");
    if (confirmed) {
        document.getElementById('order-status').innerText = "Your order has been canceled. A refund will be processed shortly.";
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

// Smooth Scroll
document.querySelectorAll('.scroll').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
