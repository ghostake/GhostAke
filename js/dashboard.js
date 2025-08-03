document.addEventListener('DOMContentLoaded', function() {
    const userDetails = document.getElementById('user-details');
    const ordersList = document.getElementById('orders-list');
    
    auth.onAuthStateChanged(user => {
        if (user) {
            // Load user details
            db.collection('users').doc(user.uid).get()
                .then(doc => {
                    if (doc.exists) {
                        const userData = doc.data();
                        userDetails.innerHTML = `
                            <p><strong>Name:</strong> ${userData.name || 'Not provided'}</p>
                            <p><strong>Email:</strong> ${user.email}</p>
                            <p><strong>Phone:</strong> ${userData.phone || 'Not provided'}</p>
                        `;
                    } else {
                        userDetails.innerHTML = `
                            <p><strong>Email:</strong> ${user.email}</p>
                            <p>Additional information not found in our records.</p>
                        `;
                    }
                })
                .catch(error => {
                    console.error('Error getting user details:', error);
                    userDetails.innerHTML = '<p>Error loading user details.</p>';
                });
            
            // Load user orders
            db.collection('orders').where('userId', '==', user.uid).orderBy('createdAt', 'desc').get()
                .then(querySnapshot => {
                    if (querySnapshot.empty) {
                        ordersList.innerHTML = '<p>You have no orders yet.</p>';
                        return;
                    }
                    
                    ordersList.innerHTML = '';
                    querySnapshot.forEach(doc => {
                        const order = doc.data();
                        const orderElement = document.createElement('div');
                        orderElement.className = 'order';
                        orderElement.innerHTML = `
                            <h3>Order #${doc.id}</h3>
                            <p><strong>Product:</strong> ${order.productName}</p>
                            <p><strong>Price:</strong> $${order.price.toFixed(2)}</p>
                            <p><strong>Status:</strong> ${order.status}</p>
                            <p><strong>Date:</strong> ${order.createdAt.toDate().toLocaleDateString()}</p>
                        `;
                        ordersList.appendChild(orderElement);
                    });
                })
                .catch(error => {
                    console.error('Error getting orders:', error);
                    ordersList.innerHTML = '<p>Error loading your orders.</p>';
                });
        } else {
            // User is not logged in - redirect to home
            window.location.href = 'index.html';
        }
    });
});