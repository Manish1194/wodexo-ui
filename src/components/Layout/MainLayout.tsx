/**
 * Main Layout Component
 * Two-column layout: 3D canvas on left, configuration or quote panel on right
 */

import React from 'react';
import { Box } from '@mui/material';
import { CanvasView } from '../3D/CanvasView';
import { ConfigPanel } from '../ConfigPanel/ConfigPanel';
import { QuotePage } from '../Pages/QuotePage';
import { useWardrobe } from '../../hooks/useWardrobe';

/**
 * MainLayout Component
 * Provides the main structure with 50/50 split between 3D view and dynamic right panel
 * Right panel switches between ConfigPanel (config view) and QuotePage (quote view)
 */
export const MainLayout: React.FC = () => {
  const { view } = useWardrobe();

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        width: '100%',
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
      }}
    >
      {/* Left Panel - 3D Canvas (Always Visible) */}
      <Box
        sx={{
          width: '50%',
          bgcolor: '#E3F2FD',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: 'inset -2px 0 4px rgba(0,0,0,0.05)',
        }}
      >
        <CanvasView />
      </Box>

      {/* Right Panel - Dynamic Content Based on View */}
      <Box sx={{ width: '50%', overflow: 'hidden' }}>
        {view === 'config' && <ConfigPanel />}
        {view === 'quote' && <QuotePage />}
      </Box>
    </Box>
  );
};
