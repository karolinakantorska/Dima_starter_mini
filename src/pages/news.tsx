// layouts
import Layout from 'src/layouts';
// components
import Page from '../components/Page';
import { RootStyle } from 'src/components/_Main/RootStyle';

import { NewsCom } from 'src/components/_Company/NewsCom';


export default function News() {
  return (
    <Layout>
      <Page title="Dima & Partner | Glarus Zurich Arosa">
        <RootStyle>
          <NewsCom />
        </RootStyle>
      </Page>
    </Layout>

  );
}

