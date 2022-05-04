// layouts

// components
import Page from '../components/Page';
import { RootStyle } from '../components/_Main/RootStyle';
// _mock_
import { _carouselsMembers } from '../_mock/_others';
import { ReferenzenListCom } from '../components/_Projekte/ReferenzenListCom';
import Layout from '../layouts';

export default function Referenzen() {
  return (
    <Layout>
      <Page title="Dima & Partner | Glarus Zurich Arosa">
        <RootStyle>
          <ReferenzenListCom />
        </RootStyle>
      </Page>
    </Layout>
  );
}
