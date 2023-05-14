
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


  const { locale, locales, push } = useRouter();

  const _xs = useMediaQuery(theme => theme.breakpoints.down('xs'));
  const _sm = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const _md = useMediaQuery(theme => theme.breakpoints.down('md'));
  const _lg = useMediaQuery(theme => theme.breakpoints.down('lg'));
  const _xl = useMediaQuery(theme => theme.breakpoints.down('xl'));

  const theme = useTheme()

 
  const [activeLink, setActiveLink] = useState(0);


  const sectionsContainerRef = useRef(null);

  const [firstSectionHeight, setFirstSectionHeight] = useState(0);

  return data && (

              <>


          <Box sx={{
            //height: `calc(100vh - ${_md? theme.spacing(6):'100px'} - ${firstSectionHeight}px)`,
            display: 'flex',
            flexDirection: _sm? 'column':'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingTop: { xs: 2, md: 8, lg: 12 },
            px: theme.layout.x,

          }}>

              {/*<Box sx={{opacity: 0.92, paddingLeft: {md: 5} }}>
                <img 
                style={{maxHeight: '90vh', maxWidth: '100%'}}
                src='https://cdn.sanity.io/images/1m8675a3/production/79a5ccdeb68523f0549525616f8d6c71463407c8-522x750.jpg' />

              </Box>*/}


            <Box sx={{py: 12, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', width: '100%'}}>
              <Typography variant='h2' 
              sx={{
                
                typography: {xs: 'h2', sm: 'h3', xl: 'h2'}
                }}>
              {locale == 'fr'? (<>
                Construire {_sm && <br />} des maisons <br /> écoénergétiques <br />
                de haute qualité <br /> pour un avenir durable
              </>)
              : 
              'Building high quality energy-efficient'
              }
              
              </Typography>
              
              
              <Typography sx={{  
                marginTop: 3,
                marginLeft: 12, 
                typography: {xs: 'h4', sm: 'h3', xl: 'h3'}
                }}>
              {locale == 'fr'? 'Découvrez la mission de Maison Intégrale': 
              'Discover Maison Intégrale’s mission'}
              
              </Typography>
            </Box>
              
                
          </Box>

          

          <Box sx={{paddingLeft: theme.layout.x, paddingRight: _md && theme.layout.x, display: 'flex', justifyContent: 'space-between'}}>
            <Box 
              ref={sectionsContainerRef}
              sx={{
              width: {xl: 800, lg: 800, md: 520, sm:'100%', xs: '100%'},
              paddingBottom: 50,
              }}>

            {data.main.map((section, index) => (
              <Box  
              key={section._key}
              id={section.slug[locale].current}
              sx={{
                py: _md? 3:'50px',
                marginBottom: index != data.main.length - 1? _md? 0: 50:0,
                position: 'relative',
               }}>
               <Section {...{section, index, setActiveLink }} />
              </Box>
            ))}
            </Box>

            {!_md && 
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

  const _md = useMediaQuery(theme => theme.breakpoints.down('md'));
  const _xl = useMediaQuery(theme => theme.breakpoints.down('xl'));

  return (

    <Box ref={ref} >
      <Box sx={{paddingBottom: 6, paddingTop: _md? 3:'100px',}} >
        <Typography sx={{typography: {xs: 'h4', sm: 'h3'}}}>
          {section.title[locale].charAt(0).toUpperCase() + section.title[locale].toLowerCase().slice(1)}
        </Typography>
      </Box>

      <Block sx={{ paddingBottom: 6 }}>
        {section.body[locale]}
      </Block>
    </Box>


  )
}
//sx={{ typography: { sm: 'body2', md: 'body1', lg: 'body0' }
