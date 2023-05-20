

import { Box, ButtonBase, ImageList, ImageListItem, ImageListItemBar, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { client } from '@/utils/sanityClient'
import Image from '@/components/Image'
import Head from 'next/head'

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

  return (
    <>
        <Head>
          <title>{meta.title[locale]}</title>
          <meta name="description" content={meta.description[locale]} />
        </Head>

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
                
                sx={{flex: 1, width: '100%', height: '100%', position: 'relative', overflow: 'hidden', borderRadius: '8px 8px 4px 4px', }}
                
                >
                <Box className='container' sx={{width: '100%', height: '100%', transition: 'transform ease 0.3s'}}>
                  <Image
                    lazy
                    style={{width: '100%', height: '100%', transition: 'none', objectFit: 'cover', objectPosition: 'center', borderRadius: '0px'}}
                    src={projet.imgs[0].url}
                    alt={projet.name[locale]}
                    
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


export async function getStaticProps() {
  const data = await client.fetch(`*[_type == "project"]{
    ..., 
    'imgs': imgs[]{..., 'url': asset->url}
  }|order(orderRank)`)
  return { props: { data: data } }
}
const meta = {
  title: {
    fr: "Réalisations | Maison Intégrale",
    en: "Work | Maison Intégrale"
  },
  description: {
    fr: "Découvrez nos réalisations dans la construction de maisons écoénergétiques.",
    en: "Discover our work in the construction of eco-energy efficient homes."
  }
}