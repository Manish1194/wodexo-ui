import React from 'react';
import { Typography, Box, Stack, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { useWardrobe } from '../../hooks/useWardrobe';

interface DimensionsCardProps {
  onHelpClick?: () => void;
}

export const DimensionsCard: React.FC<DimensionsCardProps> = ({ onHelpClick }) => {
  const { state, setDimensions } = useWardrobe();

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          📏 Dimensions
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.2, gap: 1.5 }}>
          <Button variant="outlined" size="small">Book Free Consultation</Button>
          {onHelpClick && (
            <Button variant="outlined" size="small" onClick={onHelpClick}>
              Want some help with measurements ?
            </Button>
          )}
        </Box>
      </Box>

      <Stack spacing={1.2}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
            gap: 1.5,
          }}
        >
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
        </Box>
      </Stack>
    </Box>
  );
};
