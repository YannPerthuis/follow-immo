// Content script for Follow Immo Chrome extension
// Handles DOM injection and page interaction on Leboncoin

// Initialize the extension when the page loads
function initializeExtension() {
  // Check if we're on a Leboncoin ad page
  if (window.location.hostname === 'www.leboncoin.fr' && 
      window.location.pathname.includes('/ventes_immobilieres/')) {
    
    console.log('Follow Immo: Detected Leboncoin real estate page');
    
    // Import and initialize the Leboncoin adapter
    import('../front-adapters/leboncoin/inject')
      .then(module => {
        module.initializeLeboncoinInjection();
      })
      .catch(error => {
        console.error('Failed to load Leboncoin adapter:', error);
      });
  }
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeExtension);
} else {
  initializeExtension();
}

export {}; 