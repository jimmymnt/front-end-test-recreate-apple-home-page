// Buttons module
export function initButtons() {
  const buttons = document.querySelectorAll('.btn');
  
  // Add click event listeners to all buttons
  buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
    
    // Add ripple effect for primary and secondary buttons
    if (button.classList.contains('btn--primary') || button.classList.contains('btn--secondary')) {
      button.addEventListener('click', createRippleEffect);
    }
  });
  
  // Handle CTA button specifically
  const ctaButton = document.getElementById('cta-button');
  if (ctaButton) {
    ctaButton.addEventListener('click', handleCTAButtonClick);
  }
}

// Handle button click events
function handleButtonClick(e) {
  const button = e.currentTarget;
  const buttonText = button.textContent;
  
  console.log(`Button clicked: ${buttonText}`);
  
  // Add loading state for buttons that might trigger async actions
  if (button.dataset.loading !== 'true') {
    addLoadingState(button);
    
    // Simulate async action
    setTimeout(() => {
      removeLoadingState(button);
    }, 1000);
  }
}

// Handle CTA button click
function handleCTAButtonClick(e) {
  e.preventDefault();
  
  const button = e.currentTarget;
  const originalText = button.textContent;
  
  // Change button text temporarily
  button.textContent = 'Processing...';
  button.disabled = true;
  
  // Simulate API call or form submission
  setTimeout(() => {
    button.textContent = 'Success!';
    button.classList.add('btn--secondary');
    
    // Reset button after 2 seconds
    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
      button.classList.remove('btn--secondary');
    }, 2000);
  }, 1500);
  
  console.log('CTA button clicked - action completed');
}

// Add loading state to button
function addLoadingState(button) {
  button.dataset.loading = 'true';
  button.disabled = true;
  
  const originalText = button.textContent;
  button.dataset.originalText = originalText;
  
  // Add spinner
  const spinner = document.createElement('span');
  spinner.className = 'btn__spinner';
  spinner.innerHTML = '⏳';
  button.appendChild(spinner);
  
  button.textContent = 'Loading...';
}

// Remove loading state from button
function removeLoadingState(button) {
  button.dataset.loading = 'false';
  button.disabled = false;
  
  const originalText = button.dataset.originalText;
  if (originalText) {
    button.textContent = originalText;
  }
  
  // Remove spinner
  const spinner = button.querySelector('.btn__spinner');
  if (spinner) {
    spinner.remove();
  }
}

// Create ripple effect for button clicks
function createRippleEffect(e) {
  const button = e.currentTarget;
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;
  
  const ripple = document.createElement('span');
  ripple.className = 'btn__ripple';
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  
  button.appendChild(ripple);
  
  // Remove ripple after animation
  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// Utility function to create button dynamically
export function createButton(text, variant = 'primary', size = 'medium', fullWidth = false) {
  const button = document.createElement('button');
  button.textContent = text;
  button.className = `btn btn--${variant}`;
  
  if (size !== 'medium') {
    button.classList.add(`btn--${size}`);
  }
  
  if (fullWidth) {
    button.classList.add('btn--full');
  }
  
  // Add click event listener
  button.addEventListener('click', handleButtonClick);
  
  return button;
}

// Utility function to add button to container
export function addButton(container, text, variant = 'primary', size = 'medium', fullWidth = false) {
  const button = createButton(text, variant, size, fullWidth);
  container.appendChild(button);
  return button;
}

// Button group functionality
export function createButtonGroup(buttons) {
  const group = document.createElement('div');
  group.className = 'btn-group';
  
  buttons.forEach(buttonConfig => {
    const button = createButton(
      buttonConfig.text,
      buttonConfig.variant || 'primary',
      buttonConfig.size || 'medium'
    );
    group.appendChild(button);
  });
  
  return group;
} 