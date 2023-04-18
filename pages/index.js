
import Layout from '@/components/layout'
import { Box, Button, ButtonBase, Divider, Grid, Icon, Typography, useMediaQuery } from '@mui/material'
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
//import { ModelViewer } from '@google/model-viewer'
import * as THREE from 'three';
import { Canvas } from 'react-three-fiber';
import MaisonModel from '@/components/modelViewer'

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

  const theme = useContext(ThemeContext);

  const main = [
    {
      title: t('pages.approche.main.0.title'),
      url: t('pages.approche.main.0.url'),
      miniTitle: t('pages.approche.main.0.miniTitle'),
      body: [
        t('pages.approche.main.0.body.0'),
        t('pages.approche.main.0.body.1'),
      ] 
    },
    {
      title: t('pages.approche.main.1.title'),
      url: t('pages.approche.main.1.url'),
      miniTitle: t('pages.approche.main.1.miniTitle'),
      body: [
        t('pages.approche.main.1.body.0'),
        t('pages.approche.main.0.body.1'),
      ] 
    },
    {
      title: t('pages.approche.main.2.title'),
      url: t('pages.approche.main.2.url'),
      miniTitle: t('pages.approche.main.2.miniTitle'),
      body: [
        t('pages.approche.main.2.body.0'),
      ] 
    },
    {
      title: t('pages.approche.main.3.title'),
      url: t('pages.approche.main.3.url'),
      miniTitle: t('pages.approche.main.3.miniTitle'),
      body: [
        t('pages.approche.main.3.body.0'),
      ] 
    }
  ]
 
  const [activeLink, setActiveLink] = useState(0);


  const sectionsContainerRef = useRef(null);

  const [firstSectionHeight, setFirstSectionHeight] = useState(0);


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
  }, [sectionsContainerRef]);

  const { scrollYProgress } = useScroll();

  const animProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const modelViewerRef = useRef(null)

  const meshRef = useRef(null)

  function ModelViewer() {

    if (!modelViewerRef.current) return;

    const modelViewer = modelViewerRef.current;
    
    var scrollMaxY = Math.max( document.body.scrollHeight, document.body.offsetHeight, 
                       document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight ); // max scroll distance
                         
                         var AnimBegin = 0; // beginning of animation
                         var AnimEnd = 3; // end of animation
                         var AnimDuration = AnimEnd- AnimBegin; // duration of the animation
                         
                         var CurrentTime = AnimBegin + ((window.scrollY / scrollMaxY) * AnimDuration); // uses the max scroll distance to 

                         modelViewer.currentTime = CurrentTime;
                         modelViewer.pause();	

                 window.requestAnimationFrame(ModelViewer);
  }


  



             /*
             useEffect(() => {
              if (meshRef.current)
              Three()

             }, [meshRef.current])*/


 useEffect(() => {
  window.requestAnimationFrame(ModelViewer);
 }, [modelViewerRef])



  return data && (

              <>




          

          

          <Box sx={{
            height: `calc(100vh - ${matchDownMD? theme.spacing(6):'100px'} - ${firstSectionHeight}px)`,
            display: 'flex',
            //flexDirection: 'column',
            alignItems: 'center',
            paddingTop: matchDownLG? matchDownMD? 2:8:12,
            paddingLeft: matchDownXL? matchDownLG ? matchDownMD? 2:15:40:65,
            paddingRight: matchDownXL? matchDownLG ? matchDownMD? 2:5:10:15,
          }}>


<Box sx={{py: 12}}>
              <Typography variant='h2' sx={{lineHeight: '120%'}}>
              
              Construire des maisons écoénergétiques de haute qualité pour un avenir durable -
              </Typography>
              <Typography variant='h2' sx={{lineHeight: '120%', marginLeft: 12}}>
              
              Découvrez la mission de Maison Intégrale
              </Typography>
            </Box>
              
                
          </Box>

          

          <Box sx={{paddingLeft: matchDownLG? matchDownMD? 2:4:8, display: 'flex', justifyContent: 'space-between'}}>
            <Box 
              ref={sectionsContainerRef}
              sx={{
              width: matchDownMD? '100%':'55vw',
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
                marginBottom: index != main.length - 1? matchDownMD? 0: 50:0,
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
                      <Button 
                      variant='fake' disableRipple 
                      component={motion.div}
                      layoutId='approche-scroll-links'
                      sx={{p: '3px 16px', position: 'absolute', width: '100%', top: 0, left: 0, zIndex: -1}}>
                      </Button>
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
  

  if (inView) setActiveLink(index)

  const theme = useContext(ThemeContext);

  const matchDownMD = useMediaQuery(theme => theme.breakpoints.down('md'));
  const matchDownXL = useMediaQuery(theme => theme.breakpoints.down('xl'));

  return (

    <Box ref={ref} >
      <Box sx={{paddingBottom: 6, paddingTop: matchDownMD? 3:'100px',}} >
        <Typography variant={matchDownXL? 'h4':'h4'} sx={{lineHeight: '120%', fontWeight: 600, color: theme.palette.primary.greenTitle}}>
          {section.title[locale]}
        </Typography>
      </Box>
      
      
        
          <Block sx={{ typography: { sm: 'body2', md: 'body1', lg: 'body0' }, paddingBottom: 6 }}>
            {section.body[locale]}
          </Block>
        
      
      
    </Box>


  )
}


function Sapins ({visible, offset, index}) {
  //console.log(offset, index)

  const top = Math.max(offset.top, 0);


  return (
    


      <Box
      sx={{transformOrigin: 'center bottom', height: '100%', width: '100%', position: 'absolute', top: 0, left: 0}}
      initial={{
        x: index * 100,
        //y: -500, 
        //scale: 2,
        //skew: [30,20]
        }}
      animate={{
        //x: 0, 

        //y: 100/-offset.top,
        y: Math.max((offset.top - 100), 200), 
        scale: Math.max((offset.top + 4000) / 5000, 0.3),
        //skew: [0,0]
        }}
      exit={{
        y: '-100vw', 
        scale: 0,
        //skew: [20,20],
        }}
      transition={{ease: 'easeIn', duration: 0.3}}
      component={motion.div}
      >

        <ScrollSapin size={10} position={[-30, 40]} />
      </Box>

   
  )
}