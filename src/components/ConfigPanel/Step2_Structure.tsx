import React, { useMemo, useState, useEffect } from 'react';
import { Box, Typography, Button, ToggleButton, ToggleButtonGroup, Stack, TextField, FormControl, Slider, Card, CardContent, alpha, Switch, FormControlLabel, FormLabel, Divider, Select, MenuItem, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import { useWardrobe } from '../../hooks/useWardrobe';
import { THEME_COLORS, COLOR_VARIANTS, AESTHETIC_OPTIONS } from '../../constants/wardrobe';
import { AestheticType } from '../../types/wardrobe';

export const Step2_Structure: React.FC = () => {
  const { state, setStep, setInnerStructure, setOuterStructure, setStructureMode, setMaterialConfig, setInnerPartitions } = useWardrobe();
  const [activePartition, setActivePartition] = useState(0);
  const [materialHelpOpen, setMaterialHelpOpen] = useState(false);

  const partitionsCount = useMemo(() => {
    const w = state.dimensions.widthFeet || 3;
    return Math.max(1, Math.min(3, Math.round(w / 3)));
  }, [state.dimensions.widthFeet]);

  // Ensure innerPartitions exist and match count
  useEffect(() => {
    if (!state.innerPartitions || state.innerPartitions.length !== partitionsCount) {
      const base = state.innerStructure;
      const list = Array.from({ length: partitionsCount }, () => ({ ...base }));
      setInnerPartitions && setInnerPartitions(list);
    }
    if (activePartition > partitionsCount - 1) setActivePartition(0);
  }, [partitionsCount, state.innerPartitions, state.innerStructure, setInnerPartitions, activePartition]);

  const setPartitionCounts = (patch: Partial<typeof state.innerStructure>) => {
    if (!state.innerPartitions || !setInnerPartitions) {
      // Fallback to global innerStructure
      setInnerStructure(patch as any);
      return;
    }
    const next = state.innerPartitions.map((p, i) => i === activePartition ? { ...p, ...patch } : p);
    setInnerPartitions(next);
  };

  const allowedAestheticColors = useMemo(() => {
    const aesthetic = state.materialConfig.aesthetic;
    const design = state.materialConfig.aestheticDesign;
    if (!aesthetic || !design) return [];
    if (aesthetic === 'laminate' && design === 'solid_plain') return ['grey'];
    if (aesthetic === 'laminate' && design === 'wood_grain') return ['walnut'];
    if (aesthetic === 'laminate' && design === 'lam_fabric') return ['beige'];
    if (aesthetic === 'pu' && design === 'fluted') return ['warm_white'];
    if (aesthetic === 'pu' && design === 'flute') return ['beige', 'walnut'];
    if (aesthetic === 'pu' && design === 'classical') return ['oak'];
    if (aesthetic === 'Aluminium and glass' && design === 'tinted_glass') return ['grey'];
    if (aesthetic === 'Aluminium and glass' && design === 'plain_glass') return ['golden'];
    return [];
  }, [state.materialConfig.aesthetic, state.materialConfig.aestheticDesign]);

  useEffect(() => {
    if (!state.materialConfig.aestheticDesign || allowedAestheticColors.length === 0) return;
    if (!allowedAestheticColors.includes(state.materialConfig.aestheticColor)) {
      setMaterialConfig({ aestheticColor: allowedAestheticColors[0] });
    }
  }, [allowedAestheticColors, setMaterialConfig, state.materialConfig.aestheticColor, state.materialConfig.aestheticDesign]);

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
      {/* Mode Toggle: Internal / External */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
        <ToggleButtonGroup
          value={state.structureMode}
          exclusive
          onChange={(_, val) => val && setStructureMode(val)}
          aria-label="structure mode"
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
          <ToggleButton value="internal">Internal</ToggleButton>
          <ToggleButton value="external">External</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Internal Config */}
      {state.structureMode === 'internal' ? (
        <Card sx={cardStyle}>
          <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 3, color: THEME_COLORS.primary }}>
              Internal Structure
            </Typography>
            <Stack spacing={2.5}>
              {/* <Box>
                <Typography gutterBottom variant="body2" color="text.secondary">Base Material</Typography>
                <FormControl size="small" fullWidth sx={{ bgcolor: 'white' }}>
                  <InputLabel>Base Material</InputLabel>
                  <Select
                    label="Base Material"
                    value={state.materialConfig.baseMaterial}
                    onChange={(e) => setMaterialConfig({ baseMaterial: e.target.value as any })}
                  >
                    {BASE_MATERIAL_OPTIONS.map(opt => (
                      <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box> */}
              {/* <Card sx={cardStyle}>
                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                  <FormControl component="fieldset" fullWidth>
                    <FormLabel component="legend" sx={{ color: THEME_COLORS.primary, fontWeight: 600, mb: 1 }}>Base Material</FormLabel>
                    <RadioGroup
                      value={state.materialConfig.baseMaterial}
                      onChange={(e) => setMaterialConfig({ baseMaterial: e.target.value as BaseMaterialType })}
                    >
                      {BASE_MATERIAL_OPTIONS.map((option) => (
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

                  <Typography variant="caption" sx={{ mb: 1, display: 'block', fontWeight: 600, color: 'text.secondary' }}>Internal Color</Typography>
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
                  </Stack>
                </CardContent>
              </Card> */}
              <Typography variant="caption" sx={{ mb: 1, display: 'block', fontWeight: 600, color: 'text.secondary' }}>Internal Color</Typography>
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
              </Stack>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Typography variant="body2" color="text.secondary">Partitions: {partitionsCount}</Typography>
                <ToggleButtonGroup
                  value={activePartition}
                  exclusive
                  onChange={(_, val) => val !== null && setActivePartition(val)}
                  size="small"
                >
                  {Array.from({ length: partitionsCount }).map((_, i) => (
                    <ToggleButton key={i} value={i}>{i + 1}</ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Box>

              <Box>
                <Typography gutterBottom variant="body2" color="text.secondary">
                  Shelves: {(state.innerPartitions?.[activePartition]?.shelves) ?? state.innerStructure.shelves}
                </Typography>
                <Slider
                  value={(state.innerPartitions?.[activePartition]?.shelves) ?? state.innerStructure.shelves}
                  onChange={(_, val) => setPartitionCounts({ shelves: val as number })}
                  step={1}
                  min={0}
                  max={10}
                  marks
                  valueLabelDisplay="auto"
                  sx={{ color: THEME_COLORS.primary }}
                />
              </Box>

              

              <Box>
                <Typography gutterBottom variant="body2" color="text.secondary">
                  Drawers: {(state.innerPartitions?.[activePartition]?.drawers) ?? state.innerStructure.drawers}
                </Typography>
                <Slider
                  value={(state.innerPartitions?.[activePartition]?.drawers) ?? state.innerStructure.drawers}
                  onChange={(_, val) => setPartitionCounts({ drawers: val as number })}
                  step={1}
                  min={0}
                  max={8}
                  marks
                  valueLabelDisplay="auto"
                  sx={{ color: THEME_COLORS.primary }}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                <Typography variant="body2" color="text.secondary">
                  Hanging rod
                </Typography>
                <Switch
                  checked={(((state.innerPartitions?.[activePartition]?.hangings) ?? state.innerStructure.hangings) || 0) > 0}
                  onChange={(_, checked) => setPartitionCounts({ hangings: checked ? 1 : 0 })}
                />
              </Box>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <FormControlLabel
                  control={<Switch checked={!!state.outerStructure.lights} onChange={(_, c) => setOuterStructure({ lights: c })} />}
                  label="Interior Lights"
                />
                <FormControlLabel
                  control={<Switch checked={!!state.outerStructure.loft} onChange={(_, c) => setOuterStructure({ loft: c })} />}
                  label="Add Loft (top)"
                />
                {/* <FormControlLabel
                  control={<Switch checked={!!state.outerStructure.handleless} onChange={(_, c) => setOuterStructure({ handleless: c })} />}
                  label="Handleless Doors"
                /> */}
                {(() => {
                  const maxLocker = (state.innerPartitions?.[activePartition]?.drawers) ?? state.innerStructure.drawers;
                  const val = Math.min(state.outerStructure.lockerDrawers ?? 0, maxLocker);
                  return (
                    <TextField
                      label="Locker Drawers"
                      type="number"
                      size="small"
                      value={val}
                      onChange={(e) => {
                        const num = parseInt(e.target.value || '0', 10) || 0;
                        const clamped = Math.max(0, Math.min(num, maxLocker));
                        setOuterStructure({ lockerDrawers: clamped });
                      }}
                      InputProps={{ inputProps: { min: 0, max: maxLocker } }}
                      sx={{ width: 160 }}
                    />
                  );
                })()}
              </Box>
            </Stack>
          </CardContent>
        </Card>
      ) : (
        <>
        <Stack spacing={2}>
          <Card sx={cardStyle}>
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: THEME_COLORS.primary }}>
                  Exterior Options
                </Typography>
                <Button
                  variant="text"
                  size="small"
                  sx={{ textTransform: 'none' }}
                  onClick={() => setMaterialHelpOpen(true)}
                >
                  Wonder, how to choose the material.
                </Button>
              </Box>
              <Stack spacing={2}>
                {/* <FormControl fullWidth size="small" sx={{ bgcolor: 'white' }}>
                  <InputLabel>Opening Type</InputLabel>
                  <Select
                    value={state.outerStructure.openingType}
                    label="Opening Type"
                    onChange={(e) => setOuterStructure({ openingType: e.target.value as OpeningType })}
                  >
                    <MenuItem value="slide">Sliding</MenuItem>
                    <MenuItem value="shutter">Openable (Hinged)</MenuItem>
                  </Select>
                </FormControl> */}
                {/* <FormControl fullWidth size="small" sx={{ bgcolor: 'white' }}>
                  <InputLabel>Exterior Design</InputLabel>
                  <Select
                    value={state.materialConfig.exteriorDesign ?? 'pu_panel'}
                    label="Exterior Design"
                    onChange={(e) => setMaterialConfig({ exteriorDesign: e.target.value as any })}
                  >
                    <MenuItem value="pu_panel">Design 1: PU Panel</MenuItem>
                    <MenuItem value="wood_glass">Design 2: Wood + Glass</MenuItem>
                    <MenuItem value="aluminium_glass">Design 3: Aluminium + Glass</MenuItem>
                  </Select>
                </FormControl>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 1 }}>
                  <TextField
                    label="Color 1"
                    type="color"
                    value={state.materialConfig.exteriorColors?.c1 ?? '#cccccc'}
                    onChange={(e) => setMaterialConfig({ exteriorColors: { ...(state.materialConfig.exteriorColors ?? { c2: '#999999', c3: '#666666' }), c1: e.target.value } })}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                  <TextField
                    label="Color 2"
                    type="color"
                    value={state.materialConfig.exteriorColors?.c2 ?? '#999999'}
                    onChange={(e) => setMaterialConfig({ exteriorColors: { ...(state.materialConfig.exteriorColors ?? { c1: '#cccccc', c3: '#666666' }), c2: e.target.value } })}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                  <TextField
                    label="Color 3"
                    type="color"
                    value={state.materialConfig.exteriorColors?.c3 ?? '#666666'}
                    onChange={(e) => setMaterialConfig({ exteriorColors: { ...(state.materialConfig.exteriorColors ?? { c1: '#cccccc', c2: '#999999' }), c3: e.target.value } })}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                </Box> */}
                {/* Aesthetic */}
                <Card sx={cardStyle}>
                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                    <FormControl fullWidth size="small">
                      <FormLabel component="legend" sx={{ color: THEME_COLORS.primary, fontWeight: 600, mb: 1 }}>
                        Aesthetics (Finish)
                      </FormLabel>
                      <Select
                        value={state.materialConfig.aesthetic}
                        onChange={(e) => setMaterialConfig({ aesthetic: e.target.value as AestheticType, aestheticDesign: undefined })}
                      >
                        {AESTHETIC_OPTIONS.map((option) => (
                          <MenuItem key={option.value} value={option.value} disabled={option.disabled}>
                            {option.label} (₹{option.pricePerSqFt}/sq ft)
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <Divider sx={{ my: 1.5 }} />

                    <FormControl fullWidth size="small" sx={{ mb: 1.5 }}>
                      <FormLabel sx={{ fontWeight: 600, mb: 0.5, color: 'text.secondary' }}>Design</FormLabel>
                      <Select
                        value={state.materialConfig.aestheticDesign ?? ''}
                        onChange={(e) => {
                          const value = e.target.value as string;
                          setMaterialConfig({ aestheticDesign: value });
                        }}
                      >
                        <MenuItem value="">
                          <em>Select design</em>
                        </MenuItem>
                        {state.materialConfig.aesthetic === 'laminate' && (
                          <MenuItem value="solid_plain">Solid Plain</MenuItem>
                        )}
                        {state.materialConfig.aesthetic === 'laminate' && (
                          <MenuItem value="wood_grain">Wood Grain</MenuItem>
                        )}
                        {state.materialConfig.aesthetic === 'laminate' && (
                          <MenuItem value="lam_fabric">Lam Fabric</MenuItem>
                        )}
                        {state.materialConfig.aesthetic === 'pu' && (
                          <MenuItem value="fluted">Fluted</MenuItem>
                        )}
                        {state.materialConfig.aesthetic === 'pu' && (
                          <MenuItem value="flute">Flute</MenuItem>
                        )}
                        {state.materialConfig.aesthetic === 'pu' && (
                          <MenuItem value="classical">Classical</MenuItem>
                        )}
                        {state.materialConfig.aesthetic === 'Aluminium and glass' && (
                          <MenuItem value="tinted_glass">Tinted Glass</MenuItem>
                        )}
                        {state.materialConfig.aesthetic === 'Aluminium and glass' && (
                          <MenuItem value="plain_glass">Plain Glass</MenuItem>
                        )}
                      </Select>
                    </FormControl>

                    <Typography variant="caption" sx={{ mb: 1, display: 'block', fontWeight: 600, color: 'text.secondary' }}>Finish Color</Typography>
                    <Stack
                      direction="row"
                      spacing={1.5}
                      sx={{
                        overflowX: 'auto',
                        pb: 0.5,
                        opacity: state.materialConfig.aestheticDesign ? 1 : 0.4,
                        pointerEvents: state.materialConfig.aestheticDesign ? 'auto' : 'none',
                      }}
                    >
                      {COLOR_VARIANTS.map((color) => (
                        <Box
                          key={color.value}
                          onClick={() => {
                            if (!allowedAestheticColors.length || allowedAestheticColors.includes(color.value)) {
                              setMaterialConfig({ aestheticColor: color.value });
                            }
                          }}
                          sx={{
                            width: 28,
                            height: 28,
                            borderRadius: '50%',
                            bgcolor: color.hex,
                            border: state.materialConfig.aestheticColor === color.value ? `3px solid ${THEME_COLORS.primary}` : '1px solid #ddd',
                            boxShadow: state.materialConfig.aestheticColor === color.value ? '0 0 0 2px white inset' : 'none',
                            cursor: !allowedAestheticColors.length || allowedAestheticColors.includes(color.value) ? 'pointer' : 'default',
                            flexShrink: 0,
                            transition: 'all 0.2s',
                            opacity: !allowedAestheticColors.length || allowedAestheticColors.includes(color.value) ? 1 : 0.25,
                            '&:hover': {
                              transform:
                                !allowedAestheticColors.length || allowedAestheticColors.includes(color.value)
                                  ? 'scale(1.1)'
                                  : 'none',
                            },
                          }}
                          title={color.label}
                        />
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
                {/* <FormControlLabel
                  control={<Switch checked={!!state.outerStructure.handleless} onChange={(_, c) => setOuterStructure({ handleless: c })} />}
                  label="Handleless Doors"
                /> */}
              </Stack>
            </CardContent>
          </Card>
        </Stack>
        <Dialog
          open={materialHelpOpen}
          onClose={() => setMaterialHelpOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pr: 1 }}>
            <DialogTitle sx={{ pb: 1 }}>
              How to choose the right material
            </DialogTitle>
            <IconButton onClick={() => setMaterialHelpOpen(false)}>
              <span>✕</span>
            </IconButton>
          </Box>
          <DialogContent sx={{ pt: 0 }}>
            <Box
              component="iframe"
              src="https://www.youtube.com/embed/RGfNoUy1eqo"
              title="How to choose the right finish"
              sx={{ width: '100%', aspectRatio: '16 / 9', border: 0 }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </DialogContent>
        </Dialog>
        </>
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
          Next: Pricing
        </Button>
      </Box>
    </Stack>
  );
};
