const foodItems = {
    pizza: [
        { name: "Margherita", price: 12, img: "margherita.jpg" },
        { name: "Pepperoni", price: 14, img: "pepperoni.jpg" },
        { name: "BBQ Chicken", price: 15, img: "bbq-chicken.jpg" },
        { name: "Vegetarian", price: 10, img: "vegetarian.jpg" },
    ],
    burger: [
        { name: "Cheeseburger", price: 10, img: "cheeseburger.jpg" },
        { name: "Bacon Burger", price: 12, img: "bacon-burger.jpg" },
        { name: "Double Patty Burger", price: 14, img: "double-patty.jpg" },
    ],
    sushi: [
        { name: "California Roll", price: 15, img: "california-roll.jpg" },
        { name: "Spicy Tuna Roll", price: 18, img: "spicy-tuna-roll.jpg" },
        { name: "Dragon Roll", price: 20, img: "dragon-roll.jpg" },
    ],
    taco: [
        { name: "Beef Taco", price: 5, img: "beef-taco.jpg" },
        { name: "Chicken Taco", price: 5, img: "chicken-taco.jpg" },
    ],
    indian: [
        { name: "Butter Chicken", price: 12, img: "butter-chicken.jpg" },
        { name: "Paneer Tikka", price: 10, img: "paneer-tikka.jpg" },
        { name: "Biryani", price: 15, img: "biryani.jpg" },
    ],
    italian: [
        { name: "Spaghetti Carbonara", price: 13, img: "carbonara.jpg" },
        { name: "Fettuccine Alfredo", price: 14, img: "alfredo.jpg" },
    ],
    thai: [
        { name: "Pad Thai", price: 11, img: "pad-thai.jpg" },
        { name: "Green Curry", price: 13, img: "green-curry.jpg" },
    ],
    dessert: [
        { name: "Chocolate Cake", price: 6, img: "chocolate-cake.jpg" },
        { name: "Cheesecake", price: 7, img: "cheesecake.jpg" },
    ],
};

// Clear existing items
const foodItemsContainer = document.getElementById("food-items");
foodItemsContainer.innerHTML = "";

function openFoodModal(restaurantName, deliveryTime, restaurantId) {
    document.getElementById("restaurant-name").innerText = restaurantName;
    document.getElementById("delivery-time").innerText = deliveryTime;

    const foodSelect = document.getElementById("food-item-select");
    foodSelect.innerHTML = ""; // Clear existing options

    foodItems[restaurantId].forEach(item => {
        const option = document.createElement("option");
        option.value = item.name;
        option.innerText = `${item.name} - $${item.price}`;
        foodSelect.appendChild(option);
    });

    document.getElementById("foodModal").style.display = "block";
}

// Function to close the food modal
function closeFoodModal() {
    document.getElementById("foodModal").style.display = "none";
}

// Function to add food to the order
function placeOrder() {
    const foodSelect = document.getElementById("food-item-select");
    const selectedFood = foodSelect.value;
    const quantity = document.getElementById("quantity").value;
    const address = document.getElementById("address").value;
    const coupon = document.getElementById("coupon").value;

    const foodItem = foodItems[foodSelect.options[foodSelect.selectedIndex].dataset.restaurantId].find(item => item.name === selectedFood);
    const totalPrice = foodItem.price * quantity; // Calculate total price based on selected item and quantity

    const orderSummary = document.getElementById("order-summary");
    orderSummary.innerHTML = `<p>Your order for ${quantity} x ${selectedFood} placed! Total: $${totalPrice}</p>`;

    document.getElementById("order-status").innerText = "Thank you for your order!";
    showNotification("Order placed successfully!");
    closeOrderModal();
}

// Function to show notification
function showNotification(message) {
    const notification = document.getElementById("notification");
    notification.innerText = message;
    notification.style.display = "block";
    setTimeout(() => {
        notification.style.display = "none";
    }, 3000);
}

// Close the modal when clicking outside of it
window.onclick = function(event) {
    const foodModal = document.getElementById("foodModal");
    const orderModal = document.getElementById("orderModal");

    if (event.target == foodModal) {
        closeFoodModal();
    }
    if (event.target == orderModal) {
        closeOrderModal();
    }
}
