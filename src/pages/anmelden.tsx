// layouts
import Layout from '../layouts';
// components
import Page from '../components/Page';
import { RootStyle } from '../components/_Main/RootStyle';

import LoginForm from 'src/components/_signin/LoginForm';

export default function Anmelden() {
  return (
    <Layout>
      <Page title="Dima & Partner | Glarus Zurich Arosa">
        <RootStyle>
          <LoginForm />
        </RootStyle>
      </Page>
    </Layout>
  );
}

