import '@/styles/globals.css'
import Layout from '@/components/layout';
import Head from 'next/head';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useRouter } from 'next/router';
import { themeProperties } from '@/styles/theme';
import { responsiveFontSizes, useMediaQuery } from '@mui/material';
import Cookies from 'js-cookie';
import React, { useContext, useEffect, useMemo, useState } from 'react'

import MuiTypoWrapper from '@/components/muiTypoWrapper';

import Script from 'next/script';
import { linkPaths } from '@/utils/linkPaths';
import { client } from '@/utils/sanityClient';
import { QueryContext } from '@/utils/context';
import PageTitle from '@/components/pageTitle';


function App({ Component, pageProps}) {

  const router = useRouter()

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [colorMode, setColorMode] = useState(Cookies.get('colorMode') || (prefersDarkMode ? 'dark' : 'light') || 'light')
  const [isNewSession, setIsNewSession] = useState(false)


  useEffect(() => {
    const sessionId = Cookies.get('sessionId')

    if (!sessionId) {
      setIsNewSession(true)
      Cookies.set('sessionId', Date.now().toString())
    }
  }, [])

  useEffect(() => {
    if (isNewSession) setColorMode(prefersDarkMode? 'dark':'light')
  }, [isNewSession, prefersDarkMode]);
  
  
  

  const [theme, setTheme] = useState(null);

  useEffect(() => {
    Cookies.set('colorMode', colorMode, { sameSite:'strict' });
    const newTheme = {...themeProperties(colorMode)};
    newTheme.palette = {...themeProperties(colorMode).palette[colorMode], mode: colorMode};


    newTheme.components.MuiTypography.defaultProps.component = MuiTypoWrapper;
    setTheme(responsiveFontSizes(createTheme(newTheme)))
  }, [colorMode])


  //const [pageTitle, setPageTitle] = useState(null)

  const [queries, setQueries] = useState([])


  useEffect(() => {
    async function getQueries() {
      const query = `*[_type == "project"]{
        name,
        slug,
        _id,
        orderRank
        }|order(orderRank)`
    const result = await client.fetch(query, { locale: router.locale })
    setQueries(result)
    }
    getQueries()
  }, [])

  return (

    <>
    <Head> 
    <meta name="description" content="Maison Intégrale" />
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0" />
    
    </Head>
    <Script type='module' strategy="beforeInteractive" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js" />
    <QueryContext.Provider value={queries}>
    <PageTitle />

    {theme && 

    <ThemeProvider theme={theme}>
    <CssBaseline />

        <Layout setColorMode={setColorMode}>
          <Component {...pageProps} />
        </Layout>
          
       
        </ThemeProvider>
      }
    
    </QueryContext.Provider>
    </>
   
  
    
  )
}
export default App;
