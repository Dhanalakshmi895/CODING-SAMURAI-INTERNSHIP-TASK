document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');

    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('is-active');
        mobileMenu.classList.toggle('is-active');
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('#nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('is-active')) {
                navLinks.classList.remove('is-active');
                mobileMenu.classList.remove('is-active');
            }
        });
    });


    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            // Close other open answers
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question && otherQuestion.classList.contains('active')) {
                    otherQuestion.classList.remove('active');
                    otherQuestion.nextElementSibling.style.maxHeight = null;
                    otherQuestion.nextElementSibling.style.padding = '0 1.5rem';
                }
            });

            // Toggle current answer
            question.classList.toggle('active');
            const answer = question.nextElementSibling;
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
                answer.style.padding = '0 1.5rem';
            } else {
                answer.style.maxHeight = answer.scrollHeight + 30 + 'px'; // +30 for top/bottom padding
                answer.style.padding = '0.5rem 1.5rem 1.5rem 1.5rem';
            }
        });
    });

    // Modal functionality
    const signupModal = document.getElementById('signup-modal');
    const signupBtns = document.querySelectorAll('#signup-btn, #final-signup-btn'); // Get all signup buttons
    const closeButton = document.querySelector('.close-button');

    signupBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior
            signupModal.classList.add('is-open');
        });
    });

    closeButton.addEventListener('click', () => {
        signupModal.classList.remove('is-open');
    });

    // Close modal if clicked outside of modal content
    window.addEventListener('click', (event) => {
        if (event.target == signupModal) {
            signupModal.classList.remove('is-open');
        }
    });

    // Scroll Reveal Animation (simplified version)
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        for (let i = 0; i < revealElements.length; i++) {
            let windowHeight = window.innerHeight;
            let revealTop = revealElements[i].getBoundingClientRect().top;
            let revealPoint = 150; // When element is 150px from bottom of viewport

            if (revealTop < windowHeight - revealPoint) {
                revealElements[i].classList.add('active');
            } else {
                // Optional: remove 'active' class when out of view, to re-trigger on scroll back
                // revealElements[i].classList.remove('active');
            }
        }
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Run once on load to reveal elements already in view
});