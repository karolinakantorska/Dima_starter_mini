import { useState, ReactNode, useEffect } from 'react';
// next
//import { useRouter } from 'next/router';
// @mui
import { Box, Container, Stack } from '@mui/material';

//
import MainHeader from './MainHeader';


// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <>
      <Container >
        <Stack sx={{ minHeight: 1 }}>
          <MainHeader />
          {children}
          <Box sx={{ flexGrow: 1 }} />
        </Stack>
      </Container>
    </>
  );
}

