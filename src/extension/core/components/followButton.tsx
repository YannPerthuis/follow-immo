import React from 'react';
import { Heart, Loader2 } from 'lucide-react';
import { PropertyData } from '../ports/siteAdapter';

interface FollowButtonProps {
  propertyData?: PropertyData | null;
}

/**
 * Enhanced Follow Button React Component
 * Core component that handles follow/unfollow functionality
 * Site-agnostic and reusable across different adapters
 * Uses shadcn/ui Button component for consistency
 */
export function FollowButton({ propertyData }: FollowButtonProps): JSX.Element {
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleFollow = async (): Promise<void> => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    console.log('Follow Immo: Follow button clicked', propertyData);
    
    try {
      // TODO: Implement actual follow functionality
      // This will be implemented in Task 2 steps 2-4
      console.log('Follow Immo: Processing follow request...');
      
      if (propertyData) {
        console.log('Follow Immo: Property data:', {
          id: propertyData.id,
          title: propertyData.title,
          price: propertyData.price,
          url: propertyData.url
        });
      }
      
      // Simulate processing
      await new Promise(resolve => setTimeout(resolve, 300));
      
      console.log('Follow Immo: Follow request completed');
    } catch (error) {
      console.error('Follow Immo: Follow request failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <button
      onClick={handleFollow}
      disabled={isProcessing}
      className="mx-2.5 shadow-md inline-flex items-center justify-center h-9 px-3 rounded-md text-sm font-medium text-white disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      style={{
        backgroundColor: isProcessing ? '#6c757d' : '#C70039',
      }}
      onMouseEnter={(e) => {
        if (!isProcessing) {
          e.currentTarget.style.backgroundColor = '#A5002E';
        }
      }}
      onMouseLeave={(e) => {
        if (!isProcessing) {
          e.currentTarget.style.backgroundColor = '#C70039';
        }
      }}
      aria-label="Follow this property listing"
    >
      {isProcessing ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Following...
        </>
      ) : (
        <>
          <Heart className="w-4 h-4 mr-2" />
          Follow
        </>
      )}
    </button>
  );
} 