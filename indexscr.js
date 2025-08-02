// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li');

hamburger.addEventListener('click', () => {
    // Toggle Nav
    navLinks.classList.toggle('nav-active');
    
    // Animate Links
    navItems.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Hamburger Animation
    hamburger.classList.toggle('toggle');
});

// Button Ripple Effect
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove any existing ripple
        const existingRipple = this.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }
        
        // Create ripple 
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        // Position ripple 
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        this.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 1000);
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
                hamburger.classList.remove('toggle');
                navItems.forEach(link => {
                    link.style.animation = '';
                });
            }
        }
    });
});

// Firebase Config (replace with your actual config)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    // ... other config
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Auth Providers
  const githubProvider = new firebase.auth.GithubAuthProvider();
  githubProvider.addScope('user:email');
  
  // GitHub Sign-In
  document.getElementById('githubSignIn').addEventListener('click', () => {
    firebase.auth().signInWithPopup(githubProvider)
      .then((result) => {
        const user = result.user;
        console.log('GitHub User:', user);
        alert(`Welcome, ${user.displayName || 'GitHub User'}!`);
      })
      .catch((error) => {
        alert(`Error: ${error.message}`);
      });
  });
  
  // Track Auth State
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log('User logged in:', user);
      // Update UI (e.g., show profile picture)
      document.getElementById('userAvatar').src = user.photoURL;
    } else {
      console.log('User logged out');
    }
  });