import React from 'react';
import { Box, Typography } from '@mui/material';
import { useWardrobe } from '../../hooks/useWardrobe';
import laminateSolidPlainGrey from '../../assets/wardrobe/laminate-solid-plain-grey.jpg.jpeg';
import laminateWoodgrainWalnut from '../../assets/wardrobe/laminate-woodgrain-walnut.jpg.jpeg';
import laminateLamfabricBeige from '../../assets/wardrobe/laminate-lamfabric-beige.jpg.jpeg';
import puFlutedWarmwhite from '../../assets/wardrobe/pu-fluted-warmwhite.jpg.jpeg';
import puFluteBeigeWalnut from '../../assets/wardrobe/pu-flute-beige-walnut.jpg.jpeg';
import puClassicalOakCane from '../../assets/wardrobe/pu-classical-oak-cane.jpg.jpeg';
import aluminiumGlassTintedGrey from '../../assets/wardrobe/aluminium-glass-tinted-grey.jpg.jpeg';
import aluminiumGlassPlainGolden from '../../assets/wardrobe/aluminium-glass-plain-golden.jpg.jpeg';

export const ExternalPreview: React.FC = () => {
  const { state } = useWardrobe();
  const aesthetic = state.materialConfig.aesthetic;
  const design = state.materialConfig.aestheticDesign;

  const getPreviewImage = () => {
    if (!aesthetic || !design) return null;

    if (aesthetic === 'laminate' && design === 'solid_plain') {
      return laminateSolidPlainGrey;
    }
    if (aesthetic === 'laminate' && design === 'wood_grain') {
      return laminateWoodgrainWalnut;
    }
    if (aesthetic === 'laminate' && design === 'lam_fabric') {
      return laminateLamfabricBeige;
    }
    if (aesthetic === 'pu' && design === 'fluted') {
      return puFlutedWarmwhite;
    }
    if (aesthetic === 'pu' && design === 'flute') {
      return puFluteBeigeWalnut;
    }
    if (aesthetic === 'pu' && design === 'classical') {
      return puClassicalOakCane;
    }
    if (aesthetic === 'Aluminium and glass' && design === 'tinted_glass') {
      return aluminiumGlassTintedGrey;
    }
    if (aesthetic === 'Aluminium and glass' && design === 'plain_glass') {
      return aluminiumGlassPlainGolden;
    }
    return null;
  };

  const imageUrl = getPreviewImage();

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        bgcolor: '#F5F7FA',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      {imageUrl ? (
        <Box
          component="img"
          src={imageUrl}
          alt="Wardrobe external preview"
          sx={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
            borderRadius: 2,
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          }}
        />
      ) : (
        <Typography
          variant="body1"
          sx={{ color: 'text.secondary', textAlign: 'center', maxWidth: 320 }}
        >
          Please choose aesthetics and design options to view your wardrobe preview.
        </Typography>
      )}
    </Box>
  );
};
