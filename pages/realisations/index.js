
import Layout, { LinkDirectionContext } from '@/components/layout'
import { Box, Button, ButtonBase, Divider, Icon, ImageList, ImageListItem, ImageListItemBar, Typography, useMediaQuery } from '@mui/material'
import { useContext, useState } from 'react'
import { LangContext } from '@/utils/context'
 
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { maisons } from '@/utils/maisons'
import { AnimatePresence, motion } from 'framer-motion'
import { client } from '@/utils/sanityClient'
import LazyImage from '@/components/LazyImage'
//import GridImg from './gridImg'


export async function getStaticProps() {
    const data = await client.fetch(`*[_type == "project"]{..., 'imgs': imgs[]{..., 'url': asset->url}}|order(orderRank)`)
    return { props: { data: data } }
}

export default function Projets({data, animating, setAnimating}) {



  
  const router = useRouter();
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

  
  return (
    <>


        
          <Box sx={{py: 0, px: 2, minHeight: '110vw'}}>
          <ImageList 
          sx={{ width: '100%', position: 'relative', overflow: 'visible' }} 
          cols={matchDownXL?matchDownSM? 1: 2:3} 
          gap={16} 
          rowHeight={matchDownXL? matchDownLG? matchDownMD? '300':'350':'400':'500'} 
          component={motion.div} layout layoutScroll>
            {data.map((projet, index) => (

              <ImageListItem 
              
              key={`projet-grid-${index}`} 
              sx={{width: '100%', height: '100%', borderRadius: '12px', overflow: 'hidden', position: 'relative'}} 
              
              
              >
              <ButtonBase onClick={()=> !animating? handleClick(projet.slug[locale].current) : null} 
              sx={{width: '100%', height: '100%', borderRadius: '12px', flexDirection: 'column', alignItems: 'flex-start', position: 'relative'}}>
              
              {/*<GridImg 
                layoutID={`maison-main-img-${index}`}
                            
                            src={`/img/maisons/${maison.imgs[0]}?w=248&fit=crop&auto=format`}>

              </GridImg>*/}

                {<Box
                sx={{flex: 1, position: 'relative', height: '100%', width: '100%'}}
                layoutScroll layout
                //onLayoutAnimationStart={()=> setAnimating(index)}
                //onLayoutAnimationComplete={() => setAnimating(null)}
                initial={{opacity: (animating == index)? 1:0}}
                animate={{opacity: (!animating || animating == index)? 1:0}}
                layoutId={`projet-main-img-${index}`} 
                exit={{opacity: 0}}
                transition={{transition: 'ease', duration: 0.5}}
                component={motion.div}
                >
                <LazyImage
                  
                  style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', top: 0, left: 0, position: 'absolute'}}
                  src={projet.imgs[0].url}
                  alt={projet.name[locale]}
                  loading="lazy"
                />
                </Box>}
                <Box>
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


