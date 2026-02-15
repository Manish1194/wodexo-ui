/**
 * Pricing Engine Utility Functions
 * Calculates wardrobe pricing based on dimensions, material, and color
 */

import { WardrobeDimensions, MaterialConfig, WardrobeState } from '../types/wardrobe';
import { PRICING_TIERS } from '../constants/wardrobe';

/**
 * Convert feet and inches to decimal feet
 */
export const convertToDecimalFeet = (feet: number, inches: number): number => {
  return feet + inches / 12;
};

/**
 * Convert decimal feet to feet and inches object
 */
export const convertFromDecimalFeet = (decimalFeet: number): { feet: number; inches: number } => {
  const feet = Math.floor(decimalFeet);
  const inches = Math.round((decimalFeet - feet) * 12);
  return { feet, inches: inches === 12 ? 0 : inches };
};

/**
 * Calculate square footage (footprint area)
 * Area = width × height (user said "Total area = Height * width")
 * Note: Usually wardrobe pricing is based on Frontal Area (Height * Width) for sliding doors/shutters calculation.
 */
export const calculateSquareFootage = (dimensions: WardrobeDimensions): number => {
  const widthFt = convertToDecimalFeet(dimensions.widthFeet, dimensions.widthInches);
  const heightFt = convertToDecimalFeet(dimensions.heightFeet, dimensions.heightInches);
  return widthFt * heightFt;
};

type PackageTier = 'budget' | 'premium' | 'luxury';

const getShutterRate = (aesthetic: string | undefined): number => {
  if (!aesthetic) return 0;
  if (aesthetic === 'laminate') return 300;
  if (aesthetic === 'pu') return 800;
  if (aesthetic === 'Aluminium and glass' || aesthetic === 'Wood and glass') return 900;
  return 0;
};

const getPricingTier = (tier: PackageTier) => {
  return PRICING_TIERS.find((t) => t.id === tier) ?? PRICING_TIERS[0];
};

const getEffectiveTiers = (config: MaterialConfig): { carcaseTier: PackageTier; hardwareTier: PackageTier } => {
  const mode = config.pricingMode ?? 'auto';
  if (mode === 'auto') {
    const pkg: PackageTier = (config.autoPackage as PackageTier) ?? 'budget';
    return { carcaseTier: pkg, hardwareTier: pkg };
  }
  const carcaseTier = (config.carcaseTier as PackageTier) ?? 'budget';
  const hardwareTier = (config.hardwareTier as PackageTier) ?? 'budget';
  return { carcaseTier, hardwareTier };
};

const getWidthFactor = (dimensions: WardrobeDimensions): number => {
  const widthFt = convertToDecimalFeet(dimensions.widthFeet, dimensions.widthInches);
  if (widthFt <= 3) return 1;
  if (widthFt <= 6) return 2;
  return 3;
};

const getHardwareCounts = (state: WardrobeState) => {
  const inner = state.innerPartitions && state.innerPartitions.length > 0 ? state.innerPartitions : [state.innerStructure];
  const drawers = inner.reduce((sum, p) => sum + (p.drawers || 0), 0);

  const doors = state.outerStructure.doors || 0;
  const lights = state.outerStructure.lights ? 1 : 0;

  const widthFt = convertToDecimalFeet(state.dimensions.widthFeet, state.dimensions.widthInches);
  const hinges =
    widthFt <= 3 ? 1 :
    widthFt <= 6 ? 2 :
    3;

  return { drawers, doors, lights, hinges };
};

/**
 * Calculate total price based on dimensions and material config
 * New Formula:
 *   (Area * Carcase_Rate)
 * + (Shutter_Rate * Width_Factor)
 * + Hardware (drawers + lights + handles + hinges)
 */
export const calculatePrice = (state: WardrobeState): number => {
  const { dimensions, materialConfig } = state;

  const area = calculateSquareFootage(dimensions);
  const { carcaseTier, hardwareTier } = getEffectiveTiers(materialConfig);

  const carcaseTierData = getPricingTier(carcaseTier);
  const hardwareTierData = getPricingTier(hardwareTier);

  const carcaseRate = carcaseTierData.carcaseRatePerSqFt;
  const shutterRate = getShutterRate(materialConfig.aesthetic);
  const widthFactor = getWidthFactor(dimensions);

  const { drawers, doors, lights, hinges } = getHardwareCounts(state);

  const carcaseCost = area * carcaseRate;
  const shutterCost = shutterRate * widthFactor;
  const hardwareCost =
    drawers * hardwareTierData.drawerRate +
    lights * hardwareTierData.lightRate +
    doors * hardwareTierData.handleRate +
    hinges * hardwareTierData.hingeRate;

  const totalPrice = carcaseCost + shutterCost + hardwareCost;

  return Math.round(totalPrice);
};

/**
 * Format price with currency symbol and thousands separator
 */
export const formatPrice = (price: number, currency: string = '₹'): string => {
  return `${currency}${price.toLocaleString('en-IN')}`;
};

