// Register form handler
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    // Store user data locally (replace with backend integration later)
    localStorage.setItem('user', JSON.stringify({name, email, password}));
    alert('Registration successful!');
});

// Login form handler
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let emailLogin = document.getElementById('emailLogin').value;
    let passwordLogin = document.getElementById('passwordLogin').value;

    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.email === emailLogin && user.password === passwordLogin) {
        alert('Login successful!');
    } else {
        alert('Incorrect email or password');
    }
});

// Sell product handler
document.getElementById('sellForm').addEventListener('submit', function(e) {
    e.preventDefault();

    let productName = document.getElementById('productName').value;
    let productPrice = document.getElementById('productPrice').value;
    let productDescription = document.getElementById('productDescription').value;
    let productImage = document.getElementById('productImage').files[0];

    let reader = new FileReader();
    reader.onloadend = function() {
        let imageSrc = reader.result;

        let product = {
            name: productName,
            price: productPrice,
            description: productDescription,
            image: imageSrc
        };

        // Store product in local storage (or backend)
        let products = JSON.parse(localStorage.getItem('products')) || [];
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));
        
        alert('Product added successfully!');
        displayProducts(); // Refresh product list
    };

    if (productImage) {
        reader.readAsDataURL(productImage);
    }
});

// Function to display available products
function displayProducts() {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    let productList = document.querySelector('.product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        let productDiv = document.createElement('div');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price}</p>
            <button onclick="openModal('${product.name}', '${product.image}', '${product.description}', '${product.price}')">View Details</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Function to open the product detail modal
function openModal(name, image, description, price) {
    document.getElementById('modalProductName').innerText = name;
    document.getElementById('modalProductImage').src = image;
    document.getElementById('modalProductDescription').innerText = description;
    document.getElementById('modalProductPrice').innerText = price;

    let modal = document.getElementById('productModal');
    modal.style.display = "block";
}

// Close the modal when the user clicks on <span> (x)
document.querySelector('.close').onclick = function() {
    document.getElementById('productModal').style.display = "none";
}

// Close the modal when the user clicks anywhere outside of the modal
window.onclick = function(event) {
    let modal = document.getElementById('productModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Function to handle buying a product
function buyProduct() {
    alert(`You bought the product!`);
    document.getElementById('productModal').style.display = "none"; // Close modal
}

// Back to Top Button functionality
window.onscroll = function() {
    let backToTopButton = document.getElementById('backToTop');
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
};

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initial call to display products on page load
displayProducts();
