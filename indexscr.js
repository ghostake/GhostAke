
        // Mobile Navigation Toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const mobileNav = document.querySelector('.mobile-nav');
        const closeMobileMenu = document.querySelector('.close-mobile-menu');
        const overlay = document.querySelector('.overlay');
        
        mobileMenuBtn.addEventListener('click', () => {
            mobileNav.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        closeMobileMenu.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        overlay.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        // Header Scroll Effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                document.querySelector('header').style.padding = '0.5rem 2rem';
                document.querySelector('header').style.background = 'rgba(22, 33, 62, 0.95)';
            } else {
                document.querySelector('header').style.padding = '1rem 2rem';
                document.querySelector('header').style.background = 'var(--darkblue)';
            }
        });
        
        // Login Button Animation
        const loginBtns = document.querySelectorAll('.login-btn, .mobile-login-btn');
        
        loginBtns.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'translateY(-2px)';
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translateY(0)';
            });
        });
        <button onclick="window.location.href='login.html'" class="button">Login</button>


// Alternatively, you can add an event listener
document.querySelector('.button').addEventListener('click', function() {
    window.location.href = 'login.html';
});
