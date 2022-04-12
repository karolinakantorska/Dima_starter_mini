import { ReactElement } from 'react';
import { Container, Grid, Typography } from '@mui/material';
// layouts
import Layout from '../layouts';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';

ReferenzenCom.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};


export default function ReferenzenCom() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Dima & Partner | Glarus Zurich Arosa">
      <Container maxWidth={themeStretch ? false : 'xl'}>
      <Typography variant="h6" component="h1" paragraph>
          Referenzen
        </Typography>

      </Container>
    </Page>
  );
}
