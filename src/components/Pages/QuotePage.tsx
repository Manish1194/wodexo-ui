/**
 * Quote Page Component
 * Displays detailed quote breakdown with configured wardrobe specifications
 */

import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  Stack,
  Grid,
  Chip,
  alpha,
} from '@mui/material';
import { useWardrobe } from '../../hooks/useWardrobe';
import { MATERIAL_OPTIONS, COLOR_OPTIONS, THEME_COLORS } from '../../constants/wardrobe';
import { calculateSquareFootage, getTotalPricePerSqFt } from '../../utils/pricingEngine';

/**
 * QuotePage Component
 * Shows detailed quote with configuration summary and price breakdown
 */
export const QuotePage: React.FC = () => {
  const { state, backToConfig } = useWardrobe();

  const material = MATERIAL_OPTIONS.find((m) => m.value === state.material);
  const color = COLOR_OPTIONS.find((c) => c.value === state.color);
  const area = calculateSquareFootage(state.dimensions);
  const ratePerSqFt = getTotalPricePerSqFt(state.material, state.color);

  const widthDisplay = `${state.dimensions.widthFeet}'${state.dimensions.widthInches}"`;
  const heightDisplay = `${state.dimensions.heightFeet}'${state.dimensions.heightInches}"`;
  const depthDisplay = `${state.dimensions.depthFeet}'${state.dimensions.depthInches}"`;

  const PRIMARY_COLOR = THEME_COLORS.primary;
  const SECONDARY_COLOR = THEME_COLORS.secondary;

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        p: 3,
        overflow: 'auto',
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        backgroundImage: 'linear-gradient(135deg, rgba(46, 125, 50, 0.05) 0%, rgba(211, 47, 47, 0.03) 100%)',
      }}
    >
      {/* Header with Back Button */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          pb: 2,
          borderBottom: `2px solid ${PRIMARY_COLOR}`,
        }}
      >
        <Button
          onClick={backToConfig}
          sx={{
            color: PRIMARY_COLOR,
            textTransform: 'none',
            fontSize: '1rem',
            '&:hover': {
              backgroundColor: alpha(PRIMARY_COLOR, 0.1),
            },
          }}
        >
          ← Back to Configuration
        </Button>
        <Box sx={{ flex: 1 }} />
        <Typography
          sx={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: PRIMARY_COLOR,
          }}
        >
          ✓
        </Typography>
      </Box>

      {/* Quote Title */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          color: PRIMARY_COLOR,
        }}
      >
        Quote Summary
      </Typography>

      {/* Configuration Summary Card */}
      <Card
        sx={{
          backgroundColor: alpha(PRIMARY_COLOR, 0.05),
          border: `1px solid ${alpha(PRIMARY_COLOR, 0.2)}`,
          borderRadius: 2,
          boxShadow: 'none',
        }}
      >
        <CardContent sx={{ p: 2.5 }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              color: PRIMARY_COLOR,
              mb: 2,
            }}
          >
            Configuration Details
          </Typography>

          <Grid container spacing={2}>
            {/* Dimensions */}
            <Grid item xs={12} sm={6}>
              <Box sx={{ mb: 1.5 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                  Width
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {widthDisplay}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ mb: 1.5 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                  Height
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {heightDisplay}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ mb: 1.5 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                  Depth
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {depthDisplay}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ mb: 1.5 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                  Area
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {area.toFixed(2)} sq ft
                </Typography>
              </Box>
            </Grid>

            {/* Material */}
            <Grid item xs={12} sm={6}>
              <Box sx={{ mb: 1.5 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                  Material
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                  <Chip
                    label={material?.name || state.material}
                    variant="outlined"
                    size="small"
                    sx={{
                      backgroundColor: alpha(PRIMARY_COLOR, 0.1),
                      borderColor: PRIMARY_COLOR,
                      color: PRIMARY_COLOR,
                      fontWeight: 600,
                    }}
                  />
                </Box>
              </Box>
            </Grid>

            {/* Color */}
            <Grid item xs={12} sm={6}>
              <Box sx={{ mb: 1.5 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                  Color
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                  {color?.hex && (
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        borderRadius: 1,
                        backgroundColor: color.hex,
                        border: `1px solid ${alpha('#000', 0.2)}`,
                      }}
                    />
                  )}
                  <Chip
                    label={color?.name || state.color}
                    variant="outlined"
                    size="small"
                    sx={{
                      backgroundColor: alpha(color?.hex || PRIMARY_COLOR, 0.1),
                      borderColor: color?.hex || PRIMARY_COLOR,
                      color: PRIMARY_COLOR,
                      fontWeight: 600,
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Price Breakdown Card */}
      <Card
        sx={{
          backgroundColor: alpha(SECONDARY_COLOR, 0.05),
          border: `1px solid ${alpha(SECONDARY_COLOR, 0.2)}`,
          borderRadius: 2,
          boxShadow: 'none',
        }}
      >
        <CardContent sx={{ p: 2.5 }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              color: SECONDARY_COLOR,
              mb: 2,
            }}
          >
            Price Breakdown
          </Typography>

          <Stack spacing={2}>
            {/* Base Rate */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Base Rate per Sq Ft
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                ₹{ratePerSqFt.toFixed(2)}
              </Typography>
            </Box>

            {/* Area Multiplier */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Area ({area.toFixed(2)} sq ft)
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                ₹{(ratePerSqFt * area).toFixed(2)}
              </Typography>
            </Box>

            <Divider sx={{ my: 1 }} />

            {/* Total Price */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2,
                backgroundColor: alpha(SECONDARY_COLOR, 0.1),
                borderRadius: 1,
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 700,
                  color: SECONDARY_COLOR,
                }}
              >
                Total Price
              </Typography>
              <Typography
                sx={{
                  fontSize: '1.75rem',
                  fontWeight: 700,
                  color: SECONDARY_COLOR,
                }}
              >
                ₹{state.price.toLocaleString()}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Stack direction="row" spacing={2} sx={{ mt: 'auto' }}>
        <Button
          variant="outlined"
          onClick={backToConfig}
          fullWidth
          sx={{
            borderColor: PRIMARY_COLOR,
            color: PRIMARY_COLOR,
            textTransform: 'none',
            py: 1.2,
            fontSize: '1rem',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: alpha(PRIMARY_COLOR, 0.1),
              borderColor: PRIMARY_COLOR,
            },
          }}
        >
          Modify Configuration
        </Button>
        <Button
          variant="contained"
          fullWidth
          sx={{
            background: `linear-gradient(135deg, ${PRIMARY_COLOR} 0%, ${alpha(PRIMARY_COLOR, 0.8)} 100%)`,
            textTransform: 'none',
            py: 1.2,
            fontSize: '1rem',
            fontWeight: 600,
            boxShadow: `0 8px 24px ${alpha(PRIMARY_COLOR, 0.3)}`,
            '&:hover': {
              background: `linear-gradient(135deg, ${alpha(PRIMARY_COLOR, 0.9)} 0%, ${alpha(PRIMARY_COLOR, 0.7)} 100%)`,
              boxShadow: `0 12px 32px ${alpha(PRIMARY_COLOR, 0.4)}`,
            },
          }}
        >
          Confirm & Proceed
        </Button>
      </Stack>
    </Box>
  );
};

