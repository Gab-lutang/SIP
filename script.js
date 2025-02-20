// Modern JavaScript with ES6+ features
document.addEventListener('DOMContentLoaded', () => {
    // Handle logo loading animation
const logoLoading = document.querySelector('.logo-loading');

// Initialize loading animation
if (logoLoading) {
    // Make sure the loading screen is visible initially
    logoLoading.style.display = 'flex';
    logoLoading.style.opacity = '1';
    
    // Hide loading screen after content is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            logoLoading.classList.add('fade-out');
            setTimeout(() => {
                logoLoading.style.display = 'none';
            }, 500);
        }, 5500); // Reduced from 2500 to make it faster
    });
}

    // Initialize AOS animations
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });

    // Navbar scroll behavior and scroll spy
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    const handleScroll = () => {
        // Handle sticky navbar
        if (window.scrollY > 50) {
            navbar.setAttribute('data-sticky', 'true');
        } else {
            navbar.setAttribute('data-sticky', 'false');
        }

        // Handle scroll spy
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on load

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNavMenu = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && mobileNavMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            mobileNavMenu.classList.toggle('active');
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
                mobileNavMenu?.classList.remove('active');
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

    // Tab Interactions
    // Initialize tooltips and popovers
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
    
    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Feature tabs interaction
    const featureTabs = document.querySelectorAll('[data-bs-toggle="pill"]');
    featureTabs.forEach(tab => {
        tab.addEventListener('shown.bs.tab', function(e) {
            const targetPane = document.querySelector(e.target.getAttribute('data-bs-target'));
            if (targetPane) {
                // Reset and trigger animations
                const stats = targetPane.querySelectorAll('.feature-stats .col-sm-4 > div');
                stats.forEach((stat, index) => {
                    stat.style.opacity = '0';
                    stat.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        stat.style.transition = 'all 0.3s ease';
                        stat.style.opacity = '1';
                        stat.style.transform = 'translateY(0)';
                    }, index * 100);
                });
                
                // Animate capabilities
                const capabilities = targetPane.querySelectorAll('.feature-details .row > div > div');
                capabilities.forEach((cap, index) => {
                    cap.style.opacity = '0';
                    cap.style.transform = 'translateX(-20px)';
                    setTimeout(() => {
                        cap.style.transition = 'all 0.3s ease';
                        cap.style.opacity = '1';
                        cap.style.transform = 'translateX(0)';
                    }, index * 100 + 300);
                });
            }
        });
    });
    
    // Mobile tab scroll handling
    const tabList = document.querySelector('.nav-pills.flex-nowrap');
    if (tabList) {
        let isScrolling = false;
        
        tabList.addEventListener('scroll', () => {
            if (!isScrolling) {
                window.requestAnimationFrame(() => {
                    handleTabScroll();
                    isScrolling = false;
                });
                isScrolling = true;
            }
        });
        
        function handleTabScroll() {
            const scrollLeft = tabList.scrollLeft;
            const maxScroll = tabList.scrollWidth - tabList.clientWidth;
            
            // Add shadow indicators based on scroll position
            tabList.classList.toggle('shadow-start', scrollLeft > 0);
            tabList.classList.toggle('shadow-end', scrollLeft < maxScroll);
        }
    }

    console.log(' Anzenai Security Suite - Website Initialized');
});

// Careers functionality
document.addEventListener('DOMContentLoaded', function() {
    // Job application handling
    const jobButtons = document.querySelectorAll('.job-card .btn-outline-primary');
    jobButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const jobTitle = this.closest('.job-card').querySelector('h5').textContent;
            showApplicationForm(jobTitle);
        });
    });
});

function showApplicationForm(jobTitle) {
    // Create modal HTML
    const modalHtml = `
        <div class="modal fade" id="applicationModal" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content bg-dark border-0">
                    <div class="modal-header border-secondary">
                        <h5 class="modal-title">Apply for ${jobTitle}</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="applicationForm" onsubmit="return submitApplication(event)">
                            <div class="mb-3">
                                <label class="form-label">Full Name</label>
                                <input type="text" class="form-control bg-dark border-secondary text-white" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Email</label>
                                <input type="email" class="form-control bg-dark border-secondary text-white" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Phone</label>
                                <input type="tel" class="form-control bg-dark border-secondary text-white" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Years of Experience</label>
                                <input type="number" class="form-control bg-dark border-secondary text-white" min="0" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Resume/CV</label>
                                <input type="file" class="form-control bg-dark border-secondary text-white" accept=".pdf,.doc,.docx" required>
                            </div>
                            <div class="mb-4">
                                <label class="form-label">Cover Letter</label>
                                <textarea class="form-control bg-dark border-secondary text-white" rows="4" required></textarea>
                            </div>
                            <div class="d-grid">
                                <button type="submit" class="btn btn-primary">
                                    <i class="fas fa-paper-plane me-2"></i>Submit Application
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Remove any existing modal
    const existingModal = document.getElementById('applicationModal');
    if (existingModal) {
        existingModal.remove();
    }

    // Add new modal to body
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // Initialize and show modal
    const modal = new bootstrap.Modal(document.getElementById('applicationModal'));
    modal.show();

    // Close careers modal
    const careersModal = bootstrap.Modal.getInstance(document.getElementById('careersModal'));
    if (careersModal) {
        careersModal.hide();
    }
}

function submitApplication(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Submitting...';
    submitBtn.disabled = true;

    // Simulate application submission
    setTimeout(() => {
        // Reset button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        // Show success message
        const alert = document.createElement('div');
        alert.className = 'alert alert-success bg-success bg-opacity-10 border-0 mb-0 mt-4';
        alert.innerHTML = `
            <div class="d-flex">
                <i class="fas fa-check-circle fs-5 me-3"></i>
                <div>
                    <h6 class="alert-heading mb-1">Application Submitted!</h6>
                    <p class="mb-0 small">Thank you for your interest. We'll review your application and get back to you soon.</p>
                </div>
            </div>
        `;

        // Remove any existing alerts
        const existingAlert = form.querySelector('.alert');
        if (existingAlert) {
            existingAlert.remove();
        }

        // Add new alert
        form.appendChild(alert);

        // Reset form
        form.reset();

        // Close modal after delay
        setTimeout(() => {
            const modal = bootstrap.Modal.getInstance(document.getElementById('applicationModal'));
            modal.hide();
        }, 3000);
    }, 2000);

    return false;
}

// Review functionality
document.addEventListener('DOMContentLoaded', function() {
    const ratingStars = document.querySelectorAll('.rating-input .far.fa-star');
    let selectedRating = 0;

    // Star rating hover effect
    ratingStars.forEach(star => {
        star.addEventListener('mouseover', function() {
            const rating = this.dataset.rating;
            updateStars(rating, 'hover');
        });

        star.addEventListener('mouseout', function() {
            updateStars(selectedRating, 'selected');
        });

        star.addEventListener('click', function() {
            selectedRating = this.dataset.rating;
            updateStars(selectedRating, 'selected');
            updateRatingText(selectedRating);
        });
    });

    function updateStars(rating, state) {
        ratingStars.forEach(star => {
            const starRating = star.dataset.rating;
            if (starRating <= rating) {
                if (state === 'hover') {
                    star.classList.remove('far');
                    star.classList.add('fas', 'text-warning');
                } else {
                    star.classList.remove('far');
                    star.classList.add('fas', 'text-warning');
                }
            } else {
                star.classList.remove('fas', 'text-warning');
                star.classList.add('far');
            }
        });
    }

    function updateRatingText(rating) {
        const ratingText = document.querySelector('.selected-rating');
        const ratingMessages = {
            1: 'Poor',
            2: 'Fair',
            3: 'Good',
            4: 'Very Good',
            5: 'Excellent'
        };
        ratingText.textContent = rating ? `${ratingMessages[rating]} (${rating} stars)` : 'Select your rating';
    }
});

// Submit review
function submitReview(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Submitting...';
    submitBtn.disabled = true;

    // Simulate review submission
    setTimeout(() => {
        // Reset form
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        form.reset();

        // Reset rating stars
        const ratingStars = document.querySelectorAll('.rating-input .fas.fa-star');
        ratingStars.forEach(star => {
            star.classList.remove('fas', 'text-warning');
            star.classList.add('far');
        });
        document.querySelector('.selected-rating').textContent = 'Select your rating';

        // Show success message
        const alert = document.createElement('div');
        alert.className = 'alert alert-success bg-success bg-opacity-10 border-0 mb-0 mt-4';
        alert.innerHTML = `
            <div class="d-flex">
                <i class="fas fa-check-circle fs-5 me-3"></i>
                <div>
                    <h6 class="alert-heading mb-1">Thank You!</h6>
                    <p class="mb-0 small">Your review has been submitted successfully.</p>
                </div>
            </div>
        `;

        // Remove any existing alerts
        const existingAlert = form.querySelector('.alert');
        if (existingAlert) {
            existingAlert.remove();
        }

        // Add new alert
        form.appendChild(alert);

        // Close modal after delay
        setTimeout(() => {
            const modal = bootstrap.Modal.getInstance(document.getElementById('reviewModal'));
            modal.hide();
        }, 2000);
    }, 1500);

    return false;
}

// Download functionality
function startDownload() {
    // Show loading state
    const downloadBtn = document.querySelector('#downloadModal .btn-primary');
    const originalText = downloadBtn.innerHTML;
    downloadBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Preparing Download...';
    downloadBtn.disabled = true;

    // Simulate download preparation (replace with actual download logic)
    setTimeout(() => {
        // Reset button state
        downloadBtn.innerHTML = originalText;
        downloadBtn.disabled = false;

        // Create download link
        const link = document.createElement('a');
        link.href = 'downloads/anzenai-community-1.0.0.exe';
        link.download = 'anzenai-community-1.0.0.exe';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Show success message
        const alert = document.createElement('div');
        alert.className = 'alert alert-success bg-success bg-opacity-10 border-0 mb-0 mt-4';
        alert.innerHTML = `
            <div class="d-flex">
                <i class="fas fa-check-circle fs-5 me-3"></i>
                <div>
                    <h6 class="alert-heading mb-1">Download Started</h6>
                    <p class="mb-0 small">Your download should begin automatically. If it doesn't, <a href="#" class="alert-link">click here</a>.</p>
                </div>
            </div>
        `;
        
        document.querySelector('#downloadModal .modal-body').appendChild(alert);
    }, 2000);
}

// System compatibility check
function runSystemCheck() {
    // Show loading state
    const checkBtn = document.querySelector('#downloadModal .btn-outline-primary');
    const originalText = checkBtn.innerHTML;
    checkBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Checking System...';
    checkBtn.disabled = true;

    // Simulate system check (replace with actual system check logic)
    setTimeout(() => {
        // Reset button state
        checkBtn.innerHTML = originalText;
        checkBtn.disabled = false;

        // Show results
        const results = [
            { name: 'Operating System', status: true, value: 'Windows 10 (Compatible)' },
            { name: 'Processor', status: true, value: '2.4 GHz (Meets Requirements)' },
            { name: 'Memory', status: true, value: '8 GB RAM (Exceeds Requirements)' },
            { name: 'Storage', status: true, value: '256 GB Free (Sufficient)' }
        ];

        // Create results display
        const resultsHtml = `
            <div class="system-check-results mt-4">
                <h6 class="mb-3">System Check Results</h6>
                ${results.map(result => `
                    <div class="d-flex align-items-center mb-2">
                        <i class="fas fa-${result.status ? 'check text-success' : 'times text-danger'} me-2"></i>
                        <div class="flex-grow-1">
                            <small class="d-block text-secondary">${result.name}</small>
                            <span class="small">${result.value}</span>
                        </div>
                    </div>
                `).join('')}
                <div class="alert alert-success bg-success bg-opacity-10 border-0 mb-0 mt-3">
                    <div class="d-flex">
                        <i class="fas fa-check-circle fs-5 me-3"></i>
                        <div>
                            <h6 class="alert-heading mb-1">System Compatible</h6>
                            <p class="mb-0 small">Your system meets all requirements for ANZENAI Community Edition.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Remove any existing results
        const existingResults = document.querySelector('.system-check-results');
        if (existingResults) {
            existingResults.remove();
        }

        // Add new results
        document.querySelector('#downloadModal .modal-body').insertAdjacentHTML('beforeend', resultsHtml);
    }, 2000);
}

// Loading animation
window.addEventListener('load', function() {
    const loader = document.querySelector('.logo-loading');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    }
});
