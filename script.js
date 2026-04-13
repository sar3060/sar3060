document.addEventListener('DOMContentLoaded', () => {
    initBackground();
    initClickEffect();
    initNavigation();
    initContactForm();
});

function initBackground() {
    const bgButtons = document.querySelectorAll('.bg-btn');
    const body = document.body;

    bgButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            bgButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const bgClass = btn.dataset.bg;
            
            body.classList.remove('gradient1', 'gradient2', 'gradient3', 'stars', 'grid');
            body.classList.add(bgClass);
            
            removeStars();
            
            if (bgClass === 'stars') {
                createStars();
            }
        });
    });

    body.classList.add('gradient1');
}

function createStars() {
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars-bg';
    
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 2 + 's';
        star.style.width = Math.random() * 3 + 1 + 'px';
        star.style.height = star.style.width;
        starsContainer.appendChild(star);
    }
    
    document.body.appendChild(starsContainer);
}

function removeStars() {
    const starsContainer = document.querySelector('.stars-bg');
    if (starsContainer) {
        starsContainer.remove();
    }
}

function initClickEffect() {
    const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#95e1d3', '#a29bfe'];
    
    document.addEventListener('click', (e) => {
        const cursorEffects = document.querySelector('.cursor-effects');
        
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const color = colors[Math.floor(Math.random() * colors.length)];
            particle.style.background = color;
            particle.style.left = e.clientX + 'px';
            particle.style.top = e.clientY + 'px';
            particle.style.transform = 'translate(-50%, -50%) scale(1)';
            
            const angle = (Math.PI * 2 * i) / 12;
            const distance = Math.random() * 80 + 40;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            animateParticle(particle, x, y);
            
            cursorEffects.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 600);
        }
    });
}

function animateParticle(particle, endX, endY) {
    let startTime = null;
    const duration = 600;
    
    function animate(currentTime) {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        
        const currentX = easeProgress * endX;
        const currentY = easeProgress * endY;
        const currentScale = 1 - easeProgress;
        const currentOpacity = 1 - easeProgress;
        
        particle.style.transform = `translate(${currentX}px, ${currentY}px) scale(${currentScale})`;
        particle.style.opacity = currentOpacity;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

function initNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 60;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        alert('消息已发送！感谢你的留言。');
        contactForm.reset();
    });
}