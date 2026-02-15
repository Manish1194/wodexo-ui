import React from 'react';
import { Box, Typography, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Stack, Card, CardContent, alpha, Select, MenuItem } from '@mui/material';
import { useWardrobe } from '../../hooks/useWardrobe';
import { THEME_COLORS, PRICING_TIERS } from '../../constants/wardrobe';

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
      <Card sx={cardStyle}>
        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend" sx={{ color: THEME_COLORS.primary, fontWeight: 600, mb: 1 }}>
              How would you like to get your quote?
            </FormLabel>
            <RadioGroup
              row
              value={state.materialConfig.pricingMode || 'auto'}
              onChange={(e) =>
                setMaterialConfig({
                  pricingMode: e.target.value as 'auto' | 'custom',
                })
              }
            >
              <FormControlLabel
                value="auto"
                control={
                  <Radio
                    size="small"
                    sx={{
                      color: THEME_COLORS.primary,
                      '&.Mui-checked': { color: THEME_COLORS.primary },
                    }}
                  />
                }
                label={<Typography variant="body2">Auto</Typography>}
              />
              <FormControlLabel
                value="custom"
                control={
                  <Radio
                    size="small"
                    sx={{
                      color: THEME_COLORS.primary,
                      '&.Mui-checked': { color: THEME_COLORS.primary },
                    }}
                  />
                }
                label={<Typography variant="body2">Customize your quote</Typography>}
              />
            </RadioGroup>
          </FormControl>
        </CardContent>
      </Card>

      {state.materialConfig.pricingMode !== 'custom' && (
        <Card sx={cardStyle}>
          <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
            <FormControl component="fieldset" fullWidth>
              <FormLabel
                component="legend"
                sx={{ color: THEME_COLORS.primary, fontWeight: 600, mb: 1 }}
              >
                Auto package
              </FormLabel>
              <RadioGroup
                row
                value={state.materialConfig.autoPackage || 'budget'}
                onChange={(e) =>
                  setMaterialConfig({
                    autoPackage: e.target.value as 'budget' | 'premium' | 'luxury',
                    carcaseTier: e.target.value as 'budget' | 'premium' | 'luxury',
                    hardwareTier: e.target.value as 'budget' | 'premium' | 'luxury',
                  })
                }
              >
                {PRICING_TIERS.map((tier) => (
                  <FormControlLabel
                    key={tier.id}
                    value={tier.id}
                    control={
                      <Radio
                        size="small"
                        sx={{
                          color: THEME_COLORS.primary,
                          '&.Mui-checked': { color: THEME_COLORS.primary },
                        }}
                      />
                    }
                    label={<Typography variant="body2">{tier.label}</Typography>}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                Selected materials
              </Typography>
              {(() => {
                const tier = PRICING_TIERS.find(
                  (t) => t.id === (state.materialConfig.autoPackage || 'budget')
                ) || PRICING_TIERS[0];
                return (
                  <>
                    <Typography variant="body2">
                      Carcase material: {tier.carcaseMaterialLabel}
                    </Typography>
                    <Typography variant="body2">
                      Shutter finish: {state.materialConfig.aesthetic}
                    </Typography>
                    <Typography variant="body2">
                      Hardware company: {tier.hardwareCompanyLabel}
                    </Typography>
                  </>
                );
              })()}
            </Box>
          </CardContent>
        </Card>
      )}

      {state.materialConfig.pricingMode === 'custom' && (
        <Card sx={cardStyle}>
          <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
            <Stack spacing={2}>
              <FormControl fullWidth size="small">
                <FormLabel
                  component="legend"
                  sx={{ color: THEME_COLORS.primary, fontWeight: 600, mb: 1 }}
                >
                  Carcase
                </FormLabel>
                <Select
                  value={state.materialConfig.carcaseTier || 'budget'}
                  onChange={(e) =>
                    setMaterialConfig({
                      carcaseTier: e.target.value as 'budget' | 'premium' | 'luxury',
                    })
                  }
                >
                  {PRICING_TIERS.map((tier) => (
                    <MenuItem key={tier.id} value={tier.id}>
                      {tier.label} – {tier.carcaseMaterialLabel}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth size="small">
                <FormLabel
                  component="legend"
                  sx={{ color: THEME_COLORS.primary, fontWeight: 600, mb: 1 }}
                >
                  Hardware
                </FormLabel>
                <Select
                  value={state.materialConfig.hardwareTier || 'budget'}
                  onChange={(e) =>
                    setMaterialConfig({
                      hardwareTier: e.target.value as 'budget' | 'premium' | 'luxury',
                    })
                  }
                >
                  {PRICING_TIERS.map((tier) => (
                    <MenuItem key={tier.id} value={tier.id}>
                      {tier.label} – {tier.hardwareCompanyLabel}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </CardContent>
        </Card>
      )}

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
