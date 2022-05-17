// highlight
import '../utils/highlight';
// scroll bar
import 'simplebar/src/simplebar.css';

// editor
import 'react-quill/dist/quill.snow.css';
// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';

import cookie from 'cookie';
import { ReactElement, ReactNode } from 'react';
// next
import { NextPage } from 'next';
import Head from 'next/head';
import App, { AppProps, AppContext } from 'next/app';

// @mui
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
// utils
import { getSettings } from '../utils/getSettings';
// contexts
import { SettingsProvider } from '../contexts/SettingsContext';
import { CollapseDrawerProvider } from '../contexts/CollapseDrawerContext';
// theme
import ThemeProvider from '../theme';
// components
import { SettingsValueProps } from '../components/settings/type';
import ProgressBar from '../components/ProgressBar';
import MotionLazyContainer from '../components/animate/MotionLazyContainer';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { _mockProjekts } from 'src/_mock/referenzen/referenzen';

import { AuthProvider } from '../contexts/FirebaseContext';
// ----------------------------------------------------------------------

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface MyAppProps extends AppProps {
  settings: SettingsValueProps;
  Component: NextPageWithLayout;
}

export default function MyApp(props: MyAppProps) {
  const { Component, pageProps, settings } = props;
  const router = useRouter();


  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <AuthProvider>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CollapseDrawerProvider>
            <SettingsProvider defaultSettings={settings}>
              <MotionLazyContainer>
                <ThemeProvider>
                  <ProgressBar />
                  <AnimatePresence
                    exitBeforeEnter
                  //onExitComplete={handleExitComplete}
                  >
                    <Component {...pageProps} key={router.route} />
                  </AnimatePresence>
                </ThemeProvider>
              </MotionLazyContainer>
            </SettingsProvider>
          </CollapseDrawerProvider>
        </LocalizationProvider>
      </AuthProvider>
    </>
  );
}

// ----------------------------------------------------------------------

MyApp.getInitialProps = async (context: AppContext) => {

  const appProps = await App.getInitialProps(context);
  const cookies = cookie.parse(
    context.ctx.req ? context.ctx.req.headers.cookie || '' : document.cookie
  );
  const settings = getSettings(cookies);

  return {
    ...appProps,
    settings,
  };
};
