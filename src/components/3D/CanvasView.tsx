/**
 * 3D Canvas Component
 * Wraps Three.js canvas with proper lighting and controls
 */

import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { CANVAS_LIGHTING, THEME_COLORS } from '../../constants/wardrobe';
import { useWardrobe } from '../../hooks/useWardrobe';
import { Wardrobe3D } from './Wardrobe3D';
import { convertToDecimalFeet } from '../../utils/pricingEngine';

/**
 * CanvasView Component
 * Provides 3D visualization with camera controls and lighting
 */
export const CanvasView: React.FC = () => {
  const { state } = useWardrobe();

  // Calculate center of the wardrobe to focus camera
  const height = useMemo(() => 
    convertToDecimalFeet(state.dimensions.heightFeet, state.dimensions.heightInches), 
    [state.dimensions.heightFeet, state.dimensions.heightInches]
  );
  
  const centerTarget: [number, number, number] = [0, height / 2, 0];

  // Initial camera position: Slightly right tilted
  // x > 0 means looking from right
  // z > 0 means looking from front
  // y roughly at center height or slightly above
  const cameraPosition: [number, number, number] = [6, 6, 14];

  return (
    <Canvas
      camera={{ position: cameraPosition, fov: 45 }}
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: THEME_COLORS.skyBlue,
      }}
    >
      {/* Lighting Setup */}
      <ambientLight intensity={CANVAS_LIGHTING.ambient.intensity} />
      <directionalLight
        position={CANVAS_LIGHTING.directional1.position}
        intensity={CANVAS_LIGHTING.directional1.intensity}
        castShadow
      />
      <directionalLight
        position={CANVAS_LIGHTING.directional2.position}
        intensity={CANVAS_LIGHTING.directional2.intensity}
      />
      <pointLight
        position={CANVAS_LIGHTING.pointLight.position}
        intensity={CANVAS_LIGHTING.pointLight.intensity}
      />

      {/* 3D Model */}
      <Wardrobe3D
        productType={state.productType}
        dimensions={state.dimensions}
        config={state.materialConfig}
        viewSide={state.viewSide}
        innerStructure={state.innerStructure}
        outerStructure={state.outerStructure}
      />

      {/* Camera Controls */}
      <OrbitControls autoRotate={false} target={centerTarget} />
    </Canvas>
  );
};
