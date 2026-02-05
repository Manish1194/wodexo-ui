/**
 * Wardrobe 3D Mesh Component
 * Renders the 3D wardrobe model with dynamic dimensions and materials
 */

import React, { useMemo } from 'react';
import { Mesh } from 'three';
import { MATERIAL_OPTIONS, COLOR_OPTIONS } from '../../constants/wardrobe';
import { WardrobeDimensions, MaterialType, ColorType } from '../../types/wardrobe';
import { convertToDecimalFeet } from '../../utils/pricingEngine';

interface Wardrobe3DProps {
  dimensions: WardrobeDimensions;
  material: MaterialType;
  color: ColorType;
}

/**
 * Wardrobe3D Component
 * Renders a 3D rectangular mesh representing the wardrobe
 * Updates in real-time when dimensions, material, or color changes
 */
export const Wardrobe3D = React.forwardRef<Mesh, Wardrobe3DProps>(
  ({ dimensions, material, color }, ref) => {
    // Memoize material and color lookup to avoid unnecessary recalculations
    const materialData = useMemo(
      () => MATERIAL_OPTIONS.find((m) => m.value === material),
      [material]
    );

    const colorData = useMemo(
      () => COLOR_OPTIONS.find((c) => c.value === color),
      [color]
    );

    // Convert feet and inches to decimal feet
    const width = useMemo(
      () => convertToDecimalFeet(dimensions.widthFeet, dimensions.widthInches),
      [dimensions.widthFeet, dimensions.widthInches]
    );

    const height = useMemo(
      () => convertToDecimalFeet(dimensions.heightFeet, dimensions.heightInches),
      [dimensions.heightFeet, dimensions.heightInches]
    );

    const depth = useMemo(
      () => convertToDecimalFeet(dimensions.depthFeet, dimensions.depthInches),
      [dimensions.depthFeet, dimensions.depthInches]
    );

    // Early return if data not found
    if (!materialData || !colorData) {
      return null;
    }

    return (
      <mesh ref={ref} position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          color={colorData.hex}
          roughness={materialData.roughness}
          metalness={materialData.metalness}
          side={2} // THREE.DoubleSide for visibility from all angles
        />
      </mesh>
    );
  }
);

Wardrobe3D.displayName = 'Wardrobe3D';
