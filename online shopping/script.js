// Show registration form
document.getElementById('registerBtn').addEventListener('click', function() {
    document.getElementById('formContainer').classList.remove('hidden');
    document.getElementById('register').classList.remove('hidden');
    document.getElementById('login').classList.add('hidden');
    document.getElementById('sellProduct').classList.add('hidden');
});

// Show login form
document.getElementById('loginBtn').addEventListener('click', function() {
    document.getElementById('formContainer').classList.remove('hidden');
    document.getElementById('login').classList.remove('hidden');
    document.getElementById('register').classList.add('hidden');
    document.getElementById('sellProduct').classList.add('hidden');
});

// Show sell product form
document.getElementById('sellProductBtn').addEventListener('click', function() {
    document.getElementById('sellProduct').classList.remove('hidden');
    document.getElementById('formContainer').classList.add('hidden');
});

// Close forms
document.querySelectorAll('#closeFormBtn, #closeLoginBtn, #closeSellProductBtn').forEach(btn => {
    btn.addEventListener('click', closeForm);
});

function closeForm() {
    document.getElementById('formContainer').classList.add('hidden');
    document.getElementById('sellProduct').classList.add('hidden');
}

// Register form handler
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    // Store user data locally (replace with backend integration later)
    localStorage.setItem('user', JSON.stringify({name, email, password}));
    alert('Registration successful!');
    closeForm();
});

// Login form handler
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let emailLogin = document.getElementById('emailLogin').value;
    let passwordLogin = document.getElementById('passwordLogin').value;

    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.email === emailLogin && user.password === passwordLogin) {
        alert('Login successful!');
        closeForm();
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
        closeForm(); // Close the form after adding a product
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
            <p>Price: $${product.price}</p>
            <p>${product.description}</p>
        `;
        productList.appendChild(productDiv);
    });
}

// Initial load of products
displayProducts();
