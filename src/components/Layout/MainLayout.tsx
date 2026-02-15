/**
 * Main Layout Component
 * Two-column layout: 3D canvas on left, configuration or quote panel on right
 */

import React from 'react';
import { Box } from '@mui/material';
import { CanvasView } from '../3D/CanvasView';
import { ExternalPreview } from '../3D/ExternalPreview';
import { ConfigPanel } from '../ConfigPanel/ConfigPanel';
import { QuotePage } from '../Pages/QuotePage';
import { useWardrobe } from '../../hooks/useWardrobe';

/**
 * MainLayout Component
 * Provides the main structure with 70/30 split between 3D view and dynamic right panel
 * Right panel switches between ConfigPanel (config view) and QuotePage (quote view)
 */
export const MainLayout: React.FC = () => {
  const { view, state } = useWardrobe();
  const stepOne = state.step === 1;
  const stepThree = state.step === 3;
  const hideLeft = (view === 'config' && (stepOne || stepThree)) || view === 'quote';

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        width: '100%',
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
      }}
    >
      {!hideLeft && (
        <Box
          sx={{
            width: '70%',
            bgcolor: '#E3F2FD',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: 'inset -2px 0 4px rgba(0,0,0,0.05)',
          }}
        >
          {view === 'config' && state.step === 2 && state.structureMode === 'external' ? (
            <ExternalPreview />
          ) : (
            <CanvasView />
          )}
        </Box>
      )}

      <Box sx={{ width: hideLeft ? '100%' : '30%', overflow: 'hidden' }}>
        {view === 'config' && <ConfigPanel />}
        {view === 'quote' && <QuotePage />}
      </Box>
    </Box>
  );
};
