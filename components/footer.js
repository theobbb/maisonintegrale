import { Box, Grid, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useContext, useEffect, useRef, useState } from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { useRouter } from 'next/router'
import { linkPaths } from '@/utils/linkPaths';
import NavLink from './header/navLink';
import LocaleLink from './header/localeLink';
import { client } from '@/utils/sanityClient';
import { motion, useInView } from 'framer-motion';
import { QueryContext } from '@/utils/context';



export default function Footer() {
    const d = new Date();
    const year = d.getFullYear();

    const theme = useTheme()

    const router = useRouter();

    const { locale } = useRouter();

    const queries = useContext(QueryContext);

    //'name': name[$locale],
    //'slug': slug[$locale].current
    /*
    useEffect(() => {
        async function getData() {
            const query = `*[_type == "project"]{
                _id,
                orderRank,
                name,
                slug
              }|order(orderRank)`
          const result = await client.fetch(query, { locale: locale })
          
          setProjets(result);
        }
        getData();
      }, []);*/
    const matchDownXS = useMediaQuery(theme => theme.breakpoints.down('xs'));
    const matchDownSM = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const matchDownMD = useMediaQuery(theme => theme.breakpoints.down('md'));
    const matchDownLG = useMediaQuery(theme => theme.breakpoints.down('lg'));
    const matchDownXL = useMediaQuery(theme => theme.breakpoints.down('xl'));

    const variant = 'h6'

    const ySpacing = matchDownXL? 0.5:0.5

    const footerRef = useRef(null)

    const [paddingTop, setPaddingTop] = useState(0)

    /*
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
      }, [footerRef]); */
      
      /*
      const ref = useRef(null)
      const isInView = useInView(ref)*/

      

  //const maxText = matchDownXL? matchDownLG? matchDownMD? matchDownSM? 25:32:18:32:14
  const maxText = 45
  return (
    <Box
    initial={{opacity: 0}}
    component={motion.footer}
   
    transition={{duration: 0.5, ease: 'easeInOut'}}
    sx={{
      width: '100%', 
    //paddingTop: `${paddingTop}px`, 
    marginTop: {xl: 24, lg: 24, md: 16, xs: 8}}}>
        <Grid container sx={{paddingBottom: 6, px: theme.layout.x}} rowSpacing={6}>
        <Grid xs={12} sm={12} md={6} lg={4} xl={2} item sx={{display: 'flex'}}>
            <Typography variant={variant} sx={{my: ySpacing}}>
                LANG
              </Typography>
              <Box>
              <LocaleLink href={router.asPath} locale='fr'
                direction={-1}
                footer
                variant={variant}
                sx={{position: 'relative', mx: 2, my: ySpacing}} 
                >FR</LocaleLink>
                <LocaleLink href={router.asPath} locale='en' 
                footer
                direction={1}
                variant={variant}
                sx={{position: 'relative', mx: 2, my: ySpacing}} 
                >EN</LocaleLink>
                </Box>
        </Grid>
        <Grid xs={12} sm={12} item md={6} lg={4} xl={3} sx={{display: 'flex', flexDirection: matchDownSM && 'column'}}>
              
              <Typography variant={variant} sx={{my: ySpacing}}>
                CONTACT
              </Typography>
            
              <Box sx={{marginLeft: 3}}>
              <Typography variant={variant} sx={{display: 'flex', alignItems: 'center', my: ySpacing}}>
                
                MARC BAILLARGEON
              </Typography>
              <Typography variant={variant} sx={{paddingTop: 1, display: 'flex', alignItems: 'center', fontWeight: 700, my: ySpacing}}>
                
                450 602 4535
              </Typography>

              <Typography variant={variant} sx={{paddingTop: 0, display: 'flex', alignItems: 'center', my: ySpacing}}>
                
                LAURENTIDES
              </Typography>




              <Typography variant={variant} sx={{paddingTop: 1, display: 'flex', alignItems: 'center', my: ySpacing, marginLeft: -1.5}}>
                <NavLink 
                    index={0}
                    href='/contact'
                    key='footer-contact-link'
                    footer
                    
                    variant={variant}
                    sx={{position: 'relative', whiteSpace: 'nowrap', marginLeft: -0.5}}>


                    <Typography variant='h6' sx={{display: 'flex', alignItems: 'center', paddingLeft: 0.5, marginRight: -0.8}}>
                    {locale=='fr'?'FORMULAIRE DE CONTACT':'CONTACT FORM'} 
                        <ArrowOutwardIcon sx={{fontSize: 'inherit'}} />
                    </Typography>
                </NavLink>
              </Typography>
              
              
              </Box>
        </Grid>
        
        <Grid xs={12} sm={12} md={6} lg={4} xl={3} item sx={{display: 'flex', flexDirection: matchDownSM && 'column'}}>
            <Typography variant={variant} sx={{my: ySpacing}}>
                NAVIGATION
              </Typography>
              <Box>
            {linkPaths[locale].map((path, index) => (
                
                    <NavLink 
                    index={index}
                    href={path.name} 
                    key={`footer-link-${path.name}`} 
                    footer
                    variant={variant}
                    sx={{position: 'relative', mx: 2, my: ySpacing}}>
                      {path.title} 
                    </NavLink>
                ))}
                </Box>
        </Grid>
        
        <Grid xs={12} sm={12} md={6} lg={12} xl={3} item sx={{display: 'flex', flexDirection: matchDownSM && 'column'}}>
            <Typography variant={variant} sx={{my: ySpacing}}>
                {locale=='fr'?'RÉALISATIONS':'WORK'}
            </Typography>
            <Box>
                {queries && queries.map((projet, index) => (


                  
                    <NavLink 
                    index={index}
                    href={`/${locale=='fr'?'realisations':'work'}/${projet.slug[locale].current}`} 

                    key={`footer-${projet._id}`} 
                    footer
                    variant={variant}
                    sx={{position: 'relative', maxWidth:'100%', mx: 2, my: ySpacing, overflow: 'hidden', textOverflow: 'ellipsis'}}>


  
                      {projet.name[locale].length > maxText? 
                      projet.name[locale].substring(0, maxText) + '...' 
                      : projet.name[locale]}
                      
                    </NavLink>
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
