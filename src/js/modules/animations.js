// Animations module
export function initAnimations() {
  // Initialize scroll animations
  initScrollAnimations();
  
  // Initialize fade in animations
  initFadeInAnimations();
  
  // Initialize hover animations
  initHoverAnimations();
}

// Scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate--in');
      }
    });
  }, observerOptions);
  
  // Observe elements with animation classes
  const animatedElements = document.querySelectorAll('.feature-card, .card, .section');
  animatedElements.forEach(el => {
    el.classList.add('animate--fade-up');
    observer.observe(el);
  });
}

// Fade in animations
function initFadeInAnimations() {
  const fadeElements = document.querySelectorAll('.hero__title, .hero__description, .btn');
  
  fadeElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, index * 200);
  });
}

// Hover animations
function initHoverAnimations() {
  const hoverElements = document.querySelectorAll('.feature-card, .card');
  
  hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      element.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    element.addEventListener('mouseleave', () => {
      element.style.transform = 'translateY(0) scale(1)';
    });
  });
}

// Utility function to add animation class
export function addAnimationClass(element, animationClass) {
  element.classList.add(animationClass);
}

// Utility function to remove animation class
export function removeAnimationClass(element, animationClass) {
  element.classList.remove(animationClass);
}

// Utility function to animate element
export function animateElement(element, animation, duration = 600) {
  element.style.animation = `${animation} ${duration}ms ease`;
  
  setTimeout(() => {
    element.style.animation = '';
  }, duration);
}

// Parallax effect for hero section
export function initParallax() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    hero.style.transform = `translateY(${rate}px)`;
  });
}

// Smooth reveal animation for sections
export function initRevealAnimations() {
  const sections = document.querySelectorAll('.section');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });
  
  sections.forEach(section => {
    section.classList.add('reveal');
    revealObserver.observe(section);
  });
}

// Counter animation
export function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start);
    }
  }, 16);
}

// Typing animation
export function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Pulse animation for buttons
export function addPulseAnimation(element) {
  element.addEventListener('click', () => {
    element.classList.add('pulse');
    setTimeout(() => {
      element.classList.remove('pulse');
    }, 600);
  });
}

// Shake animation for error states
export function addShakeAnimation(element) {
  element.classList.add('shake');
  setTimeout(() => {
    element.classList.remove('shake');
  }, 600);
}

// Bounce animation for success states
export function addBounceAnimation(element) {
  element.classList.add('bounce');
  setTimeout(() => {
    element.classList.remove('bounce');
  }, 600);
} 