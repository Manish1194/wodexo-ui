/**
 * 3D Canvas Component
 * Wraps Three.js canvas with proper lighting and controls
 */

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { CANVAS_LIGHTING, THEME_COLORS } from '../../constants/wardrobe';
import { useWardrobe } from '../../hooks/useWardrobe';
import { Wardrobe3D } from './Wardrobe3D';

/**
 * CanvasView Component
 * Provides 3D visualization with camera controls and lighting
 */
export const CanvasView: React.FC = () => {
  const { state } = useWardrobe();

  return (
    <Canvas
      camera={{ position: [12, 8, 12], fov: 45 }}
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
        dimensions={state.dimensions}
        material={state.material}
        color={state.color}
      />

      {/* Camera Controls */}
      <OrbitControls autoRotate={false} />
    </Canvas>
  );
};
