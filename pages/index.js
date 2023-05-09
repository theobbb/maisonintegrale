
import Layout from '@/components/layout'
import { Box, Button, ButtonBase, Divider, Grid, Icon, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useContext, useEffect, useRef, useState } from 'react'
import { LangContext, ThemeContext } from '@/utils/context'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import ScrollSapin from '@/components/scrollSapin'
import useScrollProgress from '@/utils/scrollProgress'
import ContactButton from '@/components/contactButton'
import { client } from '@/utils/sanityClient'
import Block from '@/components/sanity/block'
import NavLink from '@/components/header/navLink'

export async function getStaticProps() {
  const data = await client.fetch(`*[_type == "approche"]`)
  const objectData = data[0];
  return { props: { data: objectData } }
}

export default function Approche({data}) {

  

  const { t } = useTranslation('common')

  const { locale, locales, push } = useRouter();

  const matchDownMD = useMediaQuery(theme => theme.breakpoints.down('md'));
  const matchDownLG = useMediaQuery(theme => theme.breakpoints.down('lg'));
  const matchDownXL = useMediaQuery(theme => theme.breakpoints.down('xl'));

  const theme = useTheme()

 
  const [activeLink, setActiveLink] = useState(0);


  const sectionsContainerRef = useRef(null);

  const [firstSectionHeight, setFirstSectionHeight] = useState(0);

  
/*
  useEffect(() => {
    if (!sectionsContainerRef) return;

    const handleResize = () => {
      if (!sectionsContainerRef.current) return;
      const sections = sectionsContainerRef.current.children;
      const firstSection = sections[0];

      let newHeight = firstSection.offsetHeight;
      const maxHeight = (window.innerHeight - 50) / 1.8;

      if (newHeight > maxHeight) {
        newHeight = 0;
        const children = firstSection.children[0].children;

        for (let i = 0; i < children.length; i++) {
          const childHeight = children[i].offsetHeight;
          if (childHeight + newHeight < maxHeight) {
            newHeight += childHeight;
          }
        }
      } else newHeight = 0;
      
      setFirstSectionHeight(newHeight);
    };
    handleResize()

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [sectionsContainerRef]);*/

  return data && (

              <>

          <Box sx={{
            //height: `calc(100vh - ${matchDownMD? theme.spacing(6):'100px'} - ${firstSectionHeight}px)`,
            display: 'flex',
            //flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingTop: matchDownLG? matchDownMD? 2:8:12,
            paddingLeft: theme.layout.x,
            paddingRight: theme.layout.x,
          }}>


<Box sx={{py: 12, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', width: '100%'}}>
              <Typography variant='h2' 
              sx={{
                width: {xl: 1240, lg: 1000, md: '100%', sm:'100%', xs: '100%'},
                typography: {xs: 'h3', xl: 'h2'}
                }}>
              {locale == 'fr'? 
              'Construire des maisons écoénergétiques': 
              'Building high quality energy-efficient'
              }
              {!matchDownMD? <br />: ' ' }
              
              {locale == 'fr'? 'de haute qualité pour un avenir durable': 
              'for a sustainable future'}
              &nbsp;-
              </Typography>
              
              
              <Typography sx={{marginLeft: 12, typography: {xs: 'h4', xl: 'h4'}}}>
              {locale == 'fr'? 'Découvrez la mission de Maison Intégrale': 
              'Discover Maison Intégrale’s mission'}
              
              </Typography>
            </Box>
              
                
          </Box>

          

          <Box sx={{paddingLeft: theme.layout.x, paddingRight: matchDownMD && theme.layout.x, display: 'flex', justifyContent: 'space-between'}}>
            <Box 
              ref={sectionsContainerRef}
              sx={{
              width: {xl: 800, lg: 800, md: 520, sm:'100%', xs: '100%'},
              paddingBottom: 50,
              }}>
              {/*<Block variant={matchDownMD? 'h4':'h3'} sx={{lineHeight: '120%'}}>
                {data.top[locale]}
              </Block>*/}
            {data.main.map((section, index) => (
              <Box  
              key={section._key}
              id={section.slug[locale].current}
              sx={{
                py: matchDownMD? 3:'50px',
                marginBottom: index != data.main.length - 1? matchDownMD? 0: 50:0,
                position: 'relative',
               }}>
               <Section {...{section, index, setActiveLink }} />
              </Box>
            ))}
            </Box>

            {!matchDownMD && 
            <Box sx={{display: 'flex', flexDirection: 'column', marginTop: '100px'}}> 
              <Box sx={{paddingBottom: 2, alignSelf: 'flex-end'}}>
                <Typography variant='mini'>
                  sur cette page
                </Typography>
              </Box>

              <Box sx={{position: 'sticky', top: '20vh', paddingRight: 8}}>
                {data.main.map((section, miniIndex) => (
                  <Box component={motion.div} layout key={`miniTitle-${section._key}`} sx={{paddingBottom: 0, position: 'relative', boxSizing: 'border-box'}}>
                  <ButtonBase variant='link'>
<Box sx={{p: '3px 0px'}}>
  <Link href={`#${section.slug[locale].current}`} scroll={false} style={{ textDecoration: 'none', color: 'inherit' }}>
    <Typography variant='h7' sx={{fontWeight: 700}}>
      {section.mini_title[locale]}
    </Typography>
  </Link>
</Box>
</ButtonBase>
                    

                    {miniIndex == activeLink && 
                      
                      <Box 
                sx={theme.sx.selected}
                component={motion.div} layoutId='index-scroll-links'  />

                    }
                  </Box>
                ))}
              </Box>

            
            </Box>}
          </Box>
          </>
  )
}
/*

<NavLink href={`#${section.slug[locale].current}`} 
                    
                    >
                     {section.mini_title[locale]}
                    </NavLink>
<ButtonBase variant='link'>
<Box sx={{p: '3px 0px'}}>
  <Link href={`#${section.slug[locale].current}`} scroll={false} style={{ textDecoration: 'none', color: 'inherit' }}>
    <Typography variant='h7' sx={{fontWeight: 700}}>
      {section.mini_title[locale]}
    </Typography>
  </Link>
</Box>
</ButtonBase>*/


function Section ({section, index, setActiveLink}) {

  const { locale } = useRouter();

  const { ref, inView, entry } = useInView({
    rootMargin: '0% 0% -200px 0%',
    threshold: 0.8,
  });
  
  useEffect(() => {
    setActiveLink(index)
  }, [inView])



  const theme = useTheme();

  const matchDownMD = useMediaQuery(theme => theme.breakpoints.down('md'));
  const matchDownXL = useMediaQuery(theme => theme.breakpoints.down('xl'));

  return (

    <Box ref={ref} >
      <Box sx={{paddingBottom: 6, paddingTop: matchDownMD? 3:'100px',}} >
        <Typography variant={matchDownXL? 'h4':'h4'} sx={{lineHeight: '120%', fontWeight: 600, color: theme.palette.text.secondary}}>
          {section.title[locale]}
        </Typography>
      </Box>

          <Block sx={{ typography: { sm: 'body2', md: 'body1', lg: 'body0' }, paddingBottom: 6 }}>
            {section.body[locale]}
          </Block>
        
      
      
    </Box>


  )
}

