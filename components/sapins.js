import { Box, useMediaQuery } from '@mui/material'
import { motion, useAnimate, useScroll, useSpring, usePresence, AnimatePresence, useMotionValueEvent } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import Sapin from './sapin'
import { useRouter } from 'next/router'

const transition = { ease: [0.43, 0.13, 0.23, 0.96], duration: 2 };

export default function Sapins({direction, pageReady, id, drawerOpen}) {

  const router = useRouter();

  const _xs = useMediaQuery(theme => theme.breakpoints.down('xs'));
  const _sm = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const _md = useMediaQuery(theme => theme.breakpoints.down('md'));
  const _lg = useMediaQuery(theme => theme.breakpoints.down('lg'));
  const _xl = useMediaQuery(theme => theme.breakpoints.down('xl'));

  const [actives, setActives] = useState(null);
  const [filteredActives, setFilteredActives] = useState(null);

  const [newDirection, setNewDirection] = useState(0)
  const [drawerWasOpen, setDrawerWasOpen] = useState(false)

  const sapinsWithIds = Object.keys(sapins).reduce((acc, route) => {
    acc[route] = sapins[route].map((obj, index) => {
      return { ...obj, id: `sapin-${route.slice(1)}-${index}` };
    });
    return acc;
  }, {});

  useEffect(() => { 

    if (drawerOpen) {
      setDrawerWasOpen(true)
      setNewDirection(-1)
      setActives(sapinsWithIds.drawer)
      
    }
    else {
      if (drawerWasOpen) {
        setNewDirection(1)
        setDrawerWasOpen(false)
      } 
      else {
        setNewDirection(direction)
      } 

      setActives(sapinsWithIds[router.route]);
    }

  }, [router.route, drawerOpen, sapins])

  
  useEffect(() => {



    if (!actives) return setFilteredActives(null);
    const newFiltered = actives.filter(sapin => {
      const { hide } = sapin;
      if (hide == 'xs' && _xs) return false;
      else if (hide == 'sm' && _sm) return false;
      else if (hide == 'md' && _md) return false;
      else if (hide == 'lg' && _lg) return false;
      else if (hide == 'xl' && _xl) return false;
      return true;
    })
    setFilteredActives(newFiltered)
  }, [actives, _xs, _sm, _md, _lg, _xl])

  const [scrollY, setScrollY] = useState(0)

  const { scrollYProgress } = useScroll()

  const springScrollY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useMotionValueEvent(springScrollY, "change", (latest) => setScrollY(latest))

  const scrollRatio = document.documentElement.scrollTop / (document.documentElement.scrollHeight - window.innerHeight) 
  let delay = scrollRatio
  delay = _lg? 0:delay

  const minScale = 0.8



  return (
    <div id='sapins' style={{position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 10000, pointerEvents: 'none'}}>
      <AnimatePresence initial={false}>

        {filteredActives && filteredActives.map((sapin, index) => (
            <Box 
            key={sapin.id}
            initial={{x: `${newDirection*100 * (sapin.height /100 + 1)}vw`}}
            animate={{x: 0, y: pageReady? 0: '100vh', opacity: pageReady? 1:0}}
            exit={{x: `${-newDirection*100 * (sapin.height /100 + 1)}vw`}}
            transition={transition}  
            style={{ 
              transformOrigin: `${sapin.position <= 50? 200 : -100 }% 100%`, 
              scale: (Math.abs(scrollY + 1) * (1 - minScale)) + minScale,
            }}
            component={motion.div}
            sx={{
              position: 'absolute', 
              height: `${sapin.height}vh`,
              width: `${sapin.height}vh`,
              bottom: -sapin.height/2.5,  
              left: sapin.position <= 50? `calc(${sapin.position}vw - ${sapin.height/2}vh)` : 'unset', 
              right: sapin.position > 50? `calc(100vw - ${sapin.position}vw - ${sapin.height/2}vh)` : 'unset', 
              zIndex: -1,
              }}
            >
              <Sapin />
            </Box>
        ))}
        
      </AnimatePresence>
    </div>
  )
}

const sapins = {
  'drawer': [
    { height: 60, position: 50 },
    { height: 90, position: 80 },
    { height: 40, position: 80 },
  ],

  '/services': [
    { height: 110, position: -5, hide: 'md' },
    { height: 60, position: 20 },
    { height: 130, position: 25 },
    { height: 85, position: 60, hide: 'md' },
    { height: 50, position: 70, hide: 'lg' },
    { height: 95, position: 80 },
  ],

  '/equipe': [
      { height: 120, position: 10, hide: 'lg' },
      { height: 70, position: 20 },
      { height: 40, position: 40 },
      { height: 60, position: 60 },
      { height: 45, position: 80 },
      { height: 90, position: 90 },
  ],
  
  '/contact': [
      { height: 70, position: -2 },
      { height: 40, position: 6 },
      { height: 50, position: 22 },
      { height:80, position: 30, hide: 'sm' },
      { height: 60, position: 60, hide: 'lg' },
      
      { height: 70, position: 95 },
      { height: 150, position: 80 },
  ],
}