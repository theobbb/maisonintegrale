
import { Box, ButtonBase, IconButton, ImageList, ImageListItem, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { motion } from 'framer-motion'
import { client } from '@/utils/sanityClient'
import { useContext } from 'react';
import { LinkDirectionContext } from '@/components/layout';
import Block from '@/components/sanity/block';
import GridViewIcon from '@mui/icons-material/GridView';
import Image from 'next/image'
import LazyImage from '@/components/Image';
import Head from 'next/head'


function Projet ({single}) {

    const router = useRouter()

    const { locale } = useRouter();

    const theme = useTheme();


    const { setLinkDirection } = useContext(LinkDirectionContext);

    function handlePrev() {
        setLinkDirection(-1)
        if (single?.previous?.slug == null) handlePush(single.last.slug)
        else handlePush(single.previous.slug)
    }
    function handleNext() {
        setLinkDirection(1)
        if (single?.next?.slug == null) handlePush(single.first.slug)
        else handlePush(single.next.slug)
    }

    function handlePush(slug) {
        const href = `${router.locale == 'fr'? '/realisations':'/work'}/${slug}`;
        
        router.push(href, href, {locale})
    }

    const matchDownMD = useMediaQuery(theme => theme.breakpoints.down('md'));
    const matchDownLG = useMediaQuery(theme => theme.breakpoints.down('lg'));
    const matchDownXL = useMediaQuery(theme => theme.breakpoints.down('xl'));

    const format = (title) => {
        if (!title) return null
        let formatted = title
        formatted = formatted.split('-').join(' ')
        formatted = formatted.toLowerCase()
        formatted = formatted.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        return formatted
    } 

    return (
        <>
        <Head>
          <title>{`${format(single.name[locale])} | Réalisations | Maison Intégrale`}</title>
          <meta name="description" content={single.body[locale].slice(0,150)} />
        </Head>
        

        <Box sx={{position: 'relative'}}>
        {matchDownMD &&
                <Box>
                <Img img={single.imgs[0]} index={10} key={`top-${single.imgs[0]._key}`} top />
                </Box>
                }
            <Box sx={{
                
                px: {xs: 2, md: 4}, 
                borderRadius: 4, 
                background: theme.palette.background.default, 
                marginTop: {xs: -6, md: 5}, 

                zIndex: 10, position: 'relative'}}
            exit={{opacity: 0}}
            >
            

          
            <Box 
            
            sx={{
                py: 0, 
                width: '100%',
                flexDirection: matchDownLG? 'column': 'row',
                display: 'flex', position: 'relative'
                }}>

                <Box sx={{minWidth: matchDownLG?'100%':'450px', paddingRight: !matchDownLG && 3, flex: 1, marginRight: {md: 2}}}>
                

                
                <Box sx={{ position: 'sticky', top: {xs: 90}, marginBottom: {lg: 8}
                    }}
                >
                    <Box sx={{display: 'flex', flexDirection: {xs: 'column',  sm: 'row-reverse', lg: 'column'}, alignItems: {xs: 'flex-start', sm: 'center', md: 'flex-start'}, justifyContent: 'space-between',
                    marginTop: {xs: 1.5, sm: 0}
                    
                    }}>

                        <Box sx={{ display: 'flex', paddingBottom: {lg: 4}}}>
                            <IconButton variant='outlined' sx={{height: {xs: 42, width: 42}, marginRight: 1}} onClick={handlePrev}>
                                <NavigateBeforeIcon />
                                
                            </IconButton>
                            <IconButton variant='outlined' sx={{height: {xs: 42, width: 42}}} onClick={handleNext}>
                                <NavigateNextIcon />
                            </IconButton>
                        </Box>

                        <Typography variant='h3' sx={{py: matchDownMD? 2:0, marginTop: {lg: 1}}}>
                            {single.name[locale]}
                        </Typography>
                    </Box>
                    
                    <Box sx={{marginTop: {xs: 0, sm: 0, md: 3}, marginBottom: matchDownLG?6:12, textAlign: {xs: 'right', sm: 'left'} }}>
                        <Block variant='body2' sx={{opacity: 0.86}}>
                            {single.top[locale]}
                        </Block>
                    </Box>
                    <Box sx={{marginTop: 3, paddingBottom: 4, overflow: {lg: 'scroll'}, paddingRight: {lg: 4}, paddingBottom: {lg: 6}, maxHeight: {lg: 'calc(40vh)'}}}>
                        <Block sx={{paddingBottom: 2, typography: {xs:'body2', md: 'body1'}}}>
                            {single.body[locale]}
                        </Block>
                    </Box>

                </Box>
                </Box>
                <Box sx={{position: 'relative', overflow: 'visible', width: '100%'}}>
              
                    <ImageList variant="masonry" cols={matchDownXL? 1:2} sx={{position: 'relative', overflow: 'visible', width: '100%', marginTop: 0}}>
                        {single.imgs.map((img, index) => (
                            <Img img={img} index={index} key={img._key} />
                        ))}
                    </ImageList>
                </Box>
            </Box>
            </Box>
            {single.imgs.length > 4 && <Box sx={{display: 'flex', px: {xs: 2, md: 3.5}}}>
        
        
       
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', py: matchDownMD? 2:0}}>
                    
                
            <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', paddingRight: 2}}>
                <IconButton variant='outlined' sx={{marginRight: 1}} onClick={handlePrev}>
                    <NavigateBeforeIcon />
                    
                </IconButton>
                <IconButton variant='outlined' onClick={handleNext}>
                    <NavigateNextIcon  />
                </IconButton>
            </Box>

        </Box>
        <Typography variant='h3' sx={{py: matchDownMD? 2:0}}>
            {single.name[locale]}
        </Typography>
        
    </Box>}
        </Box>
        
      </>

    )
}

function Img ({img, index, top}) {

    const theme = useTheme();

    const matchDownLG = useMediaQuery(theme => theme.breakpoints.down('lg'));

    return (
        <ImageListItem sx={{}}>
           
            <Box 
            sx={{
                position: 'relative', 
                overflow: 'visible', 
                height: top&&'30vh', 
                mx: top? 0 : matchDownLG? 0:1, 
                my: !top && 1,
                
            }}
            component={motion.div}
            transition={{transition: 'ease', duration: 0.5}}
            //onLayoutAnimationComplete={() => setAnimationComplete(true)}
            >
                <LazyImage
                src={img.url}
                
                
                
                style={{
                    
                    borderRadius: '4px', 
                    overflow: 'hidden',
                    //minHeight: top&& '20vh',
                    objectFit: 'cover',
                    height: top&&'100%',
                    width: top&&'100%',
                    //width:top&&'100%',
                    maxWidth: !top&&'100%', 
                    maxHeight: !top&&'100%', 
                    }}
                //srcSet={img.url}
                alt={img}
                loading="lazy"
                />
                {top &&
                <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    
                        }}/>}
            </Box>
                                
                                
        </ImageListItem>
        
    )
}

export async function getStaticPaths() {

    const locales = ["fr", "en"];

    const res = await client.fetch(`*[_type == "project"]`)

    const paths = [];

    res.map((project) => {
        locales.forEach((locale) => {
            const slug = project.slug[locale].current;
            paths.push({ params: { slug }, locale })

        });
        
      });

    return { paths, fallback: false };
  }
  
export async function getStaticProps(context = {}) {
    const { params, locale } = context;
    const query = `*[_type == "project" && slug[$locale].current == $slug]{
        ...,
        'imgs': imgs[]{..., 'url': asset->url},
        "previous": *[_type == "project" && ^.orderRank > orderRank]|order(orderRank desc)[0]{ 
              "slug": slug[$locale].current
        },
        "next": *[_type == "project" && ^.orderRank < orderRank]|order(orderRank asc)[0]{ 
              "slug": slug[$locale].current
        },
        "first": *[_type == "project"]|order(orderRank asc)[0]{ "slug": slug[$locale].current },
        "last": *[_type == "project"]|order(orderRank desc)[0]{ "slug": slug[$locale].current }
      }`
    const single = await client.fetch(query, { locale: locale, slug: params.slug })
    return { props: { single: single[0] } }
}


export default Projet
