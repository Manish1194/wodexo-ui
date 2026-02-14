import React from 'react';
import { Box, Typography, Button, ToggleButton, ToggleButtonGroup, Stack, TextField, FormControl, InputLabel, Select, MenuItem, Slider, Card, CardContent, alpha } from '@mui/material';
import { useWardrobe } from '../../hooks/useWardrobe';
import { THEME_COLORS } from '../../constants/wardrobe';
import { ViewSide, OpeningType } from '../../types/wardrobe';

export const Step2_Structure: React.FC = () => {
  const { state, setStep, setViewSide, setInnerStructure, setOuterStructure } = useWardrobe();

  const handleViewChange = (_: React.MouseEvent<HTMLElement>, newView: ViewSide | null) => {
    if (newView) setViewSide(newView);
  };

  const cardStyle = {
    mb: 1,
    backgroundColor: alpha(THEME_COLORS.primary, 0.05),
    border: `1px solid ${alpha(THEME_COLORS.primary, 0.2)}`,
    borderRadius: 2,
    boxShadow: 'none',
    transition: 'all 0.3s ease',
  };

  return (
    <Stack spacing={2} sx={{ p: 1 }}>
      {/* View Toggle */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
        <ToggleButtonGroup
          value={state.viewSide}
          exclusive
          onChange={handleViewChange}
          aria-label="view side"
          size="small"
          sx={{ 
            bgcolor: 'white',
            '& .MuiToggleButton-root.Mui-selected': {
              bgcolor: alpha(THEME_COLORS.primary, 0.1),
              color: THEME_COLORS.primary,
              fontWeight: 600
            }
          }}
        >
          <ToggleButton value="inner">Inner View</ToggleButton>
          <ToggleButton value="outer">Outer View</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Configuration based on View */}
      {state.viewSide === 'inner' ? (
        <Card sx={cardStyle}>
          <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 3, color: THEME_COLORS.primary }}>
              Inner Structure Config
            </Typography>
            <Stack spacing={4}>
              <Box>
                <Typography gutterBottom variant="body2" color="text.secondary">Shelves: {state.innerStructure.shelves}</Typography>
                <Slider
                  value={state.innerStructure.shelves}
                  onChange={(_, val) => setInnerStructure({ shelves: val as number })}
                  step={1}
                  min={0}
                  max={10}
                  marks
                  valueLabelDisplay="auto"
                  sx={{ color: THEME_COLORS.primary }}
                />
              </Box>
              
              {state.productType === 'wardrobe' && (
                <Box>
                  <Typography gutterBottom variant="body2" color="text.secondary">Hangings: {state.innerStructure.hangings}</Typography>
                  <Slider
                    value={state.innerStructure.hangings}
                    onChange={(_, val) => setInnerStructure({ hangings: val as number })}
                    step={1}
                    min={0}
                    max={5}
                    marks
                    valueLabelDisplay="auto"
                    sx={{ color: THEME_COLORS.primary }}
                  />
                </Box>
              )}

              <Box>
                <Typography gutterBottom variant="body2" color="text.secondary">Drawers: {state.innerStructure.drawers}</Typography>
                <Slider
                  value={state.innerStructure.drawers}
                  onChange={(_, val) => setInnerStructure({ drawers: val as number })}
                  step={1}
                  min={0}
                  max={8}
                  marks
                  valueLabelDisplay="auto"
                  sx={{ color: THEME_COLORS.primary }}
                />
              </Box>
            </Stack>
          </CardContent>
        </Card>
      ) : (
        <Card sx={cardStyle}>
          <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: THEME_COLORS.primary }}>
              Outer Structure Config
            </Typography>
            <Stack spacing={2}>
              <TextField
                label="Number of Doors"
                type="number"
                size="small"
                value={state.outerStructure.doors}
                onChange={(e) => setOuterStructure({ doors: parseInt(e.target.value) || 0 })}
                InputProps={{ inputProps: { min: 1, max: 6 } }}
                fullWidth
                sx={{ bgcolor: 'white' }}
              />
              
              <FormControl fullWidth size="small" sx={{ bgcolor: 'white' }}>
                <InputLabel>Opening Type</InputLabel>
                <Select
                  value={state.outerStructure.openingType}
                  label="Opening Type"
                  onChange={(e) => setOuterStructure({ openingType: e.target.value as OpeningType })}
                >
                  <MenuItem value="slide">Sliding</MenuItem>
                  <MenuItem value="shutter">Shutters (Hinged)</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth size="small" sx={{ bgcolor: 'white' }}>
                <InputLabel>Design Style</InputLabel>
                <Select
                  value={state.outerStructure.design}
                  label="Design Style"
                  onChange={(e) => setOuterStructure({ design: e.target.value })}
                >
                  <MenuItem value="Modern">Modern</MenuItem>
                  <MenuItem value="Classic">Classic</MenuItem>
                  <MenuItem value="Minimalist">Minimalist</MenuItem>
                  <MenuItem value="Contemporary">Contemporary</MenuItem>
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
          onClick={() => setStep(1)}
          sx={{ borderColor: THEME_COLORS.primary, color: THEME_COLORS.primary }}
        >
          Back
        </Button>
        <Button 
          variant="contained" 
          fullWidth 
          onClick={() => setStep(3)}
          sx={{ 
            bgcolor: THEME_COLORS.primary,
            fontWeight: 600,
            '&:hover': { bgcolor: THEME_COLORS.primaryDark }
          }}
        >
          Next: Materials
        </Button>
      </Box>
    </Stack>
  );
};
