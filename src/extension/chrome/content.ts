// Content script for Follow Immo Chrome extension
// Handles DOM injection and page interaction on Leboncoin

console.log('Follow Immo: Content script loaded', window.location.href);

// Performance tracking for <100ms requirement
const startTime = performance.now();

/**
 * Initialize the extension when the page loads
 * Implements robust DOM injection system for Leboncoin ad pages
 */
function initializeExtension(): void {
  console.log('Follow Immo: Initializing extension');
  
  // Check if we're on a Leboncoin ad page with robust URL matching
  if (isLeboncoinAdPage()) {
    console.log('Follow Immo: Detected Leboncoin real estate ad page');
    
    // Load the inject script using chrome.scripting API
    try {
      const script = document.createElement('script');
      script.src = chrome.runtime.getURL('inject.js');
      script.type = 'module';
      script.onload = () => {
        console.log('Follow Immo: Inject script loaded');
        // Try to call the initialization function if it exists
        setTimeout(() => {
          if ((window as any).initializeLeboncoinInjection) {
            console.log('Follow Immo: Calling initializeLeboncoinInjection');
            (window as any).initializeLeboncoinInjection();
          } else {
            console.log('Follow Immo: initializeLeboncoinInjection not found on window');
          }
          const endTime = performance.now();
          console.log(`Follow Immo: Extension initialized in ${(endTime - startTime).toFixed(2)}ms`);
        }, 100);
      };
      script.onerror = (error) => {
        console.error('Follow Immo: Failed to load inject script:', error);
      };
      document.head.appendChild(script);
    } catch (error) {
      console.error('Follow Immo: Failed to inject script:', error);
    }
  } else {
    console.log('Follow Immo: Not on a Leboncoin ad page, skipping injection');
  }
}

/**
 * Check if current page is a Leboncoin real estate ad page
 * Supports URL patterns: /ad/ventes_immobilieres/{id}
 */
function isLeboncoinAdPage(): boolean {
  const { hostname, pathname } = window.location;
  
  console.log(`Follow Immo: Checking URL - hostname: ${hostname} pathname: ${pathname}`);
  
  // Check if we're on leboncoin.fr domain
  if (hostname !== 'www.leboncoin.fr') {
    return false;
  }
  
  // Check if URL matches individual ad pattern
  const adPattern = /^\/ad\/ventes_immobilieres\/\d+$/;
  const isMatch = adPattern.test(pathname);
  
  console.log(`Follow Immo: URL pattern match: ${isMatch}`);
  
  return isMatch;
}

/**
 * Handle URL changes for single-page applications
 * Leboncoin uses client-side routing, so we need to detect navigation
 */
function handleUrlChange(): void {
  console.log('Follow Immo: URL changed to:', window.location.href);
  
  // Debounce to avoid multiple rapid calls
  setTimeout(() => {
    initializeExtension();
  }, 100);
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeExtension);
} else {
  initializeExtension();
}

// Listen for URL changes (for SPAs)
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    handleUrlChange();
  }
}).observe(document, { subtree: true, childList: true });

// Also listen for popstate events (back/forward navigation)
window.addEventListener('popstate', handleUrlChange);

// Listen for pushstate/replacestate (programmatic navigation)
const originalPushState = history.pushState;
const originalReplaceState = history.replaceState;

history.pushState = function(...args) {
  originalPushState.apply(this, args);
  handleUrlChange();
};

history.replaceState = function(...args) {
  originalReplaceState.apply(this, args);
  handleUrlChange();
};

export {}; 