// Import SCSS styles
import '../scss/main.scss';

// Import modules
import { initNavigation } from './modules/navigation.js';
import { initButtons } from './modules/buttons.js';
import { initAnimations } from './modules/animations.js';

// Initialize all modules when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Front-End Test Assignment initialized');
  
  // Initialize navigation
  initNavigation();
  
  // Initialize button interactions
  initButtons();
  
  // Initialize animations
  initAnimations();
});

// Export for potential use in other modules
export { initNavigation, initButtons, initAnimations };