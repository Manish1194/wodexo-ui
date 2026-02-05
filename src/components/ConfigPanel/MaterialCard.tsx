/**
 * Material Card Component
 * Configuration card for wardrobe material selection with pricing
 */

import React from 'react';
import { Grid, Button, Card, CardContent, Typography, Box, alpha } from '@mui/material';
import { MATERIAL_OPTIONS, THEME_COLORS, APP_CONFIG } from '../../constants/wardrobe';
import { useWardrobe } from '../../hooks/useWardrobe';

/**
 * MaterialCard Component
 * Displays material options as selectable buttons with price per square foot
 */
export const MaterialCard: React.FC = () => {
  const { state, setMaterial } = useWardrobe();

  return (
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
      <CardContent sx={{ p: 2 }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            color: THEME_COLORS.primary,
            mb: 1.2,
          }}
        >
          🏗️ Material
        </Typography>

        <Grid container spacing={0.8}>
          {MATERIAL_OPTIONS.map((mat) => (
            <Grid item xs={12} key={mat.value}>
              <Button
                onClick={() => setMaterial(mat.value)}
                variant={state.material === mat.value ? 'contained' : 'outlined'}
                fullWidth
                sx={{
                  textTransform: 'none',
                  fontSize: '14px',
                  fontWeight: 600,
                  py: 0.9,
                  px: 2,
                  borderRadius: 1,
                  border: state.material === mat.value ? 'none' : `1.5px solid ${THEME_COLORS.border}`,
                  backgroundColor: state.material === mat.value 
                    ? THEME_COLORS.primary 
                    : 'transparent',
                  color: state.material === mat.value ? 'white' : THEME_COLORS.textPrimary,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  outline: 'none',
                  '&:focus': {
                    outline: 'none',
                  },
                  '&:focus-visible': {
                    outline: 'none',
                  },
                  '&:hover': {
                    backgroundColor: state.material === mat.value 
                      ? THEME_COLORS.primaryDark 
                      : alpha(THEME_COLORS.primary, 0.08),
                    borderColor: THEME_COLORS.primary,
                    transform: 'translateY(-1px)',
                  },
                }}
              >
                <span>{mat.name}</span>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    fontSize: '13px',
                    fontWeight: 600,
                  }}
                >
                  {APP_CONFIG.currency}{mat.pricePerSqFt}/sq.ft
                </Box>
              </Button>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};
