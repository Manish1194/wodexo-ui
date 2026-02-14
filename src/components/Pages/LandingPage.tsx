import React from 'react';
import { Box, Button, Card, CardActionArea, CardContent, Container, Stack, Typography } from '@mui/material';
import { THEME_COLORS, APP_CONFIG } from '../../constants/wardrobe';
import { useWardrobe } from '../../hooks/useWardrobe';
import { useNavigate } from 'react-router-dom';

const categories = [
  { key: 'wardrobe', title: 'Wardrobes', description: 'Sliding or hinged, tailored to your space', disabled: false },
  { key: 'bar_unit', title: 'Bar Units', description: 'Compact, stylish storage for your barware', disabled: true },
  { key: 'sneakers_storage', title: 'Sneaker Storage', description: 'Dust-free display for your collection', disabled: true },
  { key: 'modular_kitchen', title: 'Modular Kitchen', description: 'Optimized layouts and premium finishes', disabled: true },
  { key: 'full_house', title: 'Full House', description: 'Complete home solution with all the essentials', disabled: true },
];

export const LandingPage: React.FC = () => {
  const { setProductType } = useWardrobe();
  const navigate = useNavigate();
  const goDesign = () => navigate('/design');

  return (
    <Box sx={{ background: THEME_COLORS.background }}>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          backgroundImage: `
            linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.45) 100%),
            url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          borderBottom: `1px solid ${THEME_COLORS.border}`,
        }}
      >
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Stack spacing={2} sx={{ maxWidth: 900, mx: 'auto' }}>
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: '2.25rem', md: '3rem' },
                fontWeight: 900,
                color: '#ffffff',
                textShadow: '0 2px 14px rgba(0,0,0,0.35)',
                letterSpacing: '0.5px',
              }}
            >
              {APP_CONFIG.appName}
            </Typography>
            <Typography variant="body1" sx={{ color: '#f1f1f1' }}>
              Configure in 3D, get instant pricing, and book a free consultation.
            </Typography>
            <Stack direction="row" spacing={1.5}>
              <Button size="large" variant="contained" color="primary" onClick={goDesign}>
                Start Designing
              </Button>
              <Button size="large" variant="outlined" color="secondary" sx={{ borderWidth: 2 }}>
                Meet a Designer
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
          Explore categories
        </Typography>
        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' } }}>
          {categories.map((cat) => (
            <Card key={cat.key} variant="outlined" sx={{ borderRadius: 3, cursor: cat.disabled ? 'not-allowed' : 'pointer' }} >
              <CardActionArea
                disabled={cat.disabled}
                onClick={() => {
                  if (cat.disabled) return;
                  setProductType(cat.key as any);
                  goDesign();
                }}
              >
                <CardContent>
                  {/* add coming soon text if disabled */}
                  {cat.disabled && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Coming Soon...
                    </Typography>
                  )}
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: THEME_COLORS.textPrimary }}>
                    {cat.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {cat.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};
