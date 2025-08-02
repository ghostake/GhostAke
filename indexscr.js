// Firebase Configuration (using your credentials)
const firebaseConfig = {
    apiKey: "AIzaSyCcs5C_hwX4CCtNVgksKEhW8fcIw8De1hg",
    authDomain: "ruposri-1.firebaseapp.com",
    projectId: "ruposri-1",
    storageBucket: "ruposri-1.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// GitHub OAuth Config
const githubProvider = new firebase.auth.GithubAuthProvider();
githubProvider.addScope('user:email');

// DOM Elements
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const phoneAuth = document.getElementById('phone-auth');

// Tab Switching
function switchTab(tab) {
    if (tab === 'login') {
        document.querySelector('.tab:nth-child(1)').classList.add('active');
        document.querySelector('.tab:nth-child(2)').classList.remove('active');
        loginForm.classList.add('active');
        signupForm.classList.remove('active');
    } else {
        document.querySelector('.tab:nth-child(1)').classList.remove('active');
        document.querySelector('.tab:nth-child(2)').classList.add('active');
        loginForm.classList.remove('active');
        signupForm.classList.add('active');
    }
}

// Show Phone Auth
function showPhoneAuth() {
    loginForm.style.display = 'none';
    signupForm.style.display = 'none';
    phoneAuth.style.display = 'block';
}

// Back to Email Auth
function backToEmailAuth() {
    phoneAuth.style.display = 'none';
    document.getElementById('otp-section').style.display = 'none';
    loginForm.style.display = 'block';
}

// Email Login
function loginWithEmail() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const errorElement = document.getElementById('login-error');
    
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            window.location.href = "dashboard.html";
        })
        .catch((error) => {
            errorElement.textContent = error.message;
            errorElement.style.display = 'block';
        });
}

// Email Sign Up
function signUpWithEmail() {
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm').value;
    const errorElement = document.getElementById('signup-error');
    const successElement = document.getElementById('signup-success');
    
    if (password !== confirmPassword) {
        errorElement.textContent = "Passwords don't match!";
        errorElement.style.display = 'block';
        return;
    }
    
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            successElement.textContent = "Account created successfully!";
            successElement.style.display = 'block';
            errorElement.style.display = 'none';
            
            // Send verification email
            userCredential.user.sendEmailVerification();
        })
        .catch((error) => {
            errorElement.textContent = error.message;
            errorElement.style.display = 'block';
            successElement.style.display = 'none';
        });
}

// GitHub Sign In
function signInWithGitHub() {
    firebase.auth().signInWithPopup(githubProvider)
        .then(() => {
            window.location.href = "dashboard.html";
        })
        .catch((error) => {
            document.getElementById('login-error').textContent = error.message;
            document.getElementById('login-error').style.display = 'block';
        });
}

// Phone Auth Variables
let confirmationResult;

// Send OTP
function sendOTP() {
    const phoneNumber = document.getElementById('phone-number').value;
    const errorElement = document.getElementById('phone-error');
    
    // For testing, we'll use invisible reCAPTCHA
    const appVerifier = new firebase.auth.RecaptchaVerifier('phone-auth', {
        size: 'invisible',
        callback: () => verifyOTP() // Auto-submit if reCAPTCHA passes
    });
    
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((result) => {
            confirmationResult = result;
            document.getElementById('otp-section').style.display = 'block';
            errorElement.style.display = 'none';
        })
        .catch((error) => {
            errorElement.textContent = error.message;
            errorElement.style.display = 'block';
        });
}

// Verify OTP
function verifyOTP() {
    const otp = document.getElementById('otp-code').value;
    const errorElement = document.getElementById('phone-error');
    
    confirmationResult.confirm(otp)
        .then(() => {
            window.location.href = "dashboard.html";
        })
        .catch((error) => {
            errorElement.textContent = "Invalid OTP. Please try again.";
            errorElement.style.display = 'block';
        });
}

// Check if user is already logged in
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        window.location.href = "dashboard.html";
    }
});
