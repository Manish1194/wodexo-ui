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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useWardrobe } from '../../hooks/useWardrobe';
import { THEME_COLORS, COLOR_VARIANTS, AESTHETIC_OPTIONS, PRICING_TIERS } from '../../constants/wardrobe';
import { calculateSquareFootage, formatPrice } from '../../utils/pricingEngine';
import { useNavigate } from 'react-router-dom';

const VENDOR_OPTIONS = [
  { id: 'inhouse', name: 'In-house factory' },
  { id: 'partner_a', name: 'Partner Vendor A' },
  { id: 'partner_b', name: 'Partner Vendor B' },
];

/**
 * QuotePage Component
 * Shows detailed quote with configuration summary and price breakdown
 */
export const QuotePage: React.FC = () => {
  const { state, backToConfig } = useWardrobe();

  const navigate = useNavigate();
  const [selectedVendor, setSelectedVendor] = React.useState<string>('');

  const area = calculateSquareFootage(state.dimensions);

  const widthDisplay = `${state.dimensions.widthFeet}'${state.dimensions.widthInches}"`;
  const heightDisplay = `${state.dimensions.heightFeet}'${state.dimensions.heightInches}"`;
  const depthDisplay = `${state.dimensions.depthFeet}'${state.dimensions.depthInches}"`;

  const innerAggregate = state.innerPartitions && state.innerPartitions.length
    ? state.innerPartitions.reduce(
        (acc, p) => ({
          shelves: acc.shelves + (p.shelves || 0),
          hangings: acc.hangings + (p.hangings || 0),
          drawers: acc.drawers + (p.drawers || 0),
        }),
        { shelves: 0, hangings: 0, drawers: 0 }
      )
    : state.innerStructure;

  const partitionsCount = state.innerPartitions && state.innerPartitions.length ? state.innerPartitions.length : 1;

  const aestheticOption = AESTHETIC_OPTIONS.find((o) => o.value === state.materialConfig.aesthetic);
  const aestheticLabel = aestheticOption?.label || state.materialConfig.aesthetic;

  const designLabelMap: Record<string, string> = {
    solid_plain: 'Solid Plain',
    wood_grain: 'Wood Grain',
    lam_fabric: 'Lam Fabric',
    fluted: 'Fluted',
    flute: 'Flute',
    classical: 'Classical',
    tinted_glass: 'Tinted Glass',
    plain_glass: 'Plain Glass',
  };

  const designLabel = state.materialConfig.aestheticDesign
    ? designLabelMap[state.materialConfig.aestheticDesign] || state.materialConfig.aestheticDesign
    : 'Standard';

  const finishColorOption = COLOR_VARIANTS.find((c) => c.value === state.materialConfig.aestheticColor);
  const finishColorLabel = finishColorOption?.label || state.materialConfig.aestheticColor;

  const baseColorOption = COLOR_VARIANTS.find((c) => c.value === state.materialConfig.baseColor);
  const baseColorLabel = baseColorOption?.label || state.materialConfig.baseColor;

  const mode = state.materialConfig.pricingMode === 'custom' ? 'custom' : 'auto';
  const autoId = state.materialConfig.autoPackage || 'budget';
  const carcaseId = state.materialConfig.carcaseTier || 'budget';
  const hardwareId = state.materialConfig.hardwareTier || 'budget';

  const autoTier = PRICING_TIERS.find((t) => t.id === autoId) || PRICING_TIERS[0];
  const carcaseTier = PRICING_TIERS.find((t) => t.id === carcaseId) || PRICING_TIERS[0];
  const hardwareTier = PRICING_TIERS.find((t) => t.id === hardwareId) || PRICING_TIERS[0];

  const baseMaterialLabel =
    state.materialConfig.baseMaterial === 'particle_board'
      ? 'Particle Board'
      : state.materialConfig.baseMaterial === 'ply'
      ? 'Ply'
      : state.materialConfig.baseMaterial === 'hdhmr'
      ? 'HDHMR'
      : state.materialConfig.baseMaterial;

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
        gap: 1.5,
        p: 2,
        overflow: 'auto',
        background: `linear-gradient(180deg, #FFFFFF 0%, #F8F9FA 100%)`,
        maxWidth: 720,
        mx: 'auto',
        width: '100%',
      }}
    >
      {/* Header with Back Button */}
      <Box sx={{ display: 'flex', alignItems: 'center', pb: 1.5, borderBottom: `1px solid ${alpha(PRIMARY_COLOR, 0.12)}` }}>
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

      <Stack spacing={1.5}>
        {/* Dimensions & Type */}
        <Box>
          <Card sx={{ ...cardStyle, mb: 0.75 }}>
            <CardContent sx={{ py: 1.5, px: 2 }}>
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
          <Card sx={{ ...cardStyle, mb: 0.75 }}>
            <CardContent sx={{ py: 1.5, px: 2 }}>
              <Typography variant="subtitle2" sx={{ color: PRIMARY_COLOR, fontWeight: 600, mb: 1 }}>
                Designing Configuration
              </Typography>
              <Stack direction="row" spacing={2}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" display="block" sx={{ fontWeight: 600, mb: 0.5 }}>Inner Structure</Typography>
                  <Typography variant="body2">Partitions: {partitionsCount}</Typography>
                  <Typography variant="body2">Shelves: {innerAggregate.shelves}</Typography>
                  <Typography variant="body2">Hangings: {innerAggregate.hangings}</Typography>
                  <Typography variant="body2">Drawers: {innerAggregate.drawers}</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" display="block" sx={{ fontWeight: 600, mb: 0.5 }}>Outer Structure</Typography>
                  <Typography variant="body2">Doors: {state.outerStructure.doors}</Typography>
                  <Typography variant="body2">Opening: {state.outerStructure.openingType}</Typography>
                  {/* <Typography variant="body2">Design: {state.outerStructure.design}</Typography> */}
                  <Typography variant="body2">Loft: {state.outerStructure.loft ? 'Yes' : 'No'}</Typography>
                  <Typography variant="body2">Lights: {state.outerStructure.lights ? 'Yes' : 'No'}</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Box>

        {/* Materials & Quote Summary */}
        <Box>
          <Card sx={{ ...cardStyle, mb: 0.75, bgcolor: alpha(PRIMARY_COLOR, 0.08) }}>
            <CardContent sx={{ py: 1.5, px: 2 }}>
              <Typography variant="subtitle2" sx={{ color: PRIMARY_COLOR, fontWeight: 600, mb: 1.5 }}>
                Materials & Quote Summary
              </Typography>
              
              <Stack spacing={1}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">
                    Internal material: {baseMaterialLabel}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">
                    Internal color: {baseColorLabel}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">
                    Finish: {aestheticLabel}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">
                    Design: {designLabel}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">
                    Color: {finishColorLabel}
                  </Typography>
                </Box>

                <Divider sx={{ my: 1 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">
                    Selection Mode
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {mode === 'custom' ? 'Customize your quote' : 'Auto'}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">
                    Package
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {mode === 'custom'
                      ? `Carcase: ${carcaseTier.label} – ${carcaseTier.carcaseMaterialLabel}, Hardware: ${hardwareTier.label} – ${hardwareTier.hardwareCompanyLabel}`
                      : `${autoTier.label} – ${autoTier.carcaseMaterialLabel}, ${autoTier.hardwareCompanyLabel}`}
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

        <Box>
          <Stack spacing={1.5}>
            <FormControl fullWidth size="small">
              <InputLabel id="vendor-select-label">Select vendor</InputLabel>
              <Select
                labelId="vendor-select-label"
                label="Select vendor"
                value={selectedVendor}
                onChange={(e) => setSelectedVendor(e.target.value as string)}
              >
                <MenuItem value="">
                  <em>Select vendor</em>
                </MenuItem>
                {VENDOR_OPTIONS.map((vendor) => (
                  <MenuItem key={vendor.id} value={vendor.id}>
                    {vendor.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              disabled={!selectedVendor}
              sx={{
                mt: 0.5,
                py: 1.2,
                fontWeight: 700,
                fontSize: '0.95rem',
                borderRadius: 999,
              }}
              onClick={() => {
                navigate('/production-confirmation');
              }}
            >
              Proceed to production
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};
