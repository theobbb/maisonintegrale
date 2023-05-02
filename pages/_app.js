import '@/styles/globals.css'
import Layout from '@/components/layout';
import Head from 'next/head';

import { theme } from '@/styles/theme';
import { CssBaseline, ThemeProvider, createTheme, responsiveFontSizes, useMediaQuery } from '@mui/material';
import Cookies from 'js-cookie';
import { useEffect, useMemo, useState } from 'react'

import { ThemeContext } from '@/utils/context';
import MuiTypoWrapper from '@/components/muiTypoWrapper';

import Script from 'next/script';

function App({ Component, pageProps }) {

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [colorMode, setColorMode] = useState(Cookies.get('colorMode') || 'light');

  const [isNewSession, setIsNewSession] = useState(false)
  
  useEffect(() => {
    const sessionId = Cookies.get('sessionId')
    if (!sessionId) {
      setIsNewSession(true)
      Cookies.set('sessionId', Date.now().toString())
    }
  }, [])

  useEffect(() => {
    Cookies.set('colorMode', colorMode);
  }, [colorMode]);

  useEffect(() => {
    if (isNewSession) setColorMode(prefersDarkMode? 'dark':'light')
  }, [isNewSession, prefersDarkMode]);

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
  
  return (
    <ThemeContext.Provider value={colorTheme}>
      <ThemeProvider theme={colorTheme}>
    
      <CssBaseline />
        <Head> 
        <meta name="description" content="Maison Intégrale" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        </Head>
        
        <Script type='module' strategy="beforeInteractive" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js" />

        <Layout setColorMode={setColorMode}>
          {<Component  {...pageProps}  />}
        </Layout>
       
        </ThemeProvider>
    </ThemeContext.Provider>
    
  )
}
export default App;
