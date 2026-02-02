// script.js
document.addEventListener('DOMContentLoaded', function() {
    console.log("Marine Oil Spill Detection website loaded.");
});


// About Section
function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-counter'));
    const start = 0;
    const animationDuration = 2000;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(animationDuration / frameDuration);
    let currentFrame = 0;

    const animate = () => {
        currentFrame++;
        const progress = currentFrame / totalFrames;
        const currentValue = Math.round(start + progress * (target - start));
        
        counter.textContent = currentValue;

        if (currentFrame < totalFrames) {
            requestAnimationFrame(animate);
        }
    };

    requestAnimationFrame(animate);
}

const stats = document.querySelectorAll('.stat .number');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
});

stats.forEach(stat => {
    observer.observe(stat);
});

// Tech Section
document.addEventListener('DOMContentLoaded', () => {
    const techCards = document.querySelectorAll('.tech-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    techCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(card);
    });
});

// Team Slider
document.addEventListener('DOMContentLoaded', () => {
    const carouselWrapper = document.querySelector('.team-carousel-wrapper');
    const slides = document.querySelectorAll('.team-slide');
    const totalSlides = slides.length; // Original number of slides (5)

    // Clone the first slide and append it for seamless looping
    const firstSlide = slides[0].cloneNode(true);
    carouselWrapper.appendChild(firstSlide);

    let currentIndex = 0;

    function slideToNext() {
        currentIndex++;
        const offset = -currentIndex * 100;
        carouselWrapper.style.transform = `translateX(${offset}%)`;

        // When reaching the cloned slide, reset to start
        if (currentIndex === totalSlides) {
            setTimeout(() => {
                carouselWrapper.style.transition = 'none';
                carouselWrapper.style.transform = 'translateX(0%)';
                currentIndex = 0;
                carouselWrapper.offsetHeight; // Force reflow
                carouselWrapper.style.transition = 'transform 0.5s ease';
            }, 500); // Match CSS transition duration
        }
    }

    // Auto-slide every 3 seconds
    setInterval(slideToNext, 3000);
});

// Subscribe
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.subscribe-form');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent default form submission
        const email = form.querySelector('.email-input').value;
        console.log('Subscribed with email:', email); // Placeholder for actual subscription logic
        form.reset(); // Reset form after submission
    });
});