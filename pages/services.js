
import Layout from '@/components/layout'
import { Box, Button, Divider, Grid, Icon, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useContext, useEffect, useRef, useState } from 'react'
import { LangContext, ThemeContext } from '@/utils/context'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import { AnimatePresence, motion } from 'framer-motion'
import ScrollSapin from '@/components/scrollSapin'
import useScrollProgress from '@/utils/scrollProgress'
import ContactButton from '@/components/contactButton'
import Sapin from '@/components/sapin'
import { client } from '@/utils/sanityClient'
import Block from '@/components/sanity/block'

export async function getStaticProps() {
  const data = await client.fetch(`*[_type == "services"]`)
  return { props: { data: data[0] } }
}

export default function Services({data}) {

  const { locale } = useRouter();

  const matchDownMD = useMediaQuery(theme => theme.breakpoints.down('md'));
  const matchDownLG = useMediaQuery(theme => theme.breakpoints.down('lg'));
  const matchDownXL = useMediaQuery(theme => theme.breakpoints.down('xl'));

  const theme = useTheme();


  const topTextRef = useRef(null);
  const sectionsContainerRef = useRef(null);

  const contactRef = useRef(null);

  const [firstSectionHeight, setFirstSectionHeight] = useState(0);

  function handleResize () {
    if (!sectionsContainerRef.current || !topTextRef.current) return;
    
    const sections = sectionsContainerRef.current.children;

    const headerHeight = document.getElementById('header')?.offsetHeight



    let newHeight = sectionsContainerRef.current.offsetHeight;

    
    let otherHeights = window.innerHeight - headerHeight;
    if (matchDownMD) otherHeights = otherHeights - contactRef.current.offsetHeight
    
    const maxHeight = otherHeights - topTextRef.current.offsetHeight;
    
    if (newHeight < maxHeight) return setFirstSectionHeight(otherHeights - newHeight);
    
    let childrenHeights = 0;
    let stop = false;
    
    for (let i = 0; i < sections.length; i++) {
      const childHeight = sections[i].offsetHeight;

      if (stop) continue
      
      if (childHeight + childrenHeights < maxHeight) {
        childrenHeights += childHeight;
        
      } else stop = true
    }
    //console.log(childrenHeights)
    setFirstSectionHeight(otherHeights - childrenHeights);
  };

/*
  useEffect(() => {
    handleResize()

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);*/

  useEffect(() => {

    handleResize()
    if (!sectionsContainerRef.current || !topTextRef.current) return;
    const resizeObserver = new ResizeObserver(handleResize).observe(sectionsContainerRef.current)
    //return () => resizeObserver.disconnect()
  }, [sectionsContainerRef, topTextRef]);

  

  return data && (
    <>        


          <Box 
          
          sx={{
            
            height: firstSectionHeight,
            display: 'flex',
            alignItems: 'center',

            paddingLeft: matchDownXL? matchDownLG ? matchDownMD? 2:15:40:65,
            paddingRight: theme.layout.x,
          }}>
                <Box ref={topTextRef} sx={{py: 10}}>
                  <Block  variant={matchDownLG? 'h4':'h3'} sx={{lineHeight: '120%'}}>
                    {data.top[locale]}
                  </Block>
                </Box>
              </Box>

          <Box 
          sx={{
            px: theme.layout.x, 
            
            display: 'flex', 
            justifyContent: 'space-between', 
            flexDirection: matchDownMD? 'column-reverse':'row' }}>
            <Box 
              ref={sectionsContainerRef}
              sx={{
              width: matchDownMD? '100%':'55vw',
              }}>
              {data.main[locale].map((section, index) => (
                <Box  
                key={section._key}
                sx={{
                  py: matchDownMD? 3:2,
                  paddingBottom: index==data.main[locale].length-1? matchDownMD?9:6 : matchDownMD? 3:2,
                  position: 'relative',
                  
                  //minHeight: index == main.length - 1? pageHeight:null
                
                //my: matchDownMD? 2:'50px'
                }} >
                
                  
                  <Block variant='h5'>
                    {section.children}
                  </Block>
                  

                </Box>
              ))}
            </Box>
            <Box ref={contactRef} sx={{alignSelf: matchDownMD? 'flex-end': 'flex-start', py: 2}}>
              <ContactButton />
            </Box>
          </Box>

          
    </>
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


function Section ({section, index, setActiveLink}) {

  const { ref, inView, entry } = useInView({
    rootMargin: '0% 0% -200px 0%',
    threshold: 0.8,
  });
/*
  useEffect(() => {
    const newVisibleSections = [...visibleSections];
    newVisibleSections[index] = inView;
    setVisibleSections(newVisibleSections);
  }, [inView])*/

  if (inView) setActiveLink(index)

  //const ref = useRef(null);

  const theme = useContext(ThemeContext);

  const matchDownMD = useMediaQuery(theme => theme.breakpoints.down('md'));
  const matchDownXL = useMediaQuery(theme => theme.breakpoints.down('xl'));

  return (

    <Box ref={ref} >
      <Box sx={{paddingBottom: 6, paddingTop: matchDownMD? 3:'100px',}} >
        <Typography variant={matchDownXL? 'h4':'h4'} sx={{lineHeight: '120%', fontWeight: 600, color: theme.palette.primary.greenTitle}}>
          {section.title}
        </Typography>
      </Box>
      {section.body.map((p, bodyIndex) => (
        <Box key={`section-${index}-body-${bodyIndex}`} sx={{paddingBottom: 6}}>
          <Typography variant='p'>
            {p}
          </Typography>
        </Box>
      ))}
      
    </Box>


  )
}
