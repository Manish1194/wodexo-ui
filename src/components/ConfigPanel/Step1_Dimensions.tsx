import React, { useState } from 'react';
import { Box, Typography, Button, Stack, Card, CardContent, alpha, Dialog, DialogTitle, DialogContent, TextField, ToggleButtonGroup, ToggleButton, Tooltip } from '@mui/material';
import { useWardrobe } from '../../hooks/useWardrobe';
import { DimensionsCard } from './DimensionsCard';
import { THEME_COLORS } from '../../constants/wardrobe';

export const Step1_Dimensions: React.FC = () => {
  const { state, setStep, setOuterStructure, setUserProfile } = useWardrobe();
  const [helpOpen, setHelpOpen] = useState(false);
  const [uploads, setUploads] = useState<File[]>([]);

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
      <Card sx={cardStyle}>
        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: THEME_COLORS.primary }}>
              Measurements Help
            </Typography>
            <Button variant="outlined" onClick={() => setHelpOpen(true)}>Watch Video / Get Help</Button>
          </Box>
        </CardContent>
      </Card>

      <Card sx={cardStyle}>
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'stretch', flexWrap: 'wrap' }}>
            <Box sx={{ flex: '1 1 320px' }}>
              <DimensionsCard />
            </Box>
            <Box sx={{ flex: '1 1 220px', minWidth: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
              <Box
                sx={{
                  width: '100%',
                  maxWidth: 260,
                  height: 300,
                  backgroundImage: `url('https://images.unsplash.com/photo-1613352471549-47698f6f92a7?auto=format&fit=crop&w=600&q=60')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: 2,
                  border: `1px solid ${alpha(THEME_COLORS.primary, 0.2)}`,
                }}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Card sx={cardStyle}>
        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Upload Design (Optional)
          </Typography>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
            <Button variant="outlined" component="label" size="small">
              Upload Room Photos
              <input hidden multiple accept="image/*" type="file" onChange={(e) => setUploads(Array.from(e.target.files || []))} />
            </Button>
            <Button variant="outlined" component="label" size="small">
              Upload AutoCAD
              <input hidden multiple accept=".dwg,.dxf,.pdf" type="file" onChange={(e) => setUploads(Array.from(e.target.files || []))} />
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="caption" color="text.secondary">{uploads.length > 0 ? `${uploads.length} file(s) selected` : 'No files selected'}</Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      <Card sx={cardStyle}>
        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Wardrobe Type
          </Typography>
          <Stack direction="row" spacing={1.5} sx={{ flexWrap: 'wrap' }}>
            <Button variant="outlined" onClick={() => setOuterStructure({ openingType: 'shutter', doors: Math.max(2, state.outerStructure.doors) })}>
              Openable Door
            </Button>
            <Button variant="outlined" onClick={() => setOuterStructure({ openingType: 'slide', doors: Math.max(2, state.outerStructure.doors) })}>
              Sliding Door
            </Button>
            <Button variant="outlined" onClick={() => setOuterStructure({ doors: 0 })}>
              Without Door
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <Card sx={cardStyle}>
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 1.5 }}>
            <TextField label="Gender" placeholder="Male / Female / Other" size="small" onChange={(e) => setUserProfile && setUserProfile({ gender: e.target.value as any })} />
            <TextField label="Age" type="number" size="small" onChange={(e) => setUserProfile && setUserProfile({ age: parseInt(e.target.value || '0', 10) || null })} />
            <TextField label="Height (ft)" type="number" size="small" onChange={(e) => setUserProfile && setUserProfile({ heightFt: parseInt(e.target.value || '0', 10) || null })} />
            <TextField label="Height (in)" type="number" size="small" onChange={(e) => setUserProfile && setUserProfile({ heightIn: parseInt(e.target.value || '0', 10) || null })} />
            <Box>
              <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>Usage Preference</Typography>
              <ToggleButtonGroup size="small" exclusive onChange={(_, val) => val && setUserProfile && setUserProfile({ preference: val })}>
                <ToggleButton value="hangings">More Hanging</ToggleButton>
                <ToggleButton value="balanced">Balanced</ToggleButton>
                <ToggleButton value="drawers">More Drawers</ToggleButton>
              </ToggleButtonGroup>
              <Tooltip title="We use this to suggest internal layout that fits your lifestyle.">
                <Typography variant="caption" sx={{ ml: 1, color: 'text.secondary' }}>i</Typography>
              </Tooltip>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Box sx={{ mt: 'auto', pt: 2, pb: 2 }}>
        <Button 
          variant="contained" 
          fullWidth 
          onClick={() => setStep(2)}
          sx={{ 
            bgcolor: THEME_COLORS.primary,
            py: 1.2,
            fontWeight: 600,
            '&:hover': { bgcolor: THEME_COLORS.primaryDark }
          }}
        >
          Next: Structure
        </Button>
      </Box>

      <Dialog open={helpOpen} onClose={() => setHelpOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>How to Take Measurements</DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
            <Box sx={{ aspectRatio: '16/9', width: '100%' }}>
              <Box component="iframe" src="https://www.youtube.com/embed/qQkQF7b1H5A" title="How to measure wardrobe" width="100%" height="100%" style={{ border: 0 }} />
            </Box>
            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Measure wall-to-wall width, floor-to-ceiling height, and usable depth. Avoid skirting and cornice.
              </Typography>
              <Button variant="outlined" size="small">Book Free Consultation</Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Stack>
  );
};
