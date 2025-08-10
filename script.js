// Professional roles and titles to cycle through
const ROLES = [
    "Developer",
    "Engineer",
    "Scientist",
    "Physicist",
    "Mathematician",
    "Economist",
    "Doctor",
    "Lawyer",
    "Psychologist",
    "Biologist",
    "Philosopher",
    "Clown",
    "Chihuahua Daddy"
];

// Typewriter effect configuration
const TYPEWRITER_CONFIG = {
    typingSpeed: 80,
    erasingSpeed: 30,
    delayBetweenWords: 500,
    delayBeforeErasing: 2000
};

class TypewriterEffect {
    constructor(element, words, config) {
        this.element = element;
        this.words = this.shuffleArray([...words]); // Create randomized copy
        this.config = config;
        this.currentWordIndex = 0;
        this.currentCharIndex = 0;
        this.isTyping = true;
        this.isInitialized = false;
    }

    // Fisher-Yates shuffle algorithm for random order
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    async init() {
        // Wait for initial page load animation
        await this.delay(2500);
        this.isInitialized = true;
        this.type();
    }

    async type() {
        if (!this.isInitialized) return;

        const currentWord = this.words[this.currentWordIndex];

        if (this.isTyping) {
            // Typing phase
            if (this.currentCharIndex < currentWord.length) {
                this.element.textContent = currentWord.substring(0, this.currentCharIndex + 1);
                this.currentCharIndex++;

                // Add glow effect while typing
                this.element.classList.add('glow');

                setTimeout(() => this.type(), this.config.typingSpeed);
            } else {
                // Finished typing current word
                this.isTyping = false;
                setTimeout(() => this.type(), this.config.delayBeforeErasing);
            }
        } else {
            // Erasing phase
            if (this.currentCharIndex > 0) {
                this.element.textContent = currentWord.substring(0, this.currentCharIndex - 1);
                this.currentCharIndex--;
                setTimeout(() => this.type(), this.config.erasingSpeed);
            } else {
                // Finished erasing, move to next word
                this.isTyping = true;
                this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
                
                // If we've gone through all words, reshuffle for next cycle
                if (this.currentWordIndex === 0) {
                    this.words = this.shuffleArray([...ROLES]);
                }

                // Remove glow effect between words
                this.element.classList.remove('glow');

                setTimeout(() => this.type(), this.config.delayBetweenWords);
            }
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

class ParticleSystem {
    constructor(container) {
        this.container = container;
        this.particles = [];
        this.maxParticles = 50;
        this.init();
    }

    init() {
        this.createParticles();
        this.animateParticles();
    }

    createParticles() {
        for (let i = 0; i < this.maxParticles; i++) {
            setTimeout(() => {
                this.createParticle();
            }, i * 100);
        }
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random size between 1-4px
        const size = Math.random() * 3 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Random horizontal position
        particle.style.left = Math.random() * 100 + '%';

        // Random animation duration between 8-15 seconds
        const duration = Math.random() * 7 + 8;
        particle.style.animationDuration = `${duration}s`;

        // Random delay
        const delay = Math.random() * 5;
        particle.style.animationDelay = `${delay}s`;

        // Random opacity
        particle.style.opacity = Math.random() * 0.3 + 0.1;

        this.container.appendChild(particle);
        this.particles.push(particle);

        // Remove particle after animation completes
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
            this.particles = this.particles.filter(p => p !== particle);
        }, (duration + delay) * 1000);
    }

    animateParticles() {
        // Continuously create new particles
        setInterval(() => {
            if (this.particles.length < this.maxParticles) {
                this.createParticle();
            }
        }, 300);
    }
}

class BackgroundEffects {
    constructor() {
        this.init();
    }

    init() {
        this.createGradientShift();
        this.createMouseTracker();
    }

    createGradientShift() {
        // Subtle gradient animation
        const body = document.body;
        let hue = 200;

        setInterval(() => {
            hue = (hue + 0.5) % 360;
            body.style.filter = `hue-rotate(${hue * 0.1}deg)`;
        }, 100);
    }

    createMouseTracker() {
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        document.addEventListener('mousemove', (e) => {
            targetX = e.clientX;
            targetY = e.clientY;
        });

        const updateMouseEffect = () => {
            mouseX += (targetX - mouseX) * 0.1;
            mouseY += (targetY - mouseY) * 0.1;

            const floatingElements = document.querySelectorAll('.floating-element');
            floatingElements.forEach((element, index) => {
                const speed = (index + 1) * 0.01;
                const x = (mouseX - window.innerWidth / 2) * speed;
                const y = (mouseY - window.innerHeight / 2) * speed;

                element.style.transform = `translate(${x}px, ${y}px)`;
            });

            requestAnimationFrame(updateMouseEffect);
        };

        updateMouseEffect();
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize typewriter effect
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const typewriter = new TypewriterEffect(typewriterElement, ROLES, TYPEWRITER_CONFIG);
        typewriter.init();
    }

    // Initialize particle system
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        new ParticleSystem(particlesContainer);
    }

    // Initialize background effects
    new BackgroundEffects();

    // Add loading completion class
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 1000);
});

// Export for potential future use
export { TypewriterEffect, ParticleSystem, BackgroundEffects, ROLES };
