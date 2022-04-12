import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar } from '@mui/material';
// components
import MenuPopover from '../../../components/MenuPopover';
import { IconButtonAnimate } from '../../../components/animate';
import NextLink from 'next/link';
import { ListItemStyle } from 'src/components/nav-section/horizontal/style';
// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Über Uns',
    linkTo: '/ueber_uns',
  },
  {
    label: 'Leistungen',
    linkTo: '/leistungen',
  },
  {
    label: 'Philosophie',
    linkTo: '/philosophie',
  },
];

// ----------------------------------------------------------------------

export default function Unternehmen() {
  const [open, setOpen] = useState<HTMLElement | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <ListItemStyle onClick={handleOpen} disableRipple  >
        Unternehmen
      </ListItemStyle>
      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Divider sx={{ borderStyle: 'dashed' }} />
        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <NextLink href={option.linkTo} key={option.label}>
              <MenuItem key={option.label} onClick={handleClose}>
                {option.label}
              </MenuItem>
            </NextLink>

          ))}
        </Stack>
      </MenuPopover>
    </>
  );
}
