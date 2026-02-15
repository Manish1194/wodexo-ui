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
  alpha,
} from '@mui/material';
import { useWardrobe } from '../../hooks/useWardrobe';
import { BASE_MATERIAL_OPTIONS, AESTHETIC_OPTIONS, HARDWARE_OPTIONS, THEME_COLORS } from '../../constants/wardrobe';
import { calculateSquareFootage, calculateHardwarePrice, formatPrice } from '../../utils/pricingEngine';

/**
 * QuotePage Component
 * Shows detailed quote with configuration summary and price breakdown
 */
export const QuotePage: React.FC = () => {
  const { state, backToConfig } = useWardrobe();

  const baseMaterial = BASE_MATERIAL_OPTIONS.find((m) => m.value === state.materialConfig.baseMaterial);
  const aesthetic = AESTHETIC_OPTIONS.find((a) => a.value === state.materialConfig.aesthetic);
  const hardware = HARDWARE_OPTIONS.find((h) => h.value === state.materialConfig.hardwareBrand);

  const area = calculateSquareFootage(state.dimensions);
  const hardwarePrice = calculateHardwarePrice(
    state.materialConfig.hardwareBrand, 
    state.dimensions.heightFeet + state.dimensions.heightInches/12
  );

  const widthDisplay = `${state.dimensions.widthFeet}'${state.dimensions.widthInches}"`;
  const heightDisplay = `${state.dimensions.heightFeet}'${state.dimensions.heightInches}"`;
  const depthDisplay = `${state.dimensions.depthFeet}'${state.dimensions.depthInches}"`;

  const PRIMARY_COLOR = THEME_COLORS.primary;

  const cardStyle = {
    mb: 1,
    backgroundColor: alpha(THEME_COLORS.primary, 0.05),
    border: `1px solid ${alpha(THEME_COLORS.primary, 0.2)}`,
    borderRadius: 2,
    boxShadow: 'none',
    transition: 'all 0.3s ease',
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        p: 3,
        overflow: 'auto',
        background: `linear-gradient(180deg, #FFFFFF 0%, #F8F9FA 100%)`,
      }}
    >
      {/* Header with Back Button */}
      <Box sx={{ display: 'flex', alignItems: 'center', pb: 2, borderBottom: `2px solid ${alpha(PRIMARY_COLOR, 0.1)}` }}>
        <Button
          onClick={backToConfig}
          startIcon={<span>←</span>}
          sx={{ 
            color: PRIMARY_COLOR, 
            textTransform: 'none', 
            fontSize: '1rem',
            fontWeight: 600
          }}
        >
          Back to Configuration
        </Button>
        <Box sx={{ flex: 1 }} />
        <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
          Quote Summary
        </Typography>
      </Box>

      <Stack spacing={2}>
        {/* Dimensions & Type */}
        <Box>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography variant="subtitle2" sx={{ color: PRIMARY_COLOR, fontWeight: 600, mb: 1 }}>
                Product & Dimensions
              </Typography>
              <Typography variant="h6" sx={{ textTransform: 'capitalize', fontWeight: 700 }}>
                {state.productType.replace('_', ' ')}
              </Typography>
              <Typography variant="body1" sx={{ mt: 0.5 }}>
                {widthDisplay} (W) x {heightDisplay} (H) x {depthDisplay} (D)
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Total Area: {area.toFixed(2)} sq ft
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Structure */}
        <Box>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography variant="subtitle2" sx={{ color: PRIMARY_COLOR, fontWeight: 600, mb: 1 }}>
                Designing Configuration
              </Typography>
              <Stack direction="row" spacing={2}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" display="block" sx={{ fontWeight: 600, mb: 0.5 }}>Inner Structure</Typography>
                  <Typography variant="body2">Shelves: {state.innerStructure.shelves}</Typography>
                  <Typography variant="body2">Hangings: {state.innerStructure.hangings}</Typography>
                  <Typography variant="body2">Drawers: {state.innerStructure.drawers}</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" display="block" sx={{ fontWeight: 600, mb: 0.5 }}>Outer Structure</Typography>
                  <Typography variant="body2">Doors: {state.outerStructure.doors}</Typography>
                  <Typography variant="body2">Opening: {state.outerStructure.openingType}</Typography>
                  <Typography variant="body2">Design: {state.outerStructure.design}</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Box>

        {/* Materials & Cost Breakdown */}
        <Box>
          <Card sx={{ ...cardStyle, bgcolor: alpha(PRIMARY_COLOR, 0.08) }}>
            <CardContent>
              <Typography variant="subtitle2" sx={{ color: PRIMARY_COLOR, fontWeight: 600, mb: 2 }}>
                Cost Breakdown
              </Typography>
              
              <Stack spacing={1.5}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">
                    Base: {baseMaterial?.label} ({formatPrice(baseMaterial?.pricePerSqFt || 0)}/sq ft)
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {formatPrice(area * (baseMaterial?.pricePerSqFt || 0))}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">
                    Aesthetic: {aesthetic?.label} ({formatPrice(aesthetic?.pricePerSqFt || 0)}/sq ft)
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {formatPrice(area * (aesthetic?.pricePerSqFt || 0))}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">
                    Hardware: {hardware?.label}
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {formatPrice(hardwarePrice)}
                  </Typography>
                </Box>

                <Divider sx={{ my: 1 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" fontWeight={700}>Total Estimated Cost</Typography>
                  <Typography variant="h5" fontWeight={700} color="primary">
                    {formatPrice(state.price)}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Stack>
    </Box>
  );
};
