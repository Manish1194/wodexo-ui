/**
 * Price Card Component
 * Displays calculated price with square footage and breakdown
 */

import React from 'react';
import { Card, CardContent, Typography, Box, Divider } from '@mui/material';
import { THEME_COLORS, APP_CONFIG, MATERIAL_OPTIONS, COLOR_OPTIONS } from '../../constants/wardrobe';
import { useWardrobe } from '../../hooks/useWardrobe';
import { formatPrice, calculateSquareFootage, getTotalPricePerSqFt, getMaterialPrice, getColorPrice } from '../../utils/pricingEngine';

/**
 * PriceCard Component
 * Shows the current calculated price with premium styling and detailed breakdown
 */
export const PriceCard: React.FC = () => {
  const { state } = useWardrobe();

  const sqFt = calculateSquareFootage(state.dimensions);
  const pricePerSqFt = getTotalPricePerSqFt(state.material, state.color);
  const materialPrice = getMaterialPrice(state.material);
  const colorPrice = getColorPrice(state.material);

  const materialName = MATERIAL_OPTIONS.find(m => m.value === state.material)?.name;
  const colorName = COLOR_OPTIONS.find(c => c.value === state.color)?.name;

  return (
    <Card
      sx={{
        background: `linear-gradient(135deg, ${THEME_COLORS.primaryDark} 0%, ${THEME_COLORS.primary} 100%)`,
        color: 'white',
        boxShadow: '0 8px 24px rgba(46, 125, 50, 0.3)',
        borderRadius: '12px',
        transition: 'all 0.3s ease',
      }}
    >
      <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
        <Typography
          sx={{
            textAlign: 'center',
            display: 'block',
            color: '#C8E6C9',
            fontSize: '10px',
            fontWeight: 700,
            mb: 1,
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}
        >
          💰 Total Price
        </Typography>

        {/* Main Price Display */}
        <Typography 
          sx={{ 
            fontWeight: 800, 
            textAlign: 'center', 
            fontSize: '32px',
            mb: 1.2,
            lineHeight: 1,
            textShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
        >
          {formatPrice(state.price, APP_CONFIG.currency)}
        </Typography>

        <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.2)', mb: 1 }} />

        {/* Breakdown Section */}
        <Box sx={{ fontSize: '11px', space: 0.5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.6, alignItems: 'center' }}>
            <Typography sx={{ fontSize: '10px', opacity: 0.95 }}>
              Area
            </Typography>
            <Typography sx={{ fontSize: '11px', fontWeight: 600 }}>
              {sqFt.toFixed(1)} sq.ft
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.6, alignItems: 'center' }}>
            <Typography sx={{ fontSize: '10px', opacity: 0.95 }}>
              {materialName}
            </Typography>
            <Typography sx={{ fontSize: '11px', fontWeight: 600 }}>
              {APP_CONFIG.currency}{materialPrice}/sq.ft
            </Typography>
          </Box>

          {colorPrice !== 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.6, alignItems: 'center' }}>
              <Typography sx={{ fontSize: '10px', opacity: 0.95 }}>
                {colorName}
              </Typography>
              <Typography sx={{ fontSize: '11px', fontWeight: 600 }}>
                {colorPrice > 0 ? '+' : ''}{APP_CONFIG.currency}{colorPrice}
              </Typography>
            </Box>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10px', opacity: 0.9 }}>
            <Typography sx={{ fontSize: '10px' }}>
              Rate
            </Typography>
            <Typography sx={{ fontSize: '11px', fontWeight: 600 }}>
              {APP_CONFIG.currency}{pricePerSqFt}/sq.ft
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
