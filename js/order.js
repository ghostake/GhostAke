// Submit order
function submitOrder(userId, productName, quantity, address) {
    return db.collection('orders').add({
      userId: userId,
      product: productName,
      quantity: quantity,
      address: address,
      status: 'pending',
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  }
  
  // Update order status (admin only)
  function updateOrderStatus(orderId, status) {
    return db.collection('orders').doc(orderId).update({ status: status });
  }