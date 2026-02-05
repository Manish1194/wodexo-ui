/**
 * Color Card Component
 * Configuration card for wardrobe color selection with pricing surcharges
 */

import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Button, alpha } from '@mui/material';
import { COLOR_OPTIONS, THEME_COLORS, APP_CONFIG } from '../../constants/wardrobe';
import { useWardrobe } from '../../hooks/useWardrobe';
import { ColorDialog } from './ColorDialog';

/**
 * ColorCard Component
 * Displays selected color with option to open color picker dialog
 */
export const ColorCard: React.FC = () => {
  const { state, setColor } = useWardrobe();
  const [dialogOpen, setDialogOpen] = useState(false);

  const selectedColorOption = COLOR_OPTIONS.find((col) => col.value === state.color);

  const getPriceLabel = (price: number): string => {
    if (price === 0) return 'Standard';
    if (price > 0) return `+${APP_CONFIG.currency}${price}`;
    return `−${APP_CONFIG.currency}${Math.abs(price)}`;
  };

  return (
    <>
      <Card 
        sx={{ 
          mb: 1,
          backgroundColor: alpha(THEME_COLORS.primary, 0.05),
          border: `1px solid ${alpha(THEME_COLORS.primary, 0.2)}`,
          borderRadius: 2,
          boxShadow: 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <CardContent sx={{ p: 1.5 }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              color: THEME_COLORS.primary,
              mb: 1,
              fontSize: '0.95rem',
            }}
          >
            🎨 Color
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 0.8,
            }}
          >
            {/* Selected Color Circle */}
            <Box
              sx={{
                width: 50,
                height: 50,
                borderRadius: '50%',
                backgroundColor: selectedColorOption?.hex,
                border: `2px solid ${alpha('#000', 0.08)}`,
                boxShadow: `0 2px 0 0 ${alpha('#000', 0.3)}, 0 8px 16px ${alpha('#000', 0.2)}, 0 12px 24px ${alpha('#000', 0.15)}`,
              }}
            />

            {/* Color Info */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                sx={{
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: THEME_COLORS.textPrimary,
                  mb: 0.3,
                }}
              >
                {selectedColorOption?.name}
              </Typography>

              <Box
                sx={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  backgroundColor: alpha(
                    selectedColorOption?.pricePerSqFt! > 0 ? THEME_COLORS.secondary : THEME_COLORS.primary,
                    0.15
                  ),
                  color: selectedColorOption?.pricePerSqFt! > 0 ? THEME_COLORS.secondary : THEME_COLORS.primary,
                  padding: '4px 10px',
                  borderRadius: '10px',
                  display: 'inline-block',
                }}
              >
                {getPriceLabel(selectedColorOption?.pricePerSqFt || 0)}
              </Box>
            </Box>

            {/* Change Color Button */}
            <Button
              onClick={() => setDialogOpen(true)}
              variant="outlined"
              sx={{
                mt: 0.4,
                borderColor: THEME_COLORS.primary,
                color: THEME_COLORS.primary,
                textTransform: 'none',
                fontWeight: 600,
                py: 0.6,
                px: 2.5,
                fontSize: '0.85rem',
                minWidth: '140px',
                '&:hover': {
                  backgroundColor: alpha(THEME_COLORS.primary, 0.08),
                  borderColor: THEME_COLORS.primary,
                },
              }}
            >
              Change Color
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Color Selection Dialog */}
      <ColorDialog
        open={dialogOpen}
        selectedColor={state.color}
        onColorSelect={(color) => setColor(color as any)}
        onClose={() => setDialogOpen(false)}
      />
    </>
  );
};
