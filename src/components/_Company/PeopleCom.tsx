import { Box, Container, Grid, Typography } from '@mui/material';

export function PeopleCom() {
    return (
        <Container>
            <Grid container direction="row" justifyContent="center" spacing={4}>
                <Grid item>
                    <Typography variant="h6" component="h1" paragraph color="dima">
                        Mitarbeitern
                    </Typography>
                    <Typography gutterBottom>
                        Text
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
}
