// Add Product (Admin Only)
function addProduct(name, price, description, imageURL) {
    return db.collection('products').add({
      name,
      price,
      description,
      imageURL,
      stock: 100,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  }
  
  // Get All Products
  function getProducts() {
    return db.collection('products').get();
  }
  
  // Create Order
  function createOrder(userId, productId, quantity) {
    return db.collection('orders').add({
      userId,
      productId,
      quantity,
      status: 'pending',
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  }
  
  // Update Order Status (Admin)
  function updateOrderStatus(orderId, status) {
    return db.collection('orders').doc(orderId).update({ status });
  }