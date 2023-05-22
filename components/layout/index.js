import { Box, useMediaQuery, useTheme } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion';
import React, { use, useEffect, useState } from 'react'
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

    const _lg = useMediaQuery(theme => theme.breakpoints.down('lg'));

    const [drawerOpen, setDrawerOpen] = useState(false);

    const [linkDirection, setLinkDirection] = useState(0)
    const [sapinsDirection, setSapinsDirection] = useState(0)

    const [disableTransition, setDisableTransition] = useState(false);

    useEffect(() => {
        setDrawerOpen(false)
    }, [router.route, _lg, router.locale])

    useEffect(() => {
      setLinkDirection(drawerOpen? 1:-1)
    }, [drawerOpen])

    useEffect(() => {
      setSapinsDirection(linkDirection)
    }, [linkDirection])



    const [pageReady, setPageReady] = useState(false)
    const [headerReady, setHeaderReady] = useState(false)


    useEffect(() => {
      if (router.route == '/404') return setDisableTransition(true)
      if (router.route == '/realisations') return setDisableTransition(true)
      if (router.route == '/realisations/[slug]') return setDisableTransition(true)
      setDisableTransition(false)

    }, [router.route])


    const devMode = process.env.NODE_ENV == 'development'

    const [playEntrance, setPlayEntrance] = useState(!devMode)

    useEffect(() => {
      setLinkDirection(0)
      setHeaderReady(!playEntrance)
      setPageReady(!playEntrance)

      if (playEntrance) {
        setHeaderReady(false)
      }

    }, [playEntrance])


    function routeChange() {
      window.scrollTo(0, 0);
    }

    useEffect(() => {
      router.events.on("routeChangeStart", routeChange);
      return () => {
        router.events.off("routeChangeStart", routeChange);
      };
    }, []);

  const [drawerOpenRender, setDrawerOpenRender] = useState(false)
  useEffect(() => { 
    setDrawerOpenRender(drawerOpen) 
  }, [drawerOpen])


  return (

     <LinkDirectionContext.Provider value={{linkDirection, setLinkDirection}}>


          <AnimatePresence>
            {headerReady && <Header {...{setLinkDirection, drawerOpen, setDrawerOpen, setPlayEntrance, colorMode, setColorMode}} />}

            {router.route == '/' && !drawerOpen &&
              <ModelViewer key='model-viewer' direction={linkDirection} pageReady={pageReady} />        
            }
          </AnimatePresence>

            <Sapins 
            drawerOpen={drawerOpenRender} 
            direction={linkDirection} pageReady={pageReady} />

          {playEntrance && 
            <ImageEntrance {...{setPageReady, setHeaderReady, playEntrance, setPlayEntrance}} />
          }

          <AnimatePresence initial={false}>
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



