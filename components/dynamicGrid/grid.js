
import Layout, { LinkDirectionContext } from '@/components/layout'
import { Box, Button, ButtonBase, Divider, Icon, ImageList, ImageListItem, ImageListItemBar, Typography, useMediaQuery } from '@mui/material'
import { useContext, useState } from 'react'
import { LangContext } from '@/utils/context'
 
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { maisons } from '@/utils/maisons'
import { AnimatePresence, motion } from 'framer-motion'
import { client } from '@/utils/sanityClient'
//import GridImg from './gridImg'


export default function Grid({data, animating, setAnimating, othersExited, setOthersExited, exiting, setExiting}) {


  const router = useRouter();
  const { locale, locales, push } = useRouter();


  const matchDownMD = useMediaQuery(theme => theme.breakpoints.down('md'));
  const matchDownLG = useMediaQuery(theme => theme.breakpoints.down('lg'));

  const [exit, setExit] = useState(false)
  const [clickedSlug, setClickedSlug] = useState(null)

  function handleClick (slug) {
    const base = locale == 'fr'? '/projets':'/work'
    const href = `${base}/${slug}`;
    push(href, href, {locale})
    setClickedSlug(slug)

  }

  function handleOthersExit () {
    if (!clickedSlug) return;
    //setExiting(false)
    setExiting(false)


    
    }
    
  
  return data && (
    <>


        
          <Box sx={{py: 0, px: 2, minHeight: '110vw'}}>
          <ImageList sx={{ width: '100%', position: 'relative', overflow: 'visible' }} cols={matchDownLG?matchDownMD? 1: 2:3} gap={16} rowHeight='auto' component={motion.div} layout layoutScroll>
            {data.map((projet, index) => (

              <ImageListItem 
              id={projet.slug[locale].current}
              key={`projet-grid-${index}`} 
              sx={{width: '100%', height: '100%', borderRadius: '12px'}} 
              
              
              >
              <ButtonBase onClick={()=> !animating? handleClick(projet.slug[locale].current) : null} 
              sx={{width: '100%', height: '100%', borderRadius: '12px', flexDirection: 'column'}}>

                <motion.div 
                
                layoutScroll
                onLayoutAnimationStart={()=> setAnimating(projet.slug[locale].current)}
                onLayoutAnimationComplete={() => setAnimating(null)}
                initial={{opacity: (animating == projet.slug[locale].current)? 1:0}}
                animate={clickedSlug && clickedSlug != projet.slug[locale].current? {opacity: 0}:{opacity: (!animating || animating == projet.slug[locale].current)? 1:0}}
                layoutId={projet.imgs[0]._key} 
                exit={{opacity: 0, x: 100}}
                transition={{transition: 'ease', duration: 0.6}}
                onAnimationComplete={()=>handleOthersExit(index)}
                >
                    <img
                    
                    style={{maxWidth: '100%', maxHeight: '500px'}}
                    src={projet.imgs[0].url}
                    alt={projet.name[locale]}
                    loading="lazy"
                    />
                </motion.div>
                
                    <Box 
                    initial={{opacity: 0}}
                    animate={{opacity: !clickedSlug && !animating? 1:0}}

                    component={motion.div}
                    sx={{display: 'flex'}}>
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


