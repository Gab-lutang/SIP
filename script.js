// Modern JavaScript with ES6+ features
document.addEventListener('DOMContentLoaded', () => {
    // Handle logo loading animation
    const logoLoading = document.querySelector('.logo-loading');
    
    // Hide loading screen after content is loaded
    setTimeout(() => {
        logoLoading.classList.add('fade-out');
        setTimeout(() => {
            logoLoading.style.display = 'none';
        }, 500);
    }, 2500); // Adjust time as needed

    // Initialize AOS animations
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });

    // Navbar scroll behavior
    const navbar = document.querySelector('.navbar');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.setAttribute('data-sticky', 'true');
        } else {
            navbar.setAttribute('data-sticky', 'false');
        }
    };
    window.addEventListener('scroll', handleScroll);

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                mobileMenuBtn?.classList.remove('active');
                navLinks?.classList.remove('active');
            }
        });
    });

    // Animate statistics on scroll
    const animateStats = () => {
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const value = parseInt(stat.dataset.value) || 0;
            const duration = 2000;
            const start = 0;
            const increment = value / (duration / 16);
            let current = start;

            const updateValue = () => {
                current += increment;
                if (current < value) {
                    stat.textContent = Math.round(current).toLocaleString();
                    requestAnimationFrame(updateValue);
                } else {
                    stat.textContent = value.toLocaleString();
                }
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateValue();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(stat);
        });
    };
    animateStats();

    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    const heroShape = document.querySelector('.hero-shape');
    
    if (heroSection && heroShape) {
        window.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth - 0.5) * 20;
            const y = (clientY / window.innerHeight - 0.5) * 20;
            
            heroShape.style.transform = `translate(${x}px, ${y}px)`;
        });
    }

    // Download button interaction
    const downloadBtn = document.querySelector('.btn-primary');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            const btn = e.currentTarget;
            btn.style.pointerEvents = 'none';
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
            
            try {
                // Simulate download delay
                await new Promise(resolve => setTimeout(resolve, 1500));
                btn.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
                btn.style.backgroundColor = 'var(--success)';
                btn.style.color = 'white';
            } catch (error) {
                btn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Try Again';
                btn.style.backgroundColor = 'var(--danger)';
                btn.style.color = 'white';
            } finally {
                setTimeout(() => {
                    btn.style.pointerEvents = '';
                    btn.innerHTML = '<i class="fas fa-download"></i> Download Now';
                    btn.style.backgroundColor = '';
                    btn.style.color = '';
                }, 3000);
            }
        });
    }

    // Simple Statistics Display
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const value = stat.dataset.value;
        if (value) {
            stat.textContent = value;
        }
    });

    // Dashboard Tabs
    const initDashboardTabs = () => {
        const tabs = document.querySelectorAll('.tab-btn');
        const contents = document.querySelectorAll('.tab-content');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const target = tab.dataset.tab;

                // Update active states
                tabs.forEach(t => t.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));

                tab.classList.add('active');
                document.getElementById(target).classList.add('active');

                // Initialize charts if needed
                if (target === 'threats') {
                    initThreatChart();
                }
            });
        });
    };

    // Initialize Threat Analysis Chart
    const initThreatChart = () => {
        const ctx = document.getElementById('threatChart');
        if (ctx && typeof Chart !== 'undefined') {
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['High Priority', 'Medium Priority', 'Low Priority'],
                    datasets: [{
                        data: [0, 2, 5],
                        backgroundColor: [
                            '#e74c3c',
                            '#f39c12',
                            '#2ecc71'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    cutout: '70%',
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        }
    };

    // FAQ Accordion
    const initFAQ = () => {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items
                faqItems.forEach(i => i.classList.remove('active'));
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    };

    // Contact Form Handling
    const initContactForm = () => {
        const form = document.querySelector('.contact-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Add loading state
                const submitBtn = form.querySelector('.submit-btn');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;

                // Simulate form submission
                setTimeout(() => {
                    // Show success message
                    const formGroups = form.querySelectorAll('.form-group');
                    formGroups.forEach(group => group.style.display = 'none');
                    
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.innerHTML = `
                        <i class="bi bi-check-circle"></i>
                        <h3>Message Sent!</h3>
                        <p>We'll get back to you soon.</p>
                    `;
                    
                    form.appendChild(successMessage);
                    submitBtn.style.display = 'none';
                }, 1500);
            });
        }
    };

    // System Metrics Animation
    const initSystemMetrics = () => {
        const gauges = document.querySelectorAll('.metric-gauge');
        
        gauges.forEach(gauge => {
            const fill = gauge.querySelector('.gauge-fill');
            const width = fill.style.width;
            
            fill.style.width = '0';
            setTimeout(() => {
                fill.style.width = width;
            }, 100);
        });
    };

    // Initialize all dashboard features
    initDashboardTabs();
    initFAQ();
    initContactForm();
    initSystemMetrics();

    // Navbar scroll effect
    const nav = document.querySelector('nav');
    const navHeight = nav.offsetHeight;
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > navHeight) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        if (currentScroll > lastScroll && currentScroll > navHeight) {
            nav.style.transform = `translateY(-${navHeight}px)`;
        } else {
            nav.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });

    // Custom cursor
    if (window.matchMedia("(min-width: 768px)").matches) {
        const cursor = document.createElement('div');
        cursor.classList.add('custom-cursor');
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        });

        const interactiveElements = document.querySelectorAll('a, button, .feature-card, .faq-question');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }

    console.log(' Anzenai Security Suite - Website Initialized');
});
