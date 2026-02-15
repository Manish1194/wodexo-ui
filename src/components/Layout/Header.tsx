import React from 'react';
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import { THEME_COLORS, APP_CONFIG } from '../../constants/wardrobe';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: `1px solid ${THEME_COLORS.border}`, background: 'rgba(255,255,255,0.8)', backdropFilter: 'saturate(180%) blur(8px)' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ py: 1 }}>
          <Typography
            component={RouterLink}
            to="/"
            variant="h6"
            sx={{
              background: `linear-gradient(90deg, ${THEME_COLORS.brandGradientFrom}, ${THEME_COLORS.brandGradientTo})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontFamily: '"Varela Round", "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
              fontWeight: 900,
              letterSpacing: '0.5px',
              textDecoration: 'none',
            }}
          >
            {APP_CONFIG.appName}
          </Typography>
          <Box sx={{ flex: 1 }} />
          {/* <Button size="small" variant="text" sx={{ mr: 1 }} onClick={() => {}}>
            Meet a Designer
          </Button> */}
          <Button size="small" variant="contained" color="primary" onClick={() => navigate('/design')}>
            Book Free Consultation
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
