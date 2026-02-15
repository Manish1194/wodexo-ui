import React from 'react';
import { Card, CardContent, Typography, alpha, SxProps, Theme } from '@mui/material';
import { THEME_COLORS } from '../../constants/wardrobe';

interface ConfigCardProps {
  title: string;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

export const ConfigCard: React.FC<ConfigCardProps> = ({ title, children, sx }) => {
  return (
    <Card 
      sx={{ 
        mb: 2,
        backgroundColor: alpha(THEME_COLORS.primary, 0.05),
        border: `1px solid ${alpha(THEME_COLORS.primary, 0.2)}`,
        borderRadius: 2,
        boxShadow: 'none',
        transition: 'all 0.3s ease',
        '&:hover': {
          backgroundColor: alpha(THEME_COLORS.primary, 0.08),
          borderColor: alpha(THEME_COLORS.primary, 0.3),
        },
        ...sx
      }}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            color: THEME_COLORS.primary,
            mb: 1.5,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          {title}
        </Typography>
        {children}
      </CardContent>
    </Card>
  );
};
