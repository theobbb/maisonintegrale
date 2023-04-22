import { Box, IconButton, useMediaQuery, useTheme } from '@mui/material'
import { motion } from 'framer-motion'
import React from 'react'
import LocaleLink from './localeLink';
import RefreshIcon from '@mui/icons-material/Refresh';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useRouter } from 'next/router'

export default function Options({setLinkDirection, drawerOpen, setDrawerOpen, setPlayEntrance}) {

    const theme = useTheme();

    const router = useRouter()

    const matchDownSM = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const matchDownMD = useMediaQuery(theme => theme.breakpoints.down('md'));
    const matchDownLG = useMediaQuery(theme => theme.breakpoints.down('lg'));
    const matchDownXL = useMediaQuery(theme => theme.breakpoints.down('xl'));

    

  return (
    <Box 
    key={`options-${drawerOpen}`}
    component={motion.div}
    initial={{x: matchDownLG?`${-60}vw`:0}}
    animate={{x: 0}}
    exit={{x: matchDownLG?`${-60}vw`:0}}
    transition={{transition: { ease: [0.43, 0.13, 0.23, 0.96] }, duration: 0.8}}
    sx={{
        display: 'flex', 
        flex: 1, 
        justifyContent: 'flex-end',
        paddingLeft: {xl: 17, lg: 11, md: 7, sm: 5, xs: 3},
        //px: theme.layout.x,
        mx: 1,
        alignItems: 'center'
    }}>
        <Box sx={{display: 'flex'}}>
    
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
        </Box>

        <Box sx={{marginLeft: 2, display: 'flex', alignItems: 'center'}}>
        <IconButton><LightModeIcon /></IconButton>
            <IconButton onClick={() => setPlayEntrance(true)}>
            <RefreshIcon />
            
            
            </IconButton>
            
            {/*<IconButton><DarkModeIcon/></IconButton>*/}
        </Box>
        

    </Box>
  )
}
