// script.js

function smoothScroll(target) {
    const targetElement = document.querySelector(target);
    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

// Function to check if an element is in the viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Existing smoothScroll function
function smoothScroll(target) {
    const targetElement = document.querySelector(target);
    const targetPosition = target === "#home" ? 0 : targetElement.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const teamMembers = document.querySelectorAll('.team-member');

    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function () {
            const img = this.querySelector('.team-member-img');
            img.classList.add('show');
        });

        member.addEventListener('mouseleave', function () {
            const img = this.querySelector('.team-member-img');
            img.classList.remove('show');
        });
    });

    // Add an event listener for scrolling to trigger animations
    document.addEventListener('scroll', function () {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach((element) => {
            if (isElementInViewport(element)) {
                element.classList.add('show');
            }
        });
    });

    console.log('ANZENAI website loaded!');
});
