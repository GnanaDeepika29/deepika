// Show and hide forms
document.getElementById('registerBtn').addEventListener('click', function() {
    document.getElementById('formContainer').classList.remove('hidden');
    document.getElementById('register').classList.remove('hidden');
    document.getElementById('login').classList.add('hidden');
});

document.getElementById('loginBtn').addEventListener('click', function() {
    document.getElementById('formContainer').classList.remove('hidden');
    document.getElementById('login').classList.remove('hidden');
    document.getElementById('register').classList.add('hidden');
});

document.getElementById('sellProductBtn').addEventListener('click', function() {
    document.getElementById('sellProduct').scrollIntoView({ behavior: 'smooth' });
});

// Close form button handler
document.querySelectorAll('#closeFormBtn').forEach(button => {
    button.addEventListener('click', closeForm);
});

function closeForm() {
    document.getElementById('formContainer').classList.add('hidden');
}

// Register form handler
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    localStorage.setItem('user', JSON.stringify({ name, email, password }));
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

        let products = JSON.parse(localStorage.getItem('products')) || [];
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));
        
        alert('Product added successfully!');
        displayProducts();
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
        productDiv.className = 'product-card'; // Add class for styling
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>₹${product.price}</p>
            <p>${product.description}</p>
            <button onclick="buyProduct('${product.name}')">Buy</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Function to handle buying a product
function buyProduct(productName) {
    alert(`You bought ${productName}!`);
}

// Initial call to display products on page load
displayProducts();
