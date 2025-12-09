// DOM Elements
const introScreen = document.getElementById('introScreen');
const mainScreen = document.getElementById('mainScreen');
const contentScreen = document.getElementById('contentScreen');
const aboutScreen = document.getElementById('aboutScreen');

// Content elements
const contentTitle = document.getElementById('contentTitle');
const contentText = document.getElementById('contentText');
const telegramBtn = document.getElementById('telegramBtn');

// Data for content screens
const contentData = {
    project: {
        title: 'Проект',
        text: 'Проект, посвященный OSINT комьюнити. Ежедневные валидации, сносы и много авторского контента.',
        link: 'https://t.me/+io-TddW2owyZTQy'
    },
    price: {
        title: 'Прайс',
        text: 'Все цены на мои услуги. Деф, снос, пробив и другие.',
        link: 'https://t.me/pricetrawka'
    },
    shop: {
        title: 'Шоп',
        text: 'Продажа аккаунтов в телеграм, продажа физических сим карт и другие товары.',
        link: 'https://t.me/shopfiztrawka'
    },
    contact: {
        title: 'Связь',
        text: 'Напиши мне в личные сообщения.',
        link: 'https://t.me/usermanyak'
    }
};

// Telegram links
const telegramLinks = {
    creator: 'https://t.me/metstyle'
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // After intro animation, show main screen
    setTimeout(() => {
        introScreen.style.display = 'none';
        mainScreen.style.display = 'block';
    }, 3000);
    
    // Add particles to background
    createParticles();
    
    // Add event listeners
    setupEventListeners();
});

// Create floating particles
function createParticles() {
    const container = document.querySelector('.particle-container');
    if (!container) return;
    
    const particleCount = window.innerWidth < 768 ? 20 : 40;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 4 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        // Apply styles
        Object.assign(particle.style, {
            position: 'absolute',
            width: `${size}px`,
            height: `${size}px`,
            background: `radial-gradient(circle, 
                rgba(255, 247, 0, ${Math.random() * 0.5 + 0.2}) 0%,
                rgba(255, 0, 255, ${Math.random() * 0.3 + 0.1}) 100%)`,
            borderRadius: '50%',
            left: `${posX}%`,
            top: `${posY}%`,
            animation: `floatParticle ${duration}s infinite ${delay}s ease-in-out`,
            filter: 'blur(1px)'
        });
        
        container.appendChild(particle);
    }
    
    // Add CSS for particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0%, 100% { 
                transform: translate(0, 0) rotate(0deg);
                opacity: ${Math.random() * 0.5 + 0.3};
            }
            25% { 
                transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px) rotate(90deg);
            }
            50% { 
                transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px) rotate(180deg);
                opacity: ${Math.random() * 0.5 + 0.5};
            }
            75% { 
                transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px) rotate(270deg);
            }
        }
    `;
    document.head.appendChild(style);
}

// Setup all event listeners
function setupEventListeners() {
    // Creator button
    document.getElementById('creatorBtn').addEventListener('click', () => {
        window.open(telegramLinks.creator, '_blank');
    });
    
    // Navigation buttons
    document.querySelectorAll('.nav-btn[data-target]').forEach(btn => {
        btn.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            showContentScreen(target);
        });
    });
    
    // About button
    document.getElementById('aboutBtn').addEventListener('click', showAboutScreen);
    
    // Back buttons
    document.getElementById('backBtn').addEventListener('click', hideContentScreen);
    document.getElementById('backAboutBtn').addEventListener('click', hideAboutScreen);
}

// Show content screen
function showContentScreen(contentType) {
    if (!contentData[contentType]) return;
    
    const data = contentData[contentType];
    
    // Set content
    contentTitle.textContent = data.title;
    contentText.textContent = data.text;
    
    // Set Telegram button
    telegramBtn.href = data.link;
    telegramBtn.style.display = 'inline-flex';
    
    // Show screen with animation
    mainScreen.style.display = 'none';
    contentScreen.style.display = 'block';
    contentScreen.style.animation = 'slideIn 0.5s ease-out forwards';
}

// Show about screen
function showAboutScreen() {
    mainScreen.style.display = 'none';
    aboutScreen.style.display = 'block';
    aboutScreen.style.animation = 'slideIn 0.5s ease-out forwards';
}

// Hide content screen
function hideContentScreen() {
    contentScreen.style.animation = 'slideOut 0.5s ease-out forwards';
    
    setTimeout(() => {
        contentScreen.style.display = 'none';
        mainScreen.style.display = 'block';
        
        // Add animation for main screen return
        mainScreen.style.animation = 'slideInFromLeft 0.5s ease-out forwards';
        
        // Reset animation after completion
        setTimeout(() => {
            mainScreen.style.animation = '';
        }, 500);
    }, 500);
}

// Hide about screen
function hideAboutScreen() {
    aboutScreen.style.animation = 'slideOut 0.5s ease-out forwards';
    
    setTimeout(() => {
        aboutScreen.style.display = 'none';
        mainScreen.style.display = 'block';
        
        // Add animation for main screen return
        mainScreen.style.animation = 'slideInFromLeft 0.5s ease-out forwards';
        
        // Reset animation after completion
        setTimeout(() => {
            mainScreen.style.animation = '';
        }, 500);
    }, 500);
}

// Add slideOut animation dynamically
const slideOutStyle = document.createElement('style');
slideOutStyle.textContent = `
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(-100%); opacity: 0; }
    }
    
    @keyframes slideInFromLeft {
        from { transform: translateX(-100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(slideOutStyle);

// Mobile menu handling
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    
    if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left - go back if on content/about screen
        if (contentScreen.style.display === 'block') {
            hideContentScreen();
        } else if (aboutScreen.style.display === 'block') {
            hideAboutScreen();
        }
    }
}

// Add hover sound effects
document.querySelectorAll('.nav-btn, .creator-btn, .back-btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = this.style.transform || '';
    });
    
    btn.addEventListener('mouseleave', function() {
        if (!this.classList.contains('active')) {
            this.style.transform = '';
        }
    });
});

// Add keyboard navigation
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        if (contentScreen.style.display === 'block') {
            hideContentScreen();
        } else if (aboutScreen.style.display === 'block') {
            hideAboutScreen();
        }
    }
    
    // Number shortcuts for buttons
    if (e.key >= '1' && e.key <= '5' && mainScreen.style.display === 'block') {
        const buttons = document.querySelectorAll('.nav-btn');
        const index = parseInt(e.key) - 1;
        
        if (buttons[index]) {
            buttons[index].click();
        }
    }
});

// Performance optimization for animations
let lastScrollTime = 0;
const scrollThrottle = 1000 / 60; // 60fps

window.addEventListener('scroll', () => {
    const now = Date.now();
    
    if (now - lastScrollTime >= scrollThrottle) {
        lastScrollTime = now;
        // Update parallax or other scroll-based effects here
    }
});
