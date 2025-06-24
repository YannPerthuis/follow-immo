// Leboncoin-specific DOM UI component injection
// Following cursor rules: Use React for all UI components

import React from 'react';
import { createRoot } from 'react-dom/client';

/**
 * Initialize Leboncoin injection
 * This function is called from the content script when a Leboncoin real estate page is detected
 */
export function initializeLeboncoinInjection(): void {
  console.log('Follow Immo: Initializing Leboncoin injection');
  
  // TODO: Implement Follow button injection
  // This will be expanded in Task 2: Follow Button Injection System
  
  // Check if we're on an ad detail page
  if (isAdDetailPage()) {
    injectFollowButton();
  }
}

/**
 * Check if current page is a Leboncoin ad detail page
 */
function isAdDetailPage(): boolean {
  // Check if URL matches pattern: /ad/ventes_immobilieres/{id}
  return window.location.pathname.startsWith('/ad/ventes_immobilieres/') && 
         window.location.pathname.split('/').length === 4; // ['', 'ad', 'ventes_immobilieres', 'id']
}

/**
 * Inject Follow button into the page
 * Following cursor rules: Use React components and shadcn/ui
 */
function injectFollowButton(): void {
  // Create container for the Follow button
  const container = document.createElement('div');
  container.id = 'follow-immo-button-container';
  container.style.cssText = `
    position: relative;
    z-index: 10000;
    margin: 10px 0;
  `;
  
  // Find insertion point - typically near the title or price
  const targetElement = findInsertionPoint();
  if (targetElement) {
    targetElement.insertAdjacentElement('afterend', container);
    
    // Render React component
    const root = createRoot(container);
    root.render(<FollowButton />);
  }
}

/**
 * Find the best insertion point for the Follow button
 */
function findInsertionPoint(): Element | null {
  // Look for common Leboncoin selectors
  const selectors = [
    '[data-test-id="adview-price"]',
    '.styles_AdviewPrice__BNl_q',
    'h1',
    '.font-bold'
  ];
  
  for (const selector of selectors) {
    const element = document.querySelector(selector);
    if (element) {
      return element;
    }
  }
  
  return null;
}

/**
 * Follow Button React Component
 * Following cursor rules: Use React and shadcn/ui components
 */
function FollowButton(): JSX.Element {
  const handleFollow = () => {
    console.log('Follow button clicked - functionality will be implemented in Task 2');
    // TODO: Implement follow functionality
  };

  return (
    <button
      onClick={handleFollow}
      style={{
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold'
      }}
    >
      🏠 Follow
    </button>
  );
} 