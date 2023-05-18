
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
import Head from 'next/head'


export default function Services({data}) {

  const { locale } = useRouter();

  const matchDownMD = useMediaQuery(theme => theme.breakpoints.down('md'));
  const matchDownLG = useMediaQuery(theme => theme.breakpoints.down('lg'));
  const matchDownXL = useMediaQuery(theme => theme.breakpoints.down('xl'));

  const theme = useTheme();


  const topTextRef = useRef(null);
  const sectionsContainerRef = useRef(null);

  const contactRef = useRef(null);


  return (
    <>        
        <Head>
          <title>{meta.title[locale]}</title>
          <meta name="description" content={data.top[locale]} />
        </Head>

          <Box 
          
          sx={{
            
            //height: firstSectionHeight,
            display: 'flex',
            justifyContent: 'flex-end',
            
            px: theme.layout.x,
            
          }}>
                <Box sx={{py: 10, width: {xs: '100%', sm: 700, md: 950}}}>
                  <Block sx={{lineHeight: '120%', typography: {xs: 'h5', sm: 'h4', lg: 'h3'} }}>
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


export async function getStaticProps() {
  const data = await client.fetch(`*[_type == "services"]`)
  return { props: { data: data[0] } }
}
const meta = {
  title: {
    fr: "Services | Maison Intégrale",
    en: "Services | Maison Intégrale"
  },
}