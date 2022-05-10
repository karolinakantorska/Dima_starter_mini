// layouts
import Layout from '../layouts';
// components
import Page from '../components/Page';
import { RootStyle } from '../components/_Main/RootStyle';
import { ReferenzenListCom } from '../components/_Projekte/ReferenzenListCom';
import AddProjectCom from 'src/components/_Projekte/AddProjectCom';


export default function ReferenzenHinzugrifen() {

  return (
    <Layout>
      <Page title="Dima & Partner | Glarus Zurich Arosa">
        <RootStyle>
          <AddProjectCom />
        </RootStyle>
      </Page>
    </Layout>
  );
}
