import { Box, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material'
import { motion } from 'framer-motion'
import React from 'react'
import LocaleLink from './localeLink';
import RefreshIcon from '@mui/icons-material/Refresh';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useRouter } from 'next/router'

const transition = { ease: [0.43, 0.13, 0.23, 0.96], duration: 0.8 };

export default function Options({setLinkDirection, drawerOpen, setDrawerOpen, setPlayEntrance, colorMode, setColorMode}) {

    const theme = useTheme();

    const router = useRouter()

    const matchDownSM = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const matchDownMD = useMediaQuery(theme => theme.breakpoints.down('md'));
    const matchDownLG = useMediaQuery(theme => theme.breakpoints.down('lg'));
    const matchDownXL = useMediaQuery(theme => theme.breakpoints.down('xl'));

    const locales = [
      {locale: 'fr', label: 'FR'},
      {locale: 'en', label: 'EN'}
    ]

  return (
    <Box 

    component={motion.div}
    initial={{x: matchDownLG?`${-100}vw`:0}}
    animate={{x: 0, transition: {...transition, delay: 0.4}}}
    exit={{x: matchDownLG?`${-100}vw`:0, transition: {...transition, delay: 0.1}}}
    transition={{transition: { ease: [0.43, 0.13, 0.23, 0.96] }, duration: 0.8}}
    sx={{
        display: 'flex', 
        flex: 1, 
        justifyContent: 'flex-end',
        paddingLeft: {lg: 0, md: 8, sm: 6.5, xs: 1},
        //px: theme.layout.x,

        //marginRight: {lg: 2, md: 7.8, sm: 6.5, xs: 1.5},
        alignItems: 'center'
    }}>

        <Box sx={{display: 'flex', alignItems: 'center'}}>
        {locales.map((locale, index) => (
          <LocaleLink key={`locale-header-${locale.locale}`} 
          locale={locale.locale} 
          variant={matchDownLG && 'h4'}
          py={matchDownLG? 0.5:0}
          px={matchDownLG? 2:1.5}
          sx={{position: 'relative', mx: matchDownLG? 0.3:0.3, my: matchDownLG? 0.5:0}}>
            {locale.label}
          </LocaleLink>
        ))}

           

        </Box>

        <Box sx={{marginLeft: 2, display: 'flex', alignItems: 'center'}}>
          {theme.palette.mode == 'light' && 
            <IconButton onClick={() => setColorMode('dark')}>
              <LightModeIcon sx={{typography: {lg: 'h5', xs: 'h3'}}} />
            </IconButton>
          }
          {theme.palette.mode == 'dark' && 
          <IconButton onClick={() => setColorMode('light')}>
            <DarkModeIcon sx={{typography: {lg: 'h5', xs: 'h3'}}}  />
          </IconButton>
        }
            <IconButton onClick={() => setPlayEntrance(true)} sx={{marginRight: {lg: 2, md: 7.8, sm: 6.5, xs: 1.5}}}>
              <RefreshIcon sx={{typography: {lg: 'h5', xs: 'h3'}}} />
            </IconButton>
        </Box>

    </Box>
  )
}
