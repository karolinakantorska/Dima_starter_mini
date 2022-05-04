import { useState, ReactNode, useEffect } from 'react';
// @mui
import { Box, Container, Grid, Typography } from '@mui/material';
import useResponsive from '../../hooks/useResponsive';
// components

// _mock_
import { _carouselsMembers } from '../../_mock/_others';
import { _mockProjekts } from 'src/_mock/referenzen/referenzen';

export function JobsCom() {
    const isDesktop = useResponsive('up', 'lm');
    const isSmall = useResponsive('down', 'sm');

    return (
        <Container>
            <Grid container direction="row" justifyContent="center" spacing={4}>
                <Grid item>
                    <Typography variant="h6" component="h1" paragraph color="dima">
                        Freie Stellen:
                    </Typography>
                    <Typography gutterBottom>
                        Jobs
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
}
