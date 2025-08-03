document.addEventListener('DOMContentLoaded', function() {
    const productsContainer = document.getElementById('products-container');
    
    // Sample products data (in a real app, you'd fetch this from Firestore)
    const products = [
        { id: 1, name: 'Product 1', price: 19.99, description: 'This is product 1', image: 'https://via.placeholder.com/150' },
        { id: 2, name: 'Product 2', price: 29.99, description: 'This is product 2', image: 'https://via.placeholder.com/150' },
        { id: 3, name: 'Product 3', price: 39.99, description: 'This is product 3', image: 'https://via.placeholder.com/150' },
        { id: 4, name: 'Product 4', price: 49.99, description: 'This is product 4', image: 'https://via.placeholder.com/150' }
    ];
    
    // Display products
    function displayProducts() {
        productsContainer.innerHTML = '';
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'product';
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <p>${product.description}</p>
                <button class="buy-btn" data-id="${product.id}">Buy Now</button>
            `;
            productsContainer.appendChild(productElement);
        });
        
        // Add event listeners to buy buttons
        document.querySelectorAll('.buy-btn').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                const product = products.find(p => p.id === productId);
                handlePurchase(product);
            });
        });
    }
    
    // Handle purchase
    function handlePurchase(product) {
        auth.onAuthStateChanged(user => {
            if (user) {
                // User is logged in - process order
                const order = {
                    productId: product.id,
                    productName: product.name,
                    price: product.price,
                    userId: user.uid,
                    userEmail: user.email,
                    status: 'pending',
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                };
                
                db.collection('orders').add(order)
                    .then(docRef => {
                        alert(`Order placed for ${product.name}! Order ID: ${docRef.id}`);
                    })
                    .catch(error => {
                        console.error('Error placing order:', error);
                        alert('There was an error placing your order. Please try again.');
                    });
            } else {
                // User is not logged in - show auth modal
                alert('Please sign in to make a purchase');
                document.getElementById('auth-modal').style.display = 'block';
            }
        });
    }
    
    // Initialize
    displayProducts();
});