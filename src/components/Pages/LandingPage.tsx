import React from 'react';
import { Box, Card, CardActionArea, CardContent, Container, Stack, Typography, IconButton } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { THEME_COLORS, APP_CONFIG } from '../../constants/wardrobe';
import { useWardrobe } from '../../hooks/useWardrobe';
import { useNavigate } from 'react-router-dom';
import mainHero from '../../assets/landingPage/main2.jpeg.png';

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
            linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.30) 100%),
            url(${mainHero})
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          borderBottom: `1px solid ${THEME_COLORS.border}`,
        }}
      >
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Stack spacing={2} sx={{ maxWidth: 1500, mx: 'auto' }}>
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: '2.75rem', md: '4.75rem' },
                fontWeight: 900,
                color: '#212121',
                textShadow: '0 2px 14px rgba(0,0,0,0.35)',
                letterSpacing: '0.5px',
              }}
            >
              {APP_CONFIG.appName}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#212121',
                fontSize: { xs: '1.1rem', md: '2.35rem' },
              }}
            >
              Configure in 3D, get instant pricing, and book a free consultation.
            </Typography>
            <Box sx={{ position: 'relative', mt: 2, display: 'flex', justifyContent: 'center' }}>
              <IconButton
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                sx={{
                  bgcolor: '#fff',
                  color: THEME_COLORS.primary,
                  boxShadow: 3,
                  '&:hover': { bgcolor: '#f5f5f5' },
                  animation: 'downArrowFloat 2s ease-in-out infinite',
                }}
              >
                <KeyboardArrowDownIcon sx={{ fontSize: 28 }} />
              </IconButton>
            </Box>
            <style>{`@keyframes downArrowFloat {0% { transform: translateY(0);} 50% { transform: translateY(6px);} 100% { transform: translateY(0);} }`}</style>
            {/* <Stack direction="row" spacing={1.5}>
              <Button size="large" variant="contained" color="primary" onClick={goDesign}>
                Start Designing
              </Button>
              <Button size="large" variant="outlined" color="secondary" sx={{ borderWidth: 2 }}>
                Meet a Designer
              </Button>
            </Stack> */}
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
