import '@/styles/globals.css'
import { theme } from '@/styles/theme';
import { Box, Button, createTheme, CssBaseline, responsiveFontSizes, ThemeProvider, Typography, useMediaQuery, useTheme } from '@mui/material';
import { LangContext, ThemeContext } from '@/utils/context';
import { useContext, useEffect, useMemo, useState } from 'react';
import Layout from '@/components/layout';
import { useRouter } from 'next/router'
import Head from 'next/head';
import MuiTypoWrapper from '@/components/muiTypoWrapper';

export default function App({ Component, pageProps }) {

  const router = useRouter();

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [colorMode, setColorMode] = useState('light');

  //{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] };

  useEffect(() => {
    setColorMode('light')
    //setColorMode(prefersDarkMode? 'dark':'light')
  }, [prefersDarkMode]);

  const colorTheme = useMemo(
    () => {
      const newTheme = {...theme};
      newTheme.palette = {...theme.palette[colorMode]};
      newTheme.palette.mode = colorMode;
      
      newTheme.components.MuiTypography.defaultProps.component = MuiTypoWrapper;
      return responsiveFontSizes(createTheme(newTheme));
    },
    [colorMode],
  );



  useEffect(() => {
    //if (router.asPath == '/realisations')console.log('dynamic')

  }, [router.asPath])

  return (
    <ThemeContext.Provider value={colorTheme}>
      <ThemeProvider theme={colorTheme}>
        
        <CssBaseline />

        <Head> 
        <meta name="description" content="Maison Intégrale" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
      type="module"
      src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
    ></script>
        </Head>
        <Layout>
          <Component  {...pageProps}  />
        </Layout>
       
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
