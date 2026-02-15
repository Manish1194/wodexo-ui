/**
 * Wardrobe Context
 * Centralized state management for the wardrobe configurator
 */

import React, { createContext, useState, useCallback, useEffect } from 'react';
import {
  WardrobeContextType,
  WardrobeState,
  WardrobeDimensions,
  ProductType,
  ViewSide,
  InnerStructure,
  OuterStructure,
  MaterialConfig,
  UserProfile,
  StructureMode,
} from '../types/wardrobe';
import { calculatePrice } from '../utils/pricingEngine';
import { DEFAULT_DIMENSIONS } from '../constants/wardrobe';

export const WardrobeContext = createContext<WardrobeContextType | undefined>(undefined);

interface WardrobeProviderProps {
  children: React.ReactNode;
}

const INITIAL_MATERIAL_CONFIG: MaterialConfig = {
  baseMaterial: 'particle_board',
  baseColor: 'oak',
  aesthetic: 'laminate',
  aestheticDesign: 'solid_plain',
  aestheticColor: 'grey',
  hardwareBrand: 'hafele',
  pricingMode: 'auto',
  autoPackage: 'budget',
  carcaseTier: 'budget',
  hardwareTier: 'budget',
};

const INITIAL_INNER_STRUCTURE: InnerStructure = {
  shelves: 4,
  hangings: 2,
  drawers: 2,
};

const INITIAL_OUTER_STRUCTURE: OuterStructure = {
  doors: 2,
  openingType: 'slide',
  design: 'Modern',
  loft: true,
};

/**
 * WardrobeProvider component to wrap the application
 * Provides state and functions via context
 */
export const WardrobeProvider: React.FC<WardrobeProviderProps> = ({ children }) => {
  // Initialize state
  const [state, setState] = useState<WardrobeState>({
    step: 1,
    productType: 'wardrobe',
    dimensions: DEFAULT_DIMENSIONS,
    viewSide: 'outer',
    structureMode: 'internal',
    innerStructure: INITIAL_INNER_STRUCTURE,
    innerPartitions: undefined,
    outerStructure: INITIAL_OUTER_STRUCTURE,
    materialConfig: INITIAL_MATERIAL_CONFIG,
    price: 0, // Will be calculated immediately
    userProfile: { gender: '', age: null, heightFt: null, heightIn: null, preference: '' },
  });

  // Track current view (config or quote)
  const [view, setView] = useState<'config' | 'quote'>('config');

  // Recalculate price whenever relevant state changes
  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      price: calculatePrice(prevState),
    }));
  }, [state.dimensions, state.materialConfig, state.innerStructure, state.innerPartitions, state.outerStructure]);

  const setStep = useCallback((step: number) => {
    setState((prev) => ({
      ...prev,
      step,
      ...(step === 2 ? { structureMode: 'internal', viewSide: 'inner' } : {}),
    }));
  }, []);

  const setProductType = useCallback((productType: ProductType) => {
    setState((prev) => {
      // Set sensible defaults for inner structure based on product type
      let newInnerStructure = { ...prev.innerStructure };
      
      if (productType === 'sneakers_storage') {
        newInnerStructure = {
          shelves: 6,
          hangings: 0,
          drawers: 0
        };
      } else if (productType === 'bar_unit') {
        newInnerStructure = {
          shelves: 3,
          hangings: 0,
          drawers: 1
        };
      } else if (productType === 'wardrobe') {
        // Restore defaults or keep existing if it makes sense? 
        // Let's reset to standard wardrobe defaults if coming from others
        if (prev.productType !== 'wardrobe') {
           newInnerStructure = {
             shelves: 4,
             hangings: 2,
             drawers: 2
           };
        }
      } 

      return { 
        ...prev, 
        productType,
        innerStructure: newInnerStructure,
        viewSide: 'inner' // Auto-switch to inner view to show structure changes
      };
    });
  }, []);

  const setDimensions = useCallback((dimensions: WardrobeDimensions) => {
    setState((prev) => ({ ...prev, dimensions }));
  }, []);

  const setViewSide = useCallback((viewSide: ViewSide) => {
    setState((prev) => ({ ...prev, viewSide }));
  }, []);

  const setInnerStructure = useCallback((structure: Partial<InnerStructure>) => {
    setState((prev) => ({
      ...prev,
      innerStructure: { ...prev.innerStructure, ...structure },
    }));
  }, []);

  const setOuterStructure = useCallback((structure: Partial<OuterStructure>) => {
    setState((prev) => ({
      ...prev,
      outerStructure: { ...prev.outerStructure, ...structure },
    }));
  }, []);

  const setMaterialConfig = useCallback((config: Partial<MaterialConfig>) => {
    setState((prev) => ({
      ...prev,
      materialConfig: { ...prev.materialConfig, ...config },
    }));
  }, []);

  const handleDimensionChange = useCallback((key: keyof WardrobeDimensions, value: string) => {
    const numValue = parseInt(value, 10);
    if (isNaN(numValue) || numValue < 0) return;

    setState((prev) => {
      const newDimensions = {
        ...prev.dimensions,
        [key]: numValue,
      };
      return { ...prev, dimensions: newDimensions };
    });
  }, []);

  const setUserProfile = useCallback((profile: Partial<UserProfile>) => {
    setState((prev) => ({
      ...prev,
      userProfile: { ...prev.userProfile, ...profile },
    }));
  }, []);

  const setStructureMode = useCallback((mode: StructureMode) => {
    setState((prev) => ({ 
      ...prev, 
      structureMode: mode,
      viewSide: mode === 'internal' ? 'inner' : 'outer'
    }));
  }, []);

  const setInnerPartitions = useCallback((partitions: InnerStructure[]) => {
    setState((prev) => ({ ...prev, innerPartitions: partitions }));
  }, []);

  const generateQuote = useCallback(() => {
    console.log('Quote Generated:', state);
    setView('quote');
  }, [state]);

  const backToConfig = useCallback(() => {
    setView('config');
  }, []);

  const value: WardrobeContextType = {
    state,
    view,
    setStep,
    setProductType,
    setDimensions,
    setViewSide,
    setInnerStructure,
    setOuterStructure,
    setMaterialConfig,
    handleDimensionChange,
    setUserProfile,
    setStructureMode,
    setInnerPartitions,
    generateQuote,
    backToConfig,
  };

  return (
    <WardrobeContext.Provider value={value}>
      {children}
    </WardrobeContext.Provider>
  );
};
