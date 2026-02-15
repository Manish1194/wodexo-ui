/**
 * Main Application Component
 * Entry point for the Wardrobe Configurator application
 *
 * Architecture Overview:
 * - WardrobeProvider: Context for global state management
 * - MainLayout: Main UI structure with 3D canvas and config panel
 * - Theme: Material-UI theming with custom colors
 */

import { CssBaseline, ThemeProvider, createTheme, Box } from '@mui/material';
import { WardrobeProvider } from './contexts/WardrobeContext';
import { MainLayout } from './components/Layout/MainLayout';
import { THEME_COLORS } from './constants/wardrobe';
import { Header } from './components/Layout/Header';
import { LandingPage } from './components/Pages/LandingPage';
import { Routes, Route } from 'react-router-dom';
import { ProductionConfirmationPage } from './components/Pages/ProductionConfirmationPage';

/**
 * Material-UI Theme Configuration
 * Customized with wardrobe configurator branding
 */
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: THEME_COLORS.primary,
      light: THEME_COLORS.primaryLight,
      dark: THEME_COLORS.primaryDark,
    },
    secondary: {
      main: THEME_COLORS.secondary,
      light: THEME_COLORS.secondaryLight,
      dark: THEME_COLORS.secondaryDark,
    },
    background: {
      default: THEME_COLORS.background,
      paper: THEME_COLORS.surface,
    },
    text: {
      primary: THEME_COLORS.textPrimary,
      secondary: THEME_COLORS.textSecondary,
    },
  },
  typography: {
    fontFamily: '"Varela Round", "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.3px',
      fontSize: '2rem',
    },
    h5: {
      fontWeight: 700,
      letterSpacing: '-0.2px',
      fontSize: '1.5rem',
    },
    h6: {
      fontWeight: 700,
      letterSpacing: '0px',
      fontSize: '1.25rem',
    },
    subtitle1: {
      fontWeight: 600,
      fontSize: '1rem',
      letterSpacing: '0px',
    },
    subtitle2: {
      fontWeight: 600,
      fontSize: '0.875rem',
      letterSpacing: '0px',
    },
    body1: {
      fontWeight: 400,
      fontSize: '0.95rem',
      letterSpacing: '0px',
    },
    body2: {
      fontWeight: 400,
      fontSize: '0.875rem',
      letterSpacing: '0px',
    },
    caption: {
      fontWeight: 500,
      fontSize: '0.75rem',
      letterSpacing: '0.2px',
      color: THEME_COLORS.textSecondary,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        containedPrimary: {
          backgroundImage: `linear-gradient(90deg, ${THEME_COLORS.brandGradientFrom}, ${THEME_COLORS.brandGradientTo})`,
          backgroundColor: 'transparent',
          color: '#fff',
          boxShadow: 'none',
          '&:hover': {
            filter: 'brightness(1.05)',
            boxShadow: '0 0 0 0',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s ease',
          backgroundColor: THEME_COLORS.surface,
          borderColor: THEME_COLORS.border,
          borderWidth: 1,
          borderStyle: 'solid',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
        },
      },
    },
  },
});

/**
 * App Component
 * Root component that sets up theme and state management
 */
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <WardrobeProvider>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <Box sx={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/design" element={<MainLayout />} />
              <Route path="/production-confirmation" element={<ProductionConfirmationPage />} />
            </Routes>
          </Box>
        </Box>
      </WardrobeProvider>
    </ThemeProvider>
  );
}

export default App;
