import { Box, Button, ButtonBase, IconButton, SvgIcon, Typography, useMediaQuery, useTheme, useColorMode } from '@mui/material'
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
import LazyImage from '../Image'
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
    

    const [hideLogo, setHideLogo] = useState(false)

    useEffect(() => {
        if (router.route == '/realisations') return setHideLogo(true)
        if (router.route == '/realisations/[slug]') return setHideLogo(true)
        setHideLogo(false)
    }, [router.route])




  return (
<>


    <Box 
    
    component={motion.div}
    initial={{opacity: 0}}
    animate={{opacity: 1, transition: {...transition, delay: 0.8}}}
    exit={{opacity: 0}}
    transition={{...transition, duration: 0.3}}
    sx={{
        position: 'fixed', 
        bottom: 24, left: 12,
        width: 72, height: 72,
        transition: 'transform cubic-bezier(0.43, 0.13, 0.23, 0.96) .8s', transform: 'translateX(-300px)', 
        ...drawerOpen ? {opacity: 1, transform: 'translateX(0)', transitionDelay: '.8s'}:{opacity: 0, transform: 'translateX(-300px)'}
    }}> 

        <Logo />
    </Box>

   

    <Box sx={{
        position: 'fixed', top: {lg: 5, xl: 5}, left: {lg: 2, xl: 0}, height: {lg: 36, xl: 60}, width: {lg: 46, xl: 80}, zIndex: 1000,
        transition: 'cubic-bezier(0.43, 0.13, 0.23, 0.96) .8s', transform: 'translateX(-100px)', 
        ...(!matchDownLG && !hideLogo) ? {opacity: 1, transform: 'translateX(0)', transitionDelay: '.2s'}:{opacity: 0, transform: 'translateX(-100px)'}
        }} 
    >

    <Logo />



    </Box>



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
            position: 'relative',
            
        }}>
            {matchDownLG && 
                
                <MenuButton {...{drawerOpen, setDrawerOpen}} />
            }
            <Box sx={{paddingLeft: {xl: hideLogo? 1:8.4, lg: 4.5, md: 0.5, sm: 0.5, xs: 0.5}}}>

            
                <Title layout drawerOpen={drawerOpen} />
            </Box>

        </Box>

        

        
        
        
            <Box 

            sx={{
                display: 'flex', 
                my: matchDownLG? 6:0, 
                flexDirection: matchDownLG? 'column':'row', 
                flex: 4, 
                justifyContent: 'center', 
                
                mx: {lg: 0, md: 7.8, sm: 6.5, xs: 1},
                position: 'relative',
                transition: 'cubic-bezier(0.43, 0.13, 0.23, 0.96) .8s', transform: 'translateX(-100%)', 
                ...(!matchDownLG || drawerOpen) ? {opacity: 1, transform: 'translateX(0)'}:{opacity: 0, transform: 'translateX(-100%)'}
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
                    sx={{position: 'relative', transition: 'unset', mx: matchDownLG?  0.5:1, my: matchDownLG&& 0.5}}>

                        {path.title}
                    </NavLink>
                ))}

                
                

            </Box>

            <div style={{transition: 'cubic-bezier(0.43, 0.13, 0.23, 0.96) .8s', transform: 'translateX(-100%)', 
            ...(!matchDownLG || drawerOpen) ? {opacity: 1, transform: 'translateX(0)', transitionDelay: '.5s'}:{opacity: 0, transform: 'translateX(-100%)'}}}>
            <Options {...{setLinkDirection, drawerOpen, setDrawerOpen, setPlayEntrance, colorMode, setColorMode}} />
            </div>
        
        
    
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

function Logo ({style}) {

    const theme = useTheme();

    const { mode } = theme.palette

    const maison = {stroke: mode == 'light'? 'rgba(0, 0, 0, 0.8)': 'rgba(255, 255, 255, 0.72)'}
    const integrale = {fill: mode == 'light'? 'rgba(73, 138, 46, 0.9)': 'rgba(73, 138, 46, 1)'}
    return (
        <svg style={{position: 'absolute', height: '100%', width: '100%', top: 0, left: 0}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 214.85 313.13">
            <title>logo</title>
            <g style={{fill: 'none'}}>
                <polygon style={{...maison, strokeMiterlimit: 10, strokeWidth: '16px'}} points="8.36 119.44 8.36 238.15 189.93 238.15 189.93 119.44 98.97 48.66 8.36 119.44"/>
            </g>
            <g >
                <path style={integrale} d="M90.42,283.92C76.49,306.76,60.85,303.84,60,305.39A22.9,22.9,0,0,1,40,317C20,316.59,7.22,302.68,7.21,301.07c0-2.28,11.57-12.56,33.43-12.82,12.67-.15,17.67,9.48,19,9.32,6.11-.76,10.14-5.31,13.74-10,11.55-15,18.44-78.79,28.89-129.24S122.55,63.74,138.86,37c13.93-22.84,29.57-19.92,30.43-21.47A22.93,22.93,0,0,1,189.23,3.89c20.07.42,32.83,14.33,32.84,16,0,2.28-11.57,12.56-33.43,12.82-12.67.15-17.67-9.49-19-9.32-6.12.76-10.14,5.31-13.75,10-11.54,15-21.4,87.21-29.17,127C121.55,186.58,106.73,257.17,90.42,283.92Z" transform="translate(-7.21 -3.89)"/>
            </g>
            <g>
                <line style={maison} x1="8.36" y1="238.15" x2="189.93" y2="238.15"/>
            </g>
        </svg>
    )
}

