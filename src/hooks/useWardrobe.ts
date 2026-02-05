/**
 * useWardrobe Custom Hook
 * Provides easy access to WardrobeContext
 */

import { useContext } from 'react';
import { WardrobeContext } from '../contexts/WardrobeContext';
import { WardrobeContextType } from '../types/wardrobe';

/**
 * Custom hook to access wardrobe context
 * Throws error if used outside of WardrobeProvider
 * 
 * @returns WardrobeContextType with state and actions
 */
export const useWardrobe = (): WardrobeContextType => {
  const context = useContext(WardrobeContext);

  if (!context) {
    throw new Error('useWardrobe must be used within WardrobeProvider');
  }

  return context;
};
