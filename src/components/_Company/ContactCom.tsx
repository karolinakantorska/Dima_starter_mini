import { Box, Container, Grid, Typography } from '@mui/material';
import useResponsive from '../../hooks/useResponsive';
// components

// _mock_
import { _carouselsMembers } from '../../_mock/_others';
import { _mockProjekts } from 'src/_mock/referenzen/referenzen';

export function ContactCom() {
    const isDesktop = useResponsive('up', 'lm');
    const isSmall = useResponsive('down', 'sm');

    return (
        <Container>
            <Grid container direction="row" justifyContent="center" spacing={4}>
                <Grid item>
                    <Typography variant="h6" component="h1" paragraph color="dima">
                        Glarus
                    </Typography>
                    <Typography gutterBottom>
                        Gewerbezentrum Holenstein <br />
                        19 8750 Glarus
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="h6" component="h1" paragraph color="dima">
                        Zürich
                    </Typography>
                    <Typography gutterBottom>
                        Grubenstrasse 38 <br />
                        8045 Zürich
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
}
