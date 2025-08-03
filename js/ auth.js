document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const authModal = document.getElementById('auth-modal');
    const authAction = document.getElementById('auth-action');
    const authForm = document.getElementById('auth-form');
    const modalTitle = document.getElementById('modal-title');
    const submitBtn = document.getElementById('submit-btn');
    const authToggle = document.getElementById('auth-toggle');
    const toggleAction = document.getElementById('toggle-action');
    const nameField = document.getElementById('name-field');
    const closeModal = document.querySelector('.close');
    const dashboardLink = document.getElementById('dashboard-link');
    
    let isLogin = true;

    // Check auth state
    auth.onAuthStateChanged(user => {
        if (user) {
            // User is signed in
            authAction.textContent = 'Sign Out';
            dashboardLink.style.display = 'block';
            updateUIForLoggedInUser(user);
        } else {
            // User is signed out
            authAction.textContent = 'Sign In';
            dashboardLink.style.display = 'none';
            updateUIForLoggedOutUser();
        }
    });

    // Toggle between login and signup
    toggleAction.addEventListener('click', function(e) {
        e.preventDefault();
        isLogin = !isLogin;
        if (isLogin) {
            modalTitle.textContent = 'Sign In';
            submitBtn.textContent = 'Sign In';
            authToggle.innerHTML = 'Don\'t have an account? <a href="#" id="toggle-action">Sign Up</a>';
            nameField.style.display = 'none';
        } else {
            modalTitle.textContent = 'Sign Up';
            submitBtn.textContent = 'Sign Up';
            authToggle.innerHTML = 'Already have an account? <a href="#" id="toggle-action">Sign In</a>';
            nameField.style.display = 'block';
        }
    });

    // Open auth modal
    authAction.addEventListener('click', function(e) {
        e.preventDefault();
        if (authAction.textContent === 'Sign Out') {
            auth.signOut().then(() => {
                console.log('User signed out');
            });
        } else {
            authModal.style.display = 'block';
        }
    });

    // Close modal
    closeModal.addEventListener('click', function() {
        authModal.style.display = 'none';
    });

    // Handle form submission
    authForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const phone = document.getElementById('phone').value;
        
        if (isLogin) {
            // Login
            auth.signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    authModal.style.display = 'none';
                    authForm.reset();
                })
                .catch((error) => {
                    alert(error.message);
                });
        } else {
            // Signup
            const name = document.getElementById('name').value;
            auth.createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Save additional user info
                    return db.collection('users').doc(userCredential.user.uid).set({
                        name: name,
                        email: email,
                        phone: phone,
                        createdAt: firebase.firestore.FieldValue.serverTimestamp()
                    });
                })
                .then(() => {
                    authModal.style.display = 'none';
                    authForm.reset();
                })
                .catch((error) => {
                    alert(error.message);
                });
        }
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === authModal) {
            authModal.style.display = 'none';
        }
    });

    function updateUIForLoggedInUser(user) {
        // Update UI elements for logged in user
        console.log('User logged in:', user.email);
    }

    function updateUIForLoggedOutUser() {
        // Update UI elements for logged out user
        console.log('User logged out');
    }
});