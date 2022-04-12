import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar } from '@mui/material';
// components
import MenuPopover from '../../../components/MenuPopover';
import { IconButtonAnimate } from '../../../components/animate';
import NextLink from 'next/link';
import { ListItemStyle } from 'src/components/nav-section/horizontal/style';


export default function Kontakt() {


  return (
    <NextLink href="/kontakt">
      <ListItemStyle disableRipple  >
        Kontakt
      </ListItemStyle>
    </NextLink>
  );
}
