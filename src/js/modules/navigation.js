// Navigation module
export function initNavigation() {
  const navToggle = document.querySelector('.nav__toggle');
  const navMenu = document.querySelector('.nav__menu--main');
  const navLinks = document.querySelectorAll('.nav__menu--main .nav__link');

  if (navToggle && navMenu) {
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
      const isActive = navToggle.classList.contains('active');
      
      if (!isActive) {
        openMenu();
      } else {
        closeMenu();
      }
    });

    // Close menu when clicking links
    navLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Handle resize from mobile to desktop
    window.addEventListener('resize', () => {
      const isMobile = window.innerWidth <= 768; // Match $breakpoint-md
      
      if (!isMobile) {
        // Reset mobile menu state when switching to desktop
        resetMobileMenu();
      }
    });
  }

  // Helper function to reset mobile menu state
  function resetMobileMenu() {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    
    // Clear all inline styles
    navMenu.removeAttribute('style');
    
    // Remove close button if it exists
    const closeButton = navMenu.querySelector('.nav__close-btn');
    if (closeButton) {
      closeButton.remove();
    }
  }

  // Helper function to open menu
  function openMenu() {
    navToggle.classList.add('active');
    navMenu.classList.add('active');
    
    // Set initial styles
    Object.assign(navMenu.style, {
      display: 'flex',
      position: 'fixed',
      top: '-100vh',
      left: '0',
      width: '100vw',
      height: '100vh',
      zIndex: '9999',
      background: 'white',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      padding: '2rem',
      paddingTop: '4rem',
      transition: 'top 0.3s ease-out'
    });

    // Trigger slide down animation
    setTimeout(() => {
      navMenu.style.top = '0';
    }, 10);

    // Add close button
    addCloseButton();
  }

  // Helper function to close menu
  function closeMenu() {
    navMenu.style.top = '-100vh';
    
    setTimeout(() => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      navMenu.style.display = 'none';
      
      // Remove close button if it exists
      const closeButton = navMenu.querySelector('.nav__close-btn');
      if (closeButton) {
        closeButton.remove();
      }
    }, 300);
  }

  // Helper function to add close button
  function addCloseButton() {
    const closeButton = document.createElement('div');
    closeButton.className = 'nav__close-btn';
    closeButton.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6L6 18M6 6L18 18" stroke="#1d1d1f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
    
    Object.assign(closeButton.style, {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      cursor: 'pointer',
      zIndex: '10000',
      padding: '0.5rem',
      borderRadius: '50%',
      transition: 'background-color 0.2s ease'
    });

    // Hover effects
    closeButton.addEventListener('mouseenter', () => {
      closeButton.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
    });

    closeButton.addEventListener('mouseleave', () => {
      closeButton.style.backgroundColor = 'transparent';
    });

    closeButton.addEventListener('click', closeMenu);
    navMenu.appendChild(closeButton);
  }

  // Helper function to reset mobile menu state
  function resetMobileMenu() {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    
    // Clear all inline styles
    navMenu.removeAttribute('style');
    
    // Remove close button if it exists
    const closeButton = navMenu.querySelector('.nav__close-btn');
    if (closeButton) {
      closeButton.remove();
    }
  }
} 