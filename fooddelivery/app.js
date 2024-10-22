// Function to open the food modal and load food items
function openFoodModal(restaurantName, deliveryTime, restaurantId) {
    document.getElementById("restaurant-name").innerText = restaurantName;
    document.getElementById("delivery-time").innerText = deliveryTime;

    // Load food items based on restaurant
    const foodItems = {
        pizza: [
            { name: "Margherita Pizza", price: 10, img: "margherita.jpg" },
            { name: "Pepperoni Pizza", price: 12, img: "pepperoni.jpg" },
            { name: "BBQ Chicken Pizza", price: 14, img: "bbq-chicken.jpg" },
            { name: "Vegetarian Pizza", price: 11, img: "vegetarian.jpg" },
        ],
        burger: [
            { name: "Cheeseburger", price: 8, img: "cheeseburger.jpg" },
            { name: "Veggie Burger", price: 7, img: "veggie-burger.jpg" },
            { name: "Bacon Burger", price: 10, img: "bacon-burger.jpg" },
            { name: "Double Patty Burger", price: 12, img: "double-patty.jpg" },
        ],
        sushi: [
            { name: "California Roll", price: 15, img: "california-roll.jpg" },
            { name: "Spicy Tuna Roll", price: 18, img: "spicy-tuna-roll.jpg" },
            { name: "Dragon Roll", price: 20, img: "dragon-roll.jpg" },
            { name: "Tempura Roll", price: 17, img: "tempura-roll.jpg" },
        ],
        taco: [
            { name: "Beef Taco", price: 5, img: "beef-taco.jpg" },
            { name: "Chicken Taco", price: 5, img: "chicken-taco.jpg" },
            { name: "Veggie Taco", price: 4, img: "veggie-taco.jpg" },
            { name: "Fish Taco", price: 6, img: "fish-taco.jpg" },
        ],
        indian: [
            { name: "Butter Chicken", price: 12, img: "butter-chicken.jpg" },
            { name: "Paneer Tikka", price: 10, img: "paneer-tikka.jpg" },
            { name: "Biryani", price: 15, img: "biryani.jpg" },
            { name: "Dal Makhani", price: 9, img: "dal-makhani.jpg" },
        ],
        italian: [
            { name: "Spaghetti Carbonara", price: 13, img: "carbonara.jpg" },
            { name: "Fettuccine Alfredo", price: 14, img: "alfredo.jpg" },
            { name: "Lasagna", price: 15, img: "lasagna.jpg" },
            { name: "Penne Arrabbiata", price: 12, img: "penne.jpg" },
        ],
        thai: [
            { name: "Pad Thai", price: 11, img: "pad-thai.jpg" },
            { name: "Green Curry", price: 13, img: "green-curry.jpg" },
            { name: "Tom Yum Soup", price: 10, img: "tom-yum.jpg" },
            { name: "Thai Spring Rolls", price: 8, img: "spring-rolls.jpg" },
        ],
        dessert: [
            { name: "Chocolate Cake", price: 6, img: "chocolate-cake.jpg" },
            { name: "Cheesecake", price: 7, img: "cheesecake.jpg" },
            { name: "Ice Cream Sundae", price: 5, img: "ice-cream.jpg" },
            { name: "Fruit Tart", price: 8, img: "fruit-tart.jpg" },
        ],
    };

    // Clear existing items
    const foodItemsContainer = document.getElementById("food-items");
    foodItemsContainer.innerHTML = "";

    foodItems[restaurantId].forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("food-item");

        itemDiv.innerHTML = `
            <img src="${item.img}" alt="${item.name}" class="food-img">
            <h4>${item.name}</h4>
            <p>Price: $${item.price}</p>
            <button onclick="addToOrder('${item.name}', ${item.price})">Add to Order</button>
        `;
        
        foodItemsContainer.appendChild(itemDiv);
    });

    document.getElementById("foodModal").style.display = "block";
}

// Function to close the food modal
function closeFoodModal() {
    document.getElementById("foodModal").style.display = "none";
}

// Function to add food to the order
function addToOrder(name, price) {
    const orderSummary = document.getElementById("order-summary");
    orderSummary.innerHTML += `<p>${name}: $${price}</p>`;
    openOrderModal();
}

// Function to open the order modal
function openOrderModal() {
    document.getElementById("orderModal").style.display = "block";
}

// Function to close the order modal
function closeOrderModal() {
    document.getElementById("orderModal").style.display = "none";
}

// Function to place the order
function placeOrder() {
    const quantity = document.getElementById("quantity").value;
    const address = document.getElementById("address").value;
    const coupon = document.getElementById("coupon").value;

    const orderSummary = document.getElementById("order-summary");
    const totalPrice = quantity * 10; // Assume $10 for each food item (you can modify based on selected item)
    orderSummary.innerHTML += `<p>Order placed! Total: $${totalPrice}</p>`;

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
