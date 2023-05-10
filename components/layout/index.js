import { useMediaQuery, useTheme } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import Header from '../header'
import PageTransition from './pageTransition';
import Sapins from '../sapins';
import { useRouter } from 'next/router'
import { createContext } from 'react';
import Footer from '../footer';
import ModelViewer from '../modelViewer';

import ImageEntrance from '../imageEntrance';


export const LinkDirectionContext = createContext();

export default function Layout({ colorMode, setColorMode, children }) {

    const theme = useTheme();

    const router = useRouter();

    const matchDownSM = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const matchDownMD = useMediaQuery(theme => theme.breakpoints.down('md'));
    const matchDownLG = useMediaQuery(theme => theme.breakpoints.down('lg'));

    const [drawerOpen, setDrawerOpen] = useState(false);

    const [linkDirection, setLinkDirection] = useState(0)

    const [pathSapins, setPathSapins] = useState(null);
    const [drawerSapinsTimeKey, setDrawerSapinsTimeKey] = useState(null);

    const [disableTransition, setDisableTransition] = useState(false);

    useEffect(() => {
      
        setDrawerOpen(false)
        setPathSapins(sapins[router.route]);

    }, [router.asPath, matchDownLG, router.locale])

    useEffect(() => {
      setDrawerSapinsTimeKey(Date.now().toString())
      setLinkDirection(drawerOpen? 1:-1)
      //if (!matchDownMD) return;
      if (drawerOpen) setPathSapins(sapins.drawer)
      else setPathSapins(sapins[router.route]);
      
      

    }, [drawerOpen])



    const [pageReady, setPageReady] = useState(false)
    const [headerReady, setHeaderReady] = useState(false)


    useEffect(() => {
      if (router.route == '/404') return setDisableTransition(true)
      if (router.route == '/realisations') return setDisableTransition(true)
      if (router.route == '/realisations/[slug]') return setDisableTransition(true)
      setDisableTransition(false)

    }, [router.route])


    const devMode = process.env.NODE_ENV
    //process.env.NODE_ENV

    const [playEntrance, setPlayEntrance] = useState(!devMode)

    useEffect(() => {
      setLinkDirection(0)
      setHeaderReady(!playEntrance)
      setPageReady(!playEntrance)

      if (playEntrance) {
        setHeaderReady(false)
      }

    }, [playEntrance])


    function routeChange(route) {
      
      window.scrollTo(0, 0);
    }

    useEffect(() => {
      router.events.on("routeChangeStart", routeChange);
      return () => {
        router.events.off("routeChangeStart", routeChange);
      };
    }, []);


  return (

     <LinkDirectionContext.Provider value={{linkDirection, setLinkDirection}}>


          <AnimatePresence>
          {headerReady && <Header {...{setLinkDirection, drawerOpen, setDrawerOpen, setPlayEntrance, colorMode, setColorMode}} />}

          
          
          
              
              {router.route == '/' && !drawerOpen &&

                  <ModelViewer key='model-viewer' direction={linkDirection} pageReady={pageReady} />        
              }
          </AnimatePresence>

          <AnimatePresence>
            <Sapins sapins={pathSapins} 
            drawerOpen={drawerOpen}
            key={drawerOpen? 'sapins-drawer-open' : `sapins-${router.route}`} 
            direction={linkDirection} pageReady={pageReady} />
          </AnimatePresence>

          

          
          {playEntrance && 
            <ImageEntrance {...{setPageReady, setHeaderReady, playEntrance, setPlayEntrance}} />
          }
          
          
          <AnimatePresence initial={false} drawerOpen={drawerOpen}>
          {!drawerOpen && !playEntrance &&
          <PageTransition key={router.route.split('/')[1]} drawerOpen={drawerOpen} direction={linkDirection} pageReady={pageReady} disableTransition={disableTransition}>
            {children}
            <Footer />
          </PageTransition>
        }
</AnimatePresence>
          

          </LinkDirectionContext.Provider>

  )
}



const sapins = {
  'drawer': [
      { height: 90, position: 80 },
      { height: 60, position: 50 },
      { height: 40, position: 80 },
  ],

  '/services': [
      { height: 70, position: 10 },
      { height: 60, position: 50 },
      
  ],
  '/[...others]': [

  ],
  '/equipe': [
      { height:  30, position: 10, hide: 'lg' },
      { height: 70, position: 20 },
      { height: 20, position: 40 },
      { height: 60, position: 60 },
      { height: 40, position: 80 },
      { height: 90, position: 90 },
  ],
  
  '/contact': [
      { height: 20, position: 22 },
      { height: 60, position: 60, hide: 'lg' },
      { height: 30, position: 30, hide: 'sm' },
      { height: 70, position: 70 },
  ],
}