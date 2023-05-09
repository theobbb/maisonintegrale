import { Box, Button, ButtonBase, IconButton, SvgIcon, Typography, useMediaQuery, useTheme } from '@mui/material'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import Sapin from '../sapin'
import { AnimatePresence, LayoutGroup, motion, motionValue } from 'framer-motion'
import { ThemeContext } from '@/utils/context'
import MenuIcon from '@mui/icons-material/Menu';
import { maisons } from '@/utils/maisons'
import { linkPaths } from '@/utils/linkPaths'
import HomeIcon from '@mui/icons-material/Home';
import NavLink from './navLink'
import LocaleLink from './localeLink'


import Options from './options'
import LazyImage from '../LazyImage'
import ContactButton from '../contactButton'
import Title from './Title'
import MenuButton from './menuButton'

const transition = { ease: [0.43, 0.13, 0.23, 0.96], duration: 0.8 };

export default function Header({setLinkDirection, drawerOpen, setDrawerOpen, setPlayEntrance, colorMode, setColorMode}) {

    const theme = useTheme();

    const router = useRouter()

    const matchDownSM = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const matchDownMD = useMediaQuery(theme => theme.breakpoints.down('md'));
    const matchDownLG = useMediaQuery(theme => theme.breakpoints.down('lg'));
    const matchDownXL = useMediaQuery(theme => theme.breakpoints.down('xl'));
    

    const [firstLoad, setFirstLoad] = useState(true)

    useEffect(() => {
        setFirstLoad(true)
    }, [])


  return (
<>
<AnimatePresence>
    {drawerOpen && 
    <Box 
    component={motion.div}
    initial={{opacity: 0}}
    animate={{opacity: 1, transition: {...transition, delay: 0.8}}}
    exit={{opacity: 0}}
    transition={{...transition, duration: 0.3}}
    sx={{position: 'fixed', bottom: 24, left: 24}}> 
        {theme.palette.mode === 'light' && <LazyImage style={{width: '64px'}} src='/icons/logo-light.png'/>}
        {theme.palette.mode === 'dark' && <LazyImage style={{width: '64px'}} src='/icons/logo-dark.png'/>}
    </Box>}
</AnimatePresence>

    <Box 
    id='header'
    component={motion.div}
    initial={!matchDownLG ? {y: '-100%'}:{opacity: 0}}
    animate={{y: 0, opacity: 1}}
    exit={!matchDownLG ? {y: '-100%'}:{opacity: 0}}
    transition={{transition: { ease: [0.43, 0.13, 0.23, 0.96] }, duration: 0.4}}

    sx={{
        position: 'fixed', 
        background: matchDownLG? 'none':  theme.palette.background.default,
        zIndex: 10,
        top: 0,
        left: 0, 
        right: 0,
        display: 'flex', 
        flexDirection: matchDownLG? 'column':'row',
        width: '100%', 
        zIndex: 100,
        alignItems: matchDownLG?'flex-start':'center', 
        justifyContent: 'space-between'
    }}>


        <Box sx={{
            
            flex: 1, 
            display: 'flex', 
            alignItems: 'center', 
            py: matchDownLG? 0.3:1,
            px: matchDownLG && theme.layout.x,
            background: matchDownLG? theme.palette.background.default : 'none',
            width: '100%',
            height: '100%',

        }}>
            {matchDownLG && 
            <Box>
                <MenuButton {...{drawerOpen, setDrawerOpen}} />
            </Box> }

            {!matchDownLG&& 

            <Box sx={{width: {xl: 60, lg: 36}}}>
            <Box sx={{display: 'flex', alignItems: 'center', position: 'absolute', top: 0, left: 0, width: '100%'}}>
            <LazyImage sx={{paddingLeft: {xl: 2, lg: 1.5}, paddingRight: {xl: 1, lg: 0}, py: 1, width: {xl: 60, lg: 36, md: 30}}}
            key={`logo-${theme.palette.mode}`}
            src={`/icons/logo-${theme.palette.mode}.png`} />

            </Box>
            </Box>}
            


            
                <Title drawerOpen={drawerOpen} />
           

        </Box>

        <AnimatePresenceToggle>

        {(!matchDownLG || drawerOpen) && 
        <>
        
            <Box 
            key={`links-${drawerOpen}`}
            component={motion.div}
            initial={{x: matchDownLG?`${-60}vw`:0}}
            animate={{x: 0, transition: {...transition, delay: 0.2}}}
            exit={{x: matchDownLG?`${-60}vw`:0, transition: {...transition, delay: 0.2}}}
            transition={{transition: { ease: [0.43, 0.13, 0.23, 0.96] }, duration: 0.8 }}
            sx={{
                display: 'flex', 
                my: matchDownLG? 6:0, 
                flexDirection: matchDownLG? 'column':'row', 
                flex: 4, 
                justifyContent: 'center', 
                
                mx: {lg: 0, md: 7.8, sm: 6.5, xs: 1},
                position: 'relative',
                
            }}>
                
                {linkPaths[router.locale].slice(matchDownLG? 0:1).map((path, index) => (
                    <NavLink     
                    index={index + 1}
                    href={path.name} 
                    py={matchDownLG? 0.5:0}
                    px={matchDownLG? 2:1.5}
                    key={`header-links-${path.name}`} 
                    variant={matchDownLG && 'h4'}
                    drawerOpen={drawerOpen}
                    sx={{position: 'relative', mx: matchDownLG?  0.5:1, my: matchDownLG&& 0.5}}>

                        {path.title}
                    </NavLink>
                ))}

                
                

            </Box>


            <Options {...{setLinkDirection, drawerOpen, setDrawerOpen, setPlayEntrance, colorMode, setColorMode}} />
        </>
        
        }
        </AnimatePresenceToggle>
        
    
    </Box>
</>
  )
}
function AnimatePresenceToggle ({children}) {
    const matchDownLG = useMediaQuery(theme => theme.breakpoints.down('lg'));
    const matchDownXL = useMediaQuery(theme => theme.breakpoints.down('xl'));

    return matchDownLG ? 
        <AnimatePresence>
            {children}
        </AnimatePresence>
        :
        children
    
}

