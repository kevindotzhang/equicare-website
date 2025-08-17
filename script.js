// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Wipe-in effect for testimonial
const wipeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            wipeInObserver.unobserve(entry.target); // Only animate once
        }
    });
}, {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
});

document.addEventListener('DOMContentLoaded', () => {
    const wipeInElements = document.querySelectorAll('.wipe-in-effect');
    wipeInElements.forEach(element => {
        wipeInObserver.observe(element);
    });
});


// Chatbot functionality
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotWindow = document.getElementById('chatbot-window');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSend = document.getElementById('chatbot-send');
const chatbotMessages = document.getElementById('chatbot-messages');

let chatbotOpen = false;

chatbotToggle.addEventListener('click', () => {
    chatbotOpen = !chatbotOpen;
    if (chatbotOpen) {
        chatbotWindow.classList.add('active');
        chatbotToggle.style.transform = 'scale(0.9)';
    } else {
        chatbotWindow.classList.remove('active');
        chatbotToggle.style.transform = 'scale(1)';
    }
});

chatbotClose.addEventListener('click', () => {
    chatbotWindow.classList.remove('active');
    chatbotToggle.style.transform = 'scale(1)';
    chatbotOpen = false;
});

// Chatbot responses
const chatbotResponses = {
    'hello': 'Hello! I\'m here to help you with horse care questions. What would you like to know?',
    'hi': 'Hi there! How can I assist you with your horse today?',
    'help': 'I can help you with questions about horse nutrition, health, care routines, and more. You can also use our calculator for specific feeding recommendations!',
    'calculator': 'Our calculator helps you determine the right nutrition plan for your horse based on their weight, activity level, and other factors. You can access it from the Calculator page!',
    'nutrition': 'Horse nutrition is crucial for their health and performance. Factors like age, weight, activity level, and body condition all play important roles. Would you like specific guidance on any of these areas?',
    'health': 'Horse health involves regular vet checkups, proper nutrition, exercise, and monitoring for any changes in behavior or appearance. What specific health concerns do you have?',
    'feeding': 'Proper feeding depends on your horse\'s individual needs. Generally, horses need 1.5-3% of their body weight in feed daily, with quality forage being the foundation. Our calculator can help you get specific recommendations!',
    'weight': 'Maintaining proper weight is essential for horse health. You can monitor this through body condition scoring and regular weigh-ins. Would you like tips on weight management?',
    'research': 'Our recommendations are based on peer-reviewed research in equine nutrition and veterinary science. You can find detailed information about our research methodology on our Research page.',
    'about': 'EquiCare was created by horse owners who understand the challenges of providing the best care for our equine companions. We combine scientific research with practical experience to help you make informed decisions.',
    'default': 'That\'s a great question! For specific veterinary advice, I always recommend consulting with your veterinarian. For general care questions, feel free to ask me anything about nutrition, feeding, or check out our calculator for personalized recommendations.'
};

function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.textContent = content;
    
    messageDiv.appendChild(messageContent);
    chatbotMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    
    // Add typing animation for bot messages
    if (!isUser) {
        messageContent.style.opacity = '0';
        setTimeout(() => {
            messageContent.style.transition = 'opacity 0.5s ease';
            messageContent.style.opacity = '1';
        }, 500);
    }
}

function getBotResponse(userMessage) {
    const message = userMessage.toLowerCase().trim();
    
    // Check for keyword matches
    for (const [keyword, response] of Object.entries(chatbotResponses)) {
        if (keyword !== 'default' && message.includes(keyword)) {
            return response;
        }
    }
    
    return chatbotResponses.default;
}

function sendMessage() {
    const message = chatbotInput.value.trim();
    if (message) {
        // Add user message
        addMessage(message, true);
        
        // Clear input
        chatbotInput.value = '';
        
        // Show typing indicator
        setTimeout(() => {
            const response = getBotResponse(message);
            addMessage(response);
        }, 1000);
    }
}

chatbotSend.addEventListener('click', sendMessage);

chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Enhanced Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
            
            // Add staggered animation for grid elements
            if (entry.target.classList.contains('features-grid') || 
                entry.target.classList.contains('testimonials-grid') ||
                entry.target.classList.contains('trust-stats')) {
                const children = entry.target.children;
                Array.from(children).forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('aos-animate');
                    }, index * 100);
                });
            }
        }
    });
}, observerOptions);

// Observe elements with data-aos attributes
document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// Progressive content reveal
const progressiveObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add gentle bounce effect for trust indicators
            if (entry.target.classList.contains('trust-stat')) {
                entry.target.style.animation = 'gentleBounce 0.6s ease-out forwards';
            }
            
            // Add typewriter effect for comfort message
            if (entry.target.classList.contains('comfort-message')) {
                const text = entry.target.querySelector('p');
                if (text && !text.classList.contains('typewriter-complete')) {
                    text.classList.add('typewriter-complete');
                    text.style.animation = 'typewriter 2s steps(40, end) forwards';
                }
            }
        }
    });
}, { threshold: 0.3 });

// Observe trust indicators and comfort messages
document.querySelectorAll('.trust-stat, .comfort-message').forEach(el => {
    progressiveObserver.observe(el);
});

// Poppable floating emojis functionality
document.addEventListener('DOMContentLoaded', () => {
    const floatingHearts = document.querySelectorAll('.floating-heart.poppable');
    
    floatingHearts.forEach(heart => {
        heart.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Add pop animation
            heart.classList.add('popped');
            
            // Create sparkle effect
            createSparkles(e.clientX, e.clientY);
            
            // Play a little sound effect (optional)
            playPopSound();
            
            // Remove the emoji after animation completes
            setTimeout(() => {
                heart.remove();
                // Spawn a new emoji after a delay
                setTimeout(() => {
                    spawnNewEmoji();
                }, Math.random() * 3000 + 2000); // 2-5 seconds
            }, 800);
        });
    });
});

function createSparkles(x, y) {
    const sparkleCount = 6;
    const sparkleEmojis = ['✨', '⭐', '💫', '🌟', '✨'];
    
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.textContent = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
        sparkle.style.cssText = `
            position: fixed;
            left: ${x - 15 + Math.random() * 30}px;
            top: ${y - 15 + Math.random() * 30}px;
            font-size: 1.5rem;
            pointer-events: none;
            z-index: 1000;
            animation: sparkle 1s ease-out forwards;
        `;
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
}

function playPopSound() {
    // Create a subtle pop sound using Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
        // Fallback if audio context isn't available
        console.log('Pop! 🎉');
    }
}

function spawnNewEmoji() {
    const emojiOptions = ['💚', '🐴', '💙', '🌟', '🍎', '🥕', '💕', '🦄', '🌾', '🌸', '💖', '🐎', '🌻', '🦋', '🌈'];
    const floatingContainer = document.querySelector('.floating-elements');
    
    if (floatingContainer) {
        const newEmoji = document.createElement('div');
        newEmoji.className = 'floating-heart poppable';
        newEmoji.textContent = emojiOptions[Math.floor(Math.random() * emojiOptions.length)];
        
        // Random position
        newEmoji.style.left = Math.random() * 90 + '%';
        newEmoji.style.animationDelay = '0s';
        newEmoji.style.animationDuration = (Math.random() * 10 + 20) + 's';
        
        // Add click event
        newEmoji.addEventListener('click', (e) => {
            e.preventDefault();
            newEmoji.classList.add('popped');
            createSparkles(e.clientX, e.clientY);
            playPopSound();
            
            setTimeout(() => {
                newEmoji.remove();
                setTimeout(() => {
                    spawnNewEmoji();
                }, Math.random() * 3000 + 2000);
            }, 800);
        });
        
        floatingContainer.appendChild(newEmoji);
    }
}

// Dark Mode Toggle - Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const darkModeIcon = document.getElementById('dark-mode-icon');
    const body = document.body;

    // Function to update navbar based on theme and scroll
    function updateNavbarStyling() {
        const navbar = document.querySelector('.navbar');
        const isDarkMode = body.getAttribute('data-theme') === 'dark';
        
        if (window.scrollY > 100) {
            if (isDarkMode) {
                navbar.style.background = 'rgba(26, 31, 26, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.background = 'rgba(254, 253, 248, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(45, 90, 39, 0.1)';
            }
        } else {
            if (isDarkMode) {
                navbar.style.background = 'rgba(26, 31, 26, 0.95)';
                navbar.style.boxShadow = 'none';
            } else {
                navbar.style.background = 'rgba(254, 253, 248, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        }
    }

    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        darkModeIcon.className = 'fas fa-sun';
    } else {
        // Ensure light mode is explicitly set
        body.removeAttribute('data-theme');
        darkModeIcon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    }

    // Initial navbar styling setup
    updateNavbarStyling();

    // Navbar background on scroll - with dark mode support
    window.addEventListener('scroll', updateNavbarStyling);

    darkModeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            // Switch to light mode
            body.removeAttribute('data-theme');
            darkModeIcon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'light');
            
            // Add a little bounce animation
            darkModeToggle.style.animation = 'bounce 0.6s ease';
        } else {
            // Switch to dark mode
            body.setAttribute('data-theme', 'dark');
            darkModeIcon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'dark');
            
            // Add a little bounce animation
            darkModeToggle.style.animation = 'bounce 0.6s ease';
        }
        
        // Update navbar styling immediately after theme change
        updateNavbarStyling();
        
        // Remove animation after it completes
        setTimeout(() => {
            darkModeToggle.style.animation = '';
        }, 600);
    });
});

// Add hover effects to cards
document.querySelectorAll('.feature-card, .testimonial-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Floating hearts animation on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelectorAll('.floating-heart');
    
    parallax.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Hero text animation
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');
    const heroButtons = document.querySelector('.hero-buttons');
    
    setTimeout(() => {
        heroTitle.style.animation = 'fadeInUp 0.8s ease forwards';
    }, 200);
    
    setTimeout(() => {
        heroDescription.style.animation = 'fadeInUp 0.8s ease forwards';
    }, 400);
    
    setTimeout(() => {
        heroButtons.style.animation = 'fadeInUp 0.8s ease forwards';
    }, 600);
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .hero-title,
    .hero-description,
    .hero-buttons {
        opacity: 0;
    }
    
    .chatbot-toggle {
        animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .feature-card,
    .testimonial-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
`;
document.head.appendChild(style);