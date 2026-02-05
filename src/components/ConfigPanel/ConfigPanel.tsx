/**
 * Configuration Panel Component
 * Main container for all configuration options (Dimensions, Material, Color, Price)
 */

import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { THEME_COLORS, APP_CONFIG } from '../../constants/wardrobe';
import { DimensionsCard } from './DimensionsCard';
import { MaterialCard } from './MaterialCard';
import { ColorCard } from './ColorCard';
import { QuoteButton } from './QuoteButton';

/**
 * ConfigPanel Component
 * Orchestrates all configuration cards in a scrollable container
 * Fixed price and quote button at the bottom
 */
export const ConfigPanel: React.FC = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        p: 1.5,
        bgcolor: THEME_COLORS.background,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        background: `linear-gradient(180deg, #FFFFFF 0%, #F8F9FA 100%)`,
      }}
    >
      {/* Header Section */}
      <Box sx={{ mb: 1 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: THEME_COLORS.primary,
            fontSize: '1.25rem',
          }}
        >
          {APP_CONFIG.appName}
        </Typography>
        <Typography
          variant="caption"
          sx={{ 
            color: THEME_COLORS.textSecondary,
            display: 'block',
            mt: 0.3,
          }}
        >
          {APP_CONFIG.appSubtitle}
        </Typography>
        <Box
          sx={{
            width: '40px',
            height: '2px',
            background: `linear-gradient(90deg, ${THEME_COLORS.primary} 0%, ${THEME_COLORS.primaryLight} 100%)`,
            borderRadius: '2px',
            mt: 0.8,
          }}
        />
      </Box>

      <Divider sx={{ mb: 1, opacity: 0.5 }} />

      {/* Main Content Area - No Scroll */}
      <Box 
        sx={{ 
          flex: 1,
          overflowY: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <DimensionsCard />
        <MaterialCard />
        <ColorCard />
      </Box>

      <Divider sx={{ mb: 1, opacity: 0.5 }} />

      {/* Quote Button at bottom - Right Aligned */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <QuoteButton />
      </Box>
    </Box>
  );
};
