
import Layout from '@/components/layout'
import { Box, Button, ButtonBase, Divider, Icon, ImageList, ImageListItem, ImageListItemBar, Typography, useMediaQuery } from '@mui/material'
import { useContext, useState } from 'react'
import { LangContext } from '@/utils/context'

import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { maisons } from '@/utils/maisons'
import { AnimatePresence, motion } from 'framer-motion'
import GridImg from './gridImg'


export default function Realisations({animating, setAnimating}) {

  const { t } = useTranslation('common')

  const router = useRouter();
  const { locale, locales, push } = useRouter();

  const matchDownMD = useMediaQuery(theme => theme.breakpoints.down('md'));
  const matchDownLG = useMediaQuery(theme => theme.breakpoints.down('lg'));

  function handleClick (index) {
   
    const base = locale == 'fr'? '/projets':'/work'
    const href = `${base}/${maisons[index][locale].url}`;
    push(href, href, {locale})
  }
  
  return (
    <>


        
          <Box sx={{py: 0, px: 2, minHeight: '110vw'}}>
          <ImageList sx={{ width: '100%', position: 'relative', overflow: 'visible' }} cols={matchDownLG?matchDownMD? 1: 2:3} gap={16} rowHeight='auto' component={motion.div} layout layoutScroll>
            {maisons.map((maison, index) => (

              <ImageListItem 
              
              key={`maison-grid-${index}`} 
              sx={{width: '100%', height: '100%', borderRadius: '12px'}} 
              
              
              >
              <ButtonBase onClick={()=> !animating? handleClick(index) : null} 
              sx={{width: '100%', height: '100%', borderRadius: '12px', flexDirection: 'column'}}>
              
              {/*<GridImg 
                layoutID={`maison-main-img-${index}`}
                            
                            src={`/img/maisons/${maison.imgs[0]}?w=248&fit=crop&auto=format`}>

              </GridImg>*/}

                {<motion.div 
                
                layoutScroll layout
                //onLayoutAnimationStart={()=> setAnimating(index)}
                onLayoutAnimationComplete={() => setAnimating(null)}
                initial={{opacity: (animating == index)? 1:0}}
                animate={{opacity: (!animating || animating == index)? 1:0}}
                layoutId={`maison-main-img-${index}`} 
                exit={{opacity: 0}}
                transition={{transition: 'ease', duration: 0.5}}
                
                >
                <img
                  
                  style={{maxWidth: '100%', maxHeight: '500px'}}
                  src={`/img/maisons/${maison.imgs[0]}?w=248&fit=crop&auto=format`}
                  srcSet={`/img/maisons/${maison.imgs[0]}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={maison[locale].name}
                  loading="lazy"
                />
                </motion.div>}
                
                <Box sx={{display: 'flex'}}>
                  <Typography variant='h6'>
                  {maison[locale].name}
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


