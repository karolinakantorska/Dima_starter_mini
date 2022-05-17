
import { useRouter } from 'next/router';
import Layout from 'src/layouts';
import Page from 'src/components/Page';
import { RootStyle } from 'src/components/_Main/RootStyle';
import { _mockProjekts } from 'src/_mock/referenzen/referenzen';
import ProjectNewEditForm from 'src/components/_Projekte/ProjectNewEditForm';
// layouts
// components



export default function ReferenzBearbeiten() {
  const router = useRouter();
  const { id } = router.query;
  //console.log('id:', id);
  const project = _mockProjekts.filter((project) => project.id === id);
  //console.log('project', project);
  return (

    <Layout>
      <Page title="Projekte | Dima & Partner | Glarus Zurich Arosa">
        <RootStyle>
          <ProjectNewEditForm isEdit={true} currentProject={project[0]} />
        </RootStyle>
      </Page>
    </Layout>


  );
}
