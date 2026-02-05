/**
 * Color Dialog Component
 * Modal dialog for selecting wardrobe colors with visual swatches
 */

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Box,
  Typography,
  alpha,
} from '@mui/material';
import { COLOR_OPTIONS, THEME_COLORS, APP_CONFIG } from '../../constants/wardrobe';

interface ColorDialogProps {
  open: boolean;
  selectedColor: string;
  onColorSelect: (color: string) => void;
  onClose: () => void;
}

/**
 * ColorDialog Component
 * Displays all color options in a modal with circular swatches
 */
export const ColorDialog: React.FC<ColorDialogProps> = ({
  open,
  selectedColor,
  onColorSelect,
  onClose,
}) => {
  const getPriceLabel = (price: number): string => {
    if (price === 0) return 'Standard';
    if (price > 0) return `+${APP_CONFIG.currency}${price}`;
    return `−${APP_CONFIG.currency}${Math.abs(price)}`;
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          background: `linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%)`,
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 700,
          color: THEME_COLORS.primary,
          fontSize: '1.25rem',
          pb: 1,
        }}
      >
        Select Color
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        <Grid container spacing={3}>
          {COLOR_OPTIONS.map((col) => (
            <Grid item xs={6} sm={4} key={col.value}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1.5,
                  cursor: 'pointer',
                }}
              >
                {/* Color Circle */}
                <Box
                  onClick={() => {
                    onColorSelect(col.value);
                    onClose();
                  }}
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: selectedColor === col.value ? '50%' : '30%',
                    backgroundColor: col.hex,
                    border: `2px solid ${alpha('#000', 0.08)}`,
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: selectedColor === col.value
                      ? `0 2px 0 0 ${alpha('#000', 0.3)}, 0 8px 16px ${alpha('#000', 0.2)}, 0 12px 24px ${alpha('#000', 0.15)}`
                      : `0 2px 6px ${alpha('#000', 0.1)}`,
                    transform: selectedColor === col.value ? 'scale(1.1) translateY(-3px)' : 'scale(1) translateY(0)',
                    '&:hover': {
                      transform: selectedColor === col.value 
                        ? 'scale(1.12) translateY(-5px)' 
                        : 'scale(1.05) translateY(-2px)',
                      boxShadow: selectedColor === col.value
                        ? `0 3px 0 0 ${alpha('#000', 0.35)}, 0 12px 24px ${alpha('#000', 0.25)}, 0 16px 32px ${alpha('#000', 0.15)}`
                        : `0 4px 12px ${alpha('#000', 0.15)}`,
                    },
                  }}
                />

                {/* Color Name */}
                <Typography
                  sx={{
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: THEME_COLORS.textPrimary,
                    textAlign: 'center',
                    width: '100%',
                  }}
                >
                  {col.name}
                </Typography>

                {/* Price Label */}
                <Box
                  sx={{
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    backgroundColor: alpha(
                      col.pricePerSqFt > 0 ? THEME_COLORS.secondary : THEME_COLORS.primary,
                      0.15
                    ),
                    color: col.pricePerSqFt > 0 ? THEME_COLORS.secondary : THEME_COLORS.primary,
                    padding: '4px 10px',
                    borderRadius: '12px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {getPriceLabel(col.pricePerSqFt)}
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button
          onClick={onClose}
          sx={{
            color: THEME_COLORS.textSecondary,
            '&:hover': {
              backgroundColor: alpha(THEME_COLORS.primary, 0.05),
            },
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
