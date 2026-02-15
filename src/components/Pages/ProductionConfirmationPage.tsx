import React from 'react';
import { Box, Button, Stack, Typography, Card, CardContent } from '@mui/material';
import { THEME_COLORS } from '../../constants/wardrobe';
import { useNavigate } from 'react-router-dom';

export const ProductionConfirmationPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#E8F5E9',
        px: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 420,
          width: '100%',
          borderRadius: 4,
          boxShadow: '0 18px 40px rgba(0,0,0,0.16)',
          overflow: 'hidden',
        }}
      >
        <CardContent sx={{ p: { xs: 4, sm: 5 } }}>
          <Stack spacing={3} alignItems="center">
            <Box
              sx={{
                width: 110,
                height: 110,
                borderRadius: '50%',
                bgcolor: THEME_COLORS.primary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 12px 30px rgba(46, 125, 50, 0.55)',
                position: 'relative',
              }}
            >
              <Box
                component="span"
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  border: '4px solid white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: 32,
                }}
              >
                ✓
              </Box>
            </Box>

            <Stack spacing={1} alignItems="center" textAlign="center">
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Order sent to production
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300 }}>
                Your wardrobe details have been shared with the factory. Our team will review and keep you posted.
              </Typography>
            </Stack>

            <Stack spacing={1.5} sx={{ width: '100%', mt: 2 }}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  bgcolor: THEME_COLORS.primary,
                  textTransform: 'none',
                  fontWeight: 600,
                  py: 1.2,
                  '&:hover': { bgcolor: THEME_COLORS.primaryDark },
                }}
                onClick={() => {}}
              >
                Track Order
              </Button>
              <Button
                variant="text"
                fullWidth
                sx={{
                  textTransform: 'none',
                  fontWeight: 500,
                  color: THEME_COLORS.primary,
                }}
                onClick={() => navigate('/')}
              >
                Back to home
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

