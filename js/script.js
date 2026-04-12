document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Sleek Mobile Sidebar Navigation Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navOverlay = document.querySelector('.nav-overlay');
    const navLinks = document.querySelectorAll('.nav-menu a');

    function toggleSidebar() {
        if (!navMenu || !navOverlay || !mobileToggle) return;
        
        navMenu.classList.toggle('active');
        navOverlay.classList.toggle('active');
        const isExpanded = navMenu.classList.contains('active');
        mobileToggle.setAttribute('aria-expanded', isExpanded);
        
        // Change icon with animation
        const icon = mobileToggle.querySelector('i');
        if (icon) {
            icon.style.transform = 'rotate(90deg)';
            icon.style.opacity = '0';
            setTimeout(() => {
                if(isExpanded) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                icon.style.transform = 'rotate(0deg)';
                icon.style.opacity = '1';
            }, 150);
        }
    }

    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleSidebar);
    }
    
    if (navOverlay) {
        navOverlay.addEventListener('click', toggleSidebar);
    }

    // Close menu when clicking a link
    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu && navMenu.classList.contains('active')) {
                    toggleSidebar();
                }
            });
        });
    }
    // 2. Header Scroll Effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Hero Animations on Load
    const heroElements = document.querySelectorAll('.slide-up');
    setTimeout(() => {
        heroElements.forEach(el => el.classList.add('visible'));
    }, 100);

    // 4. Scroll Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target); 
            }
        });
    };

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 5. Form Submission (Prevent Default for Demo)
    const consultationForm = document.getElementById('consultationForm');
    if(consultationForm) {
        consultationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('تم استلام طلبك بنجاح! سنتواصل معك في أقرب وقت.');
            consultationForm.reset();
        });
    }
    // 6. Theme Toggle Logic
    const themeToggleBtn = document.getElementById('themeToggle');
    
    // Default theme check
    const currentTheme = localStorage.getItem('theme') || 'light';
    if(currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            if (theme === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
        });
    }
});
