
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
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Head from 'next/head'

export async function getStaticProps() {
  const data = await client.fetch(`*[_type == "approche"]`)
  const objectData = data[0];
  return { props: { data: objectData } }
}
const meta = {
  title: {
    fr: "Maison Intégrale",
    en: "Maison Intégrale"
  },
  description: {
    fr: 'Construction de maisons écoénergétiques de haute qualité pour un avenir durable. Créer de la valeur, démarche esthétique, démarche technique, homologation.',
    en: 'Building high quality energy-efficient homes for a sustainable future. Creating value, aesthetic approach, technical approach, certification.'
  }
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

  return (

              <>

        <Head>
          <title>{meta.title[locale]}</title>
          <meta name="description" content={meta.description[locale]} />
        </Head>


          <Box sx={{
            //height: `calc(100vh - ${_md? theme.spacing(6):'100px'} - ${firstSectionHeight}px)`,
            display: 'flex',
            flexDirection: {xs: 'column-reverse', lg: 'row'},
            alignItems: {xs: 'flex-end', md: 'center'},
            justifyContent: 'flex-end',
            //paddingTop: { xs: 2, md: 8, lg: 12 },
            py: {xs: 4, md: 4, lg: 8},
            px: theme.layout.x,
            height: '120vh',
            position: 'relative',
          }}>

          <Box sx={{height: '100%', width: '100%', position: 'relative', display: 'flex', flexDirection: 'column'}}>

            <Box sx={{
              opacity: 0.92, borderRadius: '24px', position: 'relative', display: 'flex', 
              marginBottom: {xs: 2},
              height: {xs: '50%'}, 
              minHeight: {xs: 300},
              width: '100%',
              maxWidth: 750,
              filter: 'brightness(1.2) saturate(130%)',
              background: 'url(https://cdn.sanity.io/images/1m8675a3/production/ec60fe0a5636e98b087abb069c04821a0e3d3554-750x563.jpg)',
             }} />
              
            <Box sx={{display: 'flex', position: 'relative', width: '100%', height: {xs: '60%'}}}>
              <Box item xs={6} 
              sx={{opacity: 0.92, 
              borderRadius: '12px', 
              position: 'relative', display: 'flex', 
              marginRight: {xs: 1},
              height: '100%', width: '100%',
              background: 'url(https://cdn.sanity.io/images/1m8675a3/production/9e4c40fe79343bc2763f1536ff4bf84ab2700777-532x750.jpg)',
              }}>


              </Box>
              <Box item xs={6} sx={{opacity: 0.92, marginLeft: {xs: 1}, borderRadius: '12px', position: 'relative', display: 'flex', height: '100%', width: '100%',
                background: 'url(https://cdn.sanity.io/images/1m8675a3/production/c4a98ace0f7feb1455ec86114a20332cabb650f2-750x500.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: '24% 50%'
              }}>
                


              </Box>
            </Box>
          </Box>

            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: {xs: 'flex-start', sm: 'flex-end'}, width: '100%', paddingRight: {md: 8, lg: 0}, 
            marginLeft: {md: 6, xl: 8},
            paddingLeft: {xs: 4, sm: 0},
            marginBottom: {xs: 10},
            [theme.breakpoints.down(415)]: {paddingLeft: 0},
            }}>
              <Typography variant='h2' 
              sx={{
                
                [theme.breakpoints.down(390)]: {typography: 'h4'},
                typography: { xs: 'h3', xl: 'h2'}
                }}>
              {locale == 'fr'? (<>
                Construire des maisons <br /> écoénergétiques <br />
                de haute qualité <br /> pour un avenir durable
              </>)
              : 
              'Building high quality energy-efficient'
              }
              
              </Typography>
              
              
              <Typography sx={{ 
                
                marginTop: 3,
                marginLeft: {xs: 6}, 
                alignSelf: {xs: 'flex-end', sm: 'flex-end'},
                typography: {xs: 'h5', sm: 'h4', xl: 'h4'}
                }}>
              {locale == 'fr'? <>Découvrez la mission&nbsp;de {<br />} Maison Intégrale</>: 
              'Discover Maison Intégrale’s mission'}
              <ArrowDownwardIcon sx={{ typography: {xs: 'h4', sm: 'h4', xl: 'h4'}}} />
              </Typography>
            </Box>
              
                
          </Box>


          

          <Box sx={{paddingLeft: theme.layout.x, paddingRight: _md && theme.layout.x, display: 'flex', justifyContent: 'space-between'}}>
            <Box 
              ref={sectionsContainerRef}
              sx={{
              width: {xs: '100%', sm:'100%', md: 520, lg: 800, xl: 800},
              paddingBottom: 50,
              }}>

            {data.main.map((section, index) => (
              <Box  
              key={section._key}
              id={section.slug[locale].current}
              sx={{
                py: {xs: 8, sm: 12, md: 0},
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
                <Typography variant='h7' 
                sx={{
                  px: {xs: 3},
                  color: theme.palette.mode == 'light'? 'rgba(35, 128, 38, 0.83)':'rgb(35, 128, 38, 0.83)'}}>

                  {locale == 'fr'? 'sur cette page':'on this page'}
                </Typography>
              </Box>

              <Box sx={{position: 'sticky', top: '20vh', px: theme.layout.x}}>
                {data.main.map((section, miniIndex) => (
                  <Box component={motion.div} layout key={`miniTitle-${section._key}`} sx={{paddingBottom: 0, position: 'relative', boxSizing: 'border-box'}}>
                  <ButtonBase variant='link'>
                  <Box sx={{p: '3px 0px'}}>
                    <Link href={`#${section.slug[locale].current}`} scroll={false} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <Typography variant='h7' sx={{fontWeight: 500}}>
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
    if (inView)
    setActiveLink(index)
  }, [inView])

  const theme = useTheme();

  const _md = useMediaQuery(theme => theme.breakpoints.down('md'));
  const _xl = useMediaQuery(theme => theme.breakpoints.down('xl'));

  return (

    <Box ref={ref} >
      <Box sx={{paddingBottom: 6, paddingTop: _md? 3:'100px',}} >
        <Typography sx={{typography: {xs: 'h4', sm: 'h4'}}}>
          {section.title[locale].charAt(0).toUpperCase() + section.title[locale].toLowerCase().slice(1)}
        </Typography>
      </Box>

      <Block sx={{ paddingBottom: 6 }}>
        {section.body[locale]}
      </Block>
    </Box>


  )
}




