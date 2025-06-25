import { SiteAdapter, InsertionStrategy, PropertyData } from '../../core/ports/siteAdapter';

/**
 * Leboncoin site adapter
 * Handles only Leboncoin-specific DOM parsing and URL detection
 */
export class LeboncoinAdapter implements SiteAdapter {
  
  getSiteName(): string {
    return 'Leboncoin';
  }

  isPropertyDetailPage(): boolean {
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

  extractPropertyData(): PropertyData | null {
    try {
      // Extract property ID from URL
      const urlMatch = window.location.pathname.match(/\/ad\/ventes_immobilieres\/(\d+)$/);
      const id = urlMatch ? urlMatch[1] : '';

      // Extract title
      const titleElement = document.querySelector('h1[data-test-id="ad-title"]') || 
                          document.querySelector('h1');
      const title = titleElement?.textContent?.trim() || '';

      // Extract price
      const priceElement = document.querySelector('[data-test-id="adview-price"]') ||
                          document.querySelector('.price, [class*="price"]');
      const price = priceElement?.textContent?.trim() || '';

      // Extract location (this is site-specific for Leboncoin)
      const locationElement = document.querySelector('[data-test-id="adview-location"]') ||
                             document.querySelector('.location, [class*="location"]');
      const location = locationElement?.textContent?.trim() || '';

      // Extract image URL
      const imageElement = document.querySelector('[data-test-id="slideshow"] img') ||
                          document.querySelector('.image-gallery img, img[src*="leboncoin"]');
      const imageUrl = imageElement?.getAttribute('src') || '';

      // Extract description
      const descriptionElement = document.querySelector('[data-test-id="ad-description"]') ||
                                document.querySelector('.description, [class*="description"]');
      const description = descriptionElement?.textContent?.trim() || '';

      if (!id || !title) {
        console.warn('Follow Immo: Could not extract required property data');
        return null;
      }

      const propertyData: PropertyData = {
        id,
        title,
        price,
        location,
        url: window.location.href,
        imageUrl: imageUrl || undefined,
        description: description || undefined
      };

      console.log('Follow Immo: Extracted property data:', propertyData);
      return propertyData;

    } catch (error) {
      console.error('Follow Immo: Error extracting property data:', error);
      return null;
    }
  }

  getInsertionStrategies(): InsertionStrategy[] {
    // Ordered list of insertion strategies (best to worst) for Leboncoin
    return [
      {
        name: 'gallery-save-button',
        selector: '[data-pub-id="clicked_annonce_saved_gallery"]',
        method: 'afterend'
      },
      {
        name: 'price-section',
        selector: '[data-test-id="adview-price"]',
        method: 'afterend'
      },
      {
        name: 'title-section', 
        selector: 'h1[data-test-id="ad-title"]',
        method: 'afterend'
      },
      {
        name: 'generic-title',
        selector: 'h1',
        method: 'afterend'
      },
      {
        name: 'main-content',
        selector: 'main, [role="main"]',
        method: 'afterbegin'
      },
      {
        name: 'body-fallback',
        selector: 'body',
        method: 'afterbegin'
      }
    ];
  }
} 