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

import RefreshIcon from '@mui/icons-material/Refresh';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';



export default function Header({setLinkDirection, drawerOpen, setDrawerOpen, setPlayEntrance}) {

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
    initial={{y: '-100%'}}
    animate={{y: 0}}
    exit={{y: '-100%'}}
    transition={{transition: { ease: [0.43, 0.13, 0.23, 0.96] }, duration: 0.4}}

    sx={{
        position: 'fixed', 
        background: matchDownXL? 'none':  theme.palette.background.default,
        zIndex: 10,
        top: 0,
        left: 0, 
        right: 0,
        display: 'flex', 
        flexDirection: matchDownXL? 'column':'row',
        width: '100%', 
        zIndex: 100,
        alignItems: matchDownXL?'flex-start':'center', 
        justifyContent: 'space-between'
    }}>
        <Box sx={{
            
            flex: 1, 
            display: 'flex', 
            alignItems: 'center', 
            py: matchDownXL? 0.3:1,
            px: theme.layout.x,
            background: matchDownXL? theme.palette.background.default : 'none',
            width: '100%',
            height: '100%',

        }}>
            {matchDownXL && 
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



            <NavLink href='/' 
            
            text='MAISON INTÉGRALE' 
            sx={{position: 'relative', marginLeft: '-12px'}} 
            //setLinkDirection={setLinkDirection} 
            //transition={{transition: { ease: [0.43, 0.13, 0.23, 0.96] }, duration: 0.8}}
            
            index='home' />

        </Box>

        

        
        
        <AnimatePresenceToggle>

        {(!matchDownXL || drawerOpen) && 
        <>
        
            <Box 
            key={`links-${drawerOpen}`}
            component={motion.div}
            initial={{x: matchDownXL?`${-60}vw`:0}}
            animate={{x: 0}}
            exit={{x: matchDownXL?`${-60}vw`:0}}
            transition={{transition: { ease: [0.43, 0.13, 0.23, 0.96] }, duration: 0.8}}
            sx={{
                display: 'flex', 
                my: matchDownXL? 6:0, 
                flexDirection: matchDownXL? 'column':'row', 
                flex: 4, 
                justifyContent: 'center', 
                mx: matchDownXL? 3:0,
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
                    sx={{position: 'relative', mx: 0.5, my: matchDownXL? 0.5:0}} />
                ))}

            </Box>
            <Box 
            key={`locales-${drawerOpen}`}
            component={motion.div}
            initial={{x: matchDownXL?`${-60}vw`:0}}
            animate={{x: 0}}
            exit={{x: matchDownXL?`${-60}vw`:0}}
            transition={{transition: { ease: [0.43, 0.13, 0.23, 0.96] }, duration: 0.8}}
            sx={{
                display: 'flex', 
                flex: 1, 
                justifyContent: 'flex-end',
                mx: matchDownXL? 3:0,
                alignItems: 'center'
            }}>
            
                <LocaleLink href={router.asPath} locale='fr' text='FR' 
                direction={-1}
                sx={{position: 'relative', mx: 0.2}} 
                //setLinkDirection={setLinkDirection} 
                />
                <LocaleLink href={router.asPath} locale='en' text='EN' 
                direction={1}
                sx={{position: 'relative', mx: 0.2}} 
                //setLinkDirection={setLinkDirection} 

                />

                <Box sx={{mx: 2, display: 'flex', alignItems: 'center'}}>
                <IconButton><LightModeIcon /></IconButton>
                    <IconButton onClick={() => setPlayEntrance(true)}>
                    <RefreshIcon />
                    
                    
                    </IconButton>
                    
                    {/*<IconButton><DarkModeIcon/></IconButton>*/}
                </Box>
                

            </Box>
        </>
        }
        </AnimatePresenceToggle>
        
    
    </Box>

  )
}
function AnimatePresenceToggle ({children}) {
    const matchDownLG = useMediaQuery(theme => theme.breakpoints.down('lg'));
    const matchDownXL = useMediaQuery(theme => theme.breakpoints.down('xl'));

    return matchDownXL ? 
        <AnimatePresence>
            {children}
        </AnimatePresence>
        :
        children
    
}

