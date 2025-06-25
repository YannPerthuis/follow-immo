import React from 'react';
import { createRoot } from 'react-dom/client';
import { SiteAdapter, InsertionStrategy, InjectionResult } from '../ports/siteAdapter';

/**
 * Core injection service - handles all DOM injection logic
 * Site-agnostic and reusable across different adapters
 */
export class InjectionService {
  private static readonly CONTAINER_ID = 'follow-immo-button-container';
  private startTime: number = 0;

  /**
   * Initialize injection for a given site adapter
   */
  async initialize(adapter: SiteAdapter): Promise<InjectionResult> {
    this.startTime = performance.now();
    
    console.log(`Follow Immo: Initializing injection for ${adapter.getSiteName()}`);
    
    // Check if we're on a property detail page
    if (!adapter.isPropertyDetailPage()) {
      console.log('Follow Immo: Not on a property detail page, skipping injection');
      return { success: false, error: 'Not a property detail page' };
    }

    console.log('Follow Immo: Detected property detail page');

    // Check if already injected to prevent duplicates
    if (document.getElementById(InjectionService.CONTAINER_ID)) {
      console.log('Follow Immo: Button already injected');
      return { success: true, strategy: 'already-injected' };
    }

    return this.injectFollowButton(adapter);
  }

  /**
   * Inject the Follow button using the adapter's strategies
   */
  private async injectFollowButton(adapter: SiteAdapter): Promise<InjectionResult> {
    const strategies = adapter.getInsertionStrategies();
    const insertionResult = this.findBestInsertionPoint(strategies);
    
    if (!insertionResult) {
      console.warn('Follow Immo: No suitable insertion point found, retrying...');
      // Retry after DOM settles
      return new Promise(resolve => {
        setTimeout(() => {
          this.injectFollowButton(adapter).then(resolve);
        }, 500);
      });
    }

    // Create optimized container
    const container = this.createButtonContainer();
    
    // Execute insertion strategy
    try {
      this.insertContainer(insertionResult.element, container, insertionResult.strategy);
      console.log(`Follow Immo: Injected using strategy: ${insertionResult.strategy.name}`);
      
      // Render React component
      await this.renderFollowButton(container, adapter);
      
      const totalTime = performance.now() - this.startTime;
      return {
        success: true,
        strategy: insertionResult.strategy.name,
        renderTime: totalTime
      };
      
    } catch (error) {
      console.error('Follow Immo: Injection failed:', error);
      container.remove();
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Find the best insertion point using the provided strategies
   */
  private findBestInsertionPoint(strategies: InsertionStrategy[]): {
    element: Element;
    strategy: InsertionStrategy;
  } | null {
    for (const strategy of strategies) {
      const element = document.querySelector(strategy.selector);
      if (element && this.isElementVisible(element)) {
        return { element, strategy };
      }
    }
    return null;
  }

  /**
   * Check if element is visible and usable for injection
   */
  private isElementVisible(element: Element): boolean {
    const rect = element.getBoundingClientRect();
    const style = window.getComputedStyle(element);
    
    return rect.width > 0 && 
           rect.height > 0 && 
           style.display !== 'none' && 
           style.visibility !== 'hidden' &&
           style.opacity !== '0';
  }

  /**
   * Create optimized button container
   */
  private createButtonContainer(): HTMLDivElement {
    const container = document.createElement('div');
    container.id = InjectionService.CONTAINER_ID;
    
    // Optimized styles for performance and integration
    container.style.cssText = `
      position: relative;
      z-index: 10000;
      margin: 0 10px;
      font-family: inherit;
      isolation: isolate;
    `;
    
    return container;
  }

  /**
   * Insert container using the specified strategy
   */
  private insertContainer(
    targetElement: Element, 
    container: HTMLElement, 
    strategy: InsertionStrategy
  ): void {
    targetElement.insertAdjacentElement(strategy.method, container);
  }

  /**
   * Render Follow button React component with performance tracking
   */
  private async renderFollowButton(container: HTMLElement, adapter: SiteAdapter): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const root = createRoot(container);
        
        // Import the FollowButton component dynamically to avoid circular dependencies
        import('../components/followButton').then(({ FollowButton }) => {
          const propertyData = adapter.extractPropertyData();
          
          root.render(React.createElement(FollowButton, { propertyData }));
          
          // Performance logging
          const totalTime = performance.now() - this.startTime;
          console.log(`Follow Immo: Button rendered in ${totalTime.toFixed(2)}ms`);
          
          // Verify rendering completed successfully with retry logic
          const verifyButton = (attempts = 0) => {
            const button = container.querySelector('button');
            if (button) {
              console.log('Follow Immo: Button successfully rendered and accessible');
              resolve();
            } else if (attempts < 5) {
              console.log(`Follow Immo: Button verification attempt ${attempts + 1}/5`);
              setTimeout(() => verifyButton(attempts + 1), 100);
            } else {
              console.error('Follow Immo: Button rendering verification failed after 5 attempts');
              console.log('Follow Immo: Container content:', container.innerHTML);
              reject(new Error('Button rendering verification failed'));
            }
          };
          
          requestAnimationFrame(() => verifyButton());
        }).catch(reject);
        
      } catch (error) {
        console.error('Follow Immo: React rendering failed:', error);
        reject(error);
      }
    });
  }
} 