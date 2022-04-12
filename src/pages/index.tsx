//import { useEffect } from 'react';
//import { useRouter } from 'next/router';
import { ReactElement } from 'react';
// layouts
import Layout from '../layouts';

Index.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default function Index() {
  /*
  const router = useRouter();

  useEffect(() => {
    if (router.pathname == '/') {
      router.push('/dashboard/one');
    }
  });
*/
  return null;
}
