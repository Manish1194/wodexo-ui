import React, { useState } from 'react';
import { Box, Typography, Button, Stack, Card, CardContent, alpha, Dialog, DialogTitle, DialogContent, TextField, ToggleButtonGroup, ToggleButton, Tooltip, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useWardrobe } from '../../hooks/useWardrobe';
import { DimensionsCard } from './DimensionsCard';
import { THEME_COLORS } from '../../constants/wardrobe';

export const Step1_Dimensions: React.FC = () => {
  const { state, setStep, setOuterStructure, setUserProfile } = useWardrobe();
  const [helpOpen, setHelpOpen] = useState(false);
  const [uploads, setUploads] = useState<File[]>([]);

  const userHeightValue =
    state.userProfile?.heightFt != null && state.userProfile?.heightFt !== undefined
      ? `${state.userProfile.heightFt}-${state.userProfile.heightIn ?? 0}`
      : '';

  const userHeightOptions = [];
  for (let totalIn = 48; totalIn <= 84; totalIn++) {
    const feet = Math.floor(totalIn / 12);
    const inches = totalIn % 12;
    userHeightOptions.push({
      value: `${feet}-${inches}`,
      label: `${feet}' ${inches}"`,
      feet,
      inches,
    });
  }

  const cardStyle = {
    mb: 1,
    backgroundColor: alpha(THEME_COLORS.primary, 0.05),
    border: `1px solid ${alpha(THEME_COLORS.primary, 0.2)}`,
    borderRadius: 2,
    boxShadow: 'none',
    transition: 'all 0.3s ease',
  };

  return (
    <Stack spacing={2} sx={{ p: 1, maxWidth: 720, mx: 'auto', width: '100%' }}>
      <Card sx={cardStyle}>
        <CardContent sx={{ p: 2 }}>
          <DimensionsCard onHelpClick={() => setHelpOpen(true)} />
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
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              User Preference
            </Typography>
            <Tooltip title="We use this info to recommend wardrobe layouts tailored to your lifestyle.">
              <Button size="small" variant="text">
                Wonder why we ask this?
              </Button>
            </Tooltip>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 1.5 }}>
            <FormControl size="small" fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select
                label="Gender"
                value={state.userProfile?.gender ?? ''}
                onChange={(e) => setUserProfile && setUserProfile({ gender: e.target.value as any })}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Age"
              type="number"
              size="small"
              value={state.userProfile?.age ?? ''}
              onChange={(e) => setUserProfile && setUserProfile({ age: parseInt(e.target.value || '0', 10) || null })}
            />
            <FormControl size="small" fullWidth>
              <InputLabel>User Height</InputLabel>
              <Select
                label="User Height"
                value={userHeightValue}
                onChange={(e) => {
                  const [feetStr, inchesStr] = String(e.target.value).split('-');
                  const feet = parseInt(feetStr || '0', 10) || null;
                  const inches = parseInt(inchesStr || '0', 10) || null;
                  setUserProfile &&
                    setUserProfile({
                      heightFt: feet,
                      heightIn: inches,
                    });
                }}
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                {userHeightOptions.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>Usage</Typography>
            <ToggleButtonGroup
              size="small"
              exclusive
              value={state.userProfile?.preference ?? null}
              onChange={(_, val) => {
                if (!val) return;
                setUserProfile && setUserProfile({ preference: val });
              }}
            >
              <ToggleButton value="hangings">More Hanging</ToggleButton>
              <ToggleButton value="balanced">Balanced</ToggleButton>
              <ToggleButton value="drawers">More Drawers</ToggleButton>
            </ToggleButtonGroup>
          </Box>


        </CardContent>
      </Card>

      <Card sx={cardStyle}>
        <CardContent sx={{ p: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Wardrobe Type
          </Typography>
          <Box sx={{ mt: 2 }}>
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
          Next: Designing
        </Button>
      </Box>

      <Dialog open={helpOpen} onClose={() => setHelpOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>How to Take Measurements</DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
            <Box sx={{ aspectRatio: '16/9', width: '100%' }}>
              <Box component="iframe" src="https://www.youtube.com/watch?v=7iMF0PPiRv8&t=58s" title="How to measure wardrobe" width="100%" height="100%" style={{ border: 0 }} />
            </Box>
            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Measure wall-to-wall width, floor-to-ceiling height, and usable depth. Avoid skirting and cornice.
              </Typography>
              
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Stack>
  );
};
