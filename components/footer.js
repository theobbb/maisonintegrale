import { Box, Grid, Typography, useMediaQuery } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { useRouter } from 'next/router'
import { linkPaths } from '@/utils/linkPaths';
import NavLink from './header/navLink';
import LocaleLink from './header/localeLink';
import { client } from '@/utils/sanityClient';



export default function Footer() {
    const d = new Date();
    const year = d.getFullYear();

    const [projets, setProjets] = useState([])

    useEffect(() => {
        async function getData() {
            const query = `*[_type == "project"]{
                _id,
                orderRank,
                'name': name[$locale],
                'slug': slug[$locale].current
              }|order(orderRank)`
          const result = await client.fetch(query, { locale: locale })
          
          setProjets(result);
        }
        getData();
      }, []);

    const data = {
        fr: {
          contact: 'CONTACTEZ',
          name: 'nom',
          phone: 'téléphone',
          send: 'envoyer'
        },
        en: {
          contact: 'CONTACT',
          name: 'name',
          phone: 'phone',
          send: 'send',
          
        },
      }

      const router = useRouter();

      const { locale } = useRouter();

    const matchDownMD = useMediaQuery(theme => theme.breakpoints.down('md'));
    const matchDownLG = useMediaQuery(theme => theme.breakpoints.down('lg'));
    const matchDownXL = useMediaQuery(theme => theme.breakpoints.down('xl'));

    const variant = 'h6'

    const xSpacing = 3
    const ySpacing = matchDownXL? 0.5:0.5

    const footerRef = useRef(null)

    const [paddingTop, setPaddingTop] = useState(0)

    useEffect(() => {

        const handleResize = () => {
          if (!footerRef.current) return;
            const offsetTop = footerRef.current.getBoundingClientRect().top
            const newPaddingTop = window.innerHeight - offsetTop
            //setPaddingTop(newPaddingTop)

        };
        handleResize()
    
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, [footerRef]);    

  return (
    <Box ref={footerRef} sx={{width: '100%', paddingTop: `${paddingTop}px`}}>
        <Grid container sx={{paddingBottom: 6, px: xSpacing}} rowSpacing={6}>
        <Grid xs={12} sm={12} md={6} lg={4} xl={2} item sx={{display: 'flex'}}>
            <Typography variant={variant} sx={{my: ySpacing}}>
                LANG
              </Typography>
              <Box>
              <LocaleLink href={router.asPath} locale='fr' text='FR' 
                direction={-1}
                footer
                variant={variant}
                sx={{position: 'relative', px: 2, my: ySpacing}} 
                 />
                <LocaleLink href={router.asPath} locale='en' text='EN' 
                footer
                direction={1}
                variant={variant}
                sx={{position: 'relative', px: 2, my: ySpacing}} 
                 />
                </Box>
        </Grid>
        <Grid xs={12} sm={12} item md={6} lg={4} xl={3} sx={{display: 'flex'}}>
              <Typography variant={variant} sx={{my: ySpacing}}>
                CONTACT
              </Typography>
            
              <Box sx={{marginLeft: 2}}>
              <Typography variant={variant} sx={{paddingTop: 0, display: 'flex', alignItems: 'center', fontWeight: 700, my: ySpacing}}>
                
                450 602 4535
              </Typography>

              <Typography variant={variant} sx={{paddingTop: 0, display: 'flex', alignItems: 'center', my: ySpacing}}>
                
                LAURENTIDES
              </Typography>

              <Typography variant={variant} sx={{paddingTop: 4, display: 'flex', alignItems: 'center', my: ySpacing}}>
                
                MARISOL SARRAZIN
              </Typography>
              <Typography variant={variant} sx={{paddingTop: 1, display: 'flex', alignItems: 'center', my: ySpacing}}>
                
                MARC BAILLARGEON
              </Typography>

              <Typography variant={variant} sx={{paddingTop: 1, display: 'flex', alignItems: 'center', my: ySpacing}}>
                
                FORMULAIRE DE CONTACT
              </Typography>
              
              
              </Box>
        </Grid>
        
        <Grid xs={12} sm={12} md={6} lg={4} xl={3} item sx={{display: 'flex'}}>
            <Typography variant={variant} sx={{my: ySpacing}}>
                NAVIGATION
              </Typography>
              <Box>
            {linkPaths[locale].paths.map((path, index) => (
                
                    <NavLink 
                    index={index}
                    href={path.href} 
                    text={path.name} 
                    key={path.name} 
                    footer
                    variant={variant}
                    sx={{position: 'relative', px: 2, mx: 0, my: ySpacing}} />
                ))}
                </Box>
        </Grid>
        
        <Grid xs={12} sm={12} md={6} lg={12} xl={3} item sx={{display: 'flex'}}>
            <Typography variant={variant} sx={{my: ySpacing}}>
                PROJETS
            </Typography>
            <Box>
                {projets && projets.map((projet, index) => (
                    <NavLink 
                    index={index}
                    href={`${locale=='fr'?'projets':'work'}/${projet.slug}`} 
                    text={projet.name} 
                    key={projet._id} 
                    footer
                    
                    variant={variant}
                    sx={{position: 'relative', px: 2, my: ySpacing, whiteSpace: 'nowrap'}} />
                ))}
            </Box>
        </Grid>
        </Grid>
        <Box sx={{mx: 1}}>
          <Typography>&copy; {year} maison intégrale</Typography>
        </Box>
        
    </Box>
  )
}
