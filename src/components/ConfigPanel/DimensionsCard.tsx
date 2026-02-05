/**
 * Dimensions Card Component
 * Configuration card for wardrobe dimensions (Width, Height, Depth in feet and inches)
 */

import React from 'react';
import { TextField, Card, CardContent, Typography, Box, Grid, alpha } from '@mui/material';
import { DIMENSION_CONSTRAINTS, THEME_COLORS } from '../../constants/wardrobe';
import { useWardrobe } from '../../hooks/useWardrobe';

/**
 * DimensionsCard Component
 * Displays input fields for width, height, and depth in feet and inches format
 */
export const DimensionsCard: React.FC = () => {
  const { state, handleDimensionChange } = useWardrobe();

  const dimensionFields = [
    {
      label: 'Width',
      feet: 'widthFeet' as const,
      inches: 'widthInches' as const,
      valueF: state.dimensions.widthFeet,
      valueI: state.dimensions.widthInches,
    },
    {
      label: 'Height',
      feet: 'heightFeet' as const,
      inches: 'heightInches' as const,
      valueF: state.dimensions.heightFeet,
      valueI: state.dimensions.heightInches,
    },
    {
      label: 'Depth',
      feet: 'depthFeet' as const,
      inches: 'depthInches' as const,
      valueF: state.dimensions.depthFeet,
      valueI: state.dimensions.depthInches,
    },
  ];

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
          📏 Dimensions
        </Typography>

        <Grid container spacing={1.2}>
          {dimensionFields.map(({ label, feet, inches, valueF, valueI }) => (
            <Grid item xs={12} key={label}>
              <Box>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                  {label}
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.8, mt: 0.6 }}>
                  <TextField
                    label="Feet"
                    type="number"
                    inputProps={{
                      min: DIMENSION_CONSTRAINTS.feet.min,
                      max: DIMENSION_CONSTRAINTS.feet.max,
                      step: DIMENSION_CONSTRAINTS.feet.step,
                    }}
                    value={valueF}
                    onChange={(e) => handleDimensionChange(feet, e.target.value)}
                    size="small"
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: THEME_COLORS.primary,
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: THEME_COLORS.primary,
                        },
                      },
                    }}
                  />
                  <TextField
                    label="Inches"
                    type="number"
                    inputProps={{
                      min: DIMENSION_CONSTRAINTS.inches.min,
                      max: DIMENSION_CONSTRAINTS.inches.max,
                      step: DIMENSION_CONSTRAINTS.inches.step,
                    }}
                    value={valueI}
                    onChange={(e) => handleDimensionChange(inches, e.target.value)}
                    size="small"
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: THEME_COLORS.primary,
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: THEME_COLORS.primary,
                        },
                      },
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};
