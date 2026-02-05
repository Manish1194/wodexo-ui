/**
 * Wardrobe Configurator Type Definitions
 * Centralized type exports for TypeScript support
 */

export type MaterialType = 'mdf' | 'board';

export type ColorType = 
  | 'oak-wood' 
  | 'matte-grey' 
  | 'acrylic-black' 
  | 'walnut-brown' 
  | 'ivory-white';

export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Material {
  value: MaterialType;
  name: string;
  pricePerSqFt: number; // Price per square foot
  roughness: number;
  metalness: number;
}

export interface Color {
  value: ColorType;
  name: string;
  hex: string;
  pricePerSqFt: number; // Additional price per square foot (surcharge)
}

export interface WardrobeDimensions {
  widthFeet: number;
  widthInches: number;
  heightFeet: number;
  heightInches: number;
  depthFeet: number;
  depthInches: number;
}

export interface WardrobeState {
  dimensions: WardrobeDimensions;
  material: MaterialType;
  color: ColorType;
  price: number;
}

export interface Quote {
  id: string;
  timestamp: Date;
  dimensions: WardrobeDimensions;
  material: MaterialType;
  color: ColorType;
  price: number;
}

export interface WardrobeContextType {
  state: WardrobeState;
  view: 'config' | 'quote';
  setDimensions: (dimensions: WardrobeDimensions) => void;
  setMaterial: (material: MaterialType) => void;
  setColor: (color: ColorType) => void;
  handleDimensionChange: (key: keyof WardrobeDimensions, value: string) => void;
  generateQuote: () => void;
  backToConfig: () => void;
}
