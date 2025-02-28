document.addEventListener('DOMContentLoaded', function() {
    // Theme toggling
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');

    function toggleTheme() {
        const body = document.documentElement;
        const isDark = body.getAttribute('data-theme') !== 'light';

        body.setAttribute('data-theme', isDark ? 'light' : 'dark');
        themeIcon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';

        localStorage.setItem('theme', isDark ? 'light' : 'dark');
    }

    // Set initial theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeIcon.className = savedTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';

    themeToggle.addEventListener('click', toggleTheme);

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-progress');

    function animateSkillBars() {
        skillBars.forEach(bar => {
            const percentage = bar.parentElement.previousElementSibling.lastElementChild.textContent;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = percentage;
            }, 200);
        });
    }

    // Run animation when skills section is in view
    const skillsSection = document.querySelector('.skills-container');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                }
            });
        });

        observer.observe(skillsSection);
    }

    // Custom cursor effect
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
        });// Theme toggle functionality
        document.addEventListener('DOMContentLoaded', function() {
            const themeToggle = document.getElementById('theme-toggle');
            const iconElement = themeToggle.querySelector('i');
            
            // Check if user previously set a theme preference
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                document.body.setAttribute('data-theme', savedTheme);
                updateIcon(savedTheme === 'light');
            }
            
            // Toggle theme when clicked
            themeToggle.addEventListener('click', function() {
                const currentTheme = document.body.getAttribute('data-theme');
                const newTheme = currentTheme === 'light' ? '' : 'light';
                
                document.body.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                
                updateIcon(newTheme === 'light');
            });
            
            function updateIcon(isLight) {
                if (isLight) {
                    iconElement.classList.remove('fa-sun');
                    iconElement.classList.add('fa-moon');
                } else {
                    iconElement.classList.remove('fa-moon');
                    iconElement.classList.add('fa-sun');
                }
            }
            
            // Add active class to current page in navigation
            const currentPage = window.location.pathname.split('/').pop();
            const navLinks = document.querySelectorAll('.nav-link');
            
            navLinks.forEach(link => {
                const linkHref = link.getAttribute('href').split('/').pop();
                if (linkHref === currentPage || 
                    (currentPage === '' && linkHref === 'index.html') || 
                    (currentPage === 'index.html' && linkHref === 'index.html')) {
                    link.classList.add('active');
                }
            });
            
            // Add smooth scroll behavior for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    document.querySelector(targetId).scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            });
            
            // Add animation to skill bars (if on skills page)
            const skillBars = document.querySelectorAll('.skill-progress');
            if (skillBars.length > 0) {
                // Use IntersectionObserver to animate when scrolled into view
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.style.width = entry.target.style.width;
                            entry.target.style.transition = 'width 1s ease-in-out';
                            observer.unobserve(entry.target);
                        }
                    });
                });
                
                skillBars.forEach(bar => {
                    // Initially set width to 0
                    const targetWidth = bar.style.width;
                    bar.style.width = '0';
                    
                    // Then observe
                    setTimeout(() => {
                        observer.observe(bar);
                    }, 100);
                });
            }
        });
    });
});
