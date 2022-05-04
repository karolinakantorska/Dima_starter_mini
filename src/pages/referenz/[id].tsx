import { useRouter } from 'next/router';
// layouts
// components
import Page from '../../components/Page';
import { RootStyle } from '../../components/_Main/RootStyle';
import { _mockProjekts } from '../../_mock/referenzen/referenzen';
import AnimatedStartLayout from '../../layouts/animated/AnimatedStartLayout';
import { OneProjectCom } from '../../components/_Projekte/OneProjectCom';
//import Layout from '../..//layouts';


export default function Referenz() {
  const router = useRouter();
  const { id } = router.query;
  //console.log('id:', id);
  const project = _mockProjekts.filter((project) => project.id === id);
  console.log('project', project);
  return (
    <AnimatedStartLayout>
      <Page title="Projekte | Dima & Partner | Glarus Zurich Arosa">
        <RootStyle>
          <OneProjectCom project={project[0]} />
        </RootStyle>
      </Page>
    </AnimatedStartLayout>


  );
}
