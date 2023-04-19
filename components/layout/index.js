import { Box, Divider, Grid, useMediaQuery, useTheme } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import Header from '../header'
import Sapin from '../sapin';
import ScrollSapin from '../scrollSapin';
import PageTransition from '../pageTransition';
import Sapins from '../sapins';
import { useRouter } from 'next/router'
import { createContext } from 'react';
import Footer from '../footer';
import ModelViewer from '../modelViewer';

import Cookies from 'js-cookie'
import ImageEntrance from '../imageEntrance';


export const LinkDirectionContext = createContext();

export default function Layout({children}) {

    const theme = useTheme();

    const router = useRouter();

    const matchDownSM = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const matchDownMD = useMediaQuery(theme => theme.breakpoints.down('md'));
    const matchDownLG = useMediaQuery(theme => theme.breakpoints.down('lg'));

    const [drawerOpen, setDrawerOpen] = useState(false);

    const [linkDirection, setLinkDirection] = useState(0)

    const [pathSapins, setPathSapins] = useState(null);

    const [disableTransition, setDisableTransition] = useState(false);

    useEffect(() => {
      
        setDrawerOpen(false)
        setPathSapins(sapins[router.route]);

    }, [router.asPath, matchDownLG, router.locale])

    useEffect(() => {
      if (drawerOpen) setPathSapins(sapins.drawer)
      else setPathSapins(sapins[router.route]);
      
      setLinkDirection(drawerOpen? 1:-1)

    }, [drawerOpen])

    const [pageReady, setPageReady] = useState(false)
    const [headerReady, setHeaderReady] = useState(false)
    //const isDynamic = router.route == '/[...dynamic]'

    const [isDynamic, setIsDynamic] = useState(false);

    useEffect(() => {
      if (router.route == '/404') return setDisableTransition(true)
      if (router.route == '/realisations') return setDisableTransition(true)
      if (router.route == '/realisations/[slug]') return setDisableTransition(true)
      console.log('ff')
      setDisableTransition(false)
      
     
    }, [router.asPath])

    const [isNewSession, setIsNewSession] = useState(false)
    useEffect(() => {
      const sessionId = Cookies.get('sessionId')
      if (!sessionId) {
        setIsNewSession(true)
        Cookies.set('sessionId', Date.now().toString())
      }
    }, [])

    useEffect(() => {
      //if (isNewSession) 
      setPlayEntrance(isNewSession)
      setHeaderReady(!isNewSession)
      setPageReady(!isNewSession)
      
     
    }, [isNewSession])
    

    const [playEntrance, setPlayEntrance] = useState(false)

    useEffect(() => {
      //setLinkDirection(0)

      setPageReady(!playEntrance)

      if (playEntrance) {
        setHeaderReady(false)
      }

    }, [playEntrance])


//const dynamicRoute = router.route == '/[...dynamic]' && !lastIsDynamic? `dynamic-${Date.now()}`: router.route;


  return (

   
    
     <LinkDirectionContext.Provider value={{linkDirection, setLinkDirection}}>

      

          <AnimatePresence>
          {headerReady && <Header {...{setLinkDirection, drawerOpen, setDrawerOpen, setPlayEntrance}} />}
          </AnimatePresence>

          <AnimatePresence>
          {playEntrance && 
            <ImageEntrance {...{setPageReady, setHeaderReady, playEntrance, setPlayEntrance}} />
          }
          </AnimatePresence>

          <AnimatePresence>

                {!drawerOpen && 
                
                  <PageTransition key={`page-${router.route}}`} direction={linkDirection} drawerOpen={drawerOpen} 
                disableTransition={disableTransition} pageReady={pageReady}>
                  <Box sx={{position: 'absolute', width: '100%', top: theme.spacing(6), 
                  minHeight: '100vh',
                  left: 0
                  }}>
                    <Box sx={{minHeight: '100vh'}}>
                    {children}
                    </Box>
                    <Footer />
                    
                  </Box>
                  </PageTransition>
                  
                }
                
                <Sapins sapins={pathSapins} key={drawerOpen? 'sapins-drawer-open' : `sapins-${router.route}`} direction={linkDirection} pageReady={pageReady} />
              
                {router.route == '/' && !drawerOpen &&

                    <ModelViewer direction={linkDirection} pageReady={pageReady} />
                
                   
          }
                
                
          </AnimatePresence>
          
          
          
        
          </LinkDirectionContext.Provider>

  )
}



const sapins = {
  'drawer': [
      { height: 120, position: 10 },
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
      { height: 70, position: 20 },
      { height: 60, position: 60 },
      { height: 40, position: 80 },
      { height: 90, position: 90 },
  ],
  
  '/contact': [
      { height: 70, position: 20 },
      { height: 60, position: 60 },
      { height: 40, position: 80 },
      { height: 90, position: 90 },
  ],
}