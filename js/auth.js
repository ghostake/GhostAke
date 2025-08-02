// Email/password sign up
function signUp(email, password) {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(cred => {
      return db.collection('users').doc(cred.user.uid).set({
        email: email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    });
}

// Email/password login
function login(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

// Auth state listener
firebase.auth().onAuthStateChanged(user => {
  if (user && window.location.pathname === '/index.html') {
    window.location.href = '/shop.html';
  }
});