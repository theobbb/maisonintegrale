
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
            flexDirection: {xs: 'column-reverse', lg: 'row'},
            alignItems: {xs: 'flex-end', md: 'center'},
            justifyContent: 'flex-end',
            //paddingTop: { xs: 2, md: 8, lg: 12 },
            py: {xs: 4, md: 4, lg: 8},
            px: theme.layout.x,
            minHeight: '90vh',
            position: 'relative',
          }}>

              <Box sx={{opacity: 0.92, borderRadius: '24px', position: 'relative', display: 'flex', width: '100%', marginTop: {xs: 8, lg: 0} }}>
              
                <img 
                style={{maxWidth: '100%', borderRadius: '12px'}}
                src='https://cdn.sanity.io/images/1m8675a3/production/ec60fe0a5636e98b087abb069c04821a0e3d3554-750x563.jpg' />

              </Box>
              
              


            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', width: '100%', paddingRight: {md: 8, lg: 0}, marginLeft: {md: 6, xl: 8}}}>
              <Typography variant='h2' 
              sx={{
                
                typography: {xs: 'h3', xl: 'h2'}
                }}>
              {locale == 'fr'? (<>
                Construire {_xs && <br />} des maisons <br /> écoénergétiques <br />
                de haute qualité <br /> pour un avenir durable
              </>)
              : 
              'Building high quality energy-efficient'
              }
              
              </Typography>
              
              
              <Typography sx={{ 
                
                marginTop: 3,
                marginLeft: 12, 
                typography: {xs: 'h4', sm: 'h4', xl: 'h4'}
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
//sx={{ typography: { sm: 'body2', md: 'body1', lg: 'body0' }
