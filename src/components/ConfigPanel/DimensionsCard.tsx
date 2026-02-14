/**
 * Dimensions Card Component
 * Configuration card for wardrobe dimensions (Width, Height, Depth in feet and inches)
 */

import React from 'react';
import { Card, CardContent, Typography, Box, Stack, alpha, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { THEME_COLORS } from '../../constants/wardrobe';
import { useWardrobe } from '../../hooks/useWardrobe';

/**
 * DimensionsCard Component
 * Displays input fields for width, height, and depth in feet and inches format
 */
export const DimensionsCard: React.FC = () => {
  const { state, setDimensions } = useWardrobe();

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

        <Stack spacing={1.2}>
          <Box>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
              Height
            </Typography>
            <FormControl fullWidth size="small" sx={{ mt: 0.6 }}>
              <InputLabel>Feet</InputLabel>
              <Select
                label="Feet"
                value={state.dimensions.heightFeet}
                onChange={(e) =>
                  setDimensions({
                    ...state.dimensions,
                    heightFeet: Number(e.target.value),
                    heightInches: 0,
                  })
                }
              >
                {[6, 7, 8, 9, 10, 11, 12].map((v) => (
                  <MenuItem key={v} value={v}>{v} ft</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
              Width
            </Typography>
            <FormControl fullWidth size="small" sx={{ mt: 0.6 }}>
              <InputLabel>Feet</InputLabel>
              <Select
                label="Feet"
                value={state.dimensions.widthFeet}
                onChange={(e) =>
                  setDimensions({
                    ...state.dimensions,
                    widthFeet: Number(e.target.value),
                    widthInches: 0,
                  })
                }
              >
                {[3, 6, 9].map((v) => (
                  <MenuItem key={v} value={v}>{v} ft</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
              Depth
            </Typography>
            <FormControl fullWidth size="small" sx={{ mt: 0.6 }}>
              <InputLabel>Feet</InputLabel>
              <Select
                label="Feet"
                value={2}
                onChange={() => {}}
                disabled
              >
                <MenuItem value={2}>2 ft</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};
