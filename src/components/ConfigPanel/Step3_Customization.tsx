import React from 'react';
import { Box, Typography, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Stack, Card, CardContent, alpha, Select, MenuItem } from '@mui/material';
import { useWardrobe } from '../../hooks/useWardrobe';
import { THEME_COLORS, BASE_MATERIAL_OPTIONS, HARDWARE_OPTIONS } from '../../constants/wardrobe';
import { BaseMaterialType, HardwareBrandType } from '../../types/wardrobe';
import { formatPrice } from '../../utils/pricingEngine';

export const Step3_Customization: React.FC = () => {
  const { state, setStep, setMaterialConfig, generateQuote } = useWardrobe();

  const cardStyle = {
    mb: 1,
    backgroundColor: alpha(THEME_COLORS.primary, 0.05),
    border: `1px solid ${alpha(THEME_COLORS.primary, 0.2)}`,
    borderRadius: 2,
    boxShadow: 'none',
    transition: 'all 0.3s ease',
  };

  return (
    <Stack spacing={2} sx={{ p: 1, maxWidth: 720, mx: 'auto', width: '100%'  }}>
      
      {/* Base Material */}
      <Card sx={cardStyle}>
        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
          <FormControl fullWidth size="small">
            <FormLabel component="legend" sx={{ color: THEME_COLORS.primary, fontWeight: 600, mb: 1 }}>Base Material</FormLabel>
            <Select
              value={state.materialConfig.baseMaterial}
              onChange={(e) => setMaterialConfig({ baseMaterial: e.target.value as BaseMaterialType })}
            >
              {BASE_MATERIAL_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label} (₹{option.pricePerSqFt}/sq ft)
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* <Typography variant="caption" sx={{ mb: 1, display: 'block', fontWeight: 600, color: 'text.secondary' }}>Internal Color</Typography>
          <Stack direction="row" spacing={1.5} sx={{ overflowX: 'auto', pb: 0.5 }}>
            {COLOR_VARIANTS.map((color) => (
              <Box
                key={color.value}
                onClick={() => setMaterialConfig({ baseColor: color.value })}
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  bgcolor: color.hex,
                  border: state.materialConfig.baseColor === color.value ? `3px solid ${THEME_COLORS.primary}` : '1px solid #ddd',
                  boxShadow: state.materialConfig.baseColor === color.value ? '0 0 0 2px white inset' : 'none',
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'all 0.2s',
                  '&:hover': { transform: 'scale(1.1)' }
                }}
                title={color.label}
              />
            ))}
          </Stack> */}
        </CardContent>
      </Card>

      {/* Aesthetic */}
      {/* <Card sx={cardStyle}>
        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend" sx={{ color: THEME_COLORS.primary, fontWeight: 600, mb: 1 }}>Aesthetics (Finish)</FormLabel>
            <RadioGroup
              value={state.materialConfig.aesthetic}
              onChange={(e) => setMaterialConfig({ aesthetic: e.target.value as AestheticType })}
            >
              {AESTHETIC_OPTIONS.map((option) => (
                <FormControlLabel 
                  key={option.value} 
                  value={option.value} 
                  control={<Radio size="small" sx={{ color: THEME_COLORS.primary, '&.Mui-checked': { color: THEME_COLORS.primary } }} />} 
                  label={<Typography variant="body2">{option.label} (₹{option.pricePerSqFt}/sq ft)</Typography>} 
                />
              ))}
            </RadioGroup>
          </FormControl>

          <Divider sx={{ my: 1.5 }} />
          
          <Typography variant="caption" sx={{ mb: 1, display: 'block', fontWeight: 600, color: 'text.secondary' }}>Finish Color</Typography>
          <Stack direction="row" spacing={1.5} sx={{ overflowX: 'auto', pb: 0.5 }}>
            {COLOR_VARIANTS.map((color) => (
              <Box
                key={color.value}
                onClick={() => setMaterialConfig({ aestheticColor: color.value })}
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  bgcolor: color.hex,
                  border: state.materialConfig.aestheticColor === color.value ? `3px solid ${THEME_COLORS.primary}` : '1px solid #ddd',
                  boxShadow: state.materialConfig.aestheticColor === color.value ? '0 0 0 2px white inset' : 'none',
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'all 0.2s',
                  '&:hover': { transform: 'scale(1.1)' }
                }}
                title={color.label}
              />
            ))}
          </Stack>
        </CardContent>
      </Card> */}

      {/* Hardware */}
      <Card sx={cardStyle}>
        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend" sx={{ color: THEME_COLORS.primary, fontWeight: 600, mb: 1 }}>Hardware</FormLabel>
            <RadioGroup
              value={state.materialConfig.hardwareBrand}
              onChange={(e) => setMaterialConfig({ hardwareBrand: e.target.value as HardwareBrandType })}
            >
              {HARDWARE_OPTIONS.map((option) => (
                <FormControlLabel 
                  key={option.value} 
                  value={option.value} 
                  control={<Radio size="small" sx={{ color: THEME_COLORS.primary, '&.Mui-checked': { color: THEME_COLORS.primary } }} />} 
                  label={<Typography variant="body2">{option.label}</Typography>} 
                />
              ))}
            </RadioGroup>
          </FormControl>
        </CardContent>
      </Card>

      {/* Price Display */}
      {/* <Card 
        elevation={0}
        sx={{ 
          bgcolor: THEME_COLORS.skyBlue, 
          border: `1px solid ${THEME_COLORS.primary}`,
          textAlign: 'center',
          mt: 2
        }}
      >
        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>Estimated Total Cost</Typography>
          <Typography variant="h4" sx={{ color: THEME_COLORS.primary, fontWeight: 700 }}>
            {formatPrice(state.price)}
          </Typography>
        </CardContent>
      </Card> */}

      {/* Navigation Buttons */}
      <Box sx={{ mt: 'auto', pt: 2, pb: 2, display: 'flex', gap: 2 }}>
        <Button 
          variant="outlined" 
          fullWidth 
          onClick={() => setStep(2)}
          sx={{ borderColor: THEME_COLORS.primary, color: THEME_COLORS.primary }}
        >
          Back
        </Button>
        <Button 
          variant="contained" 
          fullWidth 
          onClick={generateQuote}
          sx={{ 
            bgcolor: THEME_COLORS.secondary,
            fontWeight: 600,
            '&:hover': { bgcolor: THEME_COLORS.secondaryDark }
          }}
        >
          Get Quote
        </Button>
      </Box>
    </Stack>
  );
};
