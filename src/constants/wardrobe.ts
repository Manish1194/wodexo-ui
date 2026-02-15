/**
 * Wardrobe Configurator Constants
 * Central location for all static data: materials, colors, pricing
 */

import { BaseMaterialOption, AestheticOption, HardwareOption, ProductOption } from '../types/wardrobe';

export const PRODUCT_OPTIONS: ProductOption[] = [
  { value: 'wardrobe', label: 'Wardrobe' },
  { value: 'bar_unit', label: 'Bar Unit' },
  { value: 'sneakers_storage', label: 'Sneakers Storage' },
  { value: 'modular_kitchen', label: 'Modular Kitchen', disabled: true },
];

export const BASE_MATERIAL_OPTIONS: (BaseMaterialOption & { roughness: number; metalness: number })[] = [
  { value: 'particle_board', label: 'Particle Board', pricePerSqFt: 600, roughness: 0.9, metalness: 0 },
  { value: 'ply', label: 'Ply', pricePerSqFt: 700, roughness: 0.7, metalness: 0 },
  { value: 'hdhmr', label: 'HDHMR', pricePerSqFt: 800, roughness: 0.5, metalness: 0.1 },
];

export const AESTHETIC_OPTIONS: (AestheticOption & { roughness: number; metalness: number })[] = [
  { value: 'laminate', label: 'Laminate', pricePerSqFt: 300, roughness: 0.4, metalness: 0, disabled: false },
  { value: 'pu', label: 'PU', pricePerSqFt: 600, roughness: 0.1, metalness: 0.1, disabled: false  },
  { value: 'Aluminium and glass', label: 'Aluminium and Glass', pricePerSqFt: 800, roughness: 0.6, metalness: 0.3, disabled: false  },
  { value: 'membrane', label: 'Membrane', pricePerSqFt: 250, roughness: 0.6, metalness: 0, disabled: true },
  { value: 'Acrylic', label: 'Acrylic', pricePerSqFt: 500, roughness: 0.3, metalness: 0, disabled: true  },
  { value : 'Wood and glass', label: 'Wood and Glass', pricePerSqFt: 700, roughness: 0.8, metalness: 0.2, disabled: true  }
];

export const HARDWARE_OPTIONS: HardwareOption[] = [
  {
    value: 'hafele',
    label: 'Hafele',
    prices: [
      { heightFt: 6, price: 10000 },
      { heightFt: 7, price: 12000 },
      { heightFt: 8, price: 15000 },
    ],
  },
  {
    value: 'blum',
    label: 'BLUM',
    prices: [
      { heightFt: 6, price: 15000 },
      { heightFt: 7, price: 18000 },
      { heightFt: 8, price: 21000 },
    ],
  },
];

export const COLOR_VARIANTS = [
  { value: 'white', label: 'White', hex: '#FFFFFF' },
  { value: 'grey', label: 'Grey', hex: '#808080' },
  { value: 'black', label: 'Black', hex: '#000000' },
  { value: 'oak', label: 'Oak', hex: '#D2B48C' },
  { value: 'walnut', label: 'Walnut', hex: '#5D4037' },
  { value: 'beige', label: 'Beige', hex: '#F5E3C3' },
  { value: 'warm_white', label: 'Warm White', hex: '#FDF5E6' },
  { value: 'golden', label: 'Golden', hex: '#D4AF37' },
];

export const THEME_COLORS = {
  primary: '#DD2681',
  primaryLight: '#FF5FAE',
  primaryDark: '#B81E6A',
  secondary: '#FF7A00',
  secondaryLight: '#FFB86E',
  secondaryDark: '#E86600',
  background: '#FAFAFA',
  surface: '#FFFFFF',
  textPrimary: '#212121',
  textSecondary: '#616161',
  border: '#E0E0E0',
  skyBlue: '#F5F7FA',
  brandGradientFrom: '#DD2681',
  brandGradientTo: '#FF7A00',
};

export const PRICING_TIERS = [
  {
    id: 'budget',
    label: 'Budget',
    carcaseMaterialLabel: 'Particle board',
    carcaseRatePerSqFt: 400,
    hardwareCompanyLabel: 'Imported (non-branded)',
    drawerRate: 800,
    lightRate: 100,
    handleRate: 200,
    hingeRate: 500,
  },
  {
    id: 'premium',
    label: 'Premium',
    carcaseMaterialLabel: 'HDHMR',
    carcaseRatePerSqFt: 500,
    hardwareCompanyLabel: 'Hafele',
    drawerRate: 1200,
    lightRate: 1000,
    handleRate: 500,
    hingeRate: 1000,
  },
  {
    id: 'luxury',
    label: 'Luxury',
    carcaseMaterialLabel: 'BWP Ply',
    carcaseRatePerSqFt: 800,
    hardwareCompanyLabel: 'Salice',
    drawerRate: 1800,
    lightRate: 1500,
    handleRate: 1500,
    hingeRate: 1200,
  },
];

export const DIMENSION_CONSTRAINTS = {
  feet: { min: 0, max: 20, step: 1 },
  inches: { min: 0, max: 11, step: 1 },
};

export const DEFAULT_DIMENSIONS = {
  widthFeet: 3,
  widthInches: 0,
  heightFeet: 8,
  heightInches: 0,
  depthFeet: 2,
  depthInches: 0,
};

export const CANVAS_LIGHTING = {
  ambient: { intensity: 0.8 },
  directional1: { position: [5, 5, 5] as [number, number, number], intensity: 1 },
  directional2: { position: [-5, 5, -5] as [number, number, number], intensity: 0.5 },
  pointLight: { position: [0, 2, 0] as [number, number, number], intensity: 0.6 },
};

export const APP_CONFIG = {
  appName: 'Wardrobe Configurator',
  appSubtitle: 'Wardrobe Configurator',
  currency: '₹',
};
