import { ReactElement } from 'react';
import { Container, Grid, Typography } from '@mui/material';
// layouts
import Layout from '../layouts';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';

KontaktCom.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};


export default function KontaktCom() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Dima & Partner | Glarus Zurich Arosa">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid 
        container 
        direction="row"
        justifyContent="center" 
        spacing={4}
        >
          <Grid item >
          <Typography variant="h6" component="h1" paragraph color='#e87b45'>
          Glarus
        </Typography>
        <Typography gutterBottom>
        Gewerbezentrum 
        Holenstein <br/>19 8750 Glarus
        </Typography>
          </Grid>
          <Grid item >
          <Typography variant="h6" component="h1" paragraph color="#e87b45">
          Zürich
        </Typography>
        <Typography gutterBottom >
        Grubenstrasse 38 <br/>8045 Zürich
        </Typography>
          </Grid>           
        </Grid>
      </Container>
    </Page>
  );
}
