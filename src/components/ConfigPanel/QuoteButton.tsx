/**
 * Quote Button Component
 * Generates and displays quote for the current configuration
 */

import React from 'react';
import { Button, alpha } from '@mui/material';
import { THEME_COLORS } from '../../constants/wardrobe';
import { useWardrobe } from '../../hooks/useWardrobe';

/**
 * QuoteButton Component
 * Standalone button that triggers quote generation
 */
export const QuoteButton: React.FC = () => {
  const { generateQuote } = useWardrobe();

  return (
    <Button
      onClick={generateQuote}
      variant="contained"
      sx={{
        background: `linear-gradient(135deg, ${THEME_COLORS.primary} 0%, ${alpha(THEME_COLORS.primary, 0.8)} 100%)`,
        fontWeight: 600,
        fontSize: '0.95rem',
        py: 0.9,
        px: 3,
        minWidth: '160px',
        textTransform: 'none',
        letterSpacing: '0px',
        borderRadius: '8px',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: `0 4px 15px ${alpha(THEME_COLORS.primary, 0.3)}`,
        '&:hover': {
          background: `linear-gradient(135deg, ${alpha(THEME_COLORS.primary, 0.9)} 0%, ${alpha(THEME_COLORS.primary, 0.7)} 100%)`,
          boxShadow: `0 8px 24px ${alpha(THEME_COLORS.primary, 0.4)}`,
          transform: 'translateY(-2px)',
        },
        '&:active': {
          transform: 'translateY(0px)',
        },
      }}
    >
      Generate Quote
    </Button>
  );
};
