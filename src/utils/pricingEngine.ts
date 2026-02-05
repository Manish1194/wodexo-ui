/**
 * Pricing Engine Utility Functions
 * Calculates wardrobe pricing based on dimensions, material, and color
 */

import { WardrobeDimensions, MaterialType, ColorType } from '../types/wardrobe';
import { MATERIAL_OPTIONS, COLOR_OPTIONS } from '../constants/wardrobe';

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
 * Area = width × depth (in square feet)
 */
export const calculateSquareFootage = (dimensions: WardrobeDimensions): number => {
  const widthFt = convertToDecimalFeet(dimensions.widthFeet, dimensions.widthInches);
  const depthFt = convertToDecimalFeet(dimensions.depthFeet, dimensions.depthInches);
  return widthFt * depthFt;
};

/**
 * Calculate total price based on dimensions, material, and color
 * Formula: squareFootage × (material.pricePerSqFt + color.pricePerSqFt)
 * 
 * @param dimensions - Width, Height, Depth in feet and inches
 * @param material - Selected material type
 * @param color - Selected color type
 * @returns Total price in rupees (rounded)
 */
export const calculatePrice = (
  dimensions: WardrobeDimensions,
  material: MaterialType,
  color: ColorType
): number => {
  // Calculate square footage
  const squareFootage = calculateSquareFootage(dimensions);

  // Find material price
  const materialData = MATERIAL_OPTIONS.find((m) => m.value === material);
  if (!materialData) {
    console.warn(`Material ${material} not found`);
    return 0;
  }

  // Find color price surcharge
  const colorData = COLOR_OPTIONS.find((c) => c.value === color);
  if (!colorData) {
    console.warn(`Color ${color} not found`);
    return 0;
  }

  // Calculate final price
  const pricePerSqFt = materialData.pricePerSqFt + colorData.pricePerSqFt;
  const price = squareFootage * pricePerSqFt;

  // Round to nearest integer
  return Math.round(price);
};

/**
 * Format price with currency symbol and thousands separator
 * 
 * @param price - Price in rupees
 * @param currency - Currency symbol (default: ₹)
 * @returns Formatted price string
 */
export const formatPrice = (price: number, currency: string = '₹'): string => {
  return `${currency}${price.toLocaleString('en-IN')}`;
};

/**
 * Get material price per square foot
 */
export const getMaterialPrice = (material: MaterialType): number => {
  const materialData = MATERIAL_OPTIONS.find((m) => m.value === material);
  return materialData?.pricePerSqFt || 0;
};

/**
 * Get color price surcharge per square foot
 */
export const getColorPrice = (color: ColorType): number => {
  const colorData = COLOR_OPTIONS.find((c) => c.value === color);
  return colorData?.pricePerSqFt || 0;
};

/**
 * Get total price per square foot (material + color)
 */
export const getTotalPricePerSqFt = (material: MaterialType, color: ColorType): number => {
  return getMaterialPrice(material) + getColorPrice(color);
};

/**
 * Generate price breakdown for quote
 */
export const getPriceBreakdown = (
  dimensions: WardrobeDimensions,
  material: MaterialType,
  color: ColorType
) => {
  const squareFootage = calculateSquareFootage(dimensions);
  const materialPrice = getMaterialPrice(material);
  const colorPrice = getColorPrice(color);
  const totalPricePerSqFt = getTotalPricePerSqFt(material, color);
  const finalPrice = calculatePrice(dimensions, material, color);

  return {
    squareFootage: parseFloat(squareFootage.toFixed(2)),
    materialPricePerSqFt: materialPrice,
    colorPricePerSqFt: colorPrice,
    totalPricePerSqFt,
    finalPrice,
  };
};
