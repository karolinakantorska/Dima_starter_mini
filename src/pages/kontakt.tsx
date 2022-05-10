// layouts
import Layout from '../layouts';
// components
import Page from '../components/Page';
import { RootStyle } from 'src/components/_Main/RootStyle';
import { ContactCom } from 'src/components/_Company/ContactCom';
import { getOrderedCollection } from "src/utils/apis/apis";

export default function Kontakt() {
  //const { themeStretch } = useSettings();
  return (
    <Layout>
      <Page title="Dima & Partner | Glarus Zurich Arosa">
        <RootStyle>
          <ContactCom />
        </RootStyle>
      </Page>
    </Layout>
  );
}
