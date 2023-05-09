import React, { useEffect, useState } from 'react'
import NavLink from './navLink'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { transition } from '@/utils/transitions';

export default function Title({drawerOpen}) {

  const theme = useTheme();
  const matchDownLG = useMediaQuery(theme => theme.breakpoints.down('lg'));

    const [small, setSmall] = useState(false);

    useEffect(() => {
      if (drawerOpen) return setSmall(!drawerOpen);
      return setSmall(matchDownLG);
    }, [matchDownLG, drawerOpen])

  return (
    <NavLink href='/'    
    text='MAISON INTÉGRALE' 
    sx={{position: 'relative', 
    whiteSpace: 'nowrap',
    }} 
    index={0}>
    
        <motion.div style={{display: 'flex'}}>
        <LayoutGroup>
        
        {('MAISON INTÉGRALE').split(' ').map((word, index) =>  (
            <Word word={word} small={small} key={`title-word-${index}`} />
        ))}
        </LayoutGroup>
        </motion.div>
        
    </NavLink>
  )
}

function Word ({word, small}) {

    const [visibleDot, setVisibleDot] = useState(small);

    useEffect(() => {
      setVisibleDot(small)
    }, [small])

    return (
        <LayoutGroup>
            <AnimatePresence initial={false}>
            {word.split('').map((letter, index) => (index == 0 || !small) && (

              <motion.div layout style={{overflow: 'hidden'}} key={`title-letter-${index}`}>
                <motion.div
                initial={{x: '-400%'}}
                animate={{x: 0, transition: {...transition, duration: 0.5, delay: index*0.05 + 0.1}}}
                exit={{x: '-400%', transition: {...transition, duration: 0.5, delay: (word.length - index) *0.05}}}
                transition={{...transition, delay: small && 0}}
                
                >{letter}

                </motion.div>
              </motion.div>
                
               
            ))}

            </AnimatePresence>
           
            <motion.div 
            key={`title-word-dot-${word}`}
            initial={{opacity: visibleDot? 1: 0}}
            animate={{opacity: visibleDot? 1: 0, transition: {...transition, delay: 0.5}}}
            layout
            >.</motion.div>
          </LayoutGroup>
    )
}
