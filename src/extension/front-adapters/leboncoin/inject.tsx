// Leboncoin-specific injection entry point
// Delegates all injection logic to core layer following clean architecture

import { InjectionService } from '../../core/services/injectionService';
import { LeboncoinAdapter } from './adapter';

// Performance tracking for <100ms requirement
const injectionStartTime = performance.now();

/**
 * Initialize Leboncoin injection using core injection service
 * This is the entry point for Leboncoin-specific injection
 * All business logic is handled by the core layer
 */
function initializeLeboncoinInjection(): void {
  console.log('Follow Immo: Initializing Leboncoin injection');
  console.log('Follow Immo: Current URL:', window.location.href);
  console.log('Follow Immo: DOM ready state:', document.readyState);

  // Use requestAnimationFrame to ensure DOM is ready
  requestAnimationFrame(async () => {
    try {
      console.log('Follow Immo: Starting injection process...');
      
      // Create Leboncoin adapter (site-specific logic)
      const adapter = new LeboncoinAdapter();
      console.log('Follow Immo: Adapter created');
      
      // Create core injection service (business logic)
      const injectionService = new InjectionService();
      console.log('Follow Immo: Injection service created');
      
      // Initialize injection using the adapter
      console.log('Follow Immo: Calling injection service initialize...');
      const result = await injectionService.initialize(adapter);
      
      if (result.success) {
        const totalTime = performance.now() - injectionStartTime;
        console.log(`Follow Immo: Leboncoin injection completed successfully in ${totalTime.toFixed(2)}ms`);
        console.log(`Follow Immo: Used strategy: ${result.strategy}`);
      } else {
        console.warn(`Follow Immo: Leboncoin injection failed: ${result.error}`);
      }
      
    } catch (error) {
      console.error('Follow Immo: Leboncoin injection error:', error);
      console.error('Follow Immo: Error stack:', error instanceof Error ? error.stack : 'Unknown error');
    }
  });
}

// Expose function on window for content script to call
(window as any).initializeLeboncoinInjection = initializeLeboncoinInjection;

// Auto-initialize when script loads
initializeLeboncoinInjection(); 