/**
 * Wardrobe Context
 * Centralized state management for the wardrobe configurator
 */

import React, { createContext, useState, useCallback } from 'react';
import {
  WardrobeContextType,
  WardrobeState,
  WardrobeDimensions,
  MaterialType,
  ColorType,
} from '../types/wardrobe';
import { calculatePrice } from '../utils/pricingEngine';
import { DEFAULT_DIMENSIONS, MATERIAL_OPTIONS, COLOR_OPTIONS } from '../constants/wardrobe';

export const WardrobeContext = createContext<WardrobeContextType | undefined>(undefined);

interface WardrobeProviderProps {
  children: React.ReactNode;
}

/**
 * WardrobeProvider component to wrap the application
 * Provides state and functions via context
 */
export const WardrobeProvider: React.FC<WardrobeProviderProps> = ({ children }) => {
  // Initialize state
  const [state, setState] = useState<WardrobeState>({
    dimensions: DEFAULT_DIMENSIONS,
    material: MATERIAL_OPTIONS[0].value as MaterialType,
    color: COLOR_OPTIONS[0].value as ColorType,
    price: calculatePrice(DEFAULT_DIMENSIONS, MATERIAL_OPTIONS[0].value as MaterialType, COLOR_OPTIONS[0].value as ColorType),
  });

  // Track current view (config or quote)
  const [view, setView] = useState<'config' | 'quote'>('config');

  /**
   * Update dimensions and recalculate price
   */
  const setDimensions = useCallback((dimensions: WardrobeDimensions) => {
    setState((prevState) => ({
      ...prevState,
      dimensions,
      price: calculatePrice(dimensions, prevState.material, prevState.color),
    }));
  }, []);

  /**
   * Update material and recalculate price
   */
  const setMaterial = useCallback((material: MaterialType) => {
    setState((prevState) => ({
      ...prevState,
      material,
      price: calculatePrice(prevState.dimensions, material, prevState.color),
    }));
  }, []);

  /**
   * Update color and recalculate price
   */
  const setColor = useCallback((color: ColorType) => {
    setState((prevState) => ({
      ...prevState,
      color,
      price: calculatePrice(prevState.dimensions, prevState.material, color),
    }));
  }, []);

  /**
   * Handle dimension input changes
   * Validates and updates specific dimension property
   */
  const handleDimensionChange = useCallback((key: keyof WardrobeDimensions, value: string) => {
    const numValue = parseInt(value, 10);
    if (isNaN(numValue) || numValue < 0) return;

    setState((prevState) => {
      const newDimensions = {
        ...prevState.dimensions,
        [key]: numValue,
      };

      return {
        ...prevState,
        dimensions: newDimensions,
        price: calculatePrice(newDimensions, prevState.material, prevState.color),
      };
    });
  }, []);

  /**
   * Generate quote - navigate to quote view
   */
  const generateQuote = useCallback(() => {
    console.log('Quote Generated:', state);
    setView('quote');
  }, [state]);

  /**
   * Go back to config view
   */
  const backToConfig = useCallback(() => {
    setView('config');
  }, []);

  const value: WardrobeContextType = {
    state,
    view,
    setDimensions,
    setMaterial,
    setColor,
    handleDimensionChange,
    generateQuote,
    backToConfig,
  };

  return (
    <WardrobeContext.Provider value={value}>
      {children}
    </WardrobeContext.Provider>
  );
};
