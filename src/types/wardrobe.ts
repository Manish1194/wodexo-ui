/**
 * Wardrobe Configurator Type Definitions
 * Centralized type exports for TypeScript support
 */

export type ProductType = 'wardrobe' | 'bar_unit' | 'sneakers_storage' | 'modular_kitchen';

export type BaseMaterialType = 'particle_board' | 'ply' | 'hdhmr';
export type AestheticType = 'laminate' | 'membrane' | 'pu' | 'Acrylic' | 'Wood and glass' | 'Aluminium and glass';
export type HardwareBrandType = 'hafele' | 'blum';

export type ViewSide = 'inner' | 'outer';
export type OpeningType = 'slide' | 'shutter';
export type StructureMode = 'internal' | 'external';

export interface UserProfile {
  gender: 'male' | 'female' | 'other' | '';
  age: number | null;
  heightFt: number | null;
  heightIn: number | null;
  preference: 'hangings' | 'drawers' | 'balanced' | '';
}

export interface InnerStructure {
  shelves: number;
  hangings: number;
  drawers: number;
}

export interface OuterStructure {
  doors: number;
  openingType: OpeningType;
  design: string;
  lights?: boolean;
  loft?: boolean;
  lockerDrawers?: number;
  handleless?: boolean;
}

export interface MaterialConfig {
  baseMaterial: BaseMaterialType;
  baseColor: string;
  aesthetic: AestheticType;
  aestheticColor: string;
  aestheticDesign?: string;
  hardwareBrand: HardwareBrandType;
  pricingMode?: 'auto' | 'custom';
  autoPackage?: 'budget' | 'premium' | 'luxury';
  carcaseTier?: 'budget' | 'premium' | 'luxury';
  hardwareTier?: 'budget' | 'premium' | 'luxury';
  exteriorDesign?: 'pu_panel' | 'wood_glass' | 'aluminium_glass';
  exteriorColors?: { c1: string; c2: string; c3: string };
}

export type MaterialType = BaseMaterialType; // Legacy support alias if needed
export type ColorType = string; // Simplified for now to generic string

export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface ProductOption {
  value: ProductType;
  label: string;
  disabled?: boolean;
}

export interface BaseMaterialOption {
  value: BaseMaterialType;
  label: string;
  pricePerSqFt: number;
}

export interface AestheticOption {
  value: AestheticType;
  label: string;
  pricePerSqFt: number;
  disabled?: boolean;
}

export interface HardwarePriceTier {
  heightFt: number;
  price: number;
}

export interface HardwareOption {
  value: HardwareBrandType;
  label: string;
  prices: HardwarePriceTier[]; // Price based on height
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
  step: number;
  productType: ProductType;
  dimensions: WardrobeDimensions;
  viewSide: ViewSide;
  structureMode: StructureMode;
  innerStructure: InnerStructure;
  innerPartitions?: InnerStructure[]; // optional per-partition controls
  outerStructure: OuterStructure;
  materialConfig: MaterialConfig;
  price: number;
  userProfile: UserProfile;
}

export interface Quote {
  id: string;
  timestamp: Date;
  state: WardrobeState; // Store full state
  price: number;
}

export interface WardrobeContextType {
  state: WardrobeState;
  view: 'config' | 'quote';
  setStep: (step: number) => void;
  setProductType: (type: ProductType) => void;
  setDimensions: (dimensions: WardrobeDimensions) => void;
  setViewSide: (side: ViewSide) => void;
  setInnerStructure: (structure: Partial<InnerStructure>) => void;
  setOuterStructure: (structure: Partial<OuterStructure>) => void;
  setMaterialConfig: (config: Partial<MaterialConfig>) => void;
  handleDimensionChange: (key: keyof WardrobeDimensions, value: string) => void;
  setUserProfile: (profile: Partial<UserProfile>) => void;
  setStructureMode: (mode: StructureMode) => void;
  setInnerPartitions?: (partitions: InnerStructure[]) => void;
  generateQuote: () => void;
  backToConfig: () => void;
}
