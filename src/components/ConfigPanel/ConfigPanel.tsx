/**
 * Configuration Panel Component
 * Main container for the multi-step wizard configuration
 */

import React from 'react';
import { Box, Divider, Stepper, Step, StepLabel } from '@mui/material';
import { THEME_COLORS } from '../../constants/wardrobe';
import { useWardrobe } from '../../hooks/useWardrobe';
import { Step1_Dimensions } from './Step1_Dimensions';
import { Step2_Structure } from './Step2_Structure';
import { Step3_Customization } from './Step3_Customization';

/**
 * ConfigPanel Component
 * Orchestrates the 3-step wizard
 */
export const ConfigPanel: React.FC = () => {
  const { state } = useWardrobe();
  const steps = ['Dimensions', 'Designing', 'Pricing'];

  const renderStepContent = (step: number) => {
    switch (step) {
      case 1:
        return <Step1_Dimensions />;
      case 2:
        return <Step2_Structure />;
      case 3:
        return <Step3_Customization />;
      default:
        return <Step1_Dimensions />;
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        p: 1.5,
        bgcolor: THEME_COLORS.background,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        background: `linear-gradient(180deg, ${THEME_COLORS.surface} 0%, ${THEME_COLORS.background} 100%)`,
      }}
    >
      {/* Header Section */}
      <Box sx={{ mb: 2 }}>
        {/* <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: THEME_COLORS.textPrimary,
            fontSize: '1.25rem',
          }}
        >
          {APP_CONFIG.appName}
        </Typography>
        <Typography
          variant="caption"
          sx={{ 
            color: THEME_COLORS.textSecondary,
            display: 'block',
            mt: 0.3,
            mb: 1.5,
          }}
        >
          {APP_CONFIG.appSubtitle}
        </Typography> */}
        
        {/* Stepper */}
        <Stepper activeStep={state.step - 1} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <Divider sx={{ mb: 1, opacity: 0.5 }} />

      {/* Main Content Area - Scrollable */}
      <Box 
        sx={{ 
          flex: 1,
          overflowY: state.step === 1 ? 'hidden' : 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {renderStepContent(state.step)}
      </Box>
    </Box>
  );
};
