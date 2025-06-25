/**
 * Port (Interface) for site-specific adapters
 * Defines the contract that all site adapters must implement
 */

export interface InsertionStrategy {
  name: string;
  selector: string;
  method: 'beforebegin' | 'afterbegin' | 'beforeend' | 'afterend';
}

export interface PropertyData {
  id: string;
  title: string;
  price: string;
  location: string;
  url: string;
  imageUrl?: string;
  description?: string;
}

export interface SiteAdapter {
  /**
   * Check if current page is a property detail page
   */
  isPropertyDetailPage(): boolean;

  /**
   * Extract property data from the current page
   */
  extractPropertyData(): PropertyData | null;

  /**
   * Get ordered list of insertion strategies for the Follow button
   * Should be ordered from most preferred to least preferred
   */
  getInsertionStrategies(): InsertionStrategy[];

  /**
   * Get site-specific name for logging and identification
   */
  getSiteName(): string;
}

export interface InjectionResult {
  success: boolean;
  strategy?: string;
  error?: string;
  renderTime?: number;
} 