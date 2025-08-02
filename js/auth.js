// Email Sign Up
function signUp(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
      .then((cred) => {
        // Create user document in Firestore
        return db.collection('users').doc(cred.user.uid).set({
          email: email,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      });
  }
  
  // Email Login
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }
  
  // Phone Auth
  function sendOTP(phoneNumber) {
    const appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      size: 'invisible'
    });
    return auth.signInWithPhoneNumber(phoneNumber, appVerifier);
  }
  
  // Logout
  function logout() {
    return auth.signOut();
  }
  
  // Auth State Listener
  auth.onAuthStateChanged(user => {
    if (user) {
      // User is logged in
      if (window.location.pathname === '/index.html') {
        window.location.href = '/dashboard.html';
      }
    } else {
      // User is logged out
      if (window.location.pathname !== '/index.html') {
        window.location.href = '/index.html';
      }
    }
  });