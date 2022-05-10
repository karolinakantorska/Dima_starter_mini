// layouts
import Layout from '../layouts';
// components
import Page from '../components/Page';
import { RootStyle } from '../components/_Main/RootStyle';
import PassResetFormCom from 'src/components/_signin/passResetFormCom';


export default function ResetPass() {
  return (
    <Layout>
      <Page title="Dima & Partner | Glarus Zurich Arosa">
        <RootStyle>
          <PassResetFormCom />
        </RootStyle>
      </Page>
    </Layout>
  );
}

