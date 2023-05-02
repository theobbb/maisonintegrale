import { Box, Button, IconButton, SvgIcon, Typography, useMediaQuery, useTheme } from '@mui/material'
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



export default function Header({setLinkDirection, drawerOpen, setDrawerOpen, setPlayEntrance, colorMode, setColorMode}) {

    const theme = useContext(ThemeContext);

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
            px: theme.layout.x,
            background: matchDownLG? theme.palette.background.default : 'none',
            width: '100%',
            height: '100%',

        }}>
            {matchDownLG && 
            <Typography variant={matchDownLG && 'h4'} sx={{position: 'relative', height: '100%'}} >
                <IconButton 
                onClick={() => setDrawerOpen(!drawerOpen)}
                variant='inline' 
                sx={{display: 'flex', p:0.5, marginRight: 1, fontSize: 'inherit', height: '100%'}}>
                    <SvgIcon
                    sx={{fontSize: 'inherit'}}
                    strokeWidth='1px'
                    
                    //width={matchDownMD? '18px':'20px'}
                    style={{fill: '#b5d1b3', stroke: '#88bc8a', strokeMiterlimit: '10'}} 
                    
                   
                    viewBox="0 0 200 200">
                        <defs>
                        
                        </defs>
                        <title>home-icon</title>
                        <polygon vectorEffect="non-scaling-stroke" points="30 170 170 170 170 80 100 20 30 80"/>
                        </SvgIcon>
                    
                </IconButton>
            </Typography>}

            <Box >
            {colorMode === 'light' && <LazyImage style={{width: '24px'}} src='/icons/logo-light.png'/>}
            {colorMode === 'dark' && <LazyImage style={{width: '24px'}} src='/icons/logo-dark.png'/>}
       
            </Box>
            


            
            <NavLink href='/' 
            
            text='MAISON INTÉGRALE' 
            sx={{position: 'relative', 
            whiteSpace: 'nowrap',
            //marginLeft: '-12px'
            }} 
            //setLinkDirection={setLinkDirection} 
            //transition={{transition: { ease: [0.43, 0.13, 0.23, 0.96] }, duration: 0.8}}
            
            index='home' />
           

        </Box>

        

        
        
        <AnimatePresenceToggle>

        {(!matchDownLG || drawerOpen) && 
        <>
        
            <Box 
            key={`links-${drawerOpen}`}
            component={motion.div}
            initial={{x: matchDownLG?`${-60}vw`:0}}
            animate={{x: 0}}
            exit={{x: matchDownLG?`${-60}vw`:0}}
            transition={{transition: { ease: [0.43, 0.13, 0.23, 0.96] }, duration: 0.8}}
            sx={{
                display: 'flex', 
                my: matchDownLG? 6:0, 
                flexDirection: matchDownLG? 'column':'row', 
                flex: 4, 
                justifyContent: 'center', 
                
                mx: matchDownLG? 3:0,
                position: 'relative'
            }}>
                
                {linkPaths[router.locale].paths.map((path, index) => (
                    <NavLink 
                    index={index}
                    href={path.href} 
                    text={path.name} 
                    key={path.name} 
                    variant={matchDownLG && 'h5'}
                    //setLinkDirection={setLinkDirection}
                    drawerOpen={drawerOpen}
                    sx={{position: 'relative', mx: 0.5, my: matchDownLG? 0.5:0}} />
                ))}

            </Box>
            

            <Options {...{setLinkDirection, drawerOpen, setDrawerOpen, setPlayEntrance, colorMode, setColorMode}} />
            
        </>
        }
        </AnimatePresenceToggle>
        
    
    </Box>

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

