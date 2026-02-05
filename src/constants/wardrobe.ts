/**
 * Wardrobe Configurator Constants
 * Central location for all static data: materials, colors, pricing
 */

import { Material, Color } from '../types/wardrobe';

export const MATERIAL_OPTIONS: Material[] = [
  {
    value: 'mdf',
    name: 'MDF',
    pricePerSqFt: 120, // ₹120 per square foot
    roughness: 0.3,
    metalness: 0.1,
  },
  {
    value: 'board',
    name: 'Board',
    pricePerSqFt: 95, // ₹95 per square foot
    roughness: 0.8,
    metalness: 0.0,
  },
];

export const COLOR_OPTIONS: Color[] = [
  {
    value: 'oak-wood',
    name: 'Oak Wood',
    hex: '#8B4513',
    pricePerSqFt: 0, // No surcharge
  },
  {
    value: 'matte-grey',
    name: 'Matte Grey',
    hex: '#A9A9A9',
    pricePerSqFt: -10, // ₹10 discount
  },
  {
    value: 'acrylic-black',
    name: 'Acrylic Black',
    hex: '#000000',
    pricePerSqFt: 25, // ₹25 surcharge
  },
  {
    value: 'walnut-brown',
    name: 'Walnut Brown',
    hex: '#654321',
    pricePerSqFt: 15, // ₹15 surcharge
  },
  {
    value: 'ivory-white',
    name: 'Ivory White',
    hex: '#FFFFF0',
    pricePerSqFt: -5, // ₹5 discount
  },
];

export const THEME_COLORS = {
  primary: '#2E7D32',
  primaryLight: '#4CAF50',
  primaryDark: '#1B5E20',
  secondary: '#D32F2F',
  secondaryLight: '#EF5350',
  secondaryDark: '#B71C1C',
  background: '#F5F5F5',
  surface: '#FFFFFF',
  textPrimary: '#212121',
  textSecondary: '#757575',
  border: '#E0E0E0',
  skyBlue: '#E3F2FD',
};

export const DIMENSION_CONSTRAINTS = {
  feet: { min: 0, max: 20, step: 1 },
  inches: { min: 0, max: 11, step: 1 },
};

export const DEFAULT_DIMENSIONS = {
  widthFeet: 5,
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
  appName: 'SnapSpace',
  appSubtitle: 'Wardrobe Configurator',
  currency: '₹',
};
