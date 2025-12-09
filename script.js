// DOM Elements
const introScreen = document.getElementById('introScreen');
const mainScreen = document.getElementById('mainScreen');
const contentScreen = document.getElementById('contentScreen');
const aboutScreen = document.getElementById('aboutScreen');

// Content elements
const contentTitle = document.getElementById('contentTitle');
const contentText = document.getElementById('contentText');
const contentIcon = document.getElementById('contentIcon');
const telegramBtn = document.getElementById('telegramBtn');

// Content data
const contentData = {
    project: {
        title: 'ПРОЕКТ',
        text: 'Проект, посвященный OSINT комьюнити. Ежедневные валидации, сносы и много авторского контента.',
        link: 'https://t.me/+io-TddW2owyZTQy',
        icon: '<i class="fas fa-network-wired"></i>'
    },
    price: {
        title: 'ПРАЙС',
        text: 'Все цены на мои услуги. Деф, снос, пробив и другие.',
        link: 'https://t.me/pricetrawka',
        icon: '<i class="fas fa-tags"></i>'
    },
    shop: {
        title: 'ШОП',
        text: 'Продажа аккаунтов в телеграм, продажа физических сим карт и другие товары.',
        link: 'https://t.me/shopfiztrawka',
        icon: '<i class="fas fa-shopping-cart"></i>'
    },
    contact: {
        title: 'СВЯЗЬ',
        text: 'Напиши мне в личные сообщения.',
        link: 'https://t.me/usermanyak',
        icon: '<i class="fas fa-comment-dots"></i>'
    }
};

// Telegram links
const telegramLinks = {
    creator: 'https://t.me/metstyle'
};

// Animation states
let hasShownIntro = false;
let isAnimating = false;

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    // Check if intro was already shown in this session
    const introShown = sessionStorage.getItem('introShown');
    
    if (!introShown) {
        // Show intro animation on first load
        showIntroAnimation();
    } else {
        // Skip intro, show main screen immediately
        skipIntro();
    }
    
    // Initialize matrix background
    initMatrixBackground();
    
    // Initialize particles for about screen
    initAboutParticles();
    
    // Setup event listeners
    setupEventListeners();
    
    // Animate buttons on load
    animateButtons();
});

// Show intro animation
function showIntroAnimation() {
    introScreen.style.display = 'flex';
    
    // Set timer for intro duration
    setTimeout(() => {
        // Mark intro as shown
        sessionStorage.setItem('introShown', 'true');
        hasShownIntro = true;
        
        // Hide intro, show main screen with animation
        introScreen.style.opacity = '0';
        introScreen.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            introScreen.style.display = 'none';
            mainScreen.style.display = 'block';
            
            // Add animation classes
            document.querySelectorAll('.animate__animated').forEach(el => {
                el.classList.add('animate__fadeIn');
            });
        }, 500);
    }, 3000); // 3 second intro
}

// Skip intro animation
function skipIntro() {
    introScreen.style.display = 'none';
    mainScreen.style.display = 'block';
    hasShownIntro = true;
    
    // Add animation classes
    document.querySelectorAll('.animate__animated').forEach(el => {
        el.classList.add('animate__fadeIn');
    });
}

// Initialize matrix background
function initMatrixBackground() {
    const canvas = document.getElementById('matrixCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Matrix characters
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const charArray = chars.split('');
    
    // Font size
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    
    // Raindrops
    const drops = [];
    
    // Initialize drops
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
    
    // Draw function
    function draw() {
        // Semi-transparent black background
        ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Set text style
        ctx.fillStyle = '#00ff41'; // Matrix green
        ctx.font = `${fontSize}px monospace`;
        
        // Draw characters
        for (let i = 0; i < drops.length; i++) {
            // Random character
            const char = charArray[Math.floor(Math.random() * charArray.length)];
            
            // Draw character
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);
            
            // Reset drop if it reaches bottom or randomly
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            // Move drop down
            drops[i]++;
        }
    }
    
    // Animation loop
    let animationId;
    function animate() {
        draw();
        animationId = requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Reset drops array
        drops.length = Math.floor(canvas.width / fontSize);
        for (let i = 0; i < drops.length; i++) {
            drops[i] = Math.floor(Math.random() * canvas.height / fontSize);
        }
    });
    
    // Stop animation when not in main screen
    const observer = new MutationObserver(() => {
        if (mainScreen.style.display === 'none') {
            cancelAnimationFrame(animationId);
        } else {
            animate();
        }
    });
    
    observer.observe(mainScreen, { attributes: true, attributeFilter: ['style'] });
}

// Initialize particles for about screen
function initAboutParticles() {
    const container = document.querySelector('.about-particles');
    if (!container) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'about-particle';
        
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
                rgba(138, 43, 226, ${Math.random() * 0.5 + 0.2}) 0%,
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
    if (!document.getElementById('particle-styles')) {
        const style = document.createElement('style');
        style.id = 'particle-styles';
        style.textContent = `
            @keyframes floatParticle {
                0%, 100% { 
                    transform: translate(0, 0) rotate(0deg);
                    opacity: ${Math.random() * 0.5 + 0.3};
                }
                25% { 
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(90deg);
                }
                50% { 
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(180deg);
                    opacity: ${Math.random() * 0.5 + 0.5};
                }
                75% { 
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(270deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Setup all event listeners
function setupEventListeners() {
    // Creator button
    document.getElementById('creatorBtn').addEventListener('click', () => {
        window.open(telegramLinks.creator, '_blank');
    });
    
    // Navigation buttons
    document.querySelectorAll('.cyber-btn[data-target]').forEach(btn => {
        btn.addEventListener('click', function() {
            if (isAnimating) return;
            const target = this.getAttribute('data-target');
            showContentScreen(target);
        });
    });
    
    // About button
    document.getElementById('aboutBtn').addEventListener('click', () => {
        if (isAnimating) return;
        showAboutScreen();
    });
    
    // Back buttons
    document.getElementById('backBtn').addEventListener('click', hideContentScreen);
    document.getElementById('backAboutBtn').addEventListener('click', hideAboutScreen);
    
    // Telegram button
    telegramBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.open(this.href, '_blank');
    });
}

// Animate buttons on load
function animateButtons() {
    const buttons = document.querySelectorAll('.cyber-btn');
    
    buttons.forEach((btn, index) => {
        setTimeout(() => {
            btn.style.opacity = '1';
            btn.style.transform = 'translateY(0)';
        }, 100 * index);
    });
}

// Show content screen
function showContentScreen(contentType) {
    if (!contentData[contentType] || isAnimating) return;
    
    isAnimating = true;
    
    const data = contentData[contentType];
    
    // Set content
    contentTitle.textContent = data.title;
    contentText.textContent = data.text;
    contentIcon.innerHTML = data.icon;
    
    // Set Telegram button
    telegramBtn.href = data.link;
    
    // Hide main screen with animation
    mainScreen.style.animation = 'slideOutLeft 0.5s ease-out forwards';
    
    setTimeout(() => {
        mainScreen.style.display = 'none';
        mainScreen.style.animation = '';
        
        // Show content screen
        contentScreen.style.display = 'block';
        
        // Add animation to content
        const container = contentScreen.querySelector('.content-container');
        container.classList.add('animate__fadeIn');
        container.style.animationDelay = '0.3s';
        
        isAnimating = false;
    }, 500);
    
    // Add slideOutLeft animation
    if (!document.getElementById('slide-animations')) {
        const style = document.createElement('style');
        style.id = 'slide-animations';
        style.textContent = `
            @keyframes slideOutLeft {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(-100%); opacity: 0; }
            }
            
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Show about screen
function showAboutScreen() {
    if (isAnimating) return;
    
    isAnimating = true;
    
    // Hide main screen with animation
    mainScreen.style.animation = 'slideOutLeft 0.5s ease-out forwards';
    
    setTimeout(() => {
        mainScreen.style.display = 'none';
        mainScreen.style.animation = '';
        
        // Show about screen
        aboutScreen.style.display = 'block';
        
        // Add animation to about container
        const container = aboutScreen.querySelector('.about-container');
        container.classList.add('animate__fadeIn');
        container.style.animationDelay = '0.3s';
        
        isAnimating = false;
    }, 500);
}

// Hide content screen
function hideContentScreen() {
    if (isAnimating) return;
    
    isAnimating = true;
    
    // Hide content screen with animation
    contentScreen.style.animation = 'slideInRight 0.5s ease-out reverse forwards';
    
    setTimeout(() => {
        contentScreen.style.display = 'none';
        contentScreen.style.animation = '';
        
        // Show main screen
        mainScreen.style.display = 'block';
        mainScreen.style.animation = 'slideInRight 0.5s ease-out forwards';
        
        setTimeout(() => {
            mainScreen.style.animation = '';
            isAnimating = false;
        }, 500);
    }, 500);
}

// Hide about screen
function hideAboutScreen() {
    if (isAnimating) return;
    
    isAnimating = true;
    
    // Hide about screen with animation
    aboutScreen.style.animation = 'slideInRight 0.5s ease-out reverse forwards';
    
    setTimeout(() => {
        aboutScreen.style.display = 'none';
        aboutScreen.style.animation = '';
        
        // Show main screen
        mainScreen.style.display = 'block';
        mainScreen.style.animation = 'slideInRight 0.5s ease-out forwards';
        
        setTimeout(() => {
            mainScreen.style.animation = '';
            isAnimating = false;
        }, 500);
    }, 500);
}

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Escape to go back
    if (e.key === 'Escape') {
        if (contentScreen.style.display === 'block') {
            hideContentScreen();
        } else if (aboutScreen.style.display === 'block') {
            hideAboutScreen();
        }
    }
    
    // Number shortcuts 1-5 for buttons
    if (e.key >= '1' && e.key <= '5' && mainScreen.style.display === 'block') {
        const buttons = document.querySelectorAll('.cyber-btn');
        const index = parseInt(e.key) - 1;
        
        if (buttons[index]) {
            buttons[index].click();
        }
    }
});

// Add touch gestures for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;
    
    // Swipe left to go back
    if (swipeDistance < -swipeThreshold) {
        if (contentScreen.style.display === 'block') {
            hideContentScreen();
        } else if (aboutScreen.style.display === 'block') {
            hideAboutScreen();
        }
    }
}

// Add hover effects for buttons
document.querySelectorAll('.cyber-btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.zIndex = '';
    });
});

// Preload animations
window.addEventListener('load', () => {
    // Add loaded class for smooth animations
    document.body.classList.add('loaded');
});
