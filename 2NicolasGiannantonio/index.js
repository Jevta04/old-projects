const aboutButton = document.getElementById('about-button');
const closeButton = document.getElementById('close-button');
const aboutAside = document.querySelector('.about-aside');
const blackBg = document.querySelector('.black-bg');
const aboutAsideChildren = aboutAside.querySelectorAll('p, h3');

// --- About panel ---
aboutButton.addEventListener('click', () => {
    aboutAside.style.transform = 'translateX(0)';
    blackBg.style.transform = 'translateX(0)';

    // Stagger children entrance
    aboutAsideChildren.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(18px)';
        el.style.transition = 'none';
        setTimeout(() => {
            el.style.transition = `opacity 0.55s cubic-bezier(.22,1,.36,1) ${i * 80 + 400}ms, transform 0.55s cubic-bezier(.22,1,.36,1) ${i * 80 + 400}ms`;
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 20);
    });
});

function closeAbout() {
    // Exit animation — reverse stagger
    const total = aboutAsideChildren.length;
    aboutAsideChildren.forEach((el, i) => {
        const delay = (total - 1 - i) * 50;
        el.style.transition = `opacity 0.3s cubic-bezier(.55,0,1,.45) ${delay}ms, transform 0.3s cubic-bezier(.55,0,1,.45) ${delay}ms`;
        el.style.opacity = '0';
        el.style.transform = 'translateY(10px)';
    });

    // Slide panel out slightly after text starts fading
    setTimeout(() => {
        aboutAside.style.transform = 'translateX(100%)';
        blackBg.style.transform = 'translateX(100%)';
    }, 120);

    // Reset for next open after panel is fully gone
    setTimeout(() => {
        aboutAsideChildren.forEach(el => {
            el.style.transition = 'none';
            el.style.opacity = '0';
            el.style.transform = 'translateY(18px)';
        });
    }, 1000);
}

closeButton.addEventListener('click', closeAbout);

// Close on black bg click
blackBg.addEventListener('click', closeAbout);


// --- Horizontal scroll with momentum + mouse drag ---
function enableHorizontalScroll(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const items = container.children;
    let currentX = 0;
    let targetX = 0;
    let dragVelocity = 0;
    let animationFrameId = null;

    // Mouse drag state
    let isDragging = false;
    let dragStartX = 0;
    let dragStartTarget = 0;
    let lastDragX = 0;
    let lastDragTime = 0;

    function clamp(val) {
        const maxScroll = 0;
        const minScroll = -(container.scrollWidth - container.clientWidth);
        return Math.max(Math.min(val, maxScroll), minScroll);
    }

    function applyTransform(x) {
        for (let item of items) {
            item.style.transform = `translateX(${x}px)`;
        }
    }

    function render() {
        if (!isDragging) {
            // Apply drag velocity as momentum after release
            targetX += dragVelocity;
            dragVelocity *= 0.88;
        }

        // Smooth lerp toward target
        currentX += (targetX - currentX) * (isDragging ? 0.45 : 0.10);

        currentX = clamp(currentX);
        targetX = clamp(targetX);

        applyTransform(currentX);

        const stillMoving = Math.abs(targetX - currentX) > 0.05 || Math.abs(dragVelocity) > 0.05;
        if (stillMoving || isDragging) {
            animationFrameId = requestAnimationFrame(render);
        } else {
            animationFrameId = null;
        }
    }

    function startRender() {
        if (!animationFrameId) {
            animationFrameId = requestAnimationFrame(render);
        }
    }

    // --- Wheel ---
    container.addEventListener('wheel', (e) => {
        e.preventDefault();
        targetX = clamp(targetX - e.deltaY * 1.2);
        dragVelocity = 0;
        startRender();
    }, { passive: false });

    // --- Mouse drag ---
    container.addEventListener('mousedown', (e) => {
        isDragging = true;
        dragStartX = e.clientX;
        dragStartTarget = targetX;
        lastDragX = e.clientX;
        lastDragTime = performance.now();
        dragVelocity = 0;
        container.style.cursor = 'grabbing';
        startRender();
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const dx = e.clientX - dragStartX;
        targetX = clamp(dragStartTarget + dx * 1.5);

        // Track velocity for post-release momentum
        const now = performance.now();
        const dt = now - lastDragTime;
        if (dt > 0) {
            dragVelocity = (e.clientX - lastDragX) * 1.5 * (16 / dt);
        }
        lastDragX = e.clientX;
        lastDragTime = now;
    });

    window.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        container.style.cursor = '';
        startRender();
    });

    // --- Touch support ---
    let touchStartX = 0;
    let touchStartTarget = 0;
    let lastTouchX = 0;
    let lastTouchTime = 0;

    container.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartTarget = targetX;
        lastTouchX = touchStartX;
        lastTouchTime = performance.now();
        dragVelocity = 0;
        startRender();
    }, { passive: true });

    container.addEventListener('touchmove', (e) => {
        const dx = e.touches[0].clientX - touchStartX;
        targetX = clamp(touchStartTarget + dx * 1.5);

        const now = performance.now();
        const dt = now - lastTouchTime;
        if (dt > 0) {
            dragVelocity = (e.touches[0].clientX - lastTouchX) * 1.5 * (16 / dt);
        }
        lastTouchX = e.touches[0].clientX;
        lastTouchTime = now;
    }, { passive: true });

    container.addEventListener('touchend', () => {
        startRender();
    });
}

enableHorizontalScroll('.img-list');