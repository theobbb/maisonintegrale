
import Layout, { LinkDirectionContext } from '@/components/layout'
import { Box, Button, ButtonBase, Divider, Icon, ImageList, ImageListItem, ImageListItemBar, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useContext, useState } from 'react'
import { LangContext } from '@/utils/context'
 
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { maisons } from '@/utils/maisons'
import { AnimatePresence, motion } from 'framer-motion'
import { client } from '@/utils/sanityClient'
import LazyImage from '@/components/LazyImage'
import Link from 'next/link'
//import GridImg from './gridImg'


export async function getStaticProps() {
    const data = await client.fetch(`*[_type == "project"]{
      ..., 
      'imgs': imgs[]{..., 'url': asset->url}
    }|order(orderRank)`)
    return { props: { data: data } }
}

export default function Projets({data, animating, setAnimating}) {

  const router = useRouter();
  const theme = useTheme();
  const { locale, locales, push } = useRouter();

  const matchDownSM = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const matchDownMD = useMediaQuery(theme => theme.breakpoints.down('md'));
  const matchDownLG = useMediaQuery(theme => theme.breakpoints.down('lg'));
  const matchDownXL = useMediaQuery(theme => theme.breakpoints.down('xl'));

  function handleClick (slug) {

    const base = locale == 'fr'? '/realisations':'/work'
    const href = `${base}/${slug}`;
    push(href, href, {locale})
  } 

  const halfData = Math.ceil(data.length / 2);
  
  return (
    <>
    <Box sx={{
      display: 'flex',
      marginTop: 4, 
      marginBottom: 3}}>
        <Box sx={{
          
          width: {xs: '100%', lg: 500},
          px: {xs: 1, lg: 2}}}>
            {data.slice(0, matchDownMD? data.length:halfData).map((projet, index) => (
              <Title projet={projet} locale={locale} handleClick={handleClick} />
            ))}

          </Box>
          {!matchDownMD && 
          <Box sx={{width: {xs: '100%', lg: 500}, px: {xs: 1, lg: 2}}}>
          {data.slice(halfData, data.length).map((projet, index) => (
              <Title projet={projet} locale={locale} handleClick={handleClick} />
            ))}
            </Box>
          }
            </Box>
          <Box sx={{py: 0, px: {xs: 2, lg: 3}}}>




          <ImageList 
          sx={{ width: '100%', position: 'relative', overflow: 'visible' }} 
          cols={matchDownXL?matchDownSM? 1: 2:3} 
          gap={matchDownLG? theme.spacing(2):theme.spacing(3)} 
          rowHeight={matchDownXL? matchDownLG? matchDownMD? '300':'350':'400':'500'} 
          component={motion.div} layout layoutScroll>
            {data.map((projet, index) => (

              <ImageListItem 
              
              key={`projet-grid-${index}`} 
              sx={{
                
                position: 'relative', 
                }} 
              
              
              >
              <ButtonBase onClick={()=> handleClick(projet.slug[locale].current)} 
              sx={{flexDirection: 'column', width: '100%', height: '100%', borderRadius: '8px', overflow: 'hidden', alignItems: 'flex-start', position: 'relative', '&:hover .container': {transform: 'scale(1.05)'}}}>
                {<Box
                
                sx={{flex: 1, width: '100%', height: '100%', position: 'relative', height: '100%', width: '100%', overflow: 'hidden', borderRadius: '8px 8px 4px 4px', transition: 'ease 0.3s'}}
                layoutScroll layout
                initial={{opacity: (animating == index)? 1:0}}
                animate={{opacity: (!animating || animating == index)? 1:0}}
                layoutId={`projet-main-img-${index}`} 
                exit={{opacity: 0}}
                transition={{transition: 'ease', duration: 0.5}}
                component={motion.div}
                >
                <Box className='container' sx={{width: '100%', height: '100%', transition: 'ease 0.3s'}}>
                <LazyImage
                  
                  style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', borderRadius: '0px'}}
                  src={projet.imgs[0].url}
                  alt={projet.name[locale]}
                  loading="lazy"
                />
                </Box>
                </Box>}
                <Box sx={{py: {xs: 0.2, md: 0.5, xl: 0.8}}}>
                  <Typography variant='h6'>
                    {projet.name[locale]}
                  </Typography>
                </Box>
                
        
                
                </ButtonBase>
                
              </ImageListItem>
              
              ))}
            </ImageList>
          </Box>

    </>
  )
}
function Title ({projet, locale, handleClick}) {
  return (
    <Link href={`${locale == 'fr'? '/realisations':'/work'}/${projet.slug[locale].current}`} style={{ textDecoration: 'none', color: 'inherit' }}>
    <Button sx={{display: 'flex', justifyContent: 'space-between', width: '100%', my: 0.1, px: 1, py: 0.1}}>
      
        <Typography variant='h6' sx={{marginRight: 2}}>{projet.name[locale]}</Typography>
        <Typography variant='h6'>2018</Typography>
      
    </Button>
    </Link>
  )
}

