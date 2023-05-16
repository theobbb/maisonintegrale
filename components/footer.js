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
import Link from './header/link';



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

      const sxTitle = {opacity: 1}
      const sxSection = {marginLeft: {xs: 1, sm: 3, md: 0}}

  const maxText = 45
  return (
    <Box
    initial={{opacity: 0}}
    component={motion.footer}
   
    transition={{duration: 0.5, ease: 'easeInOut'}}
    sx={{
      width: '100%', 

      //background: 'rgba(0,0,0,0.2)',
    //paddingTop: `${paddingTop}px`, 
    marginTop: {xl: 24, lg: 24, md: 16, xs: 8}}}>
        <Grid container sx={{paddingBottom: 6, paddingLeft: theme.layout.x, paddingRight: 1, }} rowSpacing={{xs: 6, sm: 8, md: 8}} columnSpacing={2}>
        <Grid xs={12} sm={4.5} md={4.5} lg={3.4} xl={1.5} item sx={{display: 'flex'}}>
            <Typography variant={variant} sx={{my: ySpacing, ...sxTitle}}>
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
        <Grid xs={12} sm={7.5} md={7.5} lg={4.5} xl={3.6} item sx={{display: 'flex', flexDirection: matchDownMD && 'column'}}>
              
              <Typography variant={variant} sx={{my: ySpacing, paddingLeft: {md: 5.5}, ...sxTitle}}>
                CONTACT
              </Typography>
            
              <Box sx={{paddingLeft: 3, ...sxSection}}>
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
        
        <Grid xs={12} sm={4.5} md={4.5} lg={4} xl={2.7} item sx={{display: 'flex', flexDirection: matchDownMD && 'column'}}>
              <Typography variant={variant} sx={{my: ySpacing, ...sxTitle}}>
                NAVIGATION
              </Typography>
              <Box sx={{...sxSection}}>
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
        
        <Grid xs={12} sm={7.5} md={7.5} lg={12} xl={4.2} item sx={{display: 'flex', flexDirection: matchDownMD && 'column'}}>
            <Typography variant={variant} sx={{my: ySpacing, ...sxTitle}}>
                {locale=='fr'?'RÉALISATIONS':'WORK'}
            </Typography>
            <Box sx={{...sxSection}}>
                {queries && queries.map((projet, index) => (


                  
                    <NavLink 
                    index={index}
                    href={`/${locale=='fr'?'realisations':'work'}/${projet.slug[locale].current}`} 

                    key={`footer-${projet._id}`} 
                    footer
                    variant={variant}
                    sx={{position: 'relative', mx: 2, my: ySpacing, overflow: 'hidden', textOverflow: 'ellipsis'}}>


  
                      {projet.name[locale].length > maxText? 
                      projet.name[locale].substring(0, maxText) + '...' 
                      : projet.name[locale]}
                      
                    </NavLink>
                ))}
            </Box>
        </Grid>
        </Grid>
        

        <Grid container sx={{paddingBottom: 6, px: theme.layout.x, marginTop: {xs: 4}}} rowSpacing={4}>
        <Grid xs={12} sm={12} md={6} lg={6} xl={8} item >
          <a style={{display: 'flex', textDecoration: 'none', color: 'inherit', alignItems: 'flex-start'}} href='https://prixdomus.ca/' target='_blank'>
             <Box sx={{height: {xs: 90, lg: 90}, width: 100}}>
               <img 
               style={{height: '100%',
                filter: theme.palette.mode == 'light'? 'invert(0) grayscale(0) contrast(120%)' : 
                'invert(0) grayscale(0) brightness(0.9) contrast(120%) opacity(0.8)'
               }}
               src='/images/logodomus.png' />
             </Box>           
             <Box sx={{marginLeft: {xs: 2}}}>
               <Typography variant='h7' sx={{my: ySpacing}}>
               Finaliste 2019 <br /> Catégorie <br /> développement durable
               </Typography>
             </Box>
          </a>
        </Grid>

        <Grid xs={6} sm={6} md={3} lg={3} xl={2} item sx={{display: 'flex', alignItems: 'center'}}>
          <a href='https://transitionenergetique.gouv.qc.ca/residentiel/programmes/novoclimat' target='_blank'>
             <Box sx={{position: 'relative', height: {xs: '12vw', sm: 65, md: 65}}}>
               <img 
               style={{height: '100%', maxWidth: matchDownXS ? '100%' : 'auto',
                
                filter: theme.palette.mode == 'light'? 'invert(0) grayscale(1) brightness(0.5)' : 
                'invert(1) grayscale(1) brightness(1.5) contrast(50%)'
               }}
               src='/images/Logo-Novoclimat2.png' />
             </Box>   
          </a>        
        </Grid>
        <Grid xs={6} sm={6} md={3} lg={3} xl={2} item sx={{display: 'flex', alignItems: 'center'}}>
          <a href='https://www.garantiegcr.com' target='_blank'>
             <Box sx={{position: 'relative', height: {xs: '13vw', sm: 70, md: 70}}}>
               <img 
               style={{height: '100%', maxWidth: matchDownXS ? '100%' : 'auto',
               filter: theme.palette.mode == 'light'? 'invert(0) grayscale(1) contrast(120%) brightness(1)' : 'invert(1) grayscale(1) contrast(120%) brightness(0.92)'}}
               src='/images/garantie-residentielle.png' />
             </Box>           
            </a>
        </Grid>
        
        
        </Grid>

        <Box sx={{display: 'flex'}}>
               
        </Box>
        <Box sx={{px: theme.layout.x, paddingBottom: 1, display: 'flex', width: '100%', alignItems: {xs: 'flex-start', sm: 'center'}, flexDirection: {xs: 'column', sm: 'row'}}}>
          <Typography variant='h7' sx={{my: ySpacing}}>
            RBQ 5683-2850
          </Typography>
          <Typography variant='h7' sx={{marginLeft: {xs: 0, sm: 2}}}>&copy; {year} Maison Intégrale</Typography>
        </Box>
        
    </Box>
  )
}
