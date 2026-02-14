/**
 * Wardrobe 3D Mesh Component
 * Renders the 3D wardrobe model with dynamic dimensions and materials
 */

import React, { useMemo } from 'react';
import { Group, Mesh } from 'three';
import { AESTHETIC_OPTIONS, COLOR_VARIANTS, BASE_MATERIAL_OPTIONS } from '../../constants/wardrobe';
import { WardrobeDimensions, MaterialConfig, InnerStructure, OuterStructure, ViewSide, ProductType } from '../../types/wardrobe';
import { convertToDecimalFeet } from '../../utils/pricingEngine';

interface Wardrobe3DProps {
  productType: ProductType;
  dimensions: WardrobeDimensions;
  config: MaterialConfig;
  viewSide: ViewSide;
  innerStructure: InnerStructure;
  outerStructure: OuterStructure;
}

const THICKNESS_FT = 0.75 / 12; // 0.75 inch thickness in feet

/**
 * Wardrobe3D Component
 * Renders a 3D model of the wardrobe based on configuration
 */
export const Wardrobe3D = React.forwardRef<Group, Wardrobe3DProps>(
  ({ productType, dimensions, config, viewSide, innerStructure, outerStructure }, ref) => {
    
    // Debug logging
    console.log('Wardrobe3D Render:', { productType, viewSide, innerStructure });

    // --- Data Preparation ---

    // 1. Dimensions
    const width = useMemo(() => convertToDecimalFeet(dimensions.widthFeet, dimensions.widthInches), [dimensions.widthFeet, dimensions.widthInches]);
    const height = useMemo(() => convertToDecimalFeet(dimensions.heightFeet, dimensions.heightInches), [dimensions.heightFeet, dimensions.heightInches]);
    const depth = useMemo(() => convertToDecimalFeet(dimensions.depthFeet, dimensions.depthInches), [dimensions.depthFeet, dimensions.depthInches]);

    // 2. Materials
    const aestheticData = useMemo(() => AESTHETIC_OPTIONS.find((m) => m.value === config.aesthetic), [config.aesthetic]);
    const aestheticColorData = useMemo(() => COLOR_VARIANTS.find((c) => c.value === config.aestheticColor), [config.aestheticColor]);
    const baseColorData = useMemo(() => COLOR_VARIANTS.find((c) => c.value === config.baseColor), [config.baseColor]);

    const outerColorHex = aestheticColorData?.hex || '#ffffff';
    const innerColorHex = baseColorData?.hex || '#ffffff';
    
    const outerRoughness = aestheticData?.roughness ?? 0.5;
    const outerMetalness = aestheticData?.metalness ?? 0;
    
    const innerRoughness = 0.8; // Standard interior roughness
    const innerMetalness = 0.1;

    // --- Rendering Helpers ---

    const renderCarcass = () => (
      <group>
        {/* Back Panel */}
        <mesh position={[0, height / 2, -depth / 2 + THICKNESS_FT / 2]} castShadow receiveShadow>
          <boxGeometry args={[width, height, THICKNESS_FT]} />
          <meshStandardMaterial color={innerColorHex} roughness={innerRoughness} metalness={innerMetalness} />
        </mesh>
        {/* Left Panel */}
        <mesh position={[-width / 2 + THICKNESS_FT / 2, height / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[THICKNESS_FT, height, depth]} />
          <meshStandardMaterial color={innerColorHex} roughness={innerRoughness} metalness={innerMetalness} />
        </mesh>
        {/* Right Panel */}
        <mesh position={[width / 2 - THICKNESS_FT / 2, height / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[THICKNESS_FT, height, depth]} />
          <meshStandardMaterial color={innerColorHex} roughness={innerRoughness} metalness={innerMetalness} />
        </mesh>
        {/* Top Panel */}
        <mesh position={[0, height - THICKNESS_FT / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[width, THICKNESS_FT, depth]} />
          <meshStandardMaterial color={innerColorHex} roughness={innerRoughness} metalness={innerMetalness} />
        </mesh>
        {/* Bottom Panel */}
        <mesh position={[0, THICKNESS_FT / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[width, THICKNESS_FT, depth]} />
          <meshStandardMaterial color={innerColorHex} roughness={innerRoughness} metalness={innerMetalness} />
        </mesh>
      </group>
    );

    const renderShelves = () => {
      if (innerStructure.shelves <= 0) return null;
      
      const availableHeight = height - (2 * THICKNESS_FT);
      const drawerHeight = innerStructure.drawers > 0 ? (innerStructure.drawers * 0.8) : 0; 
      const shelfSpaceHeight = availableHeight - drawerHeight;
      const shelfSpacing = shelfSpaceHeight / (innerStructure.shelves + 1);

      // Sneakers Storage: Slanted shelves
      const isSneakerRack = productType === 'sneakers_storage';
      const shelfRotationX = isSneakerRack ? Math.PI / 6 : 0; // 30 degrees for sneakers
      const shelfDepth = isSneakerRack ? depth * 0.9 : depth - THICKNESS_FT;

      return Array.from({ length: innerStructure.shelves }).map((_, i) => {
        const yPos = THICKNESS_FT + drawerHeight + (shelfSpacing * (i + 1));
        return (
          <mesh 
            key={`shelf-${i}`} 
            position={[0, yPos, 0]} 
            rotation={[shelfRotationX, 0, 0]}
            castShadow 
            receiveShadow
          >
            <boxGeometry args={[width - 2 * THICKNESS_FT, THICKNESS_FT, shelfDepth]} />
            <meshStandardMaterial color={innerColorHex} roughness={innerRoughness} metalness={innerMetalness} />
            
            {/* Lip for Sneaker Rack */}
            {isSneakerRack && (
               <mesh position={[0, THICKNESS_FT/2 + 0.05/2, shelfDepth/2 - 0.02]}>
                  <boxGeometry args={[width - 2 * THICKNESS_FT, 0.05, 0.02]} />
                  <meshStandardMaterial color={innerColorHex} roughness={innerRoughness} metalness={innerMetalness} />
               </mesh>
            )}

            {/* Wine Rack for Bar Unit (on bottom shelves) */}
            {productType === 'bar_unit' && i < 2 && (
               <group position={[0, THICKNESS_FT/2 + 0.15, 0]}>
                 {[-1, 0, 1].map((offset) => (
                    <mesh key={offset} position={[offset * (width/4), 0, 0]} rotation={[Math.PI/2, 0, 0]}>
                      <cylinderGeometry args={[0.15, 0.15, shelfDepth * 0.8, 16]} />
                      <meshStandardMaterial color="#444444" roughness={0.5} metalness={0.5} />
                    </mesh>
                 ))}
               </group>
            )}
          </mesh>
        );
      });
    };

    const renderDrawers = () => {
      // Sneakers Storage usually doesn't have drawers, or very few. 
      // Bar Unit might have them.
      if (innerStructure.drawers <= 0) return null;
      const drawerHeight = 0.8; // ft
      
      return Array.from({ length: innerStructure.drawers }).map((_, i) => {
        const yPos = THICKNESS_FT + (i * drawerHeight) + (drawerHeight / 2);
        return (
          <group key={`drawer-${i}`} position={[0, yPos, 0]}>
             {/* Drawer Front */}
             <mesh position={[0, 0, depth/2 - THICKNESS_FT/2]}>
                <boxGeometry args={[width - 2.2 * THICKNESS_FT, drawerHeight - 0.05, THICKNESS_FT]} />
                <meshStandardMaterial color={innerColorHex} roughness={innerRoughness} metalness={innerMetalness} />
             </mesh>
             {/* Drawer Box Placeholder */}
             <mesh position={[0, 0, 0]}>
                <boxGeometry args={[width - 2.5 * THICKNESS_FT, drawerHeight - 0.1, depth - 2*THICKNESS_FT]} />
                <meshStandardMaterial color="#dddddd" roughness={0.9} />
             </mesh>
          </group>
        );
      });
    };
    
    const renderHangings = () => {
      // Bar Unit and Sneakers Storage do not have hangings
      if (productType !== 'wardrobe') return null;
      if (innerStructure.hangings <= 0) return null;
      
      const rodRadius = 0.05; // ft
      const yPos = height - THICKNESS_FT - 0.5; // 6 inches from top
      
      return (
        <mesh position={[0, yPos, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[rodRadius, rodRadius, width - 2 * THICKNESS_FT, 16]} rotation={[0, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#aaaaaa" metalness={0.8} roughness={0.2} />
        </mesh>
      );
    };

    // Special Rendering for Bar Unit
    const renderBarFeatures = () => {
      if (productType !== 'bar_unit') return null;
      
      return (
         <group>
            {/* Mirror Back Panel */}
            <mesh position={[0, height/2, -depth/2 + THICKNESS_FT + 0.01]}>
               <planeGeometry args={[width - 2*THICKNESS_FT, height - 2*THICKNESS_FT]} />
               <meshStandardMaterial color="#aaddff" metalness={0.9} roughness={0.05} />
            </mesh>
            
            {/* Glass Holder Rack at Top */}
            <group position={[0, height - THICKNESS_FT - 0.5, 0]}>
               {/* Rails */}
               {[-1, -0.5, 0, 0.5, 1].map((x, i) => (
                  <mesh key={i} position={[x * (width/3), 0, 0]}>
                     <boxGeometry args={[0.1, 0.1, depth * 0.8]} />
                     <meshStandardMaterial color="#silver" metalness={0.8} roughness={0.2} />
                  </mesh>
               ))}
            </group>
         </group>
      );
    };

    const renderDoors = () => {
      const count = Math.max(1, outerStructure.doors);
      const doorWidth = width / count;
      const doorHeight = height; // Full height for now
      const doorThickness = THICKNESS_FT;
      
      return Array.from({ length: count }).map((_, i) => {
        // Calculate X position
        // i=0 -> left side. Center of first door is -width/2 + doorWidth/2
        const xPos = (-width / 2) + (doorWidth / 2) + (i * doorWidth);
        
        // Z offset for sliding doors
        let zOffset = depth / 2 + doorThickness / 2;
        if (outerStructure.openingType === 'slide') {
           // Alternate depth for sliding
           zOffset += (i % 2) * doorThickness; 
        }

        return (
          <group key={`door-${i}`} position={[xPos, height / 2, zOffset]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[doorWidth - 0.02, doorHeight, doorThickness]} />
              <meshStandardMaterial color={outerColorHex} roughness={outerRoughness} metalness={outerMetalness} />
            </mesh>
            {/* Handle - Simplified */}
            <mesh position={[outerStructure.openingType === 'slide' ? 0 : (i % 2 === 0 ? 0.3 * doorWidth : -0.3 * doorWidth), 0, doorThickness/2 + 0.02]}>
               <boxGeometry args={[0.05, 1, 0.05]} />
               <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
            </mesh>
          </group>
        );
      });
    };

    return (
      <group ref={ref}>
        {viewSide === 'outer' ? (
           <group>
             {/* Render Carcass (hidden behind doors usually, but good to have edges) */}
             {renderCarcass()}
             {/* Render Doors */}
             {renderDoors()}
           </group>
        ) : (
           <group>
             {/* Render Carcass */}
             {renderCarcass()}
             {/* Render Internals */}
             {renderShelves()}
             {renderDrawers()}
             {renderHangings()}
             {renderBarFeatures()}
           </group>
        )}
      </group>
    );
  }
);

Wardrobe3D.displayName = 'Wardrobe3D';
